ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;

    // Saturnian gate for ZPM fusion: same upstream MK II assembly-line recipe,
    // with phosphine added as the Saturn-cloud trace-gas requirement.
    event.remove({ output: "gtceu:zpm_fusion_reactor" });

    greg.assembly_line("fusion_reactor_mk2_saturnian")
        .itemInputs("gtceu:fusion_coil")
        .itemInputs("4x #gtceu:circuits/uv")
        .itemInputs("2x gtceu:double_naquadria_plate")
        .itemInputs("2x gtceu:double_europium_plate")
        .itemInputs("2x gtceu:luv_field_generator")
        .itemInputs("64x gtceu:uhpic_chip")
        .itemInputs("32x gtceu:uhpic_chip")
        .itemInputs("32x gtceu:uranium_rhodium_dinaquadide_single_wire")
        .inputFluids("gtceu:soldering_alloy 1152")
        .inputFluids("gtceu:vanadium_gallium 1152")
        .inputFluids("gtceu:phosphine 1000")
        .itemOutputs("gtceu:zpm_fusion_reactor")
        .stationResearch(b => b
            .researchStack(Item.of("gtceu:luv_fusion_reactor"))
            .CWUt(16)
            .EUt(GTValues.VA[GTValues.ZPM]))
        .duration(1000)
        .EUt(61440);
});
