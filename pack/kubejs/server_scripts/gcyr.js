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


    // coal tar has a conflict between gt-- and gcyr

    event.remove({id: "gtceu:distillery/distill_coal_tar_to_anthracene"});
    event.remove({id: "gtceu:distillation_tower/distill_coal_tar"});

    greg.distillation_tower("distill_coal_tar")
        .inputFluids("gtceu:coal_tar 1000")
        .outputFluids("gtceu:naphthalene 300")
        .outputFluids("gtceu:hydrogen_sulfide 300")
        .outputFluids("gtceu:creosote 200")
        .outputFluids("gtceu:phenol 100")
        .outputFluids("gcyr:durene 100")
        .outputFluids("gtceu:anthracene 50")
        .itemOutputs("gtceu:small_coke_dust")
        .EUt(120)
        .duration(80);

    // planetary air
    greg.gas_collector("collect_mars_air")
        .dimension("gcyr:mars")
        .outputFluids("gtceu:mars_air 10000")
        .circuit(4)
        .EUt(64)
        .duration(200);

    greg.gas_collector("collect_venus_air")
        .dimension("gcyr:venus")
        .outputFluids("gtceu:venus_air 10000")
        .circuit(5)
        .EUt(64)
        .duration(200);

    greg.centrifuge("separate_mars_air")
        .inputFluids("gtceu:mars_air 10000")
        .outputFluids("gtceu:carbon_dioxide 3900")
        .outputFluids("gtceu:nitrogen 1000")
        .EUt(120)
        .duration(1600);

    greg.centrifuge("separate_venus_air")
        .inputFluids("gtceu:venus_air 10000")
        .outputFluids("gtceu:carbon_dioxide 3900")
        .outputFluids("gtceu:sulfur_dioxide 1000")
        .EUt(120)
        .duration(1600);

    greg.vacuum_freezer("freeze_mars_air")
        .inputFluids("gtceu:mars_air 4000")
        .outputFluids("gtceu:liquid_mars_air 4000")
        .EUt(1920)
        .duration(80);

    greg.vacuum_freezer("freeze_venus_air")
        .inputFluids("gtceu:venus_air 4000")
        .outputFluids("gtceu:liquid_venus_air 4000")
        .EUt(1920)
        .duration(80);

    greg.distillation_tower("distill_liquid_mars_air")
        .inputFluids("gtceu:liquid_mars_air 100000")
        .outputFluids("gtceu:carbon_dioxide 72000")
        .outputFluids("gtceu:nitrogen 10000")
        .outputFluids("gtceu:methane 7500")
        .outputFluids("gtceu:carbon_monoxide 7500")
        .outputFluids("gtceu:argon 2500")
        .outputFluids("gtceu:neon 500")
        .chancedOutput("gtceu:granite_red_dust", 2000, 500)
        .EUt(1920)
        .duration(2000);

    greg.distillation_tower("distill_liquid_venus_air")
        .inputFluids("gtceu:liquid_venus_air 100000")
        .outputFluids("gtceu:carbon_dioxide 72000")
        .outputFluids("gtceu:coal_gas 10000")
        .outputFluids("gtceu:nitrogen 7500")
        .outputFluids("gtceu:sulfur_dioxide 7500")
        .outputFluids("gtceu:argon 2500")
        .outputFluids("gtceu:hydrofluoric_acid 500")
        .chancedOutput("gtceu:silicon_dioxide_dust", 2000, 500)
        .EUt(1920)
        .duration(2000);

});