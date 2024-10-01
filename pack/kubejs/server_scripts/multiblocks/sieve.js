
ServerEvents.recipes(event => {

    // controller block recipe for the large sieve
    event.shaped(Item.of("gtceu:industrial_sieve"),
        ["CGC", "FXF", "CLC"],
        {
            C: "#gtceu:circuits/hv",
            X: "gtceu:hv_sieve",
            F: "gtceu:stainless_steel_frame",
            G: "gtceu:steel_gearbox",
            L: "gtceu:stainless_steel_large_fluid_pipe",
        }
    );

    // large sieve recipes all take in 250mb lava + 250mb water
    // and then produce chanced outputs, based on the mesh

    let greg = event.recipes.gtceu;

    // MV bus can handle 9 outputs
    // HV can handle 16 (16 is the max for this recipe type)

    greg.industrial_sieve("flint_mesh")
        .itemInputs("minecraft:gravel")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 1", 5000, -250)
        .chancedOutput("gtceu:crushed_magnetite_ore", 3000, 1000)
        .chancedOutput("gtceu:crushed_gold_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_garnierite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_silver_ore", 2000, 700)
        .chancedOutput("gtceu:crushed_lead_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_stibnite_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_sphalerite_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_certus_quartz_ore", 1500, 1000)
        .chancedOutput("ae2:sky_dust", 1000, 500)
        .notConsumable("exnihilosequentia:flint_mesh")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(100);

    greg.industrial_sieve("iron_mesh")
        .itemInputs("minecraft:gravel")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 1", 5000, -250)
        .chancedOutput("gtceu:crushed_ruby_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_redstone_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_emerald_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_diamond_ore", 1500, 700)
        .chancedOutput("gtceu:crushed_beryllium_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_apatite_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_mica_ore", 2000, 1000)
        .notConsumable("exnihilosequentia:iron_mesh")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(100);

    greg.industrial_sieve("aluminium_mesh_gravel")
        .itemInputs("minecraft:gravel")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 1", 5000, -250)
        .chancedOutput("gtceu:crushed_olivine_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_magnetite_ore", 1500, 500)
        .chancedOutput("gtceu:crushed_bentonite_ore", 2000, 500)
        .chancedOutput("gtceu:crushed_glauconite_sand_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_electrotine_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_saltpeter_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_wulfenite_ore", 2000, 1000)
        .notConsumable("kubejs:aluminium_mesh")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(100);

    greg.industrial_sieve("aluminium_mesh_moon")
        .itemInputs("gtceu:moon_regolith_dust")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 1", 5000, -250)
        .chancedOutput("gtceu:crushed_bauxite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_ilmenite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_aluminium_ore", 2500, 1000)
        .chancedOutput("gcyr:crushed_fluorite_ore", 2000, 1000)
        .notConsumable("kubejs:aluminium_mesh")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(100);

    greg.industrial_sieve("titanium_mesh_moon")
        .itemInputs("gtceu:moon_regolith_dust")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 1", 5000, -250)
        .chancedOutput("gtceu:plutonium_dust", 1500, 1000)
        .chancedOutput("gtceu:crushed_cooperite_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_monazite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_bastnasite_ore", 2500, 1000)
        .notConsumable("kubejs:titanium_mesh")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(200);

    // titanium mesh is an EV recipe..
    // gameplay loop should be to lock this replenishable recipe to mars
    greg.industrial_sieve("titanium_mesh_mars")
        .itemInputs("gtceu:mars_regolith_d_dust")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 2", 5000, -250)
        .chancedOutput("gtceu:crushed_tungstate_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_scheelite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_neodymium_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_cobaltite_ore", 2000, 1000)
        .notConsumable("kubejs:titanium_mesh")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150);

    // titanium mesh is an EV recipe..
    // gameplay loop should be to lock this replenishable recipe to mars
    greg.industrial_sieve("titanium_mesh_venus")
        .itemInputs("gtceu:venus_regolith_d_dust")
        .inputFluids("minecraft:water 250", "minecraft:lava 250")
        .chancedFluidInput("gtceu:lubricant 2", 5000, -250)
        .chancedOutput("gtceu:crushed_tungstate_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_scheelite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_neodymium_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_cobaltite_ore", 2000, 1000)
        .notConsumable("kubejs:titanium_mesh")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150);

});