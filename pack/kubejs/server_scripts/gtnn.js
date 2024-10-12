ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    // rebalance rocket fuels
    const PlantCasingCondition = Java.loadClass("dev.arbor.gtnn.api.recipe.PlantCasingCondition");

    event.remove({id: "gtceu:chemical_plant/rp_1_mixed_fuel"})
    greg.chemical_plant("rp_1_mixed_fuel")
        .addCondition(PlantCasingCondition(PlantCasingCondition.STAINLESS_STEEL))
        .inputFluids("gtceu:oxygen 2000")
        .inputFluids("gtceu:rp_1_rocket_fuel 500")
        .outputFluids("gtceu:rp_1_mixed_fuel 1500")
        .circuit(1)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(300);

    event.remove({id: "gtceu:chemical_plant/dense_hydrazine_mixed_fuel"});
    greg.chemical_plant("dense_hydrazine_mixed_fuel")
        .addCondition(PlantCasingCondition(PlantCasingCondition.TITANIUM))
        .inputFluids("gtceu:hydrazine 4000")
        .inputFluids("gtceu:methanol 6000")
        .outputFluids("gtceu:dense_hydrazine_mixed_fuel 10000")
        .circuit(2)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(600);

    event.remove({id: "gtceu:chemical_plant/methylhydrazine_nitrate_rocket_fuel"});
    greg.chemical_plant("methylhdyrazine_nitrate_rocket_fuel")
        .addCondition(PlantCasingCondition(PlantCasingCondition.TUNGSTEN_STEEL))
        .inputFluids("gtceu:methyl_hydrazine 2000")
        .inputFluids("gtceu:nitric_acid 1000")
        .outputFluids("gtceu:methylhydrazine_nitrate_rocket_fuel 2000")
        .circuit(3)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(900);

    greg.chemical_plant("nitrogen_tetroxide_synthesis")
        .addCondition(PlantCasingCondition(PlantCasingCondition.STAINLESS_STEEL))
        .inputFluids("gtceu:nitric_acid 2000")
        .chancedInput("gtceu:copper_dust", 9800, -200)
        .outputFluids("gtceu:nitrogen_tetroxide 1000")
        .circuit(21)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(300);

    greg.chemical_plant("udmh_rocket_fuel")
        .addCondition(PlantCasingCondition(PlantCasingCondition.TUNGSTEN_STEEL))
        .inputFluids("gtceu:udmh 2000")
        .inputFluids("gtceu:nitrogen_tetroxide 2000")
        .outputFluids("gtceu:udmh_rocket_fuel 5000")
        .circuit(4)
        .EUt(GTValues.VA[GTValues.HV])
        .duration(900);

    greg.chemical_plant("udmh")
        .addCondition(PlantCasingCondition(PlantCasingCondition.STAINLESS_STEEL))
        .circuit(5)
        .inputFluids("gtceu:hydrazine 2000")
        .inputFluids("gtceu:formaldehyde 2000")
        .inputFluids("gtceu:hydrogen 4000")
        .outputFluids("gtceu:udmh 2000")
        .outputFluids("minecraft:water 2000")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(1200);

});