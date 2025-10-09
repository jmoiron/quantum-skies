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

    // light oilsands support

    // gtceu 7.2 fixed a bug in the oilsands ore and made it produce heavy oil
    // like the oilsands dust...  but this invalidated an "alternate" path to oil
    // and ethylene that I had planned. In the absence of oil spouts, I think a
    // non-rig route to regular oil is good.. but in skyblock everything is going
    // to be infinite as well, so it has to be somewhat balanced infra-wise
    //
    // for this, qs adds "light oilsands", which produces normal oil from both
    // ore and dust, though the route to get ore has been removed.

    greg.centrifuge("light_oilsands_ore_separation")
        .itemInputs("gtceu:light_oilsands_ore")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil 2000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    greg.centrifuge("light_oilsands_dust_separation")
        .itemInputs("gtceu:light_oilsands_dust")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil 2000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    // for existing worlds that might have tons of regular oilsands which are
    // a little useless now, a recipe to dehydrate it. They get a little salt/chlorine
    // as reward.
    greg.dehydrator("oilsands_dust_to_light_oilsands")
        .itemInputs("gtceu:oilsands_dust")
        .itemOutputs("gtceu:light_oilsands_dust")
        .outputFluids("gtceu:salt_water 100")
        .duration(20*2)
        .EUt(GTValues.VHA[GTValues.MV])

    // restore a way to get regular oilsands to get heavy oil without looking for
    // fluid veins.
    greg.mixer("light_oilsands_to_oilsands")
        .itemInputs("gtceu:light_oilsands_dust")
        .inputFluids("gtceu:salt_water 100")
        .itemOutputs("gtceu:oilsands_dust")
        .duration(20*2)
        .EUt(GTValues.VHA[GTValues.MV])

    // remove still-broken marble rock breaker recipe
    // i'm not sure why this doesn't work, the gtm code looks fine
    event.remove({type: "gtceu:rock_breaker", output: "gtceu:marble"})
    event.remove({id: "gtceu:macerator/macerate_marble"})

    greg.macerator('macerate_marble')
        .itemInputs("gtceu:marble")
        .itemOutputs("gtceu:marble_dust")
        .chancedOutput("gtceu:marble_dust", 1500, 0)
        .EUt(2)
        .duration(150)

    greg.rock_breaker(`rock_breaker_marble`)
      .notConsumable("gtceu:marble")
      .itemOutputs("gtceu:marble")
      .EUt(GTValues.VHA[GTValues.HV])
      .duration(16)
      ["adjacentFluid(net.minecraft.world.level.material.Fluid[])"]("minecraft:lava", "minecraft:water")


    event.remove({mod: "angelring"});

    greg.assembler("angelring")
        .itemInputs("gtceu:gold_ring")
        .itemInputs("3x gtceu:rose_gold_ingot")
        .itemInputs("2x minecraft:feather")
        .itemInputs("gtceu:advanced_electric_jetpack")
        .itemInputs("ae2:singularity")
        .inputFluids("gcyr:para_aramid 144")
        .itemOutputs("angelring:angel_ring")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(600*20);

});
