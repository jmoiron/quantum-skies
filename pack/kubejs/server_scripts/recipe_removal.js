priority: 0

ServerEvents.recipes(event => {
    // remove the default recipes in favor of the loot tables in ex_nihilo/sieving.js
    //event.remove({type: "exnihilosequentia:sifting"});

    event.remove({ input: 'minecraft:fire_charge'});
    event.remove({ input: 'thermal:earth_charge'});

});

