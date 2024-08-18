/*
multiblock/singleblock machines for ex nihilo-style interactions
at higher tiers
*/

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {

    event.create("cauldron")
        .category("cauldron")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 1, 1)
        .setSound(GTSoundEntries.BATH);

    event.create("crucible")
        .category("crucible")
        .setEUIO("in")
        .setMaxIOSize(3, 1, 0, 1)
        .setSound(GTSoundEntries.BOILER);

    event.create("industrial_sieve")
        .category("industrial_sieve")
        .setEUIO("in")
        .setMaxIOSize(2, 16, 3, 1)
        .setSound(GTSoundEntries.MIXER);

});

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let abilities = Predicates.abilities

    function setCount(pred, limit, preview) {
        return pred.setMaxGlobalLimited(limit).setPreviewCount(preview)
    }

    /* large cauldron
     *
     * Automates witchwater bucket "precipitate" recipes like sand->soul sand.
     */
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
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 2, 1))
                    .or(setCount(abilities(PartAbility.IMPORT_ITEMS), 3, 1))
                    .or(setCount(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.LV, GTValues.MV, GTValues.HV), 1, 1)))
                .where("C", Predicates.blocks("minecraft:water_cauldron"))
                .where("M", Predicates.blocks("minecraft:mycelium"))
                .where("G", Predicates.blocks("minecraft:glass"))
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/multiblock/cracking_unit",
            false,
        );

    /* basic crucible
     *
     * GT version of the melting crucible.  Makes lava from stone types, but also
     * directly produces lava precipitate recipes like redstone+lava->netherrack and
     * glowstone+lava->end stone.
     *
     * Only accepts LV energy hatches.
     */
    event.create("basic_crucible", "multiblock")
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType("crucible")
        .tier(GTValues.LV)
        .recipeModifier(GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK))
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

    /* industrial crucible
     *
     * More powerful version of the basic crusible. Accepts hatches up to IV and does
     * perfect overclocking of recipes.
     */
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
                    .or(Predicates.ability(PartAbility.INPUT_ENERGY, GTValues.HV, GTValues.EV, GTValues.IV).setMaxGlobalLimited(2).setPreviewCount(1)))
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
        );

    /* industrial sieve
     *
     * Multiblock sieve capable of "producing" higher tier materials based
     * on dusts found or processed from space.
     */
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
                    .or(setCount(abilities(PartAbility.IMPORT_FLUIDS), 3, 2))
                    .or(setCount(abilities(PartAbility.INPUT_ENERGY), 2, 1)))
                .where(" ", Predicates.any())
                .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/multiblock/cracking_unit",
            false,
        );
});
