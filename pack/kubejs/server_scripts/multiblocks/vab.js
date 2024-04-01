
ServerEvents.recipes(event => {

    // controller block recipe for the vab
    event.shaped(Item.of("gtceu:vehicle_assembly_building"),
        ["CGC", "FXF", "CLC"],
        {
            C: "#gtceu:circuits/hv",
            X: "gtceu:hv_assembler",
            F: "gtceu:stainless_steel_frame",
            G: "gtceu:steel_gearbox",
            L: "gtceu:filter_casing",
        }
    );

    let greg = event.recipes.gtceu;

    greg.vehicle_assembly_building("rocket_engine")
        .inputItems()

    /*
    greg.industrial_sieve("flint_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
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
        .EUt(480)
        .duration(300)

    greg.industrial_sieve("iron_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:crushed_ruby_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_redstone_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_emerald_ore", 1500, 1000)
        .chancedOutput("gtceu:crushed_diamond_ore", 1500, 700)
        .chancedOutput("gtceu:crushed_beryllium_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_apatite_ore", 1500, 1000)
        .notConsumable("exnihilosequentia:iron_mesh")
        .EUt(480)
        .duration(300)
    
    greg.industrial_sieve("aluminium_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:crushed_bauxite_ore", 2000, 1000)
        //.chancedOutput("gcyr:crushed_fluorite_ore", 2000, 1000)
        .notConsumable("kubejs:aluminium_mesh")
        .EUt(480)
        .duration(300)

    // titanium mesh is an EV recipe
    greg.industrial_sieve("titanium_mesh")
        .inputFluids("minecraft:water 250", "minecraft:lava 250", "gtceu:lubricant 2")
        .chancedOutput("gtceu:plutonium_dust", 1500, 1000)
        .chancedOutput("gtceu:crushed_cooperite_ore", 2000, 1000)
        .chancedOutput("gtceu:crushed_monazite_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_tungstate_ore", 2500, 1000)
        .chancedOutput("gtceu:crushed_scheelite_ore", 2500, 1000)
        .notConsumable("kubejs:titanium_mesh")
        .EUt(1920)
        .duration(300)
    */

});