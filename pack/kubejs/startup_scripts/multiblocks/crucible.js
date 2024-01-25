
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("crucible")
        .category("crucible")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 0, 1)
        .setSound(GTSoundEntries.BOILER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let setCount = (pred, limit, preview) => { return pred.setMaxGlobalLimited(limit).setPreviewCount(preview) }
    let abilities = Predicates.abilities

    event.create("basic_crucible", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("crucible")
        .tier(GTValues.LV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.MACHINE_CASING_ULV)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("HHH", "HHH", "HHH")
                .aisle("HHH", "HCH", "HGH")
                .aisle("HHH", "HXH", "HHH")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("H", Predicates.blocks(GTBlocks.MACHINE_CASING_ULV.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 3, 1))
                    .or(setCount(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.LV), 1, 1)))
                .where("C", Predicates.blocks("minecraft:lava_cauldron"))
                .where("G", Predicates.blocks("minecraft:glass"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/voltage/ulv/side", 
            "gtceu:block/multiblock/cracking_unit", 
            false,
        );

    event.create("industrial_crucible", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("crucible")
        .tier(GTValues.HV)
        .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_INVAR_HEATPROOF)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("HHH", "CCC", "CCC", "HHH")
                .aisle("HHH", "CRC", "CNC", "HGH")
                .aisle("HXH", "CCC", "CCC", "HHH")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("H", Predicates.blocks(GTBlocks.CASING_INVAR_HEATPROOF.get())
                    .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(1).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(1).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(3).setPreviewCount(1))
                    .or(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.HV, GTValues.EV, GTValues.IV).setMaxGlobalLimited(1).setPreviewCount(1)))
                .where("R", Predicates.blocks("gtceu:stainless_steel_gearbox"))
                .where("C", Predicates.blocks("gtceu:kanthal_coil_block"))
                .where("N", Predicates.blocks("minecraft:lava_cauldron"))
                .where("G", Predicates.blocks("gtceu:tempered_glass"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_heatproof",
            "gtceu:block/multiblock/cracking_unit",
            false
        )
});
