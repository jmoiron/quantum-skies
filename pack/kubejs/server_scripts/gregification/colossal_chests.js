
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    const replacements = {
        "minecraft:iron_ingot": "gtceu:iron_plate",
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

})