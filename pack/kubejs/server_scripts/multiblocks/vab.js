
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

    greg.vehicle_assembly_building("basic_rocket_motor")
        .itemInputs("4x gtceu:power_thruster")
        .itemInputs("gtceu:stainless_steel_frame")
        .itemInputs("6x gtceu:black_steel_plate")
        .itemInputs("4x gtceu:graphene_foil")
        .inputFluids("gtceu:rp_1_mixed_fuel 8000")
        .itemOutputs("gcyr:basic_rocket_motor")
        .EUt(480)
        .duration(600);
    
    greg.vehicle_assembly_building("advanced_rocket_motor")
        .itemInputs("4x gtceu:advanced_power_thruster")
        .itemInputs("gtceu:titanium_frame")
        .itemInputs("6x gcyr:kapton_k_plate")
        .itemInputs("4x gcyr:para_aramid_foil")
        .inputFluids("gtceu:methylhydrazine_nitrate_rocket_fuel 16000")
        .itemOutputs("gcyr:advanced_rocket_motor")
        .EUt(1920)
        .duration(1200);


    greg.vehicle_assembly_building("basic_fuel_tank")
        .itemInputs("gtceu:stainless_steel_fluid_cell")
        .itemInputs("4x gtceu:carbon_fiber_plate")
        .itemInputs("4x gtceu:graphene_foil")
        .itemInputs("3x gtceu:magnalium_plate")
        .inputFluids("gtceu:rp_1_mixed_fuel 8000")
        .itemOutputs("gcyr:basic_fuel_tank")
        .EUt(480)
        .duration(600);
    
    greg.vehicle_assembly_building("advanced_fuel_tank")
        .itemInputs("gtceu:titanium_fluid_cell")
        .itemInputs("4x gtceu:carbon_fiber_plate")
        .itemInputs("4x gcyr:kapton_k_foil")
        .itemInputs("3x gtceu:magnalium_plate")
        .inputFluids("gtceu:methylhydrazine_nitrate_rocket_fuel 16000")
        .itemOutputs("gcyr:advanced_fuel_tank")
        .EUt(1920)
        .duration(1200);

    greg.vehicle_assembly_building("rocket_seat")
        .itemInputs("minecraft:light_gray_carpet")
        .itemInputs("4x gtceu:rubber_plate")
        .itemInputs("3x gtceu:aluminium_plate")
        .inputFluids("gtceu:epoxy 1000")
        .itemOutputs("gcyr:seat")
        .EUt(480)
        .duration(600);

    /*
    greg.industrial_sieve("flint_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:crushed_magnetite_ore", 3000, 1000)
        .chancedOutput("gtceu:crushed_gold_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_garnierite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_silver_ore", 2000, 700)
        .chancedOutput("gtceu:crushed_lead_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_stibnite_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_sphalerite_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_certus_quartz_ore", 1500, 1000)
        .chancedOutput("ae2:sky_dust", 1000, 500)
        .notConsumable("exnihilosequentia:flint_mesh")
        .EUt(480)
        .duration(300)

    greg.industrial_sieve("iron_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:crushed_ruby_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_redstone_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_emerald_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_diamond_ore", 1500, 700)
        .chancedOutput("gtceu:crushed_beryllium_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_apatite_ore", 1500, 1000)
        .notConsumable("exnihilosequentia:iron_mesh")
        .EUt(480)
        .duration(300)
    
    greg.industrial_sieve("aluminium_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:crushed_bauxite_ore", 2000, 1000)
        //.chancedOutput("gcyr:crushed_fluorite_ore", 2000, 1000)
        .notConsumable("kubejs:aluminium_mesh")
        .EUt(480)
        .duration(300)

    // titanium mesh is an EV recipe
    greg.industrial_sieve("titanium_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:plutonium_dust", 1500, 1000)
        .chancedOutput("gtceu:crushed_cooperite_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_monazite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_tungstate_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_scheelite_ore", 2500, 1000)
        .notConsumable("kubejs:titanium_mesh")
        .EUt(1920)
        .duration(300)
    */

});