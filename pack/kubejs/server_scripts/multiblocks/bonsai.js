ServerEvents.recipes(event => {

    // controller block recipe for the large crucible
    event.shaped(Item.of("gtceu:primitive_woodcutter"),
        ["RPS", "XWD", "CPC"],
        {
            R: "gtceu:iron_ring",
            P: "gtceu:wrought_iron_plate",
            S: "gtceu:iron_screw",
            X: "gtceu:iron_buzz_saw_blade",
            W: "gtceu:treated_wood_planks",
            D: "#forge:tools/screwdrivers",
            C: "minecraft:cobblestone_slab",
        }
    );

    let woodTypes = [
        "oak", "spruce", "birch", "jungle", "acacia", "dark_oak", "cherry"
    ]

    woodTypes.forEach((type) => {
        event.recipes.gtceu.bonsai(`${type}_log`)
            .notConsumable(`minecraft:${type}_sapling`)
            .inputFluids("minecraft:water 250")
            .itemOutputs(`16x minecraft:${type}_log`)
            .EUt(10)
            .duration(400);
    })

    event.recipes.gtceu.bonsai("rubber_log")
        .notConsumable("gtceu:rubber_sapling")
        .inputFluids("minecraft:water 250")
        .itemOutputs("16x gtceu:rubber_log")
        .EUt(10)
        .duration(400);

})