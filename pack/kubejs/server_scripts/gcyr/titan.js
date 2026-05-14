ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;

    const titanMaceration = [
        ["titan_hydrocarbon_sand", "4x gtceu:light_oilsands_dust"],
        ["titan_hydrocarbon_sandstone", "3x gtceu:light_oilsands_dust"],
        ["titan_dirty_ice", "2x gtceu:moon_regolith_dust"],
        ["titan_cryorock", "4x gtceu:stone_dust"],
        ["titan_boulder_conglomerate", "3x gtceu:stone_dust"]
    ];

    titanMaceration.forEach(([block, output]) => {
        greg.macerator(`${block}_to_dust`)
            .itemInputs(`kubejs:${block}`)
            .itemOutputs(output)
            .EUt(GTValues.VHA[GTValues.HV])
            .duration(20 * 6);
    });

    greg.macerator("methane_clathrate_to_dust")
        .itemInputs("kubejs:methane_clathrate")
        .itemOutputs("2x gtceu:light_oilsands_dust")
        .chancedOutput("gtceu:moon_regolith_dust", 4500, 250)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 6);

    greg.centrifuge("methane_clathrate_decomposition")
        .itemInputs("kubejs:methane_clathrate")
        .itemOutputs("gtceu:stone_dust")
        .outputFluids("gtceu:methane 250")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20 * 8);
});
