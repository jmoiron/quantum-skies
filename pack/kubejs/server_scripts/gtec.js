priority: 0

ServerEvents.recipes(event => {
    // gregtech extended chemistry support

    let sludgeChem = [
        ["gtceu:purified_pentlandite_ore", 2, "gtceu:sulfuric_nickel_solution"],
        ["gtceu:purified_tetrahedrite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_chalcocite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_bornite_ore", 2, "gtceu:sulfuric_copper_solution"],
        ["gtceu:purified_chalcopyrite_ore", 2, "gtceu:sulfuric_copper_solution"],
        // sheldonite is disabled by gtec
    ]

    event.remove({type: "gtceu:chemical_bath", input: "gtceu:crushed_cooperite_ore"});

    event.recipes.gtceu.chemical_bath("cooperite_mercury_modified")
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

    event.recipes.gtceu.electrolyzer("decomposition_electrolyzing_monazite")
        .inputFluids("gtec:diluted_monazite_rare_earth_mud 1000")
        .chancedOutput("gtec:monazite_sulfate_dust", 9000, 10)
        .chancedOutput("gtceu:silicon_dioxide_dust", 7500, 10)
        .chancedOutput("gtceu:rutile_dust", 100, 10)
        .chancedOutput("gtec:red_zircon_dust", 500, 10)
        .chancedOutput("gtceu:ilmenite_dust", 100, 10)
        .EUt(1920)
        .duration(200);

    // add missing recipe for ammonium nitrate solution
    event.recipes.gtceu.chemical_reactor("ammonium_nitrate")
        .inputFluids("gtceu:ammonia 1000")
        .inputFluids("gtceu:nitric_acid 1000")
        .outputFluids("gtec:ammonium_nitrate_solution 1000")
        .EUt(400)
        .duration(30);

    event.recipes.gtceu.electrolyzer("decomposition_electrolyzing_ammonium_nitrate")
        .inputFluids("gtec:ammonium_nitrate_solution 1000")
        .outputFluids("gtceu:ammonia 1000")
        .outputFluids("gtceu:nitric_acid 1000")
        .EUt(480)
        .duration(600);

    // vanilla GC yields vs GTEC yields:

    // platinum + palladium
    // vanilla:
    // sheldonite dust 6x -> 3x platinum, 1x palladium
    // gtec:
    // sheldonite dust 6x -> 3x platinum metallic, 1x palladium salt
    // sheldonite dust 36x -> 18x plat metallic + 6x palladium salt
    //    9x PM -> 9KL PlatConcentrate + 1x Plat Residue (<- sheldonite 18x)
    //    18KL PlatCon -> 16x PlatSalt + 4x PtCl (2x platinum) (<- sheldonite 36x)
    //                 -> 3.6KL Palladium Ammonia
    //    16 PlatSalt -> ~10 Plat Salt -> ~10 plat metallic
    //                -> (1x platinum) + 1.8KL Palladium Ammonia + 8x PlatSalt (-> 5x)
    //                -> (0.5x platinum) + 0.9KL Palladium Ammonia + 4x PlatSalt (-> 2x)
    //    9KL Palladium Ammonia + 9x Palladium metallic -> 16 + 4 (2x palladium)
    //    36x Sheldonite yields ~3.5 Plat, not even 1 palladium

});