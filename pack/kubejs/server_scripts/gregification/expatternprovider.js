
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

    // TODO: gregify assembler matrix

});