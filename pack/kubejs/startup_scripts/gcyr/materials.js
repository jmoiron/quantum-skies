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

    // this is the surface fluid for io, so we need the fluid builder to
    // make a block version so it can be placed in world
    event.create("io_sulfuric_lava")
        .liquid(new $FluidBuilder().block())
        .color(0xf2c00f);

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