ServerEvents.tags("block", event => {
    const slabs = Ingredient.of(/enviromats:.*_slab/).itemIds;

    slabs.forEach(slab => {
        event.add("minecraft:mineable/pickaxe", slab);
    });

    const stairs = Ingredient.of(/enviromats:.*_stairs/).itemIds;

    stairs.forEach(stair => {
        console.log("adding minable tag to stair " + stair);
        event.add("minecraft:mineable/pickaxe", stair);
    });

});

ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

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
        greg.chemical_bath(`${color}_alabaster`)
            .itemInputs("#enviromats:alabaster")
            .inputFluids(`gtceu:${color}_dye 18`)
            .itemOutputs(`enviromats:${color}_alabaster`)
            .EUt(7)
            .duration(10);

        event.recipes.gtceu.cutter(`${color}_alabaster_brick_slabs`)
            .itemInputs(`enviromats:${color}_alabaster_brick`)
            .inputFluids("gtceu:lubricant 1")
            .itemOutputs(`2x enviromats:${color}_alabaster_brick_slab`)
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

    const mats = [
        "hardened_stone",
        "granodiorite",
        "basalt",
        "marble",
        "pumice",
        "travertine",
        "taconite",
        "blueschist",
        "greenschist",
    ];

    mats.forEach((mat) => {

        event.stonecutting(`2x enviromats:${mat}_brick_slab`, `enviromats:${mat}_brick_slab`);

        /*
        greg.cutter(`cut_${mat}_brick_slabs`)
            .itemInputs(`enviromats:${mat}_brick`)
            .inputFluids("gtceu:lubricant 1")
            .itemOutputs(`2x enviromats:${mat}_brick_slab`)
            .duration(20)
            .EUt(7);
        */
    })

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

LootJS.modifiers(event => {
    const slabs = Ingredient.of(/enviromats:.*_slab/).itemIds;

    slabs.forEach(slab => {
        event.addBlockLootModifier(slab)
            .removeLoot(/.*/)
            .addLoot(slab);
    })

});