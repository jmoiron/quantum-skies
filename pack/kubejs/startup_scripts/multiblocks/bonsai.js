
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("bonsai")
        .category("bonsai")
        .setEUIO("in")
        .setMaxIOSize(2, 1, 1, 0);
    // this thing shouldn't make noise
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    event.create("primitive_woodcutter", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("bonsai")
        .tier(GTValues.LV)
        .appearanceBlock(GTBlocks.CASING_PUMP_DECK)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("WWW", "R R", "R R")
                .aisle("WDW", " F ", " L ")
                .aisle("WXW", "RCR", "R R")
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("D", Predicates.blocks("minecraft:dirt"))
                .where("F", Predicates.blocks("minecraft:oak_fence"))
                .where("L", Predicates.blocks("minecraft:oak_leaves"))
                .where("R", Predicates.blocks("gtceu:treated_wood_frame"))
                .where("C", Predicates.blocks("minecraft:stonecutter"))
                .where("W", Predicates.blocks(GTBlocks.CASING_PUMP_DECK.get())
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 1, 1))
                    .or(setCount(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.LV), 1, 1)))
                .where(" ", Predicates.any())
                .build()
        )
        .sidedWorkableCasingRenderer(
            "block/casings/pump_deck",
            "gtceu:block/multiblock/bedrock_ore_miner",
            false
        )
        /*
        .workableCasingRenderer(
            "gtceu:block/casings/pump_deck/top",
            "gtceu:block/multiblock/bedrock_ore_miner",
            false
        )
        */

    /* TODO: add a greenhouse that can grow other crops */

});
