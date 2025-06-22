StartupEvents.registry("block", (event) => {

    let tinted = function(blockName, color) {
        return event.create(blockName)
            .color(1, color)
            .item((builder) => { builder.color(1, color) })
    }

    event.create("europa_ice_block");
    event.create("europa_packed_ice");

    event.create("tholin_ice_light");
    event.create("tholin_ice_medium");
    event.create("tholin_ice_dark");
    event.create("tholin_ice_red");
    event.create("tholin_ice_block");

})