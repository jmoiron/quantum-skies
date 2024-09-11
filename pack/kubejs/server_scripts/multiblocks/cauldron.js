
ServerEvents.recipes(event => {

    // controller block recipe for the large crucible
    // FIXME: should not eat the bucket
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

    // all of these recipes will use 250mb of water, regardless of
    // whether they require witchwater or water (there are no overlaps)
    let precipitateRecipes = [
        ["exnihilosequentia:dust", "minecraft:clay"],
        ["minecraft:dirt", "minecraft:mud"],
        ["exnihilosequentia:mycelium_spores", "minecraft:brown_mushroom_block"],
        ["minecraft:brown_mushroom_block", "minecraft:red_mushroom_block"],
        ["minecraft:coarse_dirt", "minecraft:soul_soil"],
        ["#forge:mushrooms", "minecraft:slime_block"],
        ["exnihilosequentia:crushed_dripstone", "minecraft:pointed_dripstone"],
        ["minecraft:sand", "minecraft:soul_sand"]
    ]

    precipitateRecipes.forEach(([input, output]) => {
        event.recipes.gtceu.cauldron(`cauldron_${output.split(":")[1]}`)
            .itemInputs(input)
            .itemOutputs(output)
            .inputFluids("minecraft:water 200")
            .duration(20)
            .EUt(24);
    })

});
