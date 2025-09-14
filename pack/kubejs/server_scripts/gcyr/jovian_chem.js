ServerEvents.recipes(event => {
  const greg = event.recipes.gtceu;

  // Ionian Air collection and separation
  greg.gas_collector("collect_ionian_air")
    .dimension("gcyr:io")
    .outputFluids("gtceu:ionian_air 10000")
    .circuit(6)
    .EUt(GTValues.VA[GTValues.LV])
    .duration(200);

  greg.vacuum_freezer("freeze_ionian_air")
    .inputFluids("gtceu:ionian_air 4000")
    .outputFluids("gtceu:liquid_ionian_air 4000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(80);

  greg.distillation_tower("distill_liquid_ionian_air")
    .inputFluids("gtceu:liquid_ionian_air 100000")
    .outputFluids("gtceu:sulfur_dioxide 80000")
    .outputFluids("gtceu:oxygen 15000")
    .outputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .chancedOutput("gtceu:sulfur_dust", 1500, 300)
    .EUt(GTValues.VA[GTValues.HV])
    .duration(2000);

  // Ganymede brine → conditioned → clarified → refined (basic reagents)
  greg.mixer("ganymede_brine_precondition")
    .inputFluids("gtceu:ganymede_brine 1000")
    .itemInputs("gtceu:quicklime_dust")
    .outputFluids("gtceu:conditioned_ganymede_brine 1000")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(160);

  greg.chemical_reactor("ganymede_brine_clarify")
    .inputFluids("gtceu:conditioned_ganymede_brine 1000")
    .itemInputs("2x gtceu:silicon_dioxide_dust")
    .outputFluids("gtceu:clarified_ganymede_brine 750")
    .outputFluids("gtceu:oxygen 250")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(200);

  greg.chemical_reactor("ganymede_brine_refine")
    .inputFluids("gtceu:clarified_ganymede_brine 1000")
    .inputFluids("gtceu:carbon_monoxide 1000")
    .outputFluids("gtceu:refined_ganymede_brine 1000")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(200);

  // Chlorinated water for Jovian drilling muds
  greg.mixer("chlorinated_water")
    .inputFluids("gtceu:distilled_water 950")
    .inputFluids("gtceu:chlorine 50")
    .outputFluids("gtceu:chlorinated_water 1000")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(80);

  // Superheat chlorinated water to sterilize it (used as drilling mud base)
  greg.fluid_heater("superheated_sterilized_water")
    .inputFluids("gtceu:chlorinated_water 1000")
    .outputFluids("gtceu:superheated_sterilized_water 1000")
    .EUt(GTValues.VA[GTValues.EV])
    .duration(120);

  // Synthesize Ganymede Brine from Raw Brine + Ganymede Regolith (IV Brewer)
  greg.brewery("ganymede_brine_from_regolith")
    .itemInputs("5x gtceu:ganymede_regolith_dust")
    .inputFluids("gtceu:raw_brine 1000")
    .outputFluids("gtceu:ganymede_brine 1000")
    .EUt(GTValues.VHA[GTValues.EV])
    .duration(200);

    // Quench Io sulfuric lava to a metastable slurry for further separation
  greg.mixer("quench_io_sulfuric_lava")
    .inputFluids("gtceu:io_sulfuric_lava 1000")
    .inputFluids("gtceu:distilled_water 1000")
    .outputFluids("gtceu:quenched_ionian_lava 1000")
    .EUt(GTValues.VA[GTValues.LuV])
    .duration(100);

  greg.centrifuge("io_sulfuric_lava_decomposition")
    .inputFluids("gtceu:io_sulfuric_lava 100")
    .outputFluids("minecraft:lava 50")
    .outputFluids("gtceu:sulfuric_nickel_solution 20")
    .outputFluids("gtceu:diluted_sulfuric_acid 30")
    .chancedOutput("1x gtceu:platinum_dust", 500, 500)
    .chancedOutput("3x gtceu:olivine_dust", 1500, 500)
    .EUt(GTValues.VA[GTValues.HV])
    .duration(1.5*20);

  // Separate quenched slurry into useful byproducts
  greg.centrifuge("quenched_ionian_lava_separation")
    .inputFluids("gtceu:quenched_ionian_lava 100")
    .outputFluids("minecraft:lava 50")
    .outputFluids("gtceu:sulfuric_nickel_solution 20")
    .outputFluids("gtceu:diluted_sulfuric_acid 30")
    .chancedOutput("1x gtceu:platinum_dust", 2500, 500)
    .chancedOutput("1x gtceu:oleum_substrate_dust", 2500, 300)
    .EUt(GTValues.VA[GTValues.HV])
    .duration(30);

  // Oxidize ionized SO2 to SO3 (use GTCEu sulfur_trioxide)
  greg.chemical_reactor("oxidize_ionized_so2")
    .inputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .inputFluids("gtceu:oxygen 1000")
    .outputFluids("gtceu:sulfur_trioxide 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(200);

  // Oxidize IO-SO2i -> SO3 already above, then make oleum (SO3 in H2SO4)
  greg.chemical_reactor("synthesize_oleum")
    .itemInputs("1x gtceu:oleum_substrate_dust")
    .inputFluids("gtceu:ionized_sulfur_dioxide 1000")
    .inputFluids("gtceu:sulfuric_acid 1000")
    .outputFluids("gtceu:oleum 2000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(160);

  // Europa air collection and separation
  greg.gas_collector("collect_europan_air")
    .dimension("gcyr:europa")
    .outputFluids("gtceu:europan_air 10000")
    .circuit(7)
    .EUt(GTValues.VA[GTValues.LV])
    .duration(200);

  greg.centrifuge("separate_europan_air")
    .inputFluids("gtceu:europan_air 10000")
    .outputFluids("gtceu:oxygen 7000")
    .outputFluids("gtceu:deuterium 2500")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(1600);

  greg.vacuum_freezer("freeze_europan_air")
    .inputFluids("gtceu:europan_air 4000")
    .outputFluids("gtceu:liquid_europan_air 4000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(80);

  greg.distillation_tower("distill_liquid_europan_air")
    .inputFluids("gtceu:liquid_europan_air 100000")
    .outputFluids("gtceu:oxygen 70000")
    .outputFluids("gtceu:deuterium 20000")
    .outputFluids("gtceu:tritium 2000")
    .outputFluids("gtceu:krypton 1000")
    .outputFluids("gtceu:xenon 500")
    .outputFluids("gtceu:radon 500")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(2000);

  // h-BN synthesis (Hexagonal Boron Nitride) in EBF: B + N2 -> BN
  greg.electric_blast_furnace("hexagonal_boron_nitride")
    .itemInputs("gtceu:boron_dust")
    .inputFluids("gtceu:nitrogen 1000")
    .itemOutputs("gtceu:hexagonal_boron_nitride_dust")
    .blastFurnaceTemp(1800)
    .EUt(GTValues.VA[GTValues.HV])
    .duration(200);

  // Europa tholin melting (yields vary by ice type)
  const yields = {
    tholin_ice_red: 700,
    tholin_ice_dark: 500,
    tholin_ice_medium: 300,
    tholin_ice_light: 150,
    tholin_ice_block: 250,
    europa_ice_block: 25,
    europa_packed_ice: 50,
  }

  Object.entries(yields).forEach(([block, amt]) => {
    greg.extractor(`melt_${block}`)
        .itemInputs(`kubejs:${block}`)
        .outputFluids(`gtceu:tholin_solution ${amt}`)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(120);
  });

  // Concentrate tholin solution
  greg.centrifuge("tholin_solution_concentration")
    .inputFluids("gtceu:tholin_solution 1000")
    .outputFluids("gtceu:tholin_extract 250")
    .outputFluids("gtceu:salt_water 750")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(200);

  // Callisto: olivine substrate chain from moon surface material
  // 1) Form an olivine salt using basic reagents
  greg.chemical_reactor("callisto_olivine_salt_form")
    .itemInputs("7x gtceu:callisto_olivine_crust_dust")
    .itemInputs("3x gtceu:sodium_hydroxide_dust")
    .inputFluids("gtceu:oleum 1000")
    .itemOutputs("gtceu:olivine_salt_dust")
    .itemOutputs("3x gtceu:sodium_dust")
    .outputFluids("gtceu:diluted_sulfuric_acid 750")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(160);

  // 2) Enrich the salt using chlorine wash
  greg.chemical_bath("callisto_enrich_olivine_salt")
    .itemInputs("gtceu:olivine_salt_dust")
    .inputFluids("gtceu:chlorine 250")
    .itemOutputs("gtceu:enriched_olivine_salt_dust")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(140);

  // 3) Sift to obtain an olivine substrate for later catalysis
  greg.sifter("callisto_sift_olivine_substrate")
    .itemInputs("gtceu:enriched_olivine_salt_dust")
    .itemOutputs("gtceu:olivine_substrate_dust")
    .chancedOutput("gtceu:olivine_dust", 4000, 500)
    .chancedOutput("gtceu:pure_olivine_dust", 1000, 100)
    .EUt(GTValues.VA[GTValues.LV])
    .duration(120);

});
