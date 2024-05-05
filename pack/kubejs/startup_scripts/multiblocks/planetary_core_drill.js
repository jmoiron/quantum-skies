/* planetary core drill and mudpit support multiblocks */

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    // setMaxIOSize: in, out, fluid-in, fluid-out

    event.create("mudpit")
        .category("mudpit")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 0, 1)
        .setSound(GTSoundEntries.CHEMICAL);

    event.create("planetary_core_drill")
        .category("planetary_core_drill")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 0, 1)
        .setSound(GTSoundEntries.MINER);
})

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities;

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    /* planetary core drill
     *
     * Automates the collection of materials from a specific dimension/planet.
     */
    event.create("mudpit", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("mudpit")
        .tier(GTValues.EV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("         ", " TTTTTTT ", "BBBBBBBBB")
                .aisle(" CWWWWWC ", "TMMMMMMMT", "B   B   B")
                .aisle(" CWWWWWC ", "TMMMMMMMT", "B   B  PD")
                .aisle(" CWWWWWC ", "TMMMMMMMT", "B   B   B")
                .aisle("         ", " TTTXTTT ", "BBBBBBBBB")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("C", Predicates.blocks(GTBlocks.CASING_TITANIUM_PIPE.get()))
                .where("W", Predicates.blocks("gtceu:watertight_casing"))
                .where("T", Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 2, 1))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .where("P", Predicates.blocks("gtceu:titanium_large_fluid_pipe"))
                .where("D", Predicates.blocks("gtceu:titanium_drum"))
                .where("M", Predicates.blocks("minecraft:mud"))
                .where("B", Predicates.blocks("minecraft:iron_bars"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_stable_titanium",
            "gtceu:block/multiblock/distillation_tower",
            false,
        );

    let e = "       ";

    event.create("planetary_core_drill", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("planetary_core_drill")
        .tier(GTValues.EV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("       ", "       ", "  TTT  ", e, e, e, e, e, e, e)
                .aisle("  F F  ", "  F F  ", " TTTTT ", "   R   ", e, e, e, e, e, e)
                .aisle(" F   F ", " F   F ", "TTTTTTT", "  RTR  ", "   F   ", "   F   ", "   F   ", e, e, e)
                .aisle("       ", "       ", "TTTCTTT", " RTCTR ", "  FCF  ", "  FCF  ", "  FCF  ", "   F   ", "   F   ", "   F   ")
                .aisle(" F   F ", " F   F ", "TTTTTTT", "  RTR  ", "   F   ", "   F   ", "   F   ", e, e, e)
                .aisle("  F F  ", "  F F  ", " TTTTT ", "   X   ", e, e, e, e, e, e)
                .aisle("       ", "       ", "  TTT  ", e, e, e, e, e, e, e)
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("T", Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get()))
                .where("C", Predicates.blocks(GTBlocks.CASING_TITANIUM_PIPE.get()))
                .where("F", Predicates.blocks("gtceu:titanium_frame"))
                .where("R", Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_stable_titanium",
            "gtceu:block/multiblock/bedrock_ore_miner",
            false,
        );

});