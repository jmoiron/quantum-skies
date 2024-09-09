ServerEvents.recipes(event => {
    event.replaceInput({mod: "toolbelt"},
        "minecraft:iron_ingot",
        "gtceu:iron_plate"
    );

    event.replaceInput({mod: "toolbelt"},
        "minecraft:gold_ingot",
        "gtceu:gold_plate"
    )
});