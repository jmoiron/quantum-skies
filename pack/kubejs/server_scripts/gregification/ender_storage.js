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
            R: "gtceu:bronze_rod",
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
            R: "gtceu:bronze_rod",
            W: "#minecraft:wool",
            O: "minecraft:obsidian",
            C: "gtceu:aluminium_crate",
            P: "minecraft:ender_pearl"
        }
    );
});