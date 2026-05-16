GTCEuStartupEvents.registry("gtceu:material", event => {

    function dust(name, color) {
        return event.create(name).dust().color(color);
    }

    function fluid(name, color) {
        return event.create(name).fluid().color(color);
    }

    function gas(name, color) {
        return event.create(name).gas().color(color);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Saturn — gas collector products
    //
    // Saturn's atmosphere is ~96% H2 / ~3% He with trace CH4, NH3, H2S.
    // The "ring rain" phenomenon (a real thing) draws charged silicate and water-ice
    // particles from the B ring into the upper atmosphere along magnetic field lines.
    // A gas collector sweeping the cloud deck therefore picks up both atmospheric
    // gases and fine ring particulate, making ring silicate a natural byproduct of
    // atmospheric gas collection — no drilling required.
    //
    // Dimension ID: TODO — confirm gcyr dimension ID for Saturn once registered.
    // ─────────────────────────────────────────────────────────────────────────

    gas("saturnian_atmospheric_mix", 0xD4C060);
    fluid("liquid_saturnian_atmospheric_mix", 0xC8B050);
    gas("phosphine", 0xE8D890)
        .formula("PH₃")
        .components("1x phosphorus", "3x hydrogen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);
    gas("arsine", 0xB89A74)
        .formula("AsH₃")
        .components("1x arsenic", "3x hydrogen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    // Fine-grained silicate/ice particulate from Saturn's B ring.
    // Mixed SiO2 with water-ice and trace carbonaceous organics; falls out of the
    // distillation column as a solid fraction during liquid atmosphere processing.
    dust("saturn_ring_silicate", 0xD8D0C0)
        .components("3x silicon_dioxide", "1x calcite")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    // ─────────────────────────────────────────────────────────────────────────
    // Titan — gas miner and laser miner products
    //
    // Titan has the thickest atmosphere of any moon in the solar system (~1.5 atm),
    // composed of ~98% N2 and ~1.4% CH4, with a photochemically-produced organic haze.
    // The gas miner collects the full atmospheric mix; the laser miner operates on
    // Titan's solid icy-silicate surface and subsurface rock.
    //
    // Dimension ID: TODO — confirm gcyr dimension ID for Titan once registered.
    // ─────────────────────────────────────────────────────────────────────────

    gas("titanean_atmospheric_mix", 0xD4903A);
    fluid("liquid_titanean_atmospheric_mix", 0xC4803A);

    // Light hydrocarbon fraction from Titan atmospheric distillation (C2-C4 range).
    // Titan's lakes are liquid ethane; propane and butane are also present at altitude.
    fluid("titan_hydrocarbon_mix", 0xD4A060);

    // Titan chemistry now produces a hydrocarbon-rich tholin feedstock through a
    // dedicated reactor chain rather than condensing finished tholin directly out
    // of the atmosphere.
    fluid("hydrocarbon_tholin_solution", 0x9A5A28);
    fluid("selenized_tholin", 0x7A4A24);
    fluid("hydrocarbon_tholin", 0x8B3D1A);

    // Titanean selenide — arsenic selenide mineral (As₂Se₃) with germanium and
    // tellurium impurities, found in Titan's icy-silicate subsurface rock.
    // The laser miner is required to reach the rock layer beneath the hydrocarbon
    // sand dunes and water-ice regolith.
    event.create("titanean_selenide")
        .ore().dust()
        .color(0x4A6B3A)
        .secondaryColor(0x2A4B1A)
        .iconSet(GTMaterialIconSet.SHINY)
        .formula("As₂Se₃")
        .addOreByproducts(GTMaterials.Selenium, GTMaterials.Tellurium);

    // Germanium — element material needs a dust form for use as a recipe input.
    // GTCEu registers Ge as an element reference only (no item forms).
    // Germanium is a trace product of several smelting processes and a minor
    // component of the chalcogenide glass blend.
    dust("germanium_additive", 0x4A4A4A);
    // TODO: extend GTMaterials.Germanium with GENERATE_DUST once KubeJS API
    // for material flag modification is confirmed. For now, use a separate dust.

    // ─────────────────────────────────────────────────────────────────────────
    // Kapton-E synthesis intermediates
    //
    // Kapton-E (polyimide-siloxane copolymer) is synthesized by condensing an
    // aromatic diamine with a siloxane-modified dianhydride, then thermally curing
    // the resulting polyamic acid under vacuum to close the imide rings.
    //
    // Monomer sources:
    //   Diamine  ← Hydrocarbon Tholin (Titan atmosphere + tholin extract + selenium)
    //   Dianhydride ← Saturn Ring Silicate (gas collector byproduct, Saturn)
    // ─────────────────────────────────────────────────────────────────────────

    // Step 1 product: tholin hydrogenated under ammonia atmosphere yields a fluid
    // rich in aromatic primary amines (the diamine monomer half of the polyimide).
    fluid("tholin_diamine", 0xB87030);

    // Step 2 product: ring silicate reacted with acetic anhydride under heat gives
    // a siloxane-modified dianhydride powder — the other half of the condensation.
    // Polyimide-siloxane copolymers (using siloxane dianhydrides) are a real material
    // class with enhanced flexibility and adhesion vs. pure polyimides.
    dust("siloxane_dianhydride", 0xE8E0D0);

    // Step 3 product: diamine + dianhydride condensed in nitrogen atmosphere at
    // moderate temperature. Soluble polyamic acid — the Kapton-E prepolymer.
    fluid("kapton_e_prepolymer", 0xD49040);

    // ─────────────────────────────────────────────────────────────────────────
    // Kapton-E — final material
    //
    // Polyimide-siloxane film. Golden amber (same colour as actual Kapton).
    // Used in ZPM machine casings and as the jacketing material for optical fiber
    // cable, tying together the two Titan-sourced materials.
    // ─────────────────────────────────────────────────────────────────────────

    event.create("kapton_e")
        .ingot()
        .liquid(new $FluidBuilder())
        .color(0xE8A020)
        .secondaryColor(0xC07800)
        .iconSet(GTMaterialIconSet.SHINY)
        .formula("(C₂₂H₁₄N₂O₅Si)n")
        .flags(
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.NO_SMELTING,
            GTMaterialFlags.DISABLE_DECOMPOSITION
        );

    // ─────────────────────────────────────────────────────────────────────────
    // Chalcogenide glass — optical fiber core material
    //
    // Chalcogenide glasses (As-Se-Ge-Te system) are the primary material for
    // mid-IR optical fibers. They have a much higher refractive index than silica
    // glass (1.5–3.0 vs. 1.45) and transmit wavelengths silica glass cannot.
    // Used in UV-tier enhanced optical fiber cable.
    //
    // Source: titanean_selenide ore from Titan laser miner.
    // ─────────────────────────────────────────────────────────────────────────

    // Blended feedstock powder: titanean selenide (As₂Se₃ base) with germanium
    // and tellurium additions to widen the glass-forming window and shift the IR
    // transmission edge into the mid-IR range.
    dust("chalcogenide_glass_mix", 0x8B4A30);

    // Dark brownish-red glass (matches the real colour of amorphous As₂Se₃).
    // Melts at ~360-600°C — well below metal melting points, accessible with
    // Nichrome-tier EBF coils. The "ingot" represents a cast glass blank ready
    // for fiber drawing.
    event.create("chalcogenide_glass")
        .ingot()
        .color(0x7B2A18)
        .secondaryColor(0x3A1008)
        .iconSet(GTMaterialIconSet.SHINY)
        .formula("As₂Se₃(GeTe)ₓ")
        .flags(
            GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.NO_SMELTING,
            GTMaterialFlags.DISABLE_DECOMPOSITION
        )
        .blastTemp(900, "low", GTValues.VA[GTValues.HV], 20 * 60);

});
