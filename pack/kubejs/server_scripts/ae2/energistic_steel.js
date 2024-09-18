ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    greg.mixer("energistic_steel_dust")
        .itemInputs("4x gtceu:stainless_steel_dust")
        .itemInputs("ae2:fluix_dust")
        .itemInputs("gtceu:certus_quartz_dust")
        .circuit(2)
        .itemOutputs("6x gtceu:energistic_steel_dust")
        .duration(20*40)
        .EUt(GTValues.VA[GTValues.MV]);

});