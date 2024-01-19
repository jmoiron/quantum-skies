priority: 0

ServerEvents.recipes(event => {
    // these recipes are aimed at smoothing out the early game and
    // reducing tedium pre-steam era

    event.shaped("16x minecraft:stick", ["A", "A"], {A: Ingredient.of("#minecraft:logs")})
    event.shapeless("4x minecraft:clay_ball", ["minecraft:clay"])

    // move charcoal to the blaster as a halfway balancing option
    event.remove({type: "minecraft:smelting", output: "charcoal"})
    event.blasting("minecraft:charcoal", "#minecraft:logs_that_burn")

    event.blasting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot")
    // make nether bricks pre-steel to make water distribution
    // with entangled earlier than the PBF
    // want people to be able to make basic clay automation for PBF
    event.blasting("minecraft:nether_brick", "minecraft:netherrack")

    event.remove({output: "clickmachine:auto_clicker"});
    event.shaped("clickmachine:auto_clicker",
        [
            'DDD',
            'POR',
            'DDD'
        ],
        {
            D: "minecraft:diorite",
            P: "minecraft:dispenser",
            O: "minecraft:observer",
            R: "minecraft:dropper",
        },
    )

    // use logs to make 4 chests
    event.shaped("4x minecraft:chest",
        ["LLL", "L L", "LLL"],
        {L: "#minecraft:logs"}
    )

    let creoCell = Item.of('gtceu:fluid_cell', '{Fluid:{Amount:1000,FluidName:"gtceu:creosote"}}')
    // allows for crafting of wood planks with (stackable) creosote cells
    event.shaped("8x gtceu:treated_wood_planks",
        ["WWW", "WCW", "WWW"],
        {
            W: "#minecraft:planks",
            C: creoCell.strongNBT()
        }
    ).replaceIngredient({item: creoCell}, "gtceu:fluid_cell")

    let waterCell = Item.of('gtceu:fluid_cell', '{Fluid:{Amount:1000,FluidName:"minecraft:water"}}')
    event.shaped("2x minecraft:paper",
        [" H ", "DDD", " C "],
        {
            H: "#forge:tools/mallets",
            D: "gtceu:paper_dust",
            C: waterCell.strongNBT()
        }
    ).replaceIngredient({item:waterCell}, "gtceu:fluid_cell")

});