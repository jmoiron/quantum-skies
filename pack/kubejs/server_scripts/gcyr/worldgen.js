ServerEvents.recipes(event => {
    // jovian moon support

    let greg = event.recipes.gtceu;

    // breakin blocks
    const blocks = ["sulfuric_pumice", "cryo_sulfur_deposit", "tidal_fractured_peridotite",
        "plasma_tempered_basalt", "io_volcanic_ash", "pyroclastic_regolith", "lava_skylight_crust"
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

    greg.centrifuge("io_sulfuric_lava_decomposition")
        .inputFluids("gtceu:io_sulfuric_lava 100")
        .outputFluids("minecraft:lava 50")
        .outputFluids("gtceu:sulfuric_nickel_solution 20")
        .outputFluids("gtceu:diluted_sulfuric_acid 30")
        .chancedOutput("1x gtceu:platinum_dust", 2000, 500)
        .chancedOutput("3x gtceu:olivine_dust", 1500, 500)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(1.5*20);

});