
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("industrial_sieve")
        .category("industrial_sieve")
        .setEUIO("in")
        .setMaxIOSize(1, 1, 2, 1)
        .setSound(GTSoundEntries.BOILER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities

    function setCount(pred, limit, preview) { 
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    event.create("industrial_sieve", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("industrial_sieve")
        .tier(GTValues.HV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("C   C", "C   C", "C   C", "CPPPC", "C M C")
                .aisle(" MMM ", "     ", "  X  ", "PXXXP", " FFF ")
                .aisle(" M M ", "  X  ", " X X ", "PX XP", "MFGFM")
                .aisle(" MQM ", "     ", "  X  ", "PXXXP", " FFF ")
                .aisle("C   C", "C   C", "C   C", "CPPPC", "C M C")
                .where("C", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
                .where("P", Predicates.blocks(GTBlocks.CASING_STEEL_PIPE.get()))
                .where("F", Predicates.blocks(GTBlocks.FILTER_CASING.get()))
                .where("G", Predicates.blocks(GTBlocks.CASING_STEEL_GEARBOX.get()))
                .where("X", Predicates.blocks("gtceu:stainless_steel_frame"))
                .where("Q", Predicates.controller(Predicates.blocks(definition.get())))
                .where("M", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 2, 2))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 1, 1)))
                .where(" ", Predicates.any())
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel", 
            "gtceu:block/multiblock/cracking_unit", 
            false,
        );
});
