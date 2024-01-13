
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("crucible")
        .category("crucible")
        .setEUIO("in")
        .setMaxIOSize(2, 1, 0, 1)
        .setSound(GTSoundEntries.BOILER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {
    let blocks = Predicates.blocks;
    let abilities = Predicates.abilities;
    let controller = Predicates.controller;

    event.create("basic_crucible", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("crucible")
        .tier(GTValues.LV)
        .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.MACHINE_CASING_ULV)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("HHH", "HHH", "HHH")
                .aisle("HHH", "HCH", "HGH")
                .aisle("HHH", "HXH", "HHH")
                .where("X", controller(blocks(definition.get())))
                .where("H", Predicates.blocks(GTBlocks.MACHINE_CASING_ULV.get())
                    .or(abilities(PartAbility.EXPORT_ITEMS).setMaxLayerLimited(1))
                    .or(abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(1))
                    .or(abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(2))
                    .or(Predicates.ability(PartAbility.INPUT_ENERGY, [GTValues.LV])))
                .where("C", Predicates.blocks("minecraft:lava_cauldron"))
                .where("G", Predicates.blocks("minecraft:glass"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/voltage/ulv/side", 
            "gtceu:block/multiblock/blast_furnace", 
            false,
        );
    
        /*
    event.create("industrial_crucible", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("crucible")
        .appearanceBlock(GTBlocks.MACHINE_CASING_HV)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("")
        )
        */
});
