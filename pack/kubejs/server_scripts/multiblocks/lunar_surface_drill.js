ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

    greg.assembler("lunar_surface_drill")
        .itemInputs(
            "gtceu:titanium_drill_head",
            "16x gtceu:platinum_normal_item_pipe",
            "16x gtceu:titanium_normal_fluid_pipe",
            "2x gtceu:long_distance_item_pipeline_endpoint",
            "2x gtceu:long_distance_fluid_pipeline_endpoint",
            "gtceu:ender_fluid_link_cover",
            "gtceu:hv_miner"
        )
        .itemOutputs("gtceu:lunar_surface_drill")
        .EUt(1920)
        .duration(1200);

    let mult = (amt) => { return amt > 0 ? `${amt}x ` : ""; }

    let mats = [
        ["stainless_steel", 1300, 0],
        ["titanium", 700, 2],
        ["tungsten_carbide", 300, 3],
    ]

    mats.forEach(([mat, chance, x]) => {
        greg.lunar_surface_drill(`lunar_surface_drill_${mat}`)
            .inputFluids("gtceu:drilling_fluid")
            .chancedInput(`gtceu:${mat}_drill_head`, chance, 0)
            .chancedOutput(`${mult(x)}gtceu:moon_regolith_block`, 7500, 0)
            .chancedOutput(`${mult(x)}gtceu:moon_ilmenite_ore`, 3500, 0)
            .chancedOutput(`${mult(x)}gtceu:moon_bauxite_ore`, 3500, 0)
            .chancedOutput(`${mult(x-1)}gtceu:crushed_tungstate_ore`, 2000, 0)
            .chancedOutput(`${mult(x-1)}gtceu:crushed_scheelite_ore`, 2000, 0)
            .EUt(GTValues.VA[GTValues.HV])
            .duration(90 * 20)

    });

});