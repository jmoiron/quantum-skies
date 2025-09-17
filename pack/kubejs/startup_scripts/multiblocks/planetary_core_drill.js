/* planetary core drill and mudpit support multiblocks */

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    // setMaxIOSize: in, out, fluid-in, fluid-out
    event.create("mudpit")
        .category("mudpit")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 5, 1)
        .setSound(GTSoundEntries.CHEMICAL);

    event.create("planetary_core_drill")
        .category("planetary_core_drill")
        .setEUIO("in")
        .setMaxIOSize(3, 12, 2, 1)
        .setSound(GTSoundEntries.MINER);
})

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities;
    let blocks = Predicates.blocks;

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

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
                .where("X", Predicates.controller(blocks(definition.get())))
                .where("C", blocks(GTBlocks.CASING_TITANIUM_PIPE.get()))
                .where("W", blocks("gtceu:watertight_casing"))
                .where("T", blocks(GTBlocks.CASING_TITANIUM_STABLE.get())
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 5, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 3, 1))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .where("P", blocks("gtceu:titanium_large_fluid_pipe"))
                .where("D", blocks("gtceu:titanium_drum"))
                .where("M", blocks("minecraft:mud"))
                .where("B", blocks("minecraft:iron_bars"))
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/solid/machine_casing_stable_titanium",
            "gtceu:block/multiblock/distillation_tower"
        );

    event.create("planetary_core_drill", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("planetary_core_drill")
        .tier(GTValues.EV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_STABLE)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle(["     ","     ","     ","     "," NNN "," NGN "," NNN ","     ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     ","     "," NNN "," G G "," NGN ","     ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     ","  T  "," NNN ","TNNNT"," NNN ","  T  ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     ","  T  ","     ","T I T","     ","  T  ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["F   F","F   F","     ","TTTTT","T   T","T S T","TBBBT","TTTTT","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     "," MAM ","TVVVT","     ","  S  ","BVVVB","TRRRT"," F F "," F F ","  T  ","  F  ","  F  ","     ","     ","     "])
                .aisle(["  E  ","  P  "," APA ","TVPVT","  P  ","  P  ","BVPVB","TRPRT","  P  ","  G  "," TTT "," FFF "," FFF ","  F  ","  F  ","  F  "])
                .aisle(["     ","     "," MAM ","TVVVT","     ","     ","BVVVB","TRRRT"," F F "," F F ","  T  ","  F  ","  F  ","     ","     ","     "])
                .aisle(["F   F","F   F","     ","TTTTT","T   T","T   T","T   T","TTTTT","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     "," TTT ","Q   Q","     ","     ","QTTTQ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     "," TTT ","Q   Q","     ","     ","QTFTQ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     "," TTT ","Q   Q","     ","     ","QTTTQ","     ","     ","     ","     ","     ","     ","     ","     "])
                .aisle(["     ","     ","     ","     ","SQXQS","S   S","S   S","SQQQS","     ","     ","     ","     ","     ","     ","     ","     "])
                .where("X", Predicates.controller(blocks(definition.get())))
                .where("F", blocks("gtceu:stainless_steel_frame"))
                .where("E", blocks("gtceu:long_distance_fluid_pipeline_endpoint"))
                .where("P", blocks("gtceu:steel_pipe_casing"))
                .where("A", blocks("gtceu:frostproof_machine_casing"))
                .where("M", blocks("gtceu:high_temperature_smelting_casing"))
                .where("T", blocks("gtceu:stable_machine_casing"))
                .where("V", blocks("gtceu:vibration_safe_casing"))
                .where("S", blocks("gtceu:stress_proof_casing"))
                .where("N", blocks("gtceu:nonconducting_casing"))
                .where("I", blocks("gtceu:long_distance_item_pipeline_endpoint"))
                .where("B", blocks("gtceu:titanium_firebox_casing"))
                .where("R", blocks("gtceu:titanium_turbine_casing"))
                .where("G", blocks("gtceu:titanium_gearbox"))
                .where("Q", blocks("gtceu:stress_proof_casing")
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.EXPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/gcym/stress_proof_casing",
            "gtceu:block/multiblock/bedrock_ore_miner"
        );
});