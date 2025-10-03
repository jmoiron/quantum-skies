
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    // exae2 adds a block-to-circuit cutter; the recipe is cheap
    // and sidesteps the need for the press, so make it a bit more expensive
    event.remove({output: "expatternprovider:circuit_cutter"})

    greg.assembler("ex_circuit_cutter")
        .itemInputs("ae2:calculation_processor_press")
        .itemInputs("ae2:engineering_processor_press")
        .itemInputs("ae2:logic_processor_press")
        .itemInputs("ae2:silicon_press")
        .itemInputs("gtceu:hv_forming_press")
        .itemInputs("gtceu:hv_cutter")
        .itemInputs("ae2:molecular_assembler")
        .inputFluids("gtceu:polytetrafluoroethylene 1296")
        .itemOutputs("expatternprovider:circuit_cutter")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(400);


    // replace iron ingots with stainless steel
    let ironRepl = [
        "expatternprovider:wireless_tool",
        "expatternprovider:ingredient_buffer",
    ]

    ironRepl.forEach((e) => {
        event.replaceInput({output: e}, "minecraft:iron_ingot", "gtceu:stainless_steel_ingot")
    })

    event.replaceInput(
        {output: "expatternprovider:me_packing_tape"},
        "minecraft:paper",
        "gtceu:rubber_plate"
    );

    event.replaceInput(
        {output: "expatternprovider:ex_molecular_assembler"},
        "ae2:fluix_crystal",
        "gtceu:energistic_steel_ingot"
    );

    event.remove({output: "expatternprovider:assembler_matrix_frame"})

    greg.assembler("ex_assembler_matrix_frame")
        .itemInputs("gtceu:clean_machine_casing")
        .itemInputs("4x gtceu:lapis_plate")
        .itemInputs("ae2:quartz_glass")
        .itemOutputs("expatternprovider:assembler_matrix_frame")
        .inputFluids("gtceu:polytetrafluoroethylene 288")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(400);

    event.remove({output: "expatternprovider:assembler_matrix_wall"})

    greg.assembler("ex_assembler_matrix_wall")
        .itemInputs("gtceu:clean_machine_casing")
        .itemInputs("4x gtceu:exquisite_nether_quartz_gem")
        .itemInputs("4x #ae2:smart_dense_cable")
        .itemInputs("ae2:logic_processor")
        .inputFluids("gtceu:polytetrafluoroethylene 288")
        .itemOutputs("expatternprovider:assembler_matrix_wall")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(400);


    event.remove({output: "expatternprovider:assembler_matrix_glass"})

    greg.assembler("ex_assembler_matrix_glass")
        .itemInputs("expatternprovider:assembler_matrix_wall")
        .itemInputs("4x ae2:quartz_glass")
        .inputFluids("gtceu:polytetrafluoroethylene 288")
        .itemOutputs("expatternprovider:assembler_matrix_glass")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(400);

    const cores = [
        ["pattern", "blue", "#expatternprovider:extended_pattern_provider"],
        ["crafter", "purple", "expatternprovider:ex_molecular_assembler"],
        ["speed", "red", "ae2:speed_card"]
    ]

    cores.forEach(([r, color, item]) => {
        event.remove({output: `expatternprovider:assembler_matrix_${r}`});

        greg.assembler(`ex_assembler_matrix_${r}`)
            .itemInputs("expatternprovider:assembler_matrix_wall")
            .itemInputs(`6x ae2:${color}_lumen_paint_ball`)
            .itemInputs(`2x ${item}`)
            .inputFluids("gtceu:polytetrafluoroethylene 288")
            .itemOutputs(`expatternprovider:assembler_matrix_${r}`)
            .EUt(GTValues.VA[GTValues.HV])
            .duration(200);
    });

});