ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

    // -------------------------------------------------------------------------
    // Moissanite -> Silicon Carbide ingot chain (HV, 3 steps)
    // -------------------------------------------------------------------------

    // Step 1 — Chemical Reactor (HV)
    // HF acid strips silica surface layers and oxide inclusions from moissanite
    // grains, dispersing them into a stable colloidal suspension.
    greg.chemical_reactor("moissanite_to_sic_suspension")
        .itemInputs("4x gtceu:moissanite_dust")
        .inputFluids("gtceu:hydrofluoric_acid 500")
        .outputFluids("gtceu:sic_suspension 1000")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200);

    // Step 2 — Mixer (HV)
    // Boron dust added as sintering aid. Even small amounts of boron suppress
    // grain boundary oxides and enable pressureless densification.
    greg.mixer("sic_suspension_to_slurry")
        .inputFluids("gtceu:sic_suspension 1000")
        .itemInputs("gtceu:boron_dust")
        .outputFluids("gtceu:sic_sintering_slurry 1000")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(160);

    // Step 3 — Dehydrator (HV)
    // Spray drying removes the carrier fluid, yielding free-flowing SiC+B powder
    // granules (nuggets) ready for furnace consolidation.
    greg.dehydrator("sic_slurry_to_nuggets")
        .inputFluids("gtceu:sic_sintering_slurry 1000")
        .itemOutputs("18x gtceu:silicon_carbide_nugget")
        .chancedOutput("gtceu:boron_dust", 8000, 0)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(300);

    // SiC foil replaces the metal foil layer, doubling yield due to superior
    // thermal conductivity and lower defect rate during acid etching.

    // epoxy_board: SiC foil instead of gold foil → 2x epoxy circuit board
    greg.chemical_reactor("sic_epoxy_board")
        .itemInputs("gtceu:epoxy_plate")
        .itemInputs("8x gtceu:silicon_carbide_foil")
        .inputFluids("gtceu:sulfuric_acid 500")
        .itemOutputs("2x gtceu:epoxy_circuit_board")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(600);

    // fiber_board: SiC foil instead of annealed copper foil → 2x fiber reinforced circuit board
    greg.chemical_reactor("sic_fiber_board")
        .itemInputs("gtceu:reinforced_epoxy_resin_plate")
        .itemInputs("8x gtceu:silicon_carbide_foil")
        .inputFluids("gtceu:sulfuric_acid 125")
        .itemOutputs("2x gtceu:fiber_reinforced_circuit_board")
        .EUt(10)
        .duration(500);

    // -------------------------------------------------------------------------
    // Acheson Process — alternative SiC synthesis (IV mixer, not available at HV)
    // -------------------------------------------------------------------------
    // Carbothermal reduction of silica: SiO2 + 3C → SiC + 2CO
    // Requires an IV mixer — significantly more expensive than the moissanite path.
    greg.mixer("acheson_silicon_carbide_synthesis")
        .circuit(4)
        .itemInputs("gtceu:silicon_dioxide_dust")
        .itemInputs("3x gtceu:carbon_dust")
        .itemOutputs("gtceu:silicon_carbide_dust")
        .outputFluids("gtceu:carbon_monoxide 2000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(320);

});
