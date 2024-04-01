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

    
});