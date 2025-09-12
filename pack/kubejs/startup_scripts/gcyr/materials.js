GTCEuStartupEvents.registry("gtceu:material", event => {
    function dust(name, color) {
        return event.create(name).dust().color(color);
    }

    function fluid(name, color) {
        return event.create(name).fluid().color(color);
    }

    function gas(name, color) {
        event.create(name).gas().color(color);
    }

    event.create("io_sulfuric_lava")
        .liquid(new $FluidBuilder().block())
        .color(0xf2c00f);

    gas("ionian_air", 0x9a8b4f);
    fluid("liquid_ionian_air", 0x8b7e49);
    gas("ionized_sulfur_dioxide", 0xb08f5a);

    // oleum is a stronger version of sulfuric acid
    fluid("oleum", 0x9a907e);

    // Quench product from Io sulfuric lava, further separable
    fluid("quenched_ionian_lava", 0x6e5b3c);

    // Substrate recovered from quenched slurry, used in catalysis later
    dust("oleum_substrate", 0xC7B99A);

    // Callisto olivine substrate chain
    dust("olivine_salt", 0x9A8E6B);
    dust("enriched_olivine_salt", 0x8A7E5B);
    dust("olivine_substrate", 0x7A9A6B);

    // Europa atmospheric and organic chemistry
    gas("europan_air", 0x668a8a);
    fluid("liquid_europan_air", 0x5a7b7b);

    // Tholin processing
    fluid("tholin_solution", 0x8d6a7a);
    fluid("tholin_extract", 0x9b7f88);

    // briny subsurface liquid for ganymede pools and aquifers
    event.create("ganymede_brine")
        .liquid(new $FluidBuilder().block())
        .color(0x6b7a6a);

    // Ganymede brine processing intermediates
    fluid("conditioned_ganymede_brine", 0x6e8074);
    fluid("clarified_ganymede_brine", 0x5c6d63);
    fluid("refined_ganymede_brine", 0x547060);

    dust("sulfuric_pumice", 0xd4ab30)
        .components("2x silicon_dioxide", "2x sulfur", "7x aluminium_sulfite")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING);

    dust("cryo_sulfur_deposit", 0x9b875f)
        .components("3x sulfur", "3x hydrogen_sulfide", "1x sulfur_dioxide")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("peridotite", 0x334d2b)
        .components("4x olivine", "1x chromite", "1x aluminium", "2x chlorine")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("pyroclastic_regolith", 0xb591b7)
        .components("3x pyrite", "1x magnesium_diboride")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("plasma_tempered_basalt", 0x54504b)
        .components("7x silicon_dioxide", "3x borosilicate_glass", "1x hydrogen_sulfide")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("io_volcanic_ash", 0xd7d7d6)
        .components("7x ash", "3x potash", "1x obsidian")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("lava_skylight_crust", 0x573f31);

    // ganymede surface materials
    dust("ganymede_regolith", 0x6b6f6a)
        .components("5x silicon_dioxide", "1x sodium", "1x chlorine")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("ganymede_dark_dust", 0x3a3a3c)
        .components("2x silicon_dioxide", "2x carbon", "1x sodium", "1x chlorine")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    // callisto surface materials
    dust("callisto_regolith", 0x8e7f67)
        .components("4x silicon_dioxide", "1x olivine")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING);

    dust("callisto_compact_regolith", 0x7a6a54)
        .components("5x silicon_dioxide", "2x olivine")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING);

    dust("callisto_olivine_crust", 0x6f7f5b)
        .components("3x olivine", "1x silicon_dioxide")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING);

    dust("callisto_light_regolith", 0xb9ad93)
        .components("3x silicon_dioxide", "1x calcite")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING);

    // Low-Grade Naquadah ore and processing intermediates
    event.create("low_grade_naquadah")
        .color(0x3e5a4b)
        .ore().dust()
        .formula("Nq-")
        .addOreByproducts(GTMaterials.Sulfur, GTMaterials.Barite);

    // Intermediates and leach agents
    fluid("olivine_enriched_tholin", 0x7a6b7f);
    fluid("jovian_leachate", 0x6b7a6a);
    fluid("low_grade_naquadah_slurry", 0x4a5a4f);

});
