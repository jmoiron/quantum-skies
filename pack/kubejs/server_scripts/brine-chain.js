// GTCEu brine -> bromine process chain restored from GTCEu v1.6.4

ServerEvents.recipes(event => {
  // Heat raw brine
  event.recipes.gtceu.fluid_heater("brine_heating")
    .inputFluids("gtceu:raw_brine 1000")
    .outputFluids("gtceu:hot_brine 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(12000);

  // Main chain
  event.recipes.gtceu.chemical_reactor("brine_chlorination")
    .inputFluids("gtceu:hot_brine 1000")
    .inputFluids("gtceu:chlorine 1000")
    .outputFluids("gtceu:hot_chlorinated_brominated_brine 2000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(100);

  event.recipes.gtceu.chemical_reactor("brine_filtration")
    .inputFluids("gtceu:hot_chlorinated_brominated_brine 1000")
    .inputFluids("gtceu:chlorine 1000")
    .inputFluids("gtceu:steam 1000")
    .outputFluids("gtceu:hot_alkaline_debrominated_brine 1000")
    .outputFluids("gtceu:brominated_chlorine_vapor 2000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(300);

  event.recipes.gtceu.chemical_reactor("brominated_chlorine_vapor_condensation")
    .inputFluids("gtceu:brominated_chlorine_vapor 1000")
    .inputFluids("minecraft:water 1000")
    .outputFluids("gtceu:acidic_bromine_solution 1000")
    .outputFluids("minecraft:water 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(200);

  event.recipes.gtceu.chemical_reactor("bromine_vapor_concentration")
    .inputFluids("gtceu:acidic_bromine_solution 1000")
    .inputFluids("gtceu:steam 1000")
    .outputFluids("gtceu:concentrated_bromine_solution 1000")
    .outputFluids("gtceu:acidic_bromine_exhaust 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(100);

  event.recipes.gtceu.distillation_tower("bromine_distillation")
    .inputFluids("gtceu:concentrated_bromine_solution 1000")
    .outputFluids("gtceu:chlorine 500")
    .outputFluids("gtceu:bromine 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(500);

  // Byproduct loop
  event.recipes.gtceu.chemical_reactor("brine_neutralization")
    .inputFluids("gtceu:hot_alkaline_debrominated_brine 3000")
    .itemInputs("gtceu:potassium_dust")
    .outputFluids("gtceu:hot_debrominated_brine 2000")
    .itemOutputs("2x gtceu:rock_salt_dust")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(100);

  event.recipes.gtceu.chemical_reactor("debrominated_brine_raw_brine_mixing")
    .inputFluids("gtceu:raw_brine 1000")
    .inputFluids("gtceu:hot_debrominated_brine 1000")
    .outputFluids("gtceu:hot_brine 1000")
    .outputFluids("gtceu:debrominated_brine 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(200);

  event.recipes.gtceu.chemical_reactor("acidic_bromine_exhaust_heating")
    .inputFluids("gtceu:acidic_bromine_exhaust 1000")
    .inputFluids("gtceu:hot_brine 1000")
    .outputFluids("gtceu:hot_chlorinated_brominated_brine 1000")
    .outputFluids("gtceu:steam 3000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(100);

  event.recipes.gtceu.centrifuge("debrominated_brine_decomposition")
    .inputFluids("gtceu:debrominated_brine 2000")
    .outputFluids("gtceu:salt_water 1000")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(60);
});
