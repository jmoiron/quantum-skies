
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("bonsai")
        .category("bonsai")
        .setEUIO("in")
        .setMaxIOSize(2, 1, 1, 0);
    // this thing shouldn't make noise

    event.create("greenhouse")
        .category("greenhouse")
        .setEUIO("in")
        .setMaxIOSize(3, 4, 1, 0)
        .setSlotOverlay(false, false, GuiTextures.BOX_OVERLAY)
        .setProgressBar(GuiTextures.PROGRESS_BAR_BATH, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.COOLING);
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
        // TODO: sided?
        .sidedWorkableCasingModel(
            "gtceu:block/casings/pump_deck",
            "gtceu:block/multiblock/bedrock_ore_miner"
        )

    // this greenhouse is from GCP
    // https://github.com/GregTechCEu/GregTech-Modern-Community-Pack/blob/main/kubejs/startup_scripts/machinery/greenhouse.js
    // GCPm is distributed under the LGPL v2.1 license, same as quantum skies

    event.create("greenhouse", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("greenhouse")
        .appearanceBlock(GTBlocks.MACHINE_CASING_ULV)
        .recipeModifier(
            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK)
        )
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle(" BBB ", " BBB ", " BBB ", " BBB ")
                .aisle("BBBBB", "BDDDB", "B###B", "BGGGB")
                .aisle("BBBBB", "BDDDB", "B###B", "BGGGB")
                .aisle("BBBBB", "BDDDB", "B###B", "BGGGB")
                .aisle(" BBB ", " BEB ", " BBB ", " BBB ")
                .where("E", Predicates.controller(Predicates.blocks(definition.get())))
                .where("D", Predicates.blocks("minecraft:dirt"))
                .where("G", Predicates.blocks("gtceu:tempered_glass"))
                .where(
                "B",
                Predicates.blocks("gtceu:ulv_machine_casing")
                    .setMinGlobalLimited(5)
                    .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                )
                .where("#", Predicates.air())
                .where(" ", Predicates.any())
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/voltage/ulv/side",
            "gtceu:block/multiblock/implosion_compressor"
        );

});
