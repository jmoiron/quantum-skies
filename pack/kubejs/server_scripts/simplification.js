priority: 0

ServerEvents.recipes(event => {
    // these recipes are aimed at smoothing out the early game and
    // reducing tedium pre-steam era

    event.shaped("16x minecraft:stick", ["A", "A"], {A: Ingredient.of("#minecraft:logs")});
    event.shapeless("4x minecraft:clay_ball", ["minecraft:clay"]);

    event.blasting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot");

    // make nether bricks pre-steal to make water distribution
    // with entangled earlier than the PBF
    // want people to be able to make basic clay automation for PBF
    event.recipes.blasting("minecraft:nether_brick", "minecraft:netherrack");
});