
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

    // We have to make this worthwhile compared to using buckets
    // which requires no power and very little material investment.
    //
    // It's over-clockable and it uses 1/4th the water.  At the 
    // primitive pump stage, this might be worth it;  pretty soon into
    // MV, it isn't.
    //
    // soul sand is a pretty poor source of oil in vanilla gregtech,
    // but we've made it the source of oilsand via ex-ni
    //
    // In terms of balance w/ the drilling rig, it uses 1/2 the power
    // and it produces oil at ~200L/sec and heavy oil significantly
    // faster.  It also eats sand, which requires a 3-machine chain
    // to produce.
    //
    // It's probably slightly better than a drilling rig + pipeline,
    // but this has to compare to parallelizing normal exni barrels.
    // Welcome to skyblock.
    event.recipes.gtceu.cauldron("soul_sand")
        .itemInputs("minecraft:sand")
        .itemOutputs("minecraft:soul_sand")
        .inputFluids("minecraft:water 250")
        .duration(20)
        .EUt(40)

});
