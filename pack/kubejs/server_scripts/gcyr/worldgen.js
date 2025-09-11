ServerEvents.recipes(event => {
    // jovian moon support

    let greg = event.recipes.gtceu;

    // breakin blocks
    const blocks = [
        // io
        "sulfuric_pumice", "cryo_sulfur_deposit", "tidal_fractured_peridotite",
        "plasma_tempered_basalt", "io_volcanic_ash", "pyroclastic_regolith", "lava_skylight_crust",
        // europa
        // ganymede
        "ganymede_regolith", "ganymede_dark_dust",
        // callisto
        "callisto_regolith", "callisto_compact_regolith", "callisto_olivine_crust", "callisto_light_regolith"
    ];

    blocks.forEach(name => {
        greg.macerator(`${name}_to_dust`)
            .itemInputs(`kubejs:${name}`)
            .itemOutputs(`4x gtceu:${name}_dust`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(20*4);
    })

    greg.macerator(`pyroclastic_clean_regolith_to_dust`)
        .itemInputs("kubejs:pyroclastic_clean_regolith")
        .itemOutputs(`4x gtceu:pyroclastic_regolith_dust`)
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(20*4);

    greg.centrifuge("lava_skylight_dust_decomposition")
        .itemInputs("7x gtceu:lava_skylight_crust_dust")
        .itemOutputs("3x gtceu:io_volcanic_ash_dust")
        .outputFluids("gtceu:io_sulfuric_lava 100")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(20*4);

});