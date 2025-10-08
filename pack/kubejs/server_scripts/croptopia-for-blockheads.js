
ServerEvents.recipes(event => {
    let greg = event.recipes.gtceu;
    let VHA = GTValues.VHA

    event.remove({output: "cookingforblockheads:white_kitchen_floor"});

    greg.assembler("cfb_kitchen_floor")
        .itemInputs("2x minecraft:black_concrete")
        .itemInputs("2x minecraft:white_concrete")
        .inputFluids("gtceu:concrete 576")
        .itemOutputs("4x cookingforblockheads:white_kitchen_floor")
        .EUt(VHA[GTValues.LV]);

    const replacements = {
        "#forge:chests/wooden": "gtceu:wood_crate",
        "minecraft:iron_nugget": "gtceu:iron_screw",
        "#minecraft:wooden_slabs": "gtceu:wood_plate",
        "minecraft:iron_ingot": "gtceu:iron_plate",
        "minecraft:comparator": "gtceu:lv_voltage_coil",
    }

    Object.entries(replacements).forEach(([k,v]) => {
        event.replaceInput({mod: "cookingforblockheads"}, k, v)
    })

})