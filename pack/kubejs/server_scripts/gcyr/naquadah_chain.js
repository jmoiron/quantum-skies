ServerEvents.recipes(event => {
  const greg = event.recipes.gtceu;

  // Step 1: Create Olivine Enriched Tholin (reactants from Callisto and Europa)
  greg.chemical_reactor("olivine_enriched_tholin")
    .itemInputs("gtceu:olivine_substrate_dust")
    .itemInputs("gtceu:sodium_dust")
    .inputFluids("gtceu:tholin_extract 1000")
    .outputFluids("gtceu:olivine_enriched_tholin 1000")
    .EUt(GTValues.VA[GTValues.MV])
    .duration(200);

  // Step 2: Mix enriched tholin with Oleum to produce Jovian Leachate
  greg.mixer("make_jovian_leachate")
    .inputFluids("gtceu:olivine_enriched_tholin 1000")
    .inputFluids("gtceu:oleum 1000")
    .outputFluids("gtceu:jovian_leachate 2000")
    .EUt(GTValues.VA[GTValues.LuV])
    .duration(300);

  // Step 3: Chem bath crushed Low-Grade Naquadah with Jovian Leachate to form a slurry
  greg.chemical_bath("low_grade_naquadah_to_slurry")
    .itemInputs("gtceu:crushed_low_grade_naquadah_ore")
    .inputFluids("gtceu:jovian_leachate 1000")
    .outputFluids("gtceu:low_grade_naquadah_slurry 1000")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(200);

  // Step 4: Autoclave slurry into standard Naquadah crushed ore
  greg.chemical_bath("slurry_to_naquadah_crushed")
    .itemInputs("gtceu:purified_low_grade_naquadah_ore")
    .inputFluids("gtceu:low_grade_naquadah_slurry 1000")
    .itemOutputs("gtceu:crushed_naquadah_ore")
    .EUt(GTValues.VA[GTValues.HV])
    .duration(300);

  // Design an alternative process for after Nq w/ the orbital gas drill
});
