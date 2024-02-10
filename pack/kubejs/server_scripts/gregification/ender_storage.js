// gregification for enderchests and endertanks

ServerEvents.recipes(event => {

    event.remove({output: "endertanks:ender_tank"});
    event.remove({output: "enderchests:ender_chest"});

    event.shaped("endertanks:ender_tank", 
        [
            'RWR',
            'ODO',
            'RPR',
        ],
        {
            R: "minecraft:blaze_rod",
            W: "#minecraft:wool",
            O: "minecraft:obsidian",
            D: "gtceu:lv_super_tank",
            P: "minecraft:ender_pearl"
        }
    );

    event.shaped("enderchests:ender_chest",
        [
            'RWR',
            'OCO',
            'RPR',
        ],
        {
            R: "minecraft:blaze_rod",
            W: "#minecraft:wool",
            O: "minecraft:obsidian",
            C: "gtceu:lv_super_chest",
            P: "minecraft:ender_pearl"
        }
    );
});