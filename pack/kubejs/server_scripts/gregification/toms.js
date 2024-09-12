ServerEvents.recipes(event => {
    event.remove({output: "toms_storage:ts.adv_wireless_terminal"});

    event.recipes.gtceu.assembler("toms_storage_advanced_wireless_terminal")
        .itemInputs(
            "toms_storage:ts.wireless_terminal",
            "2x #gtceu:circuits/lv",
            "2x gtceu:steel_plate",
            "gtceu:lv_sensor"
        )
        .inputFluids("gtceu:glue 100")
        .itemOutputs("toms_storage:ts.adv_wireless_terminal")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(400);

});