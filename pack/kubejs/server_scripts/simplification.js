priority: 0

ServerEvents.recipes(event => {
    // these recipes are aimed at smoothing out the early game and
    // reducing tedium pre-steam era

    event.shaped("16x minecraft:stick", ["A", "A"], {A: Ingredient.of("#minecraft:logs")});
    event.shapeless("4x minecraft:clay_ball", ["minecraft:clay"]);

    event.blasting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot");

});