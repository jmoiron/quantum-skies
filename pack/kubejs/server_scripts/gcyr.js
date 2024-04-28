priority: 0

ServerEvents.recipes(event => {
    // gregicality rocketry support
    // VAB recipes are in multiblocks/vab.js

    let greg = event.recipes.gtceu;

    greg.assembler("launch_pad")
        .itemInputs("3x minecraft:yellow_concrete")
        .itemInputs("3x minecraft:black_concrete")
        .itemInputs("gtceu:stainless_steel_frame")
        .itemOutputs("2x gcyr:launch_pad")
        .inputFluids("gtceu:epoxy 144")
        .EUt(480)
        .duration(200);

    // replace the rocket scanner recipe to make it HV
    event.remove({output: "gcyr:rocket_scanner"});

    event.shaped("gcyr:rocket_scanner",
        ["LCL", "CHC", "PCP"],
        {
            L: "gcyr:launch_pad",
            C: "#gtceu:circuits/hv",
            H: "gtceu:hv_machine_hull",
            P: "gtceu:stainless_steel_plate",
        }
    );

    event.remove({type: "gtceu:chemical_bath", outputs: "gcyr:fiberglass"});

    event.recipes.gtceu.chemical_bath("fiberglass_hv_tier")
        .itemInputs("2x gtceu:silicon_dioxide_dust")
        .inputFluids("gtceu:epoxy 250")
        .outputFluids("gcyr:fiberglass 250")
        .EUt(480)
        .duration(400);

    event.recipes.gtceu.forge_hammer("moon_stone_to_sand")
        .itemInputs("gcyr:moon_stone")
        .itemOutputs("gcyr:moon_sand")
        .EUt(16)
        .duration(10);
   
    event.recipes.gtceu.forge_hammer("moon_sand_to_regolith_block")
        .itemInputs("gcyr:moon_sand")
        .itemOutputs("gtceu:moon_regolith_block")
        .EUt(16)
        .duration(10);
    
    event.remove({type: "gtceu:macerator", output: "gtceu:moon_regolith_dust"});
    
    event.recipes.gtceu.macerator("moon_regolith_block_to_dust")
        .itemInputs("gtceu:moon_regolith_block")
        .itemOutputs("4x gtceu:moon_regolith_dust")
        .EUt(16)
        .duration(10);
    
    event.recipes.gtceu.macerator("mars_regolith_to_dust")
        .itemInputs("gcyr:mars_regolith")
        .itemOutputs("4x gtceu:mars_regolith_d_dust")
        .EUt(16)
        .duration(10);
    
});