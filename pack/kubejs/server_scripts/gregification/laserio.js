
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;

    event.remove({output: "laserio:card_energy"})

    event.replaceInput(
        {mod: "laserio", input: "minecraft:gold_nugget"},
        "minecraft:gold_nugget",
        "gtceu:gold_plate",
    )
    
    const removals = [
      "laserio:logic_chip_raw", 
      "laserio:logic_chip", 
      "laserio:laser_connector",
      "laserio:laser_node",
      "laserio:laser_wrench",
      "laserio:overclocker_card",
      "laserio:laser_connector_advanced",
      "laserio:overclocker_node"
    ];
    
    removals.forEach((item) => event.remove({output: `${item}`}))

    event.shaped("laserio:laser_connector_advanced",
        ["PSP", "RLR", "GGG"],
        {
            P: "minecraft:ender_pearl",
            S: "minecraft:nether_star",
            R: "minecraft:redstone",
            L: "laserio:laser_connector",
            G: "gtceu:double_gold_plate",
        }
    )

    greg.circuit_assembler("logic_chip")
        .itemInputs(
            "#gtceu:circuits/mv", 
            "4x minecraft:redstone", 
            "2x minecraft:clay_ball", 
            "8x gtceu:gold_single_wire"
        )
        .itemOutputs("4x laserio:logic_chip")
        .EUt(30)
        .duration(100)

    greg.assembler("laser_connector")
        .itemInputs(
            "3x gtceu:iron_plate",
            "2x minecraft:redstone",
            "#forge:glass",
            "laserio:logic_chip"
        )
        .itemOutputs("laserio:laser_connector")
        .EUt(30)
        .duration(100)

    greg.assembler("laser_node")
        .itemInputs(
            "gtceu:steel_frame",
            "laserio:laser_connector",
            "minecraft:redstone_block"
        )
        .itemOutputs("laserio:laser_node")
        .EUt(30)
        .duration(100)

    event.shaped("laserio:laser_wrench",
        [" RC", " BR", "B  "],
        {
            R: "minecraft:redstone",
            B: "gtceu:steel_rod",
            C: "laserio:logic_chip"
        }
    )

    greg.forming_press("node_overclocker")
        .itemInputs("minecraft:diamond_block", "laserio:logic_chip")
        .itemOutputs("laserio:overclocker_node")
        .EUt(120)
        .duration(200)
    
    greg.forming_press("card_overclocker")
        .itemInputs("minecraft:gold_block", "laserio:logic_chip")
        .itemOutputs("laserio:overclocker_card")
        .EUt(120)
        .duration(200)

})