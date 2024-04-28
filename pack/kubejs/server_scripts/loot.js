LootJS.modifiers((event) => {

    event.addEntityLootModifier("minecraft:enderman")
        .replaceLoot("minecraft:ender_pearl", "gtceu:ender_pearl_dust", true);

    event.addEntityLootModifier("minecraft:blaze")
        .replaceLoot("minecraft:blaze_rod", "gtceu:sulfur_dust", true);

    event.addEntityLootModifier("minecraft:wither_skeleton")
        .removeLoot("minecraft:wither_skeleton_skull");

});
