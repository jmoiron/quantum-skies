
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    // nether star support
    greg.mixer("mix_planetary_nether_star_dust")
        .itemInputs("gtceu:nether_quartz_dust")
        .itemInputs("gtceu:martian_nether_dust")
        .itemInputs("gtceu:venusian_star_dust")
        .itemOutputs("gtceu:planetary_nether_star_dust")
        .EUt(9600)
        .duration(200);

    greg.chemical_bath("planetary_nether_star_to_nether_star")
        .inputFluids("gtceu:blaze 288")
        .itemInputs("gtceu:planetary_nether_star_dust")
        .itemOutputs("gtceu:nether_star_dust")
        .EUt(1800)
        .duration(100);

    // add a workaround for treated sticks
    event.shaped("6x gtceu:treated_wood_rod",
        [" R ", " R ", " R "],
        {R: "gtceu:treated_wood_planks"});
});
