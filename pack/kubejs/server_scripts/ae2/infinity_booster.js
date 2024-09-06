ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    event.remove({output: "aeinfinitybooster:infinity_card"});
    event.remove({output: "aeinfinitybooster:dimension_card"});

    event.shaped("aeinfinitybooster:infinity_card",
        ['ECE', 'CSC', 'ZHZ'],
        {
            E: "minecraft:ender_eye",
            C: "ae2:wireless_booster",
            S: "gtceu:nether_star_dust",
            Z: "gtceu:zirconium_ingot",
            H: "gtceu:hafnium_ingot"
        }
    )

    event.shaped("aeinfinitybooster:dimension_card",
        ['CSC', 'SES', 'CSC'],
        {
            C: "aeinfinitybooster:infinity_card",
            E: "enderchests:ender_chest",
            S: "gtceu:quantum_star"
        }
    );

});