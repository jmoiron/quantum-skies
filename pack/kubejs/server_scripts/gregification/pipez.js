
ServerEvents.recipes(event => {

    event.remove({mod: "pipez"});

    let mats = {
        T: "gtceu:tin_small_item_pipe",
        C: "gtceu:potin_small_fluid_pipe",
        D: "gtceu:copper_double_wire",
        R: "minecraft:redstone_block",
        H: "minecraft:hopper",
        W: "#forge:tools/wrenches",
        M: "#forge:tools/hammers",
        I: "pipez:item_pipe",
        F: "pipez:fluid_pipe",
        E: "pipez:energy_pipe",
    };

    event.shaped("pipez:wrench",
        [' FW', ' SF', 'S  '],
        {
            F: "minecraft:flint",
            W: "#forge:tools/wrenches",
            S: "#forge:rods",
        }
    )

    event.shaped("8x pipez:item_pipe", ["TTT", "WHM", "TTT"], take(mats, "TWHM"));
    event.shaped("8x pipez:fluid_pipe", ['CCC', 'WHM', 'CCC'], take(mats, "CWHM"));
    event.shaped("8x pipez:energy_pipe", ["DRD", "WHM", "DRD"], take(mats, "DRWHM"));
    event.shaped("6x pipez:universal_pipe", ["IFE", "WRM", "IFE"], take(mats, "IFEWRM"));

});