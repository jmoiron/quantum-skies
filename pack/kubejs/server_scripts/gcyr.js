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
    
});