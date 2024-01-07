priority: 0

ServerEvents.recipes(event => {
    // remove the default recipes in favor of the loot tables in ex_nihilo/sieving.js
    event.remove({ type: 'exnihilosequentia:sieve', input: 'minecraft:dirt'});
    event.remove({ type: 'exnihilosequentia:sieve', input: '#forge:gravel'});
    event.remove({ type: 'exnihilosequentia:sieve', input: 'exnihilosequentia:crushed_netherrack'});
    event.remove({ type: 'exnihilosequentia:sieve', input: '#minecraft:sand'});
    event.remove({ type: 'exnihilosequentia:sieve', input: 'minecraft:sand'});
    event.remove({ type: 'exnihilosequentia:sieve', input: 'exnihilosequentia:dust'});
    event.remove({ type: 'exnihilosequentia:sieve', input: 'minecraft:soul_sand'});
    event.remove({ type: 'exnihilosequentia:sieve', input: 'exnihilosequentia:crushed_end_stone'});

    event.remove({ input: 'minecraft:fire_charge'});
    event.remove({ input: 'thermal:earth_charge'});
});