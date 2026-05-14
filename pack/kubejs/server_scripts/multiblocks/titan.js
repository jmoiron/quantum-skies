ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;

    greg.planetary_core_drill("titan_drill")
        .inputFluids("gtceu:superheated_sterilized_water 100")
        .dimension("gcyr:titan")
        .itemOutputs("4x kubejs:titan_dirty_ice")
        .chancedOutput("6x kubejs:titan_hydrocarbon_sand", 7000, 250)
        .chancedOutput("4x kubejs:methane_clathrate", 6000, 250)
        .chancedOutput("4x kubejs:titan_cryorock", 5000, 250)
        .chancedOutput("2x kubejs:titan_boulder_conglomerate", 4500, 250)
        .chancedOutput("gtceu:titanean_selenide_ore", 1200, 300)
        .chancedFluidOutput("gtceu:titan_hydrocarbon_mix 100", 6500, 1000)
        .circuit(7)
        .EUt(GTValues.VHA[GTValues.LuV])
        .duration(320);
});
