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

    // this recipe invalidates the rest of the rhodium line

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

});