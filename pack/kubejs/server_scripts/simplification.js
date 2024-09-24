priority: 0

ServerEvents.recipes(event => {
    // these recipes are aimed at smoothing out the early game and
    // reducing tedium pre-steam era

    // make the early pump & conveyor easier
    event.remove({output: "ulvcovm:ulv_electric_pump"});
    event.remove({output: "ulvcovm:ulv_conveyor_module"});

    event.shaped("ulvcovm:ulv_conveyor_module",
        ["RR ", "MW ", "   "],
        {
            R: "gtceu:sticky_resin",
            M: "ulvcovm:ulv_electric_motor",
            W: "gtceu:tin_single_wire",
        }
    )

    event.shaped("ulvcovm:ulv_electric_pump",
        ["SR ", "MP ", "   "],
        {
            S: "gtceu:copper_screw",
            R: "gtceu:copper_rotor",
            M: "ulvcovm:ulv_electric_motor",
            P: "gtceu:copper_normal_fluid_pipe",
        }
    )

    event.shaped("gtceu:ulv_input_bus",
        [" C ", " H ", "   "],
        {
            C: "minecraft:chest",
            H: "gtceu:ulv_machine_hull",
        }
    );
    event.shaped("gtceu:ulv_output_bus",
        [" H ", " C ", "   "],
        {
            C: "minecraft:chest",
            H: "gtceu:ulv_machine_hull",
        }
    );
    event.shaped("gtceu:ulv_input_hatch",
        [" C ", " H ", "   "],
        {
            C: "minecraft:glass",
            H: "gtceu:ulv_machine_hull",
        }
    );
    event.shaped("gtceu:ulv_output_hatch",
        [" H ", " C ", "   "],
        {
            C: "minecraft:glass",
            H: "gtceu:ulv_machine_hull",
        }
    );


    // make tom's storage available at steam compressor
    event.replaceInput(
        {mod: "toms_storage"},
        "minecraft:ender_pearl",
        "ae2:ender_dust"
    )

    event.shaped("16x minecraft:stick", ["A", "A"], {A: Ingredient.of("#minecraft:logs")})
    event.shapeless("4x minecraft:clay_ball", ["minecraft:clay"])

    // move charcoal to the blaster as a halfway balancing option
    event.remove({type: "minecraft:smelting", output: "charcoal"})
    event.blasting("minecraft:charcoal", "#minecraft:logs_that_burn")

    // smelting nuggets sucks lets use the blaster
    event.blasting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot")

    // make nether bricks pre-steel to make water distribution
    // with entangled earlier than the PBF
    //
    // want people to be make basic clay automation for PBF without
    // bunching everything up on their pump
    event.blasting("minecraft:nether_brick", "minecraft:netherrack")

    event.remove({output: "clickmachine:auto_clicker"});
    event.shaped("clickmachine:auto_clicker",
        [
            'DDD',
            'POR',
            'DDD'
        ],
        {
            D: "minecraft:diorite",
            P: "minecraft:dispenser",
            O: "minecraft:observer",
            R: "minecraft:dropper",
        },
    )

    // use logs to make 4 chests
    event.shaped("4x minecraft:chest",
        ["LLL", "L L", "LLL"],
        {L: "#minecraft:logs"}
    )

    let creoCell = Item.of('gtceu:fluid_cell', '{Fluid:{Amount:1000,FluidName:"gtceu:creosote"}}')
    // allows for crafting of wood planks with (stackable) creosote cells
    event.shaped("8x gtceu:treated_wood_planks",
        ["WWW", "WCW", "WWW"],
        {
            W: "#minecraft:planks",
            C: creoCell.strongNBT()
        }
    ).replaceIngredient({item: creoCell}, "gtceu:fluid_cell")

    let waterCell = Item.of('gtceu:fluid_cell', '{Fluid:{Amount:1000,FluidName:"minecraft:water"}}')
    // allows for crafting of paper with stackable water cells
    event.shaped("2x minecraft:paper",
        [" H ", "DDD", " C "],
        {
            H: "#forge:tools/mallets",
            D: "gtceu:paper_dust",
            C: waterCell.strongNBT()
        }
    ).replaceIngredient({item:waterCell}, "gtceu:fluid_cell")

});