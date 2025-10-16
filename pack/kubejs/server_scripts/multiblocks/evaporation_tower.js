
ServerEvents.recipes(event => {

    event.shaped(Item.of("gtceu:evaporation_tower_qs"),
        ["CWC", "PXP", "CWC"],
        {
            C: "#gtceu:circuits/hv",
            X: "gtceu:hv_machine_hull",
            W: "gtceu:kanthal_double_wire",
            P: "gtceu:hv_electric_pump",
        }
    );

    event.recipes.gtceu.evaporation_tower_qs("evaporate_salt_water_raw_brine")
        .inputFluids("gtceu:salt_water 20000")
        .outputFluids("gtceu:raw_brine 1000")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(50*20);

    event.recipes.gtceu.evaporation_tower_qs("evaporate_iodized_brine")
        .inputFluids("gtceu:salt_water 1000")
        .itemInputs("gtceu:saltpeter_dust")
        .itemOutputs("gtceu:potassium_dust")
        .outputFluids("gtceu:iodized_brine 1000")
        .circuit(2)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(36*20);

});