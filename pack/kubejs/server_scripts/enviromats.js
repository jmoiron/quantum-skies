ServerEvents.recipes(event => {

    let dyes = [
        "white",
        "light_gray",
        "gray",
        "black",
        "brown",
        "red",
        "orange",
        "yellow",
        "lime",
        "green",
        "cyan",
        "light_blue",
        "blue",
        "purple",
        "magenta",
        "pink"
    ]

    // fix some blocks that are not attainable because
    dyes.forEach(color => {
        event.replaceInput({mod: "enviromats"},
            `minecraft:${color}_dye`,
            `#forge:dyes/${color}`
        );

        // create a chem bath recipe for alabaster
        event.recipes.gtceu.chemical_bath(`${color}_alabaster`)
            .itemInputs("#enviromats:alabaster")
            .inputFluids(`gtceu:${color}_dye 18`)
            .itemOutputs(`enviromats:${color}_alabaster`)
            .EUt(7)
            .duration(10);
    });

    // missing magenta recipe?
    event.shaped("enviromats:magenta_alabaster",
        ["AAA", "AMA", "AAA"],
        {
            A: "#enviromats:alabaster",
            M: "#forge:dyes/magenta"
        }
    );

    event.remove({id: "enviromats:blocks/craft_raw/taconite"})
    event.shaped("enviromats:taconite",
        ['SSS', 'SIS', 'SSS'],
        {
            S: "minecraft:stone",
            I: "gtceu:iron_dust"
        }
    );

    event.remove({id: "enviromats:blocks/craft_raw/greenschist"})
    event.shaped("enviromats:greenschist",
        ['BBB', 'BCB', 'BBB'],
        {
            B: "enviromats:basalt",
            C: "gtceu:copper_dust",
        }
    );



});