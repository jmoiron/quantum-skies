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

    // remove pre-moon source of bastnasite
    event.remove({id: "gtec:chemical_bath/rare_earth_recycle"});

    greg.chemical_bath("qs_rare_earth_recycle")
        .itemInputs("3x gtceu:rare_earth_dust")
        .inputFluids("gtceu:sulfuric_acid 1000")
        .itemOutputs("2x gtceu:crushed_bastnasite_ore")
        .itemOutputs("2x gtceu:crushed_bastnasite_ore")
        .itemOutputs("2x gtceu:crushed_bastnasite_ore")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(30*20);

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

    // FIXME: add to gtec and then remove from here:
    greg.electric_blast_furnace("platinum_residue_full_dust")
        .itemInputs("2x gtec:platinum_residue_dust")
        .itemInputs("gtec:potassium_disulfate_dust")
        .circuit(3)
        .itemOutputs("2x gtec:leach_residue_dust")
        .outputFluids("gtceu:rhodium_sulfate 720")
        .blastFurnaceTemp(775)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(400);

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

    // gtec-ex fix for sifting changes the platinum line slightly
    // qs made salt -> metallic powder, but in gtec, salt -> refined salt -> metallic powder
    // this will break the recycling on existing platinum chains

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

    // create a source of yttrium chained onto the lanthanides
    // yttrium is not technically a lanthanide, but it's almost always found
    // along with them in minerals, and behaves a lot like them..  yttrium
    // is necessary for YBC and for one of the alloys used in the PCD

    event.remove({id: "gtec:large_chemical_reactor/samaric_residue_bastnasite_line_completion"})
    greg.large_chemical_reactor("samaric_residue_yttrium")
        .itemInputs("4x gtec:nitrogenated_samarium_terbium_mixture_dust")
        .itemInputs("gtceu:copper_dust")
        .itemOutputs("2x gtec:terbium_nitrate_dust")
        .itemOutputs("2x gtec:samaric_residue_dust")
        .itemOutputs("2x gtceu:euxenite_dust")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(160*20)

});