
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    event.remove({mod: "fluxnetworks"});

    greg.mixer("flux_dust")
        .EUt(1024)
        .duration(100)
        .itemInputs("minecraft:redstone", "gtceu:bedrock_dust", "gtceu:obsidian_dust")
        .itemOutputs("3x fluxnetworks:flux_dust");
    
    greg.centrifuge("flux_dust_separate")
        .EUt(1024)
        .duration(100)
        .itemInputs("3x fluxnetworks:flux_dust")
        .itemOutputs("minecraft:redstone", "gtceu:bedrock_dust", "gtceu:obsidian_dust");

    greg.forming_press("flux_core")
        .EUt(256)
        .duration(20)
        .itemInputs("4x fluxnetworks:flux_dust", "gtceu:quantum_eye")
        .itemOutputs("4x fluxnetworks:flux_core");

    greg.assembler("flux_point")
        .EUt(1920)
        .duration(20)
        .itemInputs(
            "gtceu:hv_sensor",
            "gtceu:energy_crystal",
            "4x fluxnetworks:flux_core",
            "3x gtceu:titanium_plate",
            "2x #gtceu:circuits/ev"
        )
        .itemOutputs("fluxnetworks:flux_point")
            
    greg.assembler("flux_plug")
        .EUt(1920)
        .duration(20)
        .itemInputs(
            "gtceu:hv_emitter",
            "gtceu:energy_crystal",
            "4x fluxnetworks:flux_core",
            "3x gtceu:titanium_plate",
            "2x #gtceu:circuits/ev"
        )
        .itemOutputs("fluxnetworks:flux_plug")
    

});