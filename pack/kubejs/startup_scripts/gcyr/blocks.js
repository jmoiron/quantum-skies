StartupEvents.registry("block", (event) => {

    let tinted = function(blockName, color) {
        return event.create(blockName)
            .color(0, color)
            .item((builder) => { builder.color(0, color) })
    }

    // io
    let blocks = {
        "pyroclastic_regolith": "#ff0000",
        "sulfuric_pumice": "#ddaa99",
        "cryo_sulfur_deposit": "#0000ff",
        "tidal_fractured_peridotite": "#00ff00",
        "io_volcanic_ash": "#dddddd",
        "lava_skylight_crust": "#444444",
        "plasma_tempered_basalt": "#777777"
    }

    Object.entries(blocks).forEach(([name, color]) => {
        tinted(name, color).textureAll("minecraft:block/stone");
    })

    event.create("europa_ice_block");
    event.create("europa_packed_ice");

    event.create("tholin_ice_light");
    event.create("tholin_ice_medium");
    event.create("tholin_ice_dark");
    event.create("tholin_ice_red");
    event.create("tholin_ice_block");



})