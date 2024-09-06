ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    event.replaceInput({mod: "shrink"},
        "minecraft:ender_pearl",
        "ae2:ender_dust",
    );

    event.replaceInput({mod: "shrink"},
        "minecraft:iron_ingot",
        "gtceu:iron_plate",
    );

});