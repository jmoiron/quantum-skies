/*
File containing multiblocks, recipes, and extra chemistry for planetary drills
and their support machinery.

A Planetary Core Drill (planet core drill) is a type of void miner that produces resources
endlessly, provided power and lubricant.  Resources vary by planet.

Ordinary drilling fluid is not enough for the high temperature application of a planetary
drill, so new lubricants must be used (different ones in different planets) that involve
the base GT machines, but also a ChemPlant and a support multiblock the Mudpit.

Several of the steps should have dimensional requirements to force the construction of
off-world infrastructure..  eg. the mudpit, chemplant, and drill itself are large
complex structures.

A quick search on the subject yields the following materials and their purposes, which
can be used to provide some spice to the processing chains.  We should probably require
that some of these materials are gathered on-world first.

- oil muds contain a base-oil, brine, lime, emulsifier, wetting agent, and viscosifier
- surfactants are added to drilling muds to emulsify water and prevent instability

- diesel, base-oil used in diesel-oil mud
- kerosene, base-oil also used in diesel-oil mud
- poly-alpha-olefin (PAO), better for enviro/health/safety, can be hydrogenated/hydrocracked
- perfluoropolyether (PFPE), high oxidation stability base oil
- water based drilling fluid

- barite, used to control for oil mud viscosity (adds weight)
- bentonite, added to oil based muds
- calcium carbonate (calcite) can be added
- lime (quicklime)
- soda ash
- hydrochloric acid to control for PH
- bitumen (asphalt), another component in diesel-oil mud
- sulphonated asphalt, a blend of sulphonated asphalt, polymers, and "other additives"

Intended mechanics:

Drill, Mudpit, and potentially other supporting infrastructure have dimensional
requirements and must be on-world.

The drill takes mud and a drill tip.  It outputs 50-75% of its hot mud (tier based?),
and chance outputs the tip, with higher chances for better tips;  only a few tips are
usable, and some may not be usable in all environments.  The hot mud can be cooled in
a freezer for re-use to cut down on mud requirements.

Also output is a large amt of planet oriented materials;  regolith, ores, potentially
magmas that can be centrifuged, etc.

Open questions:
* how much chem should be done in chem reactors, chem plant, etc? vs the final mixing
  in the mudpit?

Intended drilling fluids are as follows:

moon -> Diesel-oil Mud, which uses drilling fluid, kerosene, diesel, bitumen and soda ash.
    Bitumen is produced by heating heavy oil in a fluid heater to create hot crude oil,
    and then distilling it (which should yield other useful heavy petrochem fluids).

mars -> ? PAO

venus -> ? PFPE

mercury -> ? PFPE

Asteroids, if we can add them, should have martian requirements.  I don't think it's interesting
to set up the same thing 12 times for progress, but if we can get the jovian moons + titan going,
we should add some support for them.  By the time someone as technology to do harvesting out
that far, they should have access to orbital drills, which will require higher tier tech and more
power, but be simpler to set up.

*/


ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

    // are we going to make higher tiers of this?  it seems like it doesn't matter
    greg.assembler("planetary_core_drill_1")
        .itemInputs(
            "gtceu:ev_large_miner", // this has a tungsten gear requirement
            "16x gtceu:platinum_normal_item_pipe",
            "16x gtceu:titanium_normal_fluid_pipe",
            "2x gtceu:long_distance_item_pipeline_endpoint",
            "2x gtceu:long_distance_fluid_pipeline_endpoint",
            "gtceu:ender_fluid_link_cover"
        )
        .itemOutputs("gtceu:planetary_core_drill")
        .EUt(1920)
        .duration(1200);

    greg.assembler("mudpit_1")
        .itemInputs(
            "gtceu:ev_centrifuge",
            "gtceu:ev_mixer",
            "gtceu:ev_fluid_heater",
            "2x gtceu:ev_fluid_regulator",
            "4x gtceu:titanium_frame",
            "4x gtceu:watertight_casing"
        )
        .itemOutputs("gtceu:mudpit")
        .EUt(1920)
        .duration(400);

    // mudpit polymer/petro chem

    greg.fluid_heater("hot_heavy_oil")
        .inputFluids("gtceu:oil_heavy 1000")
        .outputFluids("gtceu:hot_heavy_oil 1000")
        .EUt(480)
        .duration(30);

    // distilling hot heavy oil into things
    greg.distillation_tower("hot_heavy_oil_distillation")
        .inputFluids("gtceu:hot_heavy_oil 1000")
        .outputFluids("gtceu:bitumen 500")
        .outputFluids("gtceu:lubricating_oil 250")
        .outputFluids("gtceu:sulfuric_heavy_fuel 200")
        .outputFluids("gtceu:sulfuric_light_fuel 50")
        .chancedOutput("gtceu:tiny_oilsands_dust", 100, 100)
        .EUt(288)
        .duration(20);

    greg.distillation_tower("lubricating_oil_distillation")
        .inputFluids("gtceu:lubricating_oil 1000")
        .outputFluids("gtceu:lubricant 900")
        .outputFluids("gtceu:sulfuric_heavy_fuel 80")
        .outputFluids("gtceu:sulfuric_light_fuel 20")
        .EUt(120)
        .duration(120);

    greg.chemical_reactor("ethylene_oxide")
        .inputFluids("gtceu:hypochlorous_acid 500")
        .inputFluids("gtceu:ethylene 1000")
        .inputFluids("gtceu:oxygen 1000")
        .outputFluids("gtceu:ethylene_oxide")
        .EUt(240)
        .duration(200);

    greg.chemical_reactor("ethylene_glycol")
        .inputFluids("gtceu:ethylene_oxide 4000")
        .inputFluids("gtceu:carbon_dioxide 1000")
        .inputFluids("minecraft:water 1000")
        .outputFluids("gtceu:ethylene_glycol 4000")
        .EUt(280)
        .duration(70);

    // tier 1 mud
    greg.mudpit("diesel_oil_mud")
        .inputFluids("gtceu:lubricating_oil 1000")
        .inputFluids("gtceu:ethylene_glycol 1000")
        .inputFluids("gtceu:diesel 10000")
        .inputFluids("gtceu:bitumen 5000")
        .itemInputs("gtceu:barite_dust")
        .itemInputs("gtceu:bentonite_dust")
        .outputFluids("gtceu:diesel_oil_mud 12000")
        .dimension("gcyr:luna")
        .EUt(800)
        .duration(100);

    // 1-decene is the basis for PAO, which will be the base oil for tier 2 mud
    greg.chemical_reactor("i_decene")
        .inputFluids("gtceu:ethylene 1000")
        .inputFluids("gtceu:oxygen 4000")
        .chancedInput("gtceu:cupronickel_dust", 2000, -250)
        .chancedInput("gtceu:aluminium_dust", 1000, -100)
        .outputFluids("gtceu:i_decene 1000")
        .EUt(480)
        .duration(300);

    greg.chemical_reactor("boron_trifluoride")
        .inputFluids("gtceu:fluorine 3000")
        .itemInputs("gtceu:boron_dust")
        .outputFluids("gtceu:boron_trifluoride")
        .EUt(480)
        .duration(100);

    const PlantCasingCondition = Java.loadClass("dev.arbor.gtnn.api.recipe.PlantCasingCondition");

    greg.chemical_plant("i_decene_oligomerization")
        .circuit(10)
        .addCondition(PlantCasingCondition(PlantCasingCondition.STEEL))
        .inputFluids("gtceu:i_decene 10000")
        .inputFluids("gtceu:boron_trifluoride 1000")
        .itemOutputs("9x gtceu:i_decene_olefin_sludge_dust")
        .outputFluids("gtceu:fluorine 3000")
        .EUt(480)
        .duration(200);

    greg.chemical_bath("i_decene_solution")
        .itemInputs("3x gtceu:i_decene_olefin_sludge_dust")
        .inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("gtceu:small_boron_dust")
        .outputFluids("gtceu:i_decene_solution 1500")
        .EUt(800)
        .duration(150);

    greg.chemical_reactor("i_decene_solution_hydrogenation")
        .inputFluids("gtceu:hydrogen 4000")
        .inputFluids("gtceu:i_decene_solution 1000")
        .outputFluids("gtceu:hydrogenated_i_decene_solution 2000")
        .EUt(600)
        .duration(300);

    greg.centrifuge("i_decene_tetramer_separation")
        .inputFluids("gtceu:hydrogenated_i_decene_solution 1000")
        .outputFluids("gtceu:i_decene_tetramer 500")
        .outputFluids("gtceu:hydrogen 1000")
        .EUt(320)
        .duration(40);

    [["gcyr:mars", 1], ["gcyr:venus", 2]].forEach(([planet, circuit]) => {
        greg.mudpit(`poly_alpha_olefin_mud_${planet.split(":")[1]}`)
            .circuit(circuit)
            .inputFluids("gtec:calcium_fluoride 1000")
            .inputFluids("gtceu:ethylene_glycol 1000")
            .inputFluids("gtceu:i_decene_tetramer 10000")
            .inputFluids("gtceu:hydrochloric_acid 2000")
            .itemInputs("gtceu:barite_dust")
            .itemInputs("gtceu:quicklime_dust")
            .outputFluids("gtceu:poly_alpha_olefin_mud 12000")
            .dimension(planet)
            .EUt(3200)
            .duration(100);
    })

    greg.vacuum_freezer("tier_1_mud_cooling")
        .inputFluids("gtceu:hot_diesel_oil_mud 1000")
        .outputFluids("gtceu:diesel_oil_mud 1000")
        .EUt(800)
        .duration(200);

    greg.vacuum_freezer("tier_2_mud_cooling")
        .inputFluids("gtceu:hot_poly_alpha_olefin_mud 1000")
        .outputFluids("gtceu:poly_alpha_olefin_mud 1000")
        .EUt(2400)
        .duration(200);

    greg.planetary_core_drill("moon_drill")
        .inputFluids("gtceu:diesel_oil_mud 100")
        .dimension("gcyr:luna")
        .itemOutputs("4x gtceu:moon_regolith_block")
        .chancedOutput("8x gtceu:moon_ilmenite_ore", 8000, 250)
        .chancedOutput("8x gtceu:moon_bauxite_ore", 8000, 250)
        .chancedOutput("16x gtceu:moon_aluminium_ore", 8000, 250)
        .chancedOutput("gtceu:moon_tungstate_ore", 500, 500)
        .chancedOutput("gtceu:moon_scheelite_ore", 500, 500)
        .chancedFluidOutput("gtceu:hot_diesel_oil_mud 100", 6000, 1000)
        .EUt(800)
        .duration(300);

    greg.mixer("hot_diesel_oil_mud_slurry")
        .dimension("gcyr:luna")
        .inputFluids("gtceu:hot_diesel_oil_mud 100")
        .itemInputs("gtceu:stone_dust")
        .itemInputs("4x gtceu:moon_regolith_dust")
        .outputFluids("gtceu:hot_diesel_oil_mud_slurry 100")
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(400);

    greg.centrifuge("hot_diesel_oil_mud_centri")
        .dimension("gcyr:luna")
        .inputFluids("gtceu:hot_diesel_oil_mud_slurry 1000")
        .chancedOutput("gtceu:small_bedrock_dust", 3300, 1100)
        .EUt(GTValues.VHA[GTValues.EV])
        .duration(100);

    greg.planetary_core_drill("mars_drill")
        .inputFluids("gtceu:poly_alpha_olefin_mud 100")
        .dimension("gcyr:mars")
        .itemOutputs("4x gcyr:martian_rock")
        .chancedOutput("8x gtceu:mars_neodymium_ore", 4000, 250)
        .chancedOutput("8x gtceu:mars_tungstate_ore", 5000, 250)
        .chancedOutput("8x gtceu:mars_scheelite_ore", 8000, 250)
        .chancedOutput("gtceu:martian_nether_dust", 500, 1000)
        //.chancedOutput("gtceu:naquadah_ore", 500, 500)
        .chancedFluidOutput("gtceu:hot_poly_alpha_olefin_mud 100", 6000, 1000)
        .circuit(1)
        .EUt(1600)
        .duration(300);

    greg.planetary_core_drill("venus_drill")
        .inputFluids("gtceu:poly_alpha_olefin_mud 100")
        .dimension("gcyr:venus")
        .itemOutputs("4x gcyr:venus_rock")
        .chancedOutput("8x gtceu:venus_neodymium_ore", 4000, 250)
        .chancedOutput("8x gtceu:venus_tungstate_ore", 8000, 250)
        .chancedOutput("8x gtceu:venus_scheelite_ore", 5000, 250)
        .chancedOutput("gtceu:venusian_star_dust", 500, 1000)
        //.chancedOutput("gtceu:naquadah_ore", 500, 500)
        .chancedFluidOutput("gtceu:hot_poly_alpha_olefin_mud 100", 6000, 1000)
        .circuit(2)
        .EUt(1600)
        .duration(300);

});