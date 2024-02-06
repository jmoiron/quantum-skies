priority: 0

ServerEvents.recipes(event => {
    // remove the default recipes in favor of the loot tables in ex_nihilo/sieving.js
    //event.remove({type: "exnihilosequentia:sifting"});

    event.remove({ input: "minecraft:fire_charge"});
    event.remove({ input: "thermal:earth_charge"});

    // remove PAs in favor of gcym
    ["iv", "luv"].forEach(tier => {
        event.remove({output: `gtceu:${tier}_processing_array`})
        event.remove({input: `gtceu:${tier}_processing_array`})
    });

    // remove this recipe for now, perhaps just remove the tungsten/platinum
    // chain skip for it in future and replace those with other useful mats
    event.remove({type: "gtceu:centrifuge", input: "gtceu:endstone_dust"})

    /*
    event.recipes.gtceu.centrifuge("endstone_dust_noalt")
        .itemInputs("gtceu:endstone_dust")
        .itemOutputs("minecraft:sand")
    */

});

