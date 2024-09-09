ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    event.remove({mod: "effortlessbuilding"});

    event.shaped("effortlessbuilding:reach_upgrade1",
        [" R ", "RER", " R "],
        {
            R: "gtceu:rubber_plate",
            E: "gtceu:ender_pearl_dust",
        }
    );

    greg.assembler("reach_upgrade2")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(600)
        .inputFluids("gtceu:polyvinyl_chloride 576")
        .itemInputs("gtceu:chemical_orange_dye")
        .itemOutputs("effortlessbuilding:reach_upgrade2");

    greg.assembler("reach_upgrade3")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(600)
        .inputFluids("gtceu:blaze 576")
        .itemInputs("minecraft:ender_pearl")
        .itemOutputs("effortlessbuilding:reach_upgrade3");


});