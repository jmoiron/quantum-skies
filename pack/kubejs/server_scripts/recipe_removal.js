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

    // make travelanchors recipes use ender pearl dust instead of pearls
    // so they are easier to make earlier
    event.replaceInput({mod: "travelanchors"}, "minecraft:ender_pearl", "ae2:ender_dust")

    // remove vanilla ender eye recipe
    event.remove({type: "minecraft:crafting_shaped", output: "minecraft:ender_eye"});
    event.remove({type: "minecraft:crafting_shapeless", output: "minecraft:ender_eye"});

    // remove until we know what to do with the end, which right now has no ores and only the central island
    // we might want it for ender air and for an end drill
    event.remove({output: "exnihilosequentia:end_cake"});

    // item collectors are meant to be very early (pre-steam) tech
    // the advanced item collector is HV+ with the current recipe
    // but it doesn't have enough utility to be modified
    event.replaceInput({mod: "itemcollectors"}, "minecraft:ender_pearl", "gtceu:ender_pearl_dust")


});

