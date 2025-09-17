
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("evaporation_tower_qs")
        .category("evaporation_tower_qs")
        .setEUIO("in")
        .setMaxIOSize(2, 1, 1, 1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BATH);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {
    let abilities = Predicates.abilities
    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    event.create("evaporation_tower_qs", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("evaporation_tower_qs")
        .tier(GTValues.HV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_STAINLESS_CLEAN)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("FPF", "OOO", "OOO", "OOO", " C ")
                .aisle("PPP", "O O", "O O", "O O", "CCC")
                .aisle("FPF", "OXO", "OOO", "OOO", " C ")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("F", Predicates.blocks("gtceu:aluminium_frame"))
                .where("P", Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 2, 1))
                    .or(setCount(Predicates.ability(PartAbility.INPUT_ENERGY), 1, 1)))
                .where("O", Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get())
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 1, 1)))
                .where("C", Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()))
                .where(" ", Predicates.any())
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_clean_stainless_steel",
            "gtceu:block/multiblock/distillation_tower"
        );
});