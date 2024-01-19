
ServerEvents.recipes(event => {

    // controller block recipe for the large crucible
    event.shaped(Item.of("gtceu:large_cauldron"),
        ["CGC", "WXH", "CLC"],
        {
            C: "gtceu:ulv_machine_casing",
            X: "minecraft:cauldron",
            W: "#forge:tools/wrenches",
            H: "#forge:tools/hammers",
            L: "exnihilosequentia:witch_water_bucket",
            G: "minecraft:glass",
        }
    );

});
