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

    function hammer(recipe, from, to) {
        greg.forge_hammer(recipe).itemInputs(from).itemOutputs(to)
            .EUt(16).duration(10);
    }

    function macerate(recipe, from, to) {
        greg.macerator(recipe).itemInputs(from).itemOutputs(to)
            .EUt(16).duration(10);
    }

    hammer("moon_stone_to_sand", "gcyr:moon_stone", "gcyr:moon_sand")
    hammer("moon_sand_to_regolith_block", "gcyr:moon_sand", "gtceu:moon_regolith_block");

    event.remove({type: "gtceu:macerator", output: "gtceu:moon_regolith_dust"});

    macerate("moon_regolith_block_to_dust", "gtceu:moon_regolith_block", "4x gtceu:moon_regolith_dust");
    macerate("mars_regolith_to_dust", "gcyr:mars_regolith", "4x gtceu:mars_regolith_d_dust");

    // break down mars rock
    hammer("mars_rock_to_cobble", "gcyr:martian_rock", "gcyr:martian_cobblestone");
    hammer("mars_cobble_to_regolith", "gcyr:martian_cobblestone", "gcyr:mars_regolith");
    macerate("venus_regolith_to_dust", "gcyr:mars_regolith", "4x gtceu:mars_regolith_d_dust");

    // break down venus rock
    hammer("venus_stone_to_cobble", "gcyr:venus_rock", "gcyr:venus_cobblestone");
    hammer("venus_cobble_to_sand", "gcyr:venus_cobblestone", "gcyr:venus_sand");
    hammer("venus_sand_to_regolith", "gcyr:venus_sand", "gcyr:venusian_regolith");
    macerate("venus_regolith_block_to_dust", "gcyr:venusian_regolith", "4x gtceu:venus_regolith_d_dust");

});