// slabs and stairs don't have a mineable tag meaning they mine at the same speed
// as fists and don't drop themselves as loot
ServerEvents.tags("block", event => {
    const slabs = Ingredient.of(/enviromats:.*_slab/).itemIds;
    slabs.forEach(slab => {
        event.add("minecraft:mineable/pickaxe", slab);
    });

    const stairs = Ingredient.of(/enviromats:.*_stairs/).itemIds;
    stairs.forEach(stair => {
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

    dyes.forEach(color => {
        // make alabaster dye with dye tags instead of minecraft dyes only
        event.replaceInput({mod: "enviromats"},
            `minecraft:${color}_dye`,
            `#forge:dyes/${color}`
        );

        // create a chem bath recipe for dying alabaster
        greg.chemical_bath(`${color}_alabaster`)
            .itemInputs("#enviromats:alabaster")
            .inputFluids(`gtceu:${color}_dye 18`)
            .itemOutputs(`enviromats:${color}_alabaster`)
            .EUt(7)
            .duration(10);

    });

    // missing magenta alabaster recipe
    event.shaped("enviromats:magenta_alabaster",
        ["AAA", "AMA", "AAA"],
        {
            A: "#enviromats:alabaster",
            M: "#forge:dyes/magenta"
        }
    );

    // fix all missing brick slab recipes
    Ingredient.of(/enviromats:.*_brick_slab/).itemIds.filter((e) => {
        return !e.includes("small_");
    }).forEach(slab => {
        let nonSlab = slab.replace("_brick_slab", "");
        event.stonecutting(`2x ${slab}`, nonSlab)
    })

    // gregify taconite and greenschist to use dusts

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

// brick slabs drop stairs for some reason, so lets fix that too
LootJS.modifiers(event => {
    const slabs = Ingredient.of(/enviromats:.*brick_slab/).itemIds;

    slabs.forEach(slab => {
        event.addBlockLootModifier(slab)
            .removeLoot(/.*/)
            .addLoot(slab);
    })

});