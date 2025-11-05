
ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

    let ingredients = {
        I: "gtceu:iron_plate",
        R: "gtceu:redstone_plate",
        P: "minecraft:paper",
        C: "gtceu:bronze_crate",
        L: "gtceu:lapis_plate",
        D: "gtceu:diamond_plate",
        A: "ae2:ender_dust",
        E: "gtceu:emerald_plate",
    }

    event.remove({mod: "buildinggadgets2"})

    event.shaped("buildinggadgets2:template_manager",
        ["IRI", "PCP", "ILI"],
        take(ingredients, "IRPCL"),
    )

    event.shaped("buildinggadgets2:gadget_building",
        ["IRI", "DRD", "ILI"],
        take(ingredients, "IRDL")
    )

    event.shaped("buildinggadgets2:gadget_exchanging",
        ["IRI", "DLD", "ILI"],
        take(ingredients, "IRDL")
    )

    greg.assembler("copypasta")
        .itemInputs("buildinggadgets2:gadget_building")
        .itemInputs("buildinggadgets2:gadget_exchanging")
        .itemInputs("minecraft:paper")
        .inputFluids("gtceu:glue 144")
        .itemOutputs("buildinggadgets2:gadget_copy_paste")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(100);

    greg.assembler("cutpasta")
        .itemInputs("minecraft:shears")
        .itemInputs("buildinggadgets2:gadget_copy_paste")
        .inputFluids("gtceu:glue 144")
        .itemOutputs("buildinggadgets2:gadget_cut_paste")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(100);

    greg.assembler("destruction")
        .itemInputs("gtceu:item_voiding_cover")
        .itemInputs("buildinggadgets2:gadget_cut_paste")
        .inputFluids("gtceu:glue 144")
        .itemOutputs("buildinggadgets2:gadget_destruction")
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(100);

});