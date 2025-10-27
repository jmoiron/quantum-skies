
ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;
    event.remove({output: "tempad:tempad"})

    greg.assembler("tempad")
        .itemInputs("gtceu:ender_item_link_cover")
        .itemInputs("gtceu:ender_fluid_link_cover")
        .itemInputs("ae2:singularity")
        .itemInputs("6x gtceu:brass_plate")
        .itemInputs("minecraft:tinted_glass")
        .itemInputs("gtceu:rubber_button")
        .inputFluids("gtceu:polytetrafluoroethylene 432")
        .itemOutputs("tempad:tempad")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(30*20);

});