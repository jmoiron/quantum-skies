ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu;

    const titanMaceration = [
        ["titan_hydrocarbon_sand", "4x gtceu:light_oilsands_dust"],
        ["titan_dirty_ice", "2x gtceu:moon_regolith_dust"],
        ["titan_cryorock", "4x gtceu:titan_cryorock_dust"],
        ["titan_boulder_conglomerate", "7x gtceu:titan_boulder_conglomerate_dust"]
    ];

    titanMaceration.forEach(([block, output]) => {
        greg.macerator(`${block}_to_dust`)
            .itemInputs(`kubejs:${block}`)
            .itemOutputs(output)
            .EUt(GTValues.VHA[GTValues.HV])
            .duration(20 * 6);
    });

    greg.forge_hammer("titan_hydrocarbon_sandstone_to_sand")
        .itemInputs("kubejs:titan_hydrocarbon_sandstone")
        .itemOutputs("kubejs:titan_hydrocarbon_sand")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(20 * 2);

    greg.macerator("methane_clathrate_to_dust")
        .itemInputs("kubejs:methane_clathrate")
        .itemOutputs("2x gtceu:light_oilsands_dust")
        .chancedOutput("gtceu:moon_regolith_dust", 4500, 250)
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(20 * 6);

    greg.electrolyzer("titan_cryorock_decomposition")
        .itemInputs("4x gtceu:titan_cryorock_dust")
        .itemOutputs("2x gtceu:stone_dust", "gtceu:ice_dust")
        .outputFluids("gtceu:methane 100")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20 * 12);

    greg.centrifuge("titan_boulder_conglomerate_decomposition")
        .itemInputs("7x gtceu:titan_boulder_conglomerate_dust")
        .itemOutputs(
            "3x gtceu:stone_dust",
            "2x gtceu:olivine_dust",
            "gtceu:iron_dust",
            "gtceu:nickel_dust"
        )
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20 * 12);

    greg.centrifuge("methane_clathrate_decomposition")
        .itemInputs("kubejs:methane_clathrate")
        .itemOutputs("gtceu:stone_dust")
        .outputFluids("gtceu:methane 250")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(20 * 8);

    // Titan selenide refining is modeled after copper-adjacent selenium recovery:
    // roast a copper-rich selenide concentrate, recover anode-slime-like residue,
    // then branch into selenium and tellurium refining from that residue.
    greg.electric_blast_furnace("titanean_selenide_roasting")
        .itemInputs("6x gtceu:titanean_selenide_dust")
        .inputFluids("gtceu:oxygen 2000")
        .itemOutputs(
            "2x gtceu:copper_dust",
            "gtceu:copper_anode_slime_dust"
        )
        .blastFurnaceTemp(1200)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20 * 18);

    greg.centrifuge("copper_anode_slime_separation")
        .itemInputs("gtceu:copper_anode_slime_dust")
        .itemOutputs("gtceu:selenium_dioxide_dust")
        .chancedOutput("gtceu:tellurium_dioxide_dust", 1500, 0)
        .chancedOutput("gtceu:copper_dust", 5000, 250)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20 * 12);

    greg.chemical_reactor("selenium_dioxide_hydration")
        .itemInputs("gtceu:selenium_dioxide_dust")
        .inputFluids("minecraft:water 1000")
        .outputFluids("gtceu:selenious_acid 1000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20 * 8);

    greg.chemical_reactor("selenious_acid_reduction")
        .inputFluids("gtceu:selenious_acid 1000")
        .inputFluids("gtceu:sulfur_dioxide 1000")
        .itemOutputs("gtceu:selenium_dust")
        .outputFluids("gtceu:sulfuric_acid 1000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20 * 10);

    greg.chemical_reactor("tellurium_dioxide_reduction")
        .itemInputs("gtceu:tellurium_dioxide_dust")
        .inputFluids("gtceu:hydrogen 2000")
        .itemOutputs("gtceu:tellurium_dust")
        .outputFluids("minecraft:water 1000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20 * 10);
});
