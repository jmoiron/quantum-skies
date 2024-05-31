priority: 0

ServerEvents.recipes(event => {
    // gregicality rocketry support
    // VAB recipes are in multiblocks/vab.js

    let greg = event.recipes.gtceu;

    event.remove({output: "gcyr:launch_pad"});

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

    ["gcyr:space_fabric", "gcyr:space_upgrade_smithing_template"].forEach(item => {
        event.replaceInput({output: item},
            "gtceu:polybenzimidazole_foil",
            "gtceu:silicone_rubber_foil"
        );
    });

    event.replaceInput({output: "gcyr:space_chestplate"},
        "gtceu:tungstensteel_fluid_cell",
        "gtceu:stainless_steel_fluid_cell"
    );

    ["helmet", "chestplate", "boots", "leggings"].forEach(piece => {
        event.replaceInput({output: `gcyr:space_${piece}`},
            "#gtceu:circuits/ev",
            "#gtceu:circuits/hv"
        )
    });


    // the builtin electrolizer decomposition creates more than what you get
    event.remove({id: "gtceu:electrolyzer/decomposition_electrolyzing_co_mn_br_catalyst"});

    event.recipes.gtceu.electrolyzer("decomposition_electrolyzing_co_mn_br_catalyst_fixed")
        .inputFluids("gcyr:co_mn_br_catalyst 4000")
        .outputFluids("gcyr:manganese_bromide 1000")
        .outputFluids("gcyr:cobalt_bromide 1000")
        .EUt(60)
        .duration(140);


    // lower tier of some recipes to make moon available at HV
    event.remove({id: "gcyr:chemical_bath/fiberglass"});

    greg.chemical_bath("fiberglass_hv_tier")
        .itemInputs("2x gtceu:silicon_dioxide_dust")
        .inputFluids("gtceu:epoxy 250")
        .outputFluids("gcyr:fiberglass 250")
        .EUt(480)
        .duration(400);

    event.remove({id: "gtceu:centrifuge/brominated_brine"});
    greg.centrifuge("brominated_brine_hv")
        .inputFluids("gtceu:iodine_brine_mixture 1000")
        .outputFluids("gtceu:brominated_brine 1000", "gtceu:iodine_slurry 300")
        .EUt(256)
        .duration(120);

    event.remove({id: "gtceu:dehydrator/iodine"});
    greg.dehydrator("iodine_hv")
        .inputFluids("gtceu:iodine_slurry 1000")
        .itemOutputs("gtceu:iodine_dust")
        .EUt(320)
        .duration(200);


    greg.forge_hammer("moon_stone_to_sand")
        .itemInputs("gcyr:moon_stone")
        .itemOutputs("gcyr:moon_sand")
        .EUt(16)
        .duration(10);

    greg.forge_hammer("moon_sand_to_regolith_block")
        .itemInputs("gcyr:moon_sand")
        .itemOutputs("gtceu:moon_regolith_block")
        .EUt(16)
        .duration(10);

    event.remove({type: "gtceu:macerator", output: "gtceu:moon_regolith_dust"});

    greg.macerator("moon_regolith_block_to_dust")
        .itemInputs("gtceu:moon_regolith_block")
        .itemOutputs("4x gtceu:moon_regolith_dust")
        .EUt(16)
        .duration(10);

    greg.macerator("mars_regolith_to_dust")
        .itemInputs("gcyr:mars_regolith")
        .itemOutputs("4x gtceu:mars_regolith_d_dust")
        .EUt(16)
        .duration(10);

    greg.forge_hammer("venus_stone_to_cobble")
        .itemInputs("gcyr:venus_rock")
        .itemOutputs("gcyr:venus_cobblestone")
        .EUt(16)
        .duration(10);

    greg.forge_hammer("venus_cobble_to_sand")
        .itemInputs("gcyr:venus_cobblestone")
        .itemOutputs("gcyr:venus_sand")
        .EUt(16)
        .duration(10);

    greg.forge_hammer("venus_sand_to_regolith")
        .itemInputs("gcyr:venus_sand")
        .itemOutputs("gcyr:venusian_regolith")
        .EUt(16)
        .duration(10);

    greg.macerator("venus_regolith_block_to_dust")
        .itemInputs("gcyr:venusian_regolith")
        .itemOutputs("4x gtceu:venus_regolith_d_dust")
        .EUt(16)
        .duration(10);

});