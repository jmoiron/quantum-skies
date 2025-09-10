ServerEvents.recipes(event => {
  const greg = event.recipes.gtceu;

  // Ionian Air collection and separation
  greg.gas_collector("collect_ionian_air")
    .dimension("gcyr:io")
    .outputFluids("gtceu:ionian_air 10000")
    .circuit(6)
    .EUt(64)
    .duration(200);

  greg.vacuum_freezer("freeze_ionian_air")
    .inputFluids("gtceu:ionian_air 4000")
    .outputFluids("gtceu:liquid_ionian_air 4000")
    .EUt(1920)
    .duration(80);

  greg.distillation_tower("distill_liquid_ionian_air")
    .inputFluids("gtceu:liquid_ionian_air 100000")
    .outputFluids("gtceu:sulfur_dioxide 80000")
    .outputFluids("gtceu:oxygen 15000")
    .outputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .chancedOutput("gtceu:sulfur_dust", 1500, 300)
    .EUt(1920)
    .duration(2000);

    // Quench Io sulfuric lava to a metastable slurry for further separation
  greg.chemical_reactor("quench_io_sulfuric_lava")
    .inputFluids("gtceu:io_sulfuric_lava 1000")
    .inputFluids("gtceu:distilled_water 1000")
    .outputFluids("gtceu:quenched_ionian_lava 1000")
    .EUt(480)
    .duration(100);

  greg.centrifuge("io_sulfuric_lava_decomposition")
    .inputFluids("gtceu:io_sulfuric_lava 100")
    .outputFluids("minecraft:lava 50")
    .outputFluids("gtceu:sulfuric_nickel_solution 20")
    .outputFluids("gtceu:diluted_sulfuric_acid 30")
    .chancedOutput("1x gtceu:platinum_dust", 500, 500)
    .chancedOutput("3x gtceu:olivine_dust", 1500, 500)
    .EUt(GTValues.VHA[GTValues.HV])
    .duration(1.5*20);

  // Separate quenched slurry into useful byproducts
  greg.centrifuge("quenched_ionian_lava_separation")
    .inputFluids("gtceu:quenched_ionian_lava 100")
    .outputFluids("minecraft:lava 50")
    .outputFluids("gtceu:sulfuric_nickel_solution 20")
    .outputFluids("gtceu:diluted_sulfuric_acid 30")
    .chancedOutput("1x gtceu:platinum_dust", 2500, 500)
    .chancedOutput("1x gtceu:oleum_substrate_dust", 2500, 300)
    .EUt(GTValues.VHA[GTValues.HV])
    .duration(30);

  // Oxidize ionized SO2 to SO3 (use GTCEu sulfur_trioxide)
  greg.chemical_reactor("oxidize_ionized_so2")
    .inputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .inputFluids("gtceu:oxygen 1000")
    .outputFluids("gtceu:sulfur_trioxide 1000")
    .EUt(480)
    .duration(200);

  // Oxidize IO-SO2i -> SO3 already above, then make oleum (SO3 in H2SO4)
  greg.chemical_reactor("synthesize_oleum")
    .itemInputs("1x gtceu:oleum_substrate_dust")
    .inputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .inputFluids("gtceu:sulfuric_acid 1000")
    .outputFluids("gtceu:oleum 1500")
    .EUt(720)
    .duration(160);

  // Europa air collection and separation
  greg.gas_collector("collect_europan_air")
    .dimension("gcyr:europa")
    .outputFluids("gtceu:europan_air 10000")
    .circuit(7)
    .EUt(64)
    .duration(200);

  greg.centrifuge("separate_europan_air")
    .inputFluids("gtceu:europan_air 10000")
    .outputFluids("gtceu:oxygen 7000")
    .outputFluids("gtceu:deuterium 2500")
    .EUt(120)
    .duration(1600);

  greg.vacuum_freezer("freeze_europan_air")
    .inputFluids("gtceu:europan_air 4000")
    .outputFluids("gtceu:liquid_europan_air 4000")
    .EUt(1920)
    .duration(80);

  greg.distillation_tower("distill_liquid_europan_air")
    .inputFluids("gtceu:liquid_europan_air 100000")
    .outputFluids("gtceu:oxygen 70000")
    .outputFluids("gtceu:deuterium 20000")
    .outputFluids("gtceu:tritium 2000")
    .outputFluids("gtceu:krypton 1000")
    .outputFluids("gtceu:xenon 500")
    .outputFluids("gtceu:radon 100")
    .EUt(1920)
    .duration(2000);

  // Europa tholin melting (yields vary by ice type)
  greg.chemical_reactor("melt_tholin_ice_red")
    .itemInputs("kubejs:tholin_ice_red")
    .outputFluids("gtceu:tholin_solution 700")
    .EUt(120)
    .duration(120);

  greg.chemical_reactor("melt_tholin_ice_dark")
    .itemInputs("kubejs:tholin_ice_dark")
    .outputFluids("gtceu:tholin_solution 500")
    .EUt(120)
    .duration(100);

  greg.chemical_reactor("melt_tholin_ice_medium")
    .itemInputs("kubejs:tholin_ice_medium")
    .outputFluids("gtceu:tholin_solution 300")
    .EUt(80)
    .duration(80);

  greg.chemical_reactor("melt_tholin_ice_light")
    .itemInputs("kubejs:tholin_ice_light")
    .outputFluids("gtceu:tholin_solution 150")
    .EUt(60)
    .duration(60);

  greg.chemical_reactor("melt_tholin_ice_block")
    .itemInputs("kubejs:tholin_ice_block")
    .outputFluids("gtceu:tholin_solution 250")
    .EUt(60)
    .duration(70);

  greg.chemical_reactor("melt_europa_ice_block")
    .itemInputs("kubejs:europa_ice_block")
    .outputFluids("gtceu:tholin_solution 25")
    .EUt(30)
    .duration(40);

  greg.chemical_reactor("melt_europa_packed_ice")
    .itemInputs("kubejs:europa_packed_ice")
    .outputFluids("gtceu:tholin_solution 50")
    .EUt(40)
    .duration(50);

  // Concentrate tholin solution
  greg.centrifuge("tholin_solution_concentration")
    .inputFluids("gtceu:tholin_solution 1000")
    .outputFluids("gtceu:tholin_extract 250")
    .outputFluids("gtceu:distilled_water 750")
    .EUt(120)
    .duration(200);

});
