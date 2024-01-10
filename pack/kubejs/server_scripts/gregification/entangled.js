
// gregification for enderchests and endertanks

ServerEvents.recipes(event => {

    event.remove({mod: "entangled"});

    event.shaped("entangled:item",
        [
            ' OE',
            ' RO',
            'R  ',
        ],
        {
            R: "gtceu:bronze_rod",
            O: "minecraft:obsidian",
            E: "gtceu:ender_pearl_block",
        }
    )

    event.shaped("entangled:block",
        [
            'BOB',
            'OEO',
            'BOB',
        ],
        {
            B: "minecraft:nether_brick",
            O: "minecraft:obsidian",
            E: "gtceu:ender_pearl_block",
        }
    );

});