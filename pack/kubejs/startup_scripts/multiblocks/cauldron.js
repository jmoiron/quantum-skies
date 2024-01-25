
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("cauldron")
        .category("cauldron")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 0, 1)
        .setSound(GTSoundEntries.BOILER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities

    function setCount(pred, limit, preview) { 
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    event.create("large_cauldron", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("cauldron")
        .tier(GTValues.LV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("HHH", "HHH", "HHH")
                .aisle("HMH", "HCH", "HGH")
                .aisle("HHH", "HXH", "HHH")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("H", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 3, 1))
                    .or(setCount(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.LV, GTValues.MV, GTValues.HV), 1, 1)))
                .where("C", Predicates.blocks("minecraft:water_cauldron"))
                .where("M", Predicates.blocks("minecraft:mycelium"))
                .where("G", Predicates.blocks("minecraft:glass"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/voltage/ulv/side", 
            "gtceu:block/multiblock/cracking_unit", 
            false,
        );
});
