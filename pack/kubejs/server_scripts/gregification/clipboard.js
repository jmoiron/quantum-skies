
ServerEvents.recipes(event => {
    event.remove({output: "bic_clipboard:clipboard"});

    event.shaped("bic_clipboard:clipboard",
        ["SRL", "PIP", "WWW"],
        {
            S: "gtceu:iron_screw",
            R: "gtceu:small_iron_spring",
            L: "gtceu:iron_plate",
            P: "minecraft:paper",
            W: "#minecraft:wooden_pressure_plates",
            I: "#forge:dyes/black"
        }
    );

});