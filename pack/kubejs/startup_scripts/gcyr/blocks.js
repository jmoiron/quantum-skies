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



})