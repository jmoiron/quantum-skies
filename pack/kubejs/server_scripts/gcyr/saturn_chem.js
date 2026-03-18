ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;

    // ─────────────────────────────────────────────────────────────────────────
    // Saturn gas collection
    //
    // The gas collector is deployed into Saturn's upper atmosphere (ring plane
    // altitude), sweeping both atmospheric gas and ring-rain silicate particulate.
    //
    // TODO: confirm dimension ID once gcyr:saturn or gcyr:saturn_orbit is registered.
    // TODO: circuit number — using 8 here to follow the planetary sequence
    //       (mars=4, venus=5, io=6, europa=7, saturn=8).
    // ─────────────────────────────────────────────────────────────────────────

    greg.gas_collector("collect_saturnian_atmosphere")
        .dimension("gcyr:saturn")
        .outputFluids("gtceu:saturnian_atmospheric_mix 10000")
        .circuit(8)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200);

    greg.vacuum_freezer("freeze_saturnian_atmosphere")
        .inputFluids("gtceu:saturnian_atmospheric_mix 4000")
        .outputFluids("gtceu:liquid_saturnian_atmospheric_mix 4000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(80);

    // Ring-rain silicate particulate falls out as a solid fraction during
    // distillation. Helium-3 (primary Saturn gate material, used for ZPM fusion
    // ignition) and ammonia (useful for downstream chemistry) are key outputs.
    greg.distillation_tower("distill_liquid_saturnian_atmosphere")
        .inputFluids("gtceu:liquid_saturnian_atmospheric_mix 100000")
        .outputFluids("gtceu:hydrogen 60000")
        .outputFluids("gtceu:helium 30000")
        .outputFluids("gtceu:methane 4000")
        .outputFluids("gtceu:ammonia 2500")
        .outputFluids("gtceu:helium_3 500")
        .chancedOutput("gtceu:saturn_ring_silicate_dust", 3000, 500)
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(2000);

    // ─────────────────────────────────────────────────────────────────────────
    // Titan gas mining
    //
    // Titan's dense N2/CH4 atmosphere is the richest organic-chemical source in
    // the outer solar system. The gas miner harvests the full atmospheric mix;
    // distillation separates the light gases, hydrocarbon fraction, and the heavy
    // tholin residue — our key Kapton-E feedstock.
    //
    // TODO: confirm dimension ID once gcyr:titan is registered.
    // TODO: circuit number — using 9 here.
    // ─────────────────────────────────────────────────────────────────────────

    greg.gas_collector("collect_titanean_atmosphere")
        .dimension("gcyr:titan")
        .outputFluids("gtceu:titanean_atmospheric_mix 10000")
        .circuit(9)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200);

    greg.vacuum_freezer("freeze_titanean_atmosphere")
        .inputFluids("gtceu:titanean_atmospheric_mix 4000")
        .outputFluids("gtceu:liquid_titanean_atmospheric_mix 4000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(80);

    // Titan's organic haze is rich enough that the heavy tholin fraction condenses
    // out at the bottom of the distillation column. HCN is a minor but real
    // atmospheric component (already registered in GTCEu as a gas).
    greg.distillation_tower("distill_liquid_titanean_atmosphere")
        .inputFluids("gtceu:liquid_titanean_atmospheric_mix 100000")
        .outputFluids("gtceu:nitrogen 72000")
        .outputFluids("gtceu:methane 15000")
        .outputFluids("gtceu:ethane 5000")
        .outputFluids("gtceu:titan_hydrocarbon_mix 3000")
        .outputFluids("gtceu:titanean_tholin 500")
        .outputFluids("gtceu:hydrogen_cyanide 200")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(2000);

    // ─────────────────────────────────────────────────────────────────────────
    // Kapton-E synthesis
    //
    // Four-step chain:
    //   1. Titanean tholin → tholin diamine   (chemical reactor, LuV)
    //   2. Saturn ring silicate → siloxane dianhydride  (chemical reactor, LuV)
    //   3. Diamine + dianhydride → polyamic acid prepolymer  (LCR, ZPM)
    //   4. Prepolymer → Kapton-E via thermal imidization  (chemical reactor, ZPM)
    //
    // Both planetary inputs provide exactly one monomer half — the chain cannot
    // be shortcut without sourcing from both the Saturnian and Titanean systems.
    // ─────────────────────────────────────────────────────────────────────────

    // Step 1 — Tholin diamine synthesis
    // The nitrile groups in tholin's HCN-derived fragments are reductively aminated
    // with H2 and NH3 under pressure to yield aromatic primary amines.
    greg.chemical_reactor("tholin_to_diamine")
        .inputFluids("gtceu:titanean_tholin 2000")
        .inputFluids("gtceu:hydrogen 2000")
        .inputFluids("gtceu:ammonia 1000")
        .outputFluids("gtceu:tholin_diamine 2000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(320);

    // Step 2 — Siloxane dianhydride from ring silicate
    // Acetic anhydride reacts with surface silanol groups on the ring silicate
    // particles, functionalising the silica surface into a siloxane-dianhydride
    // monomer. Acetic acid is the condensation byproduct.
    greg.chemical_reactor("ring_silicate_to_siloxane_dianhydride")
        .itemInputs("3x gtceu:saturn_ring_silicate_dust")
        .inputFluids("gtceu:acetic_anhydride 1000")
        .itemOutputs("gtceu:siloxane_dianhydride_dust")
        .outputFluids("gtceu:acetic_acid 500")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(280);

    // Step 3 — Polyamic acid prepolymer (diamine + dianhydride condensation)
    // The two monomers combine in nitrogen atmosphere at moderate temperature
    // (standard polyimide synthesis conditions). The soluble polyamic acid
    // prepolymer is the last fluid-phase intermediate.
    greg.large_chemical_reactor("kapton_e_prepolymerization")
        .inputFluids("gtceu:tholin_diamine 2000")
        .itemInputs("2x gtceu:siloxane_dianhydride_dust")
        .inputFluids("gtceu:nitrogen 1000")
        .outputFluids("gtceu:kapton_e_prepolymer 2000")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(400);

    // Step 4 — Thermal imidization (ring closure under vacuum)
    // Heat drives off water and closes the imide rings, converting the polyamic
    // acid into the final aromatic polyimide-siloxane film. The vacuum prevents
    // oxidative chain scission above 300°C.
    greg.chemical_reactor("kapton_e_imidization")
        .inputFluids("gtceu:kapton_e_prepolymer 2000")
        .outputFluids("minecraft:water 500")
        .itemOutputs("gtceu:kapton_e_ingot")
        .EUt(GTValues.VA[GTValues.ZPM])
        .duration(480);

    // ─────────────────────────────────────────────────────────────────────────
    // Chalcogenide glass — optical fiber core from Titan laser mining
    //
    // The laser miner operates on Titan's icy-silicate surface, drilling through
    // the hydrocarbon-sand regolith into the rock below. The titanean_selenide ore
    // it produces is an arsenic triselenide (As₂Se₃) mineral with trace germanium
    // and tellurium — all three chalcogen-containing elements present in a single ore.
    //
    // TODO: titanean_selenide needs worldgen data (ore vein) for Titan's surface.
    // ─────────────────────────────────────────────────────────────────────────

    // Ore → dust (standard laser miner output processing)
    greg.macerator("titanean_selenide_ore_to_dust")
        .itemInputs("gtceu:titanean_selenide_ore")
        .itemOutputs("2x gtceu:titanean_selenide_dust")
        .chancedOutput("gtceu:titanean_selenide_dust", 5000, 500)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200);

    // Blend: the raw selenide dust already contains As₂Se₃. Adding the separately-
    // sourced germanium additive (a minor ZPM-tier byproduct from other processing)
    // shifts the glass-forming window and extends IR transparency further into the
    // mid-IR. The ratio is intentionally simple for gameplay.
    //
    // TODO: germanium source — currently using kubejs:germanium_dust_additive as a
    // placeholder. Either extend GTMaterials.Germanium with GENERATE_DUST or source
    // germanium from an existing ZPM-tier process (galena byproduct, etc.).
    greg.mixer("chalcogenide_glass_mix")
        .itemInputs("4x gtceu:titanean_selenide_dust")
        .itemInputs("kubejs:germanium_dust_additive")
        .itemOutputs("5x gtceu:chalcogenide_glass_mix_dust")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200);

    // Fuse the powder blend into a glass blank in the EBF.
    // 900K coil requirement (Nichrome is sufficient). The LuV-gate here comes from
    // the ore source (Titan laser mining) not from thermal requirements.
    // Recipe is auto-generated from blastTemp(900) in the material definition.

    // Draw the glass blank into fine fiber for optical fiber cable assembly.
    // Chalcogenide glasses are thermoplastic above Tg (~170-250°C) and drawable.
    greg.wiremill("chalcogenide_glass_to_fiber")
        .itemInputs("gtceu:chalcogenide_glass_ingot")
        .itemOutputs("8x gtceu:chalcogenide_glass_fine_wire")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200);

    // ─────────────────────────────────────────────────────────────────────────
    // Optical fiber cable — modified recipe
    //
    // The chalcogenide glass core (Titan laser miner) and the Kapton-E jacket
    // (Titan gas miner + Saturn gas collector) together mean that optical fiber
    // cable now requires sourcing from both Titan processes — a natural LuV gate.
    //
    // TODO: find the existing optical fiber cable recipe ID and remove it before
    //       registering this replacement. Confirm the exact output item ID.
    //
    // greg.assembler("optical_fiber_cable_saturnian")
    //     .itemInputs("4x gtceu:chalcogenide_glass_fine_wire")
    //     .itemInputs("2x gtceu:kapton_e_foil")
    //     .itemOutputs("4x gcyr:optical_fiber_cable")  // TODO: confirm item ID
    //     .EUt(GTValues.VA[GTValues.LuV])
    //     .duration(300);
    // ─────────────────────────────────────────────────────────────────────────

});
