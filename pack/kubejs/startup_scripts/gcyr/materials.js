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

    event.create("ionian_air").gas().color(0x9a8b4f);
    event.create("liquid_ionian_air")
        .liquid(new $FluidBuilder().block())
        .color(0x8b7e49);

    event.create("ionized_sulfur_dioxide").gas().color(0xb08f5a);

    // oleum is a stronger version of sulfuric acid
    event.create("oleum")
        .liquid(new $FluidBuilder().block())
        .color(0x9a907e);

    // Quench product from Io sulfuric lava, further separable
    event.create("quenched_ionian_lava")
        .liquid(new $FluidBuilder().block())
        .color(0x6e5b3c);

    // Substrate recovered from quenched slurry, used in catalysis later
    dust("oleum_substrate", 0xC7B99A);

    // Europa atmospheric and organic chemistry
    event.create("europan_air").gas().color(0x668a8a);
    event.create("liquid_europan_air")
        .liquid(new $FluidBuilder().block())
        .color(0x5a7b7b);

    // Tholin processing
    event.create("tholin_solution")
        .liquid(new $FluidBuilder().block())
        .color(0x8d6a7a);
    event.create("tholin_extract")
        .liquid(new $FluidBuilder().block())
        .color(0x9b7f88);

    // briny subsurface liquid for ganymede pools and aquifers
    event.create("ganymede_brine")
        .liquid(new $FluidBuilder().block())
        .color(0x6b7a6a);

    // TODO: Add a processing chain for ganymede_brine (e.g., evaporation/chemical bath/electrolyzer outputs)

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

});
