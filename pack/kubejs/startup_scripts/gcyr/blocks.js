StartupEvents.registry("block", (event) => {
    let tinted = function(blockName, color) {
        return event.create(blockName)
            .color(0, color)
            .item((builder) => { builder.color(0, color) })
    }

    // io
    event.create("sulfuric_pumice");
    event.create("cryo_sulfur_deposit");
    event.create("tidal_fractured_peridotite");
    event.create("plasma_tempered_basalt");
    event.create("pyroclastic_regolith");
    event.create("pyroclastic_clean_regolith");
    event.create("io_volcanic_ash");
    event.create("lava_skylight_crust");

    // europa
    event.create("europa_ice_block");
    event.create("europa_packed_ice");
    event.create("tholin_ice_light");
    event.create("tholin_ice_medium");
    event.create("tholin_ice_dark");
    event.create("tholin_ice_red");
    event.create("tholin_ice_block");

    // ganymede
    event.create("ganymede_compacted_ice").mapColor('terracotta_blue');
    event.create("ganymede_grooved_ice").mapColor('color_light_blue');
    event.create("ganymede_regolith").mapColor('stone');
    event.create("ganymede_dark_dust").mapColor('color_black');

    // callisto (creams, browns, mossy greens)
    event.create("callisto_regolith").mapColor('dirt');
    event.create("callisto_compact_regolith").mapColor('terracotta_brown');
    event.create("callisto_olivine_crust").mapColor('grass');
    event.create("callisto_light_regolith").mapColor('sand');

    // hearts of the jovian moons
    event.create("heart_of_jupiter")
        .displayName("Heart of Jupiter")
        .textureAll("gcyr:sky/jupiter");

    event
        .create("heart_of_io")
        .displayName("Heart of Io")
        .textureAll("kubejs:block/heart_of_io");
    event
        .create("heart_of_europa")
        .displayName("Heart of Europa")
        .textureAll("kubejs:block/heart_of_europa");
    event
        .create("heart_of_ganymede")
        .displayName("Heart of Ganymede")
        .textureAll("kubejs:block/heart_of_ganymede");
    event
        .create("heart_of_callisto")
        .displayName("Heart of Callisto")
        .textureAll("kubejs:block/heart_of_callisto");


})

GTCEuStartupEvents.registry("gtceu:dimension_marker", (event) => {
    // create dimension markers for custom dimensions
    event.create("gcyr:io")
        .iconSupplier(() => Item.of("kubejs:heart_of_io").getItem())
        .tier(0)
        .overrideName("Io");

    event.create("gcyr:europa")
        .iconSupplier(() => Item.of("kubejs:heart_of_europa").getItem())
        .tier(0)
        .overrideName("Europa");

    /*
    // this doesn't work because gcyr supplies these but without textures

    event.create("gcyr:venus")
        .iconSupplier(() => Item.of("gcyr:venus_sand").getItem())
        .tier(0)
        .overrideName("Venus");

    event.create("gcyr:mars")
        .iconSupplier(() => Item.of("gcyr:mars_regolith").getItem())
        .tier(0)
        .overrideName("Mars");
    */
});
