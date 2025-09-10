
ServerEvents.recipes(event => {

    // controller block recipe for the vab
    event.shaped(Item.of("gtceu:vehicle_assembly_building"),
        ["CGC", "FXF", "CLC"],
        {
            C: "#gtceu:circuits/hv",
            X: "gtceu:hv_assembler",
            F: "gtceu:stainless_steel_frame",
            G: "gtceu:steel_gearbox",
            L: "gtceu:filter_casing",
        }
    );

    ["gcyr:basic_rocket_motor", "gcyr:basic_fuel_tank", "gcyr:advanced_rocket_motor", "gcyr:advanced_fuel_tank"].forEach(item => {
        event.remove({output: item});
    });

    let greg = event.recipes.gtceu;

    event.remove({id: "gcyr:assembler/elite_rocket_motor"});
    event.remove({id: "gcyr:assembler/elite_fuel_tank"});

    greg.vehicle_assembly_building("basic_rocket_motor")
        .itemInputs("4x gtceu:power_thruster")
        .itemInputs("gtceu:stainless_steel_frame")
        .itemInputs("6x gtceu:black_steel_plate")
        .itemInputs("4x gtceu:graphene_foil")
        .inputFluids("gtceu:rp_1_mixed_fuel 8000")
        .itemOutputs("gcyr:basic_rocket_motor")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(600);

    greg.vehicle_assembly_building("advanced_rocket_motor")
        .itemInputs("4x gtceu:advanced_power_thruster")
        .itemInputs("gtceu:titanium_frame")
        .itemInputs("6x gcyr:kapton_k_plate")
        .itemInputs("4x gcyr:para_aramid_foil")
        .inputFluids("gtceu:dense_hydrazine_mixed_fuel 8000")
        .itemOutputs("gcyr:advanced_rocket_motor")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(1200);

    greg.vehicle_assembly_building("elite_rocket_motor")
        .itemInputs("4x gtceu:gravitation_engine_unit")
        .itemInputs("6x gcyr:kapton_k_plate")
        .itemInputs("gtceu:hsss_frame")
        .inputFluids("gtceu:methylhydrazine_nitrate_rocket_fuel 16000")
        .itemOutputs("gcyr:elite_rocket_motor")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200);


    greg.vehicle_assembly_building("basic_fuel_tank")
        .itemInputs("gtceu:stainless_steel_fluid_cell")
        .itemInputs("4x gtceu:carbon_fiber_plate")
        .itemInputs("4x gtceu:graphene_foil")
        .itemInputs("3x gtceu:magnalium_plate")
        .inputFluids("gtceu:rp_1_mixed_fuel 8000")
        .itemOutputs("gcyr:basic_fuel_tank")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(600);

    greg.vehicle_assembly_building("advanced_fuel_tank")
        .itemInputs("gtceu:titanium_fluid_cell")
        .itemInputs("4x gtceu:carbon_fiber_plate")
        .itemInputs("4x gcyr:kapton_k_foil")
        .itemInputs("3x gtceu:magnalium_plate")
        .inputFluids("gtceu:dense_hydrazine_mixed_fuel 8000")
        .itemOutputs("gcyr:advanced_fuel_tank")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(1200);

    greg.vehicle_assembly_building("elite_fuel_tank")
        .itemInputs("2x gtceu:luv_quantum_tank")
        .itemInputs("6x gcyr:kapton_k_plate")
        .itemInputs("gtceu:hsss_frame")
        .inputFluids("gtceu:methylhydrazine_nitrate_rocket_fuel 16000")
        .itemOutputs("gcyr:elite_fuel_tank")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(1200);

    greg.vehicle_assembly_building("rocket_seat")
        .itemInputs("minecraft:light_gray_carpet")
        .itemInputs("4x gtceu:rubber_plate")
        .itemInputs("3x gtceu:aluminium_plate")
        .inputFluids("gtceu:epoxy 1000")
        .itemOutputs("gcyr:seat")
        .EUt(480)
        .duration(600);

        greg.vehicle_assembly_building("rocket_seat_glue")
        .itemInputs("minecraft:light_gray_carpet")
        .itemInputs("4x gtceu:rubber_plate")
        .itemInputs("3x gtceu:aluminium_plate")
        .inputFluids("gtceu:glue 8000")
        .itemOutputs("gcyr:seat")
        .EUt(480)
        .duration(1200);
});