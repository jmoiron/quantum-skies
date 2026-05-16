ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;
    const extras = event.recipes.gcyrextras;
    const SATURN_ORBIT = "gcyr:saturn_orbit";

    // ─────────────────────────────────────────────────────────────────────────
    // Saturn gas collection
    //
    // The orbital gas miner is deployed into Saturn orbit, sweeping the upper
    // atmosphere for light gases. Ring solids are sourced separately from the
    // orbital mining laser so both multiblocks are required.
    //
    // TODO: confirm dimension ID once gcyr:saturn or gcyr:saturn_orbit is registered.
    // TODO: circuit number — using 8 here to follow the planetary sequence
    //       (mars=4, venus=5, io=6, europa=7, saturn=8).
    // ─────────────────────────────────────────────────────────────────────────

    extras.orbital_gas_miner("collect_saturnian_atmosphere")
        .dimension(SATURN_ORBIT)
        .outputFluids("gtceu:saturnian_atmospheric_mix 10000")
        .circuit(8)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 5);

    greg.vacuum_freezer("freeze_saturnian_atmosphere")
        .inputFluids("gtceu:saturnian_atmospheric_mix 4000")
        .outputFluids("gtceu:liquid_saturnian_atmospheric_mix 4000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(80);

    // Helium-3 (primary Saturn gate material, used for ZPM fusion ignition) and
    // ammonia (useful for downstream chemistry) are key outputs.
    greg.distillation_tower("distill_liquid_saturnian_atmosphere")
        .inputFluids("gtceu:liquid_saturnian_atmospheric_mix 100000")
        .outputFluids("gtceu:hydrogen 60000")
        .outputFluids("gtceu:helium 30000")
        .outputFluids("gtceu:methane 4000")
        .outputFluids("gtceu:ammonia 2500")
        .outputFluids("gtceu:arsine 2000")
        .outputFluids("gtceu:phosphine 1000")
        .outputFluids("gtceu:helium_3 500")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000);

    // ─────────────────────────────────────────────────────────────────────────
    // Titan gas mining
    //
    // Titan's dense N2/CH4 atmosphere is the richest organic-chemical source in
    // the outer solar system. The orbital gas miner operates from Saturn orbit,
    // targeting Titan's upper atmosphere; distillation separates the light gases,
    // hydrocarbon fraction, and the heavy tholin residue — our key Kapton-E
    // feedstock.
    //
    // TODO: confirm dimension ID once gcyr:titan is registered.
    // TODO: circuit number — using 9 here.
    // ─────────────────────────────────────────────────────────────────────────

    extras.orbital_gas_miner("collect_titanean_atmosphere")
        .dimension(SATURN_ORBIT)
        .outputFluids("gtceu:titanean_atmospheric_mix 10000")
        .circuit(9)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 5);

    // ─────────────────────────────────────────────────────────────────────────
    // Orbital mining laser
    //
    // The Saturnian progression requires both GCYR Extras orbital machines:
    //   circuit 5 — Titan remote surface skimming from Saturn orbit
    //   circuit 6 — Saturn ring silicate extraction
    //
    // Titan keeps its on-world drill route, but the laser now offers a second,
    // lower-throughput off-world path for the same core materials.
    // ─────────────────────────────────────────────────────────────────────────

    extras.orbital_miner("collect_titanean_surface_minerals")
        .dimension(SATURN_ORBIT)
        .circuit(5)
        .inputFluids("gtceu:sodium_potassium 5")
        .chancedOutput("4x kubejs:titan_hydrocarbon_sand", 8000, 0)
        .chancedOutput("3x kubejs:titan_dirty_ice", 7000, 0)
        .chancedOutput("2x kubejs:methane_clathrate", 6500, 0)
        .chancedOutput("2x kubejs:titan_cryorock", 5000, 0)
        .chancedOutput("kubejs:titan_boulder_conglomerate", 4500, 0)
        .chancedOutput("gtceu:titanean_selenide_ore", 2500, 0)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 15);

    extras.orbital_miner("collect_saturn_ring_silicate")
        .dimension(SATURN_ORBIT)
        .circuit(6)
        .inputFluids("gtceu:sodium_potassium 5")
        .itemOutputs("2x gtceu:saturn_ring_silicate_dust")
        .chancedOutput("2x gtceu:saturn_ring_silicate_dust", 6000, 0)
        .EUt(GTValues.VA[GTValues.EV])
        .duration(20 * 15);

    greg.vacuum_freezer("freeze_titanean_atmosphere")
        .inputFluids("gtceu:titanean_atmospheric_mix 4000")
        .outputFluids("gtceu:liquid_titanean_atmospheric_mix 4000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(80);

    // Titan's atmosphere yields the light gases, hydrocarbon condensates, and HCN
    // building blocks. The actual hydrocarbon-tholin feedstock is assembled later
    // through a dedicated reactor chain.
    greg.distillation_tower("distill_liquid_titanean_atmosphere")
        .inputFluids("gtceu:liquid_titanean_atmospheric_mix 100000")
        .outputFluids("gtceu:nitrogen 72000")
        .outputFluids("gtceu:methane 15000")
        .outputFluids("gtceu:ethane 5000")
        .outputFluids("gtceu:titan_hydrocarbon_mix 3000")
        .outputFluids("gtceu:hydrogen_cyanide 200")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(2000);

    // ─────────────────────────────────────────────────────────────────────────
    // Kapton-E synthesis
    //
    // Six-step chain:
    //   1. Tholin extract + Titan hydrocarbon mix → hydrocarbon tholin solution
    //   2. Hydrocarbon tholin solution + selenium → selenized tholin
    //   3. Selenized tholin + HCN → hydrocarbon tholin
    //   4. Hydrocarbon tholin → tholin diamine
    //   5. Saturn ring silicate → siloxane dianhydride
    //   6. Diamine + dianhydride → Kapton E intermediates and polymer
    //
    // Both planetary inputs provide exactly one monomer half — the chain cannot
    // be shortcut without sourcing from both the Saturnian and Titanean systems.
    // ─────────────────────────────────────────────────────────────────────────

    // Step 1 — Hydrocarbon enrichment of extracted tholins
    greg.chemical_reactor("tholin_extract_hydrocarbonation")
        .inputFluids("gtceu:tholin_extract 1000")
        .inputFluids("gtceu:titan_hydrocarbon_mix 1000")
        .outputFluids("gtceu:hydrocarbon_tholin_solution 1000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(240);

    // Step 2 — Selenium doping
    greg.chemical_reactor("selenize_hydrocarbon_tholin")
        .itemInputs("gtceu:selenium_dust")
        .inputFluids("gtceu:hydrocarbon_tholin_solution 1000")
        .outputFluids("gtceu:selenized_tholin 1000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(220);

    // Step 3 — Nitrile fixation into final hydrocarbon tholin feedstock
    greg.chemical_reactor("hydrocarbon_tholin_finish")
        .inputFluids("gtceu:selenized_tholin 1000")
        .inputFluids("gtceu:hydrogen_cyanide 250")
        .outputFluids("gtceu:hydrocarbon_tholin 1000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(260);

    // Step 4 — Tholin diamine synthesis
    // The nitrile groups in tholin's HCN-derived fragments are reductively aminated
    // with H2 and NH3 under pressure to yield aromatic primary amines.
    greg.chemical_reactor("tholin_to_diamine")
        .inputFluids("gtceu:hydrocarbon_tholin 2000")
        .inputFluids("gtceu:hydrogen 2000")
        .inputFluids("gtceu:ammonia 1000")
        .outputFluids("gtceu:tholin_diamine 2000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(320);

    // Step 5 — Siloxane dianhydride from ring silicate
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

    // Step 6 — Polyamic acid prepolymer (diamine + dianhydride condensation)
    // The two monomers combine in nitrogen atmosphere at moderate temperature
    // (standard polyimide synthesis conditions). The soluble polyamic acid
    // prepolymer is the last fluid-phase intermediate.
    greg.large_chemical_reactor("kapton_e_prepolymerization")
        .inputFluids("gtceu:tholin_diamine 2000")
        .itemInputs("2x gtceu:siloxane_dianhydride_dust")
        .inputFluids("gtceu:nitrogen 1000")
        .outputFluids("gtceu:kapton_e_prepolymer 2000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(400);

    // Step 4 — Polymerization (oxygen or air)
    // Mirrors the GTCEu polyethylene polymerization pattern: oxygen gives a yield
    // bonus over air. Output is liquid Kapton E; the fluid solidifier turns it into
    // ingots/plates/foil for free via the material's fluid registration.
    greg.chemical_reactor("kapton_e_polymerization_oxygen")
        .circuit(1)
        .inputFluids("gtceu:oxygen 1000")
        .inputFluids("gtceu:kapton_e_prepolymer 144")
        .outputFluids("gtceu:kapton_e 216")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(480);

    greg.chemical_reactor("kapton_e_polymerization_air")
        .circuit(1)
        .inputFluids("gtceu:air 1000")
        .inputFluids("gtceu:kapton_e_prepolymer 144")
        .outputFluids("gtceu:kapton_e 144")
        .EUt(GTValues.VA[GTValues.LuV])
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
    // TODO: germanium source — currently using gtceu:germanium_additive_dust as a
    // placeholder. Either extend GTMaterials.Germanium with GENERATE_DUST or source
    // germanium from an existing ZPM-tier process (galena byproduct, etc.).
    greg.mixer("chalcogenide_glass_mix")
        .itemInputs("4x gtceu:titanean_selenide_dust")
        .itemInputs("gtceu:germanium_additive_dust")
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
        .itemOutputs("8x gtceu:fine_chalcogenide_glass_wire")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200);

    // ─────────────────────────────────────────────────────────────────────────
    // Vanadium gallium cable insulation — add Kapton E foil requirement
    //
    // ZPM-tier cables already require PPS and PVC foils. Adding a Kapton E foil
    // gates all vanadium gallium cables behind the Saturn/Titan processing chain.
    // Recipe IDs follow GTCEu WireRecipeHandler: cover_<mat>_<wirePrefix>_<rubber>.
    // Fluid amounts: L=144mB; silicone = L*insulation/2; SBR = L*insulation/4.
    // ─────────────────────────────────────────────────────────────────────────

    // [wire size, insulation amount]
    const VG_CABLES = [
        ["single",    1],
        ["double",    1],
        ["quadruple", 2],
        ["octal",     3],
        ["hex",       5],
    ];

    VG_CABLES.forEach(function(entry) {
        const wire = entry[0];
        const insulation = entry[1];
        const gtPrefix = "wire_gt_" + wire;
        const wireItem = "gtceu:vanadium_gallium_" + wire + "_wire";
        const cableItem = "gtceu:vanadium_gallium_" + wire + "_cable";
        const siliconeAmt = 144 * insulation / 2;
        const sbrAmt = 144 * insulation / 4;

        console.log(gtPrefix);

        event.remove({ id: "gtceu:assembler/cover_vanadium_gallium_" + gtPrefix + "_silicone" });
        event.remove({ id: "gtceu:assembler/cover_vanadium_gallium_" + gtPrefix + "_styrene_butadiene" });

        greg.assembler("cover_vanadium_gallium_" + gtPrefix + "_silicone")
            .itemInputs(wireItem)
            .itemInputs(insulation + "x gtceu:polyphenylene_sulfide_foil")
            .itemInputs(insulation + "x gtceu:polyvinyl_chloride_foil")
            .itemInputs(insulation + "x gtceu:kapton_e_foil")
            .inputFluids("gtceu:silicone_rubber " + siliconeAmt)
            .itemOutputs(cableItem)
            .EUt(GTValues.VA[GTValues.ULV])
            .duration(100);

        greg.assembler("cover_vanadium_gallium_" + gtPrefix + "_styrene_butadiene")
            .itemInputs(wireItem)
            .itemInputs(insulation + "x gtceu:polyphenylene_sulfide_foil")
            .itemInputs(insulation + "x gtceu:polyvinyl_chloride_foil")
            .itemInputs(insulation + "x gtceu:kapton_e_foil")
            .inputFluids("gtceu:styrene_butadiene_rubber " + sbrAmt)
            .itemOutputs(cableItem)
            .EUt(GTValues.VA[GTValues.ULV])
            .duration(100);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Optical fiber cable — modified recipe
    //
    // The chalcogenide glass core (Titan laser miner) and the Kapton-E jacket
    // (Titan gas miner + Saturn gas collector) together mean that optical fiber
    // cable now requires sourcing from both Titan processes — a natural LuV gate.
    //
    event.remove({ id: "gtceu:assembler/optical_pipe" });
    greg.assembler("optical_fiber_cable_saturnian")
        .itemInputs("8x gtceu:fine_chalcogenide_glass_wire")
        .itemInputs("8x gtceu:silver_foil")
        .itemInputs("4x gtceu:kapton_e_foil")
        .itemOutputs("gtceu:normal_optical_pipe")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200);
    // ─────────────────────────────────────────────────────────────────────────

});
