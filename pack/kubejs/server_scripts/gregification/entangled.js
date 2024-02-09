
// gregification for enderchests and endertanks

ServerEvents.recipes(event => {

    let greg = event.recipes.gtceu;

    event.remove({mod: "entangled"});

    greg.compressor("ae2_ender_dust")
        .itemInputs("9x gtceu:ender_pearl_dust")
        .itemOutputs("ae2:ender_dust")
        .EUt(7)
        .duration(200);

    event.shaped("entangled:item",
        [
            ' OE',
            ' RO',
            'R  ',
        ],
        {
            R: "gtceu:bronze_rod",
            O: "minecraft:obsidian",
            E: "ae2:ender_dust",
        }
    )

    event.shaped("entangled:block",
        ['BOB', 'OEO', 'BOB'],
        {
            B: "minecraft:nether_brick",
            O: "minecraft:obsidian",
            E: "ae2:ender_dust",
        }
    );

});