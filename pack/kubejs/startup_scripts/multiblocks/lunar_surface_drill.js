GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    // setMaxIOSize: in, out, fluid-in, fluid-out
    event.create("lunar_surface_drill")
        .category("lunar_surface_drill")
        .setEUIO("in")
        .setMaxIOSize(2, 6, 1, 0)
        .setSound(GTSoundEntries.MINER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities;

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    let e = "       ";
    let s1 = [
        "   F   ",
        "  FFF  ",
        "   F   "
    ];
    let s2 = "   F   ";

    event.create("lunar_surface_drill", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("lunar_surface_drill")
        .tooltips(Component.translatable("qs.lunar_surface_drill.tooltip"))
        .tier(GTValues.EV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle("  F F  ", "  F F  ", "       ", "       ", " RRRRR ", e, e, e, e, e, e, e, e)
                .aisle("       ", "       ", "  BBB  ", "       ", "RTBBBTR", e, e, e, e, e, e, e, e)
                .aisle("       ", "       ", " BSSSB ", "  F F  ", "RBF FBR", "  F F  ", "  F F  ", "   T   ", s1[0], s1[0], e, e, e)
                .aisle("F  P  F", "F  P  F", " BSPSB ", "   P   ", "RB P BR", "   P   ", "   G   ", "  TTT  ", s1[1], s1[1], s2, s2, s2)
                .aisle("       ", "       ", " BSSSB ", "  F F  ", "RBF FBR", "  F F  ", "  F F  ", "   T   ", s1[2], s1[2], e, e, e)
                .aisle("       ", "       ", "  BBB  ", "       ", "RTBBBTR", e, e, e, e, e, e, e, e)
                .aisle("  F F  ", "  F F  ", "       ", "       ", " RRXRR ", e, e, e, e, e, e, e, e)
                .where("X", Predicates.controller(Predicates.blocks(definition.get())))
                .where("F", Predicates.blocks("gtceu:stainless_steel_frame"))
                .where("P", Predicates.blocks("gtceu:steel_pipe_casing"))
                .where("B", Predicates.blocks("gtceu:titanium_firebox_casing"))
                .where("S", Predicates.blocks("gtceu:solid_machine_casing"))
                .where("T", Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get()))
                .where("G", Predicates.blocks("gtceu:titanium_gearbox"))
                .where("R", Predicates.blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 1, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 0, 0))
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