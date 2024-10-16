ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    // add endstone centrifuge recipe, wh ich can produce ender air
    // with the same power utilization as the air collector
    greg.centrifuge("endstone_to_ender_air")
        .itemInputs("gtceu:endstone_dust")
        .outputFluids("gtceu:ender_air 500")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10);

    // remove unintended route to uranium 238
    event.remove({id: "gtceu:centrifuge/plutonium_239_separation"});
    greg.centrifuge("plutonium_239_separation_modified")
        .itemInputs("gtceu:plutonium_dust")
        .chancedOutput("gtceu:plutonium_241_dust", 2000, 300)
        .EUt(320)
        .duration(80*20);

    // nether star support
    greg.mixer("mix_planetary_nether_star_dust")
        .itemInputs("gtceu:nether_quartz_dust")
        .itemInputs("gtceu:martian_nether_dust")
        .itemInputs("gtceu:venusian_star_dust")
        .itemOutputs("gtceu:planetary_nether_star_dust")
        .EUt(7600)
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

    greg.assembler("bronze_casing")
        .itemInputs("8x gtceu:bronze_plate")
        .circuit(8)
        .itemOutputs("gtceu:bronze_machine_casing")
        .EUt(16)
        .duration(50);

    /* fix naquadah processing line from gt-- */
    event.remove({id: "gtceu:electric_blast_furnace/impure_enriched_naquadah_solution"})
    event.recipes.gtceu.electric_blast_furnace("impure_enriched_naquadah_solution_fixed")
        .inputFluids("gtceu:acidic_naquadria_solution 3000")
        .outputFluids("gtceu:naquadria_waste 1000")
        .itemOutputs("gtceu:enriched_naquadah_oxide_mixture_dust")
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(1280);

    // remove broken unattainable marble recipes
    event.remove({type: "gtceu:rock_breaker", output: "gtceu:marble"})
    /*
    event.recipes.gtceu.rock_breaker(`rock_breaker_marble`)
      .notConsumable("gtceu:marble")
      .itemOutputs("gtceu:marble")
      .EUt(7)
      .duration(16)
      .data({
        fluidA: "minecraft:lava",
        fluidB: "minecraft:water",
      })
    */
    event.remove({id: "gtceu:macerator/macerate_marble"})
});
