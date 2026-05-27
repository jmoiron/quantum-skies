
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    const replacements = {
        "minecraft:gold_ingot": "gtceu:gold_plate",
        "minecraft:copper_ingot": "gtceu:copper_plate",
        "#forge:ingots/silver": "gtceu:silver_plate",
        "minecraft:diamond": "gtceu:diamond_plate",
    }

    Object.entries(replacements).forEach(([from, to]) => {
        event.replaceInput(
            {mod: "colossalchests", input: `${from}`}, from, to
        )
    })

    event.replaceInput(
        {mod: "colossalchests", input: "#minecraft:planks"},
        "#minecraft:planks",
        "gtceu:treated_wood_planks",
    )

    event.replaceInput(
        {mod: "colossalchests", input: "#minecraft:logs"},
        "#minecraft:logs",
        "#forge:chests/wooden"
    )

    const wallRepl = {
        "copper": "wood",
        "iron": "copper",
        "silver": "iron",
        "gold": "silver",
        "diamond": "gold",
        "obsidian": "diamond",
    }

    Object.entries(wallRepl).forEach(([from, to]) => {
        event.replaceInput(
            {output: `colossalchests:chest_wall_${from}`},
            "#forge:chests/wooden",
            `colossalchests:chest_wall_${to}`
        )
    })

    const coreTiers = [
        "wood",
        "copper",
        "iron",
        "silver",
        "gold",
        "diamond",
        "obsidian",
    ];

    coreTiers.forEach((tier) => {
        const core = `colossalchests:colossal_chest_${tier}`;
        event.remove({output: core});
        event.shaped(core,
            [
                " P ",
                " W ",
                " P "
            ],
            {
                P: "gtceu:iron_plate",
                W: `colossalchests:chest_wall_${tier}`,
            }
        );
    });

    const coreUpgrades = [
        ["wood", "copper", "gtceu:copper_plate"],
        ["copper", "iron", "gtceu:iron_plate"],
        ["iron", "silver", "gtceu:silver_plate"],
        ["silver", "gold", "gtceu:gold_plate"],
        ["gold", "diamond", "gtceu:diamond_plate"],
        ["diamond", "obsidian", "gtceu:obsidian_plate"],
    ];

    coreUpgrades.forEach(([from, to, plate]) => {
        event.shaped(`colossalchests:colossal_chest_${to}`,
            [
                "PPP",
                "PCP",
                "PPP"
            ],
            {
                P: plate,
                C: `colossalchests:colossal_chest_${from}`,
            }
        );
    });

})
