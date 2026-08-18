priority: 0

ServerEvents.recipes(event => {
    // gregtech extended chemistry support

    let greg = event.recipes.gtceu;

    // remove pre-moon sources of platinum
    event.remove({id: "gtceu:chemical_reactor/pgs_from_pentlandite"})
    event.remove({id: "gtceu:chemical_reactor/pgs_from_tetrahedrite"})
    event.remove({id: "gtceu:chemical_reactor/pgs_from_chalcocite"})
    event.remove({id: "gtceu:chemical_reactor/pgs_from_bornite"})
    event.remove({id: "gtceu:chemical_reactor/pgs_from_chalcopyrite"})
    event.remove({id: "gtceu:large_chemical_reactor/pgs_from_chalcopyrite"})
    event.remove({id: "gtceu:large_chemical_reactor/pgs_from_chalcocite"})
    event.remove({id: "gtceu:large_chemical_reactor/pgs_from_tetrahedrite"})
    event.remove({id: "gtceu:large_chemical_reactor/pgs_from_pentlandite"})
    event.remove({id: "gtceu:large_chemical_reactor/pgs_from_bornite"})

    // remove pre-mars/venus source of tungsten
    event.remove({id: "gtceu:macerator/macerate_end_stone"})
    greg.macerator("macerate_end_stone_fixed")
        .itemInputs("minecraft:end_stone")
        .itemOutputs("gtceu:endstone_dust")
        .EUt(2)
        .duration(150)

    // modify pre-moon source of titanium to be EV (post-titanium)
    // also, nerf as a source of titanium
    event.remove({id: "gtceu:electrolyzer/decomposition_electrolyzing_monazite"});

    greg.electrolyzer("decomposition_electrolyzing_monazite")
        .inputFluids("gtec:diluted_monazite_rare_earth_mud 1000")
        .chancedOutput("gtec:monazite_sulfate_dust", 9000, 10)
        .chancedOutput("gtceu:silicon_dioxide_dust", 7500, 10)
        .chancedOutput("gtceu:rutile_dust", 100, 10)
        .chancedOutput("gtec:red_zircon_dust", 500, 10)
        .chancedOutput("gtceu:ilmenite_dust", 100, 10)
        .EUt(1920)
        .duration(200);


    // gtceu's basic formic acid recipe clashes with a bunch of stuff
    // so we add a circuit to it.
    event.remove({id: "gtceu:chemical_reactor/formic_acid"})
    greg.chemical_reactor("formic_acid")
        .inputFluids("gtceu:carbon_dioxide 1000")
        .inputFluids("minecraft:water 1000")
        .outputFluids("gtceu:formic_acid 1000")
        .outputFluids("gtceu:oxygen 1000")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.LV])
        .duration(5*20);

});
