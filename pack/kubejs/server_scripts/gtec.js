priority: 0

ServerEvents.recipes(event => {
    // gregtech extended chemistry support

    let greg = event.recipes.gtceu;

    let sludgeChem = [
        ["gtceu:purified_pentlandite_ore", 2, "gtceu:sulfuric_nickel_solution"],
        ["gtceu:purified_tetrahedrite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_chalcocite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_bornite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_chalcopyrite_ore", 2, "gtceu:sulfuric_copper_solution"],
        // sheldonite is disabled by gtec
    ]

    event.remove({type: "gtceu:chemical_bath", input: "gtceu:crushed_cooperite_ore"});

    greg.chemical_bath("cooperite_mercury_modified")
        .itemInputs("gtceu:crushed_cooperite_ore")
        .inputFluids("gtceu:mercury 100")
        .itemOutputs("gtceu:purified_cooperite_ore")
        .chancedOutput("gtec:palladium_metallic_powder_dust", 7000, 580)
        .chancedOutput("gtceu:stone_dust", 4000, 650)
        .EUt(30)
        .duration(200);

    // remove vanilla osmium line
    event.remove({id: "gtceu:distillery/acidic_osmium_solution_separation_to_hydrochloric_acid"});
    event.remove({id: "gtceu:distillery/acidic_osmium_solution_separation_to_water"});

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

    // add missing recipe for ammonium nitrate solution
    greg.chemical_reactor("ammonium_nitrate")
        .inputFluids("gtceu:ammonia 1000")
        .inputFluids("gtceu:nitric_acid 1000")
        .outputFluids("gtec:ammonium_nitrate_solution 1000")
        .EUt(400)
        .duration(30);

    greg.electrolyzer("decomposition_electrolyzing_ammonium_nitrate")
        .inputFluids("gtec:ammonium_nitrate_solution 1000")
        .outputFluids("gtceu:ammonia 1000")
        .outputFluids("gtceu:nitric_acid 1000")
        .EUt(480)
        .duration(600);

    event.remove({id: "gtceu:electrolyzer/decomposition_electrolyzing_calcium_fluoride"});

    greg.electrolyzer("decomposition_calcium_fluoride_fixed")
        .itemInputs("3x gtec:calcium_fluoride_dust")
        .itemOutputs("gtceu:calcium_dust")
        .outputFluids("gtceu:fluorine 2000")
        .EUt(30)
        .duration(72);

    greg.chemical_reactor("calcium_fluoride_assembly")
        .itemInputs("gtceu:calcium_dust")
        .inputFluids("gtceu:fluorine 2000")
        .itemOutputs("3x gtec:calcium_fluoride_dust")
        .EUt(120)
        .duration(120);

    event.remove({id: "gtceu:extractor/extract_calcium_fluoride_dust"});

    greg.extractor("extract_calcium_fluoride_dust")
        .itemInputs("gtec:calcium_fluoride_dust")
        .outputFluids("gtec:calcium_fluoride 1000")
        .EUt(30)
        .duration(24);

    // this recipe invalidates the rest of the rhodium line
    event.remove({id: "gtceu:electrolyzer/rhodium_sulfate_separation"});

    // rhodium rebalance 46% increase yield
    event.remove({id: "gtec:sifter/rhodium_filter_cake"});

    greg.sifter("rhodium_filter_cake")
        .itemInputs("gtec:rhodium_nitrate_dust")
        .chancedOutput("gtec:rhodium_filter_cake_dust", 1500, 0)
        .chancedOutput("gtec:rhodium_filter_cake_dust", 1500, 0)
        .chancedOutput("gtec:rhodium_filter_cake_dust", 1500, 0)
        .chancedOutput("gtec:rhodium_filter_cake_dust", 1500, 0)
        .chancedOutput("gtec:rhodium_filter_cake_dust", 1500, 0)
        .chancedOutput("gtec:rhodium_filter_cake_dust", 2000, 0)
        .EUt(120)
        .duration(300);

    // 5x yield here
    event.remove({id: "gtec:mixer/rhodium_salt_solution"});

    greg.mixer("rhodium_salt_solution")
        .itemInputs("gtec:rhodium_salt_dust")
        .inputFluids("minecraft:water 1000")
        .outputFluids("gtec:rhodium_salt_solution 1000")
        .EUt(30)
        .duration(30);

    // platline fixes in PR #9, backported via kjs until we get a release
    // fix tetrahedrite being 9x better yield than everything else
    event.remove({id: "gtec:chemical_reactor/dissolve_tetrahedrite_for_platline"});

    greg.chemical_reactor("dissolve_tetrahedrite_for_platinum")
        .itemInputs("9x gtceu:purified_tetrahedrite_ore")
        .itemInputs("9x gtec:platinum_metallic_powder_dust")
        .inputFluids("gtceu:aqua_regia 10000")
        .outputFluids("gtec:platinum_concentrate 10000")
        .itemOutputs("gtec:platinum_residue_dust")
        .EUt(30)
        .duration(2250);

    // fix sifter yields for platinum and palladium
    event.remove({id: "gtec:sifter/salt_to_metallic_powder_palladium"});
    greg.sifter("salt_to_metallic_powder_palladium")
        .itemInputs("gtec:palladium_salt_dust")
        .chancedOutput("gtec:palladium_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:palladium_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:palladium_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:palladium_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:palladium_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:palladium_metallic_powder_dust", 2000, 0)
        .EUt(30)
        .duration(600);

    event.remove({id: "gtec:sifter/refined_platinum_salt"});
    greg.sifter("salt_to_metallic_powder_platinum")
        .itemInputs("gtec:platinum_salt_dust")
        .chancedOutput("gtec:platinum_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:platinum_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:platinum_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:platinum_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:platinum_metallic_powder_dust", 1500, 0)
        .chancedOutput("gtec:platinum_metallic_powder_dust", 2000, 0)
        .EUt(30)
        .duration(600);

    event.remove({id: "gtec:electric_blast_furnace/rhodium_sulfate"});
    greg.electric_blast_furnace("rhodium_sulfate")
        .itemInputs("gtec:platinum_residue_dust")
        .itemInputs("2x gtec:small_potassium_disulfate_dust")
        .circuit(2)
        .itemOutputs("gtec:leach_residue_dust")
        .outputFluids("gtceu:rhodium_sulfate 360")
        .blastFurnaceTemp(775)
        .EUt(120)
        .duration(200);

    // add missing hexafluorosilic acid recipe
    greg.chemical_reactor("hexafluorosilic_acid")
        .inputFluids("gtceu:fluorine 6000")
        .itemInputs("gtceu:silicon_dust")
        .outputFluids("gtceu:hydrogen 4000")
        .outputFluids("gtec:hexafluorosilic_acid 1000")
        .EUt(120)
        .duration(400);

    // this creates an infinite processing loop that manifests cerium from nothing
    // adding a chance to not get the bastnasite back out, which reduces the yield
    // slightly from infinity to some other number that's probably fair given that
    // cerium is completely useless
    event.remove({id: "gtec:centrifuge/cerium_oxidesed_rare_earth_oxides_dust_separation"});
    greg.centrifuge("bastnasite_cerium_oxidized_separation")
        .itemInputs("gtec:cerium_oxidised_rare_earth_oxides_dust")
        .chancedOutput("gtec:bastnasite_rare_earth_oxides_dust", 9500, 0)
        .chancedOutput("gtec:cerium_dioxide_dust", 7000, 0)
        .EUt(480)
        .duration(600);

});