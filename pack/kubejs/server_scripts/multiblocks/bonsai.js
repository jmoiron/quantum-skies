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

    let greg = event.recipes.gtceu;

    woodTypes.forEach((type) => {
        greg.bonsai(`${type}_log`)
            .notConsumable(`minecraft:${type}_sapling`)
            .inputFluids("minecraft:water 250")
            .itemOutputs(`16x minecraft:${type}_log`)
            .EUt(10)
            .duration(400);
    })

    greg.bonsai("rubber_log")
        .notConsumable("gtceu:rubber_sapling")
        .inputFluids("minecraft:water 250")
        .itemOutputs("16x gtceu:rubber_log")
        .EUt(10)
        .duration(400);

    // from GCP's greenhouse
    const plants = [
        ["minecraft:pumpkin_seeds", "minecraft:pumpkin", 6],
        ["minecraft:beetroot_seeds", "minecraft:beetroot", 16],
        ["minecraft:sweet_berries", "minecraft:sweet_berries", 16],
        ["minecraft:glow_berries", "minecraft:glow_berries", 8],
        ["minecraft:wheat_seeds", "minecraft:wheat", 16],
        ["minecraft:melon_seeds", "minecraft:melon", 6],
        ["minecraft:carrot", "minecraft:carrot", 12],
        ["minecraft:sugar_cane", "minecraft:sugar_cane", 12],
        ["minecraft:kelp", "minecraft:kelp", 12],
        ["minecraft:cactus", "minecraft:cactus", 12],
        ["minecraft:brown_mushroom", "minecraft:brown_mushroom", 12],
        ["minecraft:red_mushroom", "minecraft:red_mushroom", 12],
        ["minecraft:nether_wart", "minecraft:nether_wart", 12],
        ["minecraft:bamboo", "minecraft:bamboo", 16],
    ];

    plants.forEach(([input, output, mult]) => {
        greg.greenhouse(input)
             .notConsumable(input)
             .inputFluids("minecraft:water 1000")
             .itemOutputs(`${mult}x ${output}`)
             .duration(1200)
             .EUt(40)
             .circuit(1);

        greg.greenhouse(input + "_fertilizer")
            .notConsumable(input)
            .itemInputs("4x gtceu:fertilizer")
            .inputFluids("minecraft:water 1000")
            .itemOutputs(`${mult*2}x ${output}`)
            .duration(900)
            .EUt(60)
            .circuit(2);
    });

})