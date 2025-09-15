
GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("vehicle_assembly_building")
        .category("vehicle_assembly_building")
        .setEUIO("in")
        .setMaxIOSize(9, 1, 3, 0)
        .setSound(GTSoundEntries.ASSEMBLER);
});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    event.create("vehicle_assembly_building", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("vehicle_assembly_building")
        // TODO 7.x tooltips
        //.tooltips(Component.translatable("qs.vab.tooltip"))
        .tier(GTValues.HV)
        // .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK))
        .appearanceBlock(GTBlocks.PLASTCRETE)
        .pattern(
            definition => FactoryBlockPattern.start()
                .aisle(" S   S ", " S   S ", " S   S ", " S   S ", " S   S ", " S   S ", " SSSSS ")
                .aisle("PPMMMPP", "PPVVVPP", "PPVVVPP", "PPVVVPP", "PPPPPPP", "FFFFFFF", " S   S ")
                .aisle("MPPPPPM", "V     V", "V     V", "V     V", "P     P", "FPPPPPF", " S   S ")
                .aisle("MPPPPPM", "V     V", "V     V", "V     V", "P     P", "FPPPPPF", " S   S ")
                .aisle("MPPPPPM", "V     V", "V     V", "V     V", "P     P", "FPPPPPF", " S   S ")
                .aisle("PPMQMPP", "PPPDPPP", "PPP PPP", "PPPPPPP", "PPPPPPP", "FFFFFFF", " S   S ")
                .aisle(" S   S ", " S   S ", " S   S ", " S   S ", " SUUUS ", " S   S ", " SSSSS ")
                .where("S", Predicates.blocks("gtceu:steel_machine_casing", "gtceu:solid_machine_casing"))
                .where("U", Predicates.blocks("gtceu:steel_firebox_casing"))
                .where("V", Predicates.blocks("gtceu:stainless_steel_frame"))
                .where("P", Predicates.blocks("gtceu:plascrete"))
                .where("D", Predicates.blocks("gcyr:airlock_door"))
                .where("F", Predicates.blocks(GTBlocks.FILTER_CASING.get()))
                .where("Q", Predicates.controller(Predicates.blocks(definition.get())))
                .where("M", Predicates.blocks("gtceu:plascrete")
                    .or(setCount(abilities(PartAbility.EXPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 1, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 3, 1))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .where(" ", Predicates.any())
                .build()
        )
        .workableCasingModel(
            "gtceu:block/casings/cleanroom/plascrete_ctm",
            "gtceu:block/multiblock/cracking_unit"
        );
});
