

ServerEvents.recipes(event => {
    const gravel = "#forge:gravel";
    const sand = "#minecraft:sand";
    const dust = "exnihilosequentia:dust";
    const blackstone = "exnihilosequentia:crushed_blackstone";
    const netherrack = "exnihilosequentia:crushed_netherrack";
    const endstone = "exnihilo:crushed_end_stone";
    const soulsand = "minecraft:soul_sand"
    const waterloged = "waterlogged";

    // we've moved a bunch of seeds and food to the grass block
    event.shapeless("minecraft:grass_block", [
        "minecraft:dirt",
        "exnihilosequentia:grass_seeds",
    ]);
    
    // remove the default recipes in favor of the loot tables in ex_nihilo/sieving.js
    event.remove({type: "exnihilosequentia:sifting"});

    // mesh -> { inputBlock -> [output, chance] }
    const sieveRecipes = {
        "string": {
            "minecraft:dirt": [
                ["minecraft:cactus", 0.05],
                ["minecraft:bamboo", 0.05],
                ["minecraft:sugar_cane", 0.05],
                ["gtceu:rubber_sapling", 0.05],
                ["exnihilosequentia:grass_seeds", 0.05],
                ["exnihilosequentia:mycelium_spores", 0.05],
                ["exnihilosequentia:stone_pebble", [1.0, 1.0, 0.5, 0.5, 0.1, 0.1]],
                ["exnihilosequentia:granite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:deepslate_pebble", [0.5, 0.1]],
                ["exnihilosequentia:andesite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:basalt_pebble", [0.5, 0.1]],
                ["exnihilosequentia:diorite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:blackstone_pebble", [0.5, 0.1]],
            ],
            "minecraft:oak_leaves": [
                ["minecraft:oak_sapling", 0.07],
                ["minecraft:spruce_sapling", 0.05],
                ["minecraft:birch_sapling", 0.05],
                ["minecraft:jungle_sapling", 0.05],
                ["minecraft:acacia_sapling", 0.05],
                ["minecraft:dark_oak_sapling", 0.05],
                ["minecraft:cherry_sapling", 0.05],
                ["gtceu:rubber_sapling", 0.05],
                ["minecraft:apple", 0.02]
            ],
            "gtceu:rubber_leaves": [
                ["gtceu:rubber_sapling", 0.1],
                ["minecraft:slime_ball", 0.025]
            ],
            "minecraft:grass_block": [
                ["minecraft:melon_seeds", 0.35],
                ["minecraft:beetroot_seeds", 0.35],
                ["minecraft:pumpkin_seeds", 0.35],
                ["minecraft:wheat_seeds", 0.35],
                ["minecraft:sweet_berries", 0.05],
                ["minecraft:carrot", 0.05],
                ["minecraft:potato", 0.05],
                ["minecraft:large_fern", 0.05]
            ],
            "minecraft:coarse_dirt": [
                ["minecraft:dirt", [1.0, 0.4]],
                ["minecraft:gravel", 0.4]
            ],
            "#forge:gravel": [
                /* iron group */
                ["gtceu:iron_crushed_ore", 0.35],
                ["gtceu:magnetite_crushed_ore", 0.15],
                /* copper group */
                ["gtceu:copper_crushed_ore", 0.15],
                ["gtceu:malachite_crushed_ore", 0.15],
                /* tin group */
                ["gtceu:tin_crushed_ore", 0.15],
                ["gtceu:cassiterite_crushed_ore", 0.15]
            ],
            "minecraft:sand": [
                ["gtceu:salt_crushed_ore", 0.25],
                ["gtceu:rock_salt_crushed_ore", 0.25],
                ["gtceu:lepidolite_crushed_ore", 0.10],
                ["minecraft:lapis_lazuli", [0.2, 0.1]]
            ],
            "exnihilosequentia:dust": [
                ["gtceu:redstone_crushed_ore", [0.5, 0.30]],
                ["minecraft:glowstone_dust", [0.3, 0.20]],
                ["minecraft:bone_meal", 0.1]
            ],
            "exnihilosequentia:crushed_netherrack": [
                ["gtceu:gold_crushed_ore", [0.35, 0.2]],
                ["gtceu:sulfur_dust", [0.5, 0.25]],
                ["gtceu:tetrahedrite_crushed_ore", 0.25],
                ["gtceu:stibnite_crushed_ore", 0.15]
            ],
            "exnihilosequentia:crushed_end_stone": [
                ["minecraft:ender_pearl", [0.5, 0.5, 0.25, 0.25]]
            ],
            "minecraft:soul_sand": [
                ["minecraft:quartz", [1.0, 0.33]]
            ]
        },
        "flint": {
            "#forge:gravel": [
                ["gtceu:magnetite_crushed_ore", 0.25],
                ["gtceu:gold_crushed_ore", 0.10],
                ["gtceu:nickel_crushed_ore", 0.15],
                ["gtceu:garnierite_crushed_ore",  0.10],
                ["minecraft:coal", 0.25],
            ],
            "minecraft:sand": [
                ["gtceu:calcite_crushed_ore", 0.25],
                ["gtceu:lazurite_crushed_ore", 0.20],
                ["gtceu:gypsum_crushed_ore", 0.20],
                ["gtceu:talc_crushed_ore", 0.20],
                ["minecraft:diamond", 0.05]
            ],
            "minecraft:dirt": [
                ["exnihilosequentia:granite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:deepslate_pebble", [0.5, 0.1]],
                ["exnihilosequentia:andesite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:basalt_pebble", [0.5, 0.1]],
                ["exnihilosequentia:diorite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:blackstone_pebble", [0.5, 0.1]],
            ],
            "minecraft:coarse_dirt": [
                ["exnihilosequentia:calcite_pebble", [0.5, 0.1]],
                ["exnihilosequentia:dripstone_pebble", [0.5, 0.1]],
                ["exnihilosequentia:tuff_pebble", [0.5, 0.1]]
            ],
            "exnihilosequentia:crushed_netherrack": [
                ["gtceu:pyrite_crushed_ore", 0.30],
                ["gtceu:sphalerite_crushed_ore", 0.25],
                ["gtceu:beryllium_crushed_ore", 0.10],
                ["gtceu:stibnite_crushed_ore", 0.10]
            ],
            "exnihilosequentia:crushed_blackstone": [
                ["gtceu:silver_crushed_ore", 0.35],
                ["gtceu:galena_crushed_ore", 0.35],
                ["gtceu:lead_crushed_ore", 0.20],
            ],
        },
        "iron": {},
        "diamond": {},
        "netherite": {}
    };

    /* iron group
        ["gtceu:granitic_mineral_sand_crushed_ore", 0.05],
        ["gtceu:basaltic_mineral_sand_crushed_ore", 0.05],
        ["gtceu:magnetite_crushed_ore", 0.05],
        ["gtceu:hematite_crushed_ore", 0.05],
        ["gtceu:yellow_limonite_crushed_ore", 0.05],
    */

    function makeRolls(meshType, rolls) {
        if (typeof rolls === 'number' ) {
            return [{
                chance: rolls,
                mesh: meshType,
            }];
        }
        return rolls.map((roll) => ({
            chance: roll,
            mesh: meshType
        }));
    }

    Object.entries(sieveRecipes).forEach([meshType, v] => {
        Object.entries(v).forEach([input, outputs] => {
            outputs.forEach((output) => {
                console.log(input + " => " + output);
                event.custom({
                    "type": "exnihilosequentia:sifting",
                    "input": input,
                    "result": output[0],
                    "rolls": makeRolls(meshType, output[1])
                })
            })
        })
    })
    

    /*
    function hammer(input, result) {
        event.custom({
            "type": `exnihilosequentia:hammer`,
            "input": input,
            "results": [result]
        })
    }

    function heat(block, heat) {
        event.custom({
            "type": `exnihilosequentia:heat`,
            "block": block,
            "amount": heat
        })
    }
    */

    /*
    // gravel and blackstone
    sieve('string', 0.45, gravel, 'gtceu:iron_crushed_ore', false);
    sieve('string', 0.25, gravel, 'gtceu:magnetite_crushed_ore', false);
    sieve('string', 0.35, gravel, 'gtceu:copper_crushed_ore', false);
    sieve('string', 0.3, gravel, 'gtceu:tin_crushed_ore', false);
    sieve('string', 0.25, gravel, 'gtceu:sphalerite_crushed_ore', false);
    sieve('string', 0.4, blackstone, 'gtceu:galena_crushed_ore', false);
    sieve('string', 0.3, blackstone, 'gtceu:stibnite_crushed_ore', false);  

    sieve('flint', 0.1, gravel, 'gtceu:silver_crushed_ore', false);
    sieve('flint', 0.05, gravel, 'gtceu:gold_crushed_ore', false);
    sieve('flint', 0.2, blackstone, 'gtceu:pentlandite_crushed_ore', false);
    sieve('flint', 0.25, gravel, 'gtceu:chalcopyrite_crushed_ore', false);
    sieve('flint', 0.25, blackstone, 'gtceu:bornite_crushed_ore', false);
    sieve('flint', 0.25, gravel, 'gtceu:cassiterite_crushed_ore', false);
    
    sieve('iron', 0.12, gravel, 'gtceu:pyrolusite_crushed_ore', false);
    sieve('iron', 0.05, gravel, 'gtceu:lepidolite_crushed_ore', false);
    sieve('iron', 0.1, blackstone, 'gtceu:cobaltite_crushed_ore', false);
    sieve('iron', 0.16, blackstone, 'gtceu:beryllium_crushed_ore', false);
    sieve('iron', 0.21, blackstone, 'gtceu:chromite_crushed_ore', false);
    sieve('iron', 0.05, gravel, 'gtceu:pyrochlore_crushed_ore', false);
    sieve('iron', 0.05, gravel, 'gtceu:vanadium_magnetite_crushed_ore', false);

    sieve('diamond', 0.12, blackstone, 'gtceu:molybdenite_crushed_ore', false);
    sieve('diamond', 0.02, blackstone, 'gtceu:pitchblende_crushed_ore', false);
    sieve('diamond', 0.05, gravel, 'gtceu:tantalite_crushed_ore', false);
    sieve('diamond', 0.075, blackstone, 'gtceu:ilmenite_crushed_ore', false);
    sieve('diamond', 0.18, gravel, 'gtceu:bauxite_crushed_ore', false);
    sieve('diamond', 0.02, gravel, 'gtceu:pollucite_crushed_ore', false);

    sieve('emerald', 0.15, gravel, 'gtceu:tungstate_crushed_ore', false);
    sieve('emerald', 0.125, gravel, 'gtceu:scheelite_crushed_ore', false);
    sieve('emerald', 0.35, blackstone, 'gtceu:bastnasite_crushed_ore', false);
    sieve('emerald', 0.25, blackstone, 'gtceu:cooperite_crushed_ore', false);
    sieve('emerald', 0.12, blackstone, 'gtceu:barite_crushed_ore', false);

    sieve('netherite', 0.01, blackstone, 'gtceu:naquadah_crushed_ore', false);

    // sand
    sieve('string', 0.075, sand, 'minecraft:diamond', false);
    sieve('string', 0.08, sand, 'minecraft:lapis_lazuli', false);
    sieve('string', 0.1, sand, 'minecraft:amethyst_shard', false);
    sieve('string', 0.05, sand, 'minecraft:emerald', false);
    sieve('string', 0.2, sand, 'minecraft:quartz', false);

    sieve('flint', 0.075, sand, 'gtceu:diamond_crushed_ore', false);
    sieve('flint', 0.05, sand, 'gtceu:emerald_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:green_sapphire_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:sapphire_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:ruby_crushed_ore', false);
    // sieve('flint', 0.1, sand, 'gtceu:raw_opal', false);
    sieve('flint', 0.1, sand, 'minecraft:coal', false);
    sieve('flint', 0.1, sand, 'gtceu:quartzite_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:certus_quartz_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:salt_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:rock_salt_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:saltpeter_crushed_ore', false);
    sieve('flint', 0.1, sand, 'gtceu:realgar_crushed_ore', false);

    sieve('iron', 0.14, sand, 'gtceu:blue_topaz_crushed_ore', false);
    sieve('iron', 0.14, sand, 'gtceu:topaz_crushed_ore', false);
    sieve('iron', 0.08, sand, 'gtceu:yellow_garnet_crushed_ore', false);
    sieve('iron', 0.08, sand, 'gtceu:red_garnet_crushed_ore', false);
    sieve('iron', 0.1, sand, 'gtceu:garnet_sand_crushed_ore', false);
    sieve('iron', 0.2, sand, 'gtceu:apatite_crushed_ore', false);
    sieve('iron', 0.15, sand, 'gtceu:monazite_crushed_ore', false);

    //sieve('diamond', 0.01, sand, 'mmt:moonstone', false);
    //sieve('diamond', 0.01, sand, 'mmt:sunstone', false);

    // dust
    sieve('string', 0.4, dust, 'minecraft:redstone', false);
    sieve('string', 0.4, dust, 'minecraft:glowstone_dust', false);
    sieve('string', 0.3, dust, 'gtceu:sulfur_tiny_dust', false);
    sieve('string', 0.05, dust, 'minecraft:ender_pearl', false);
    sieve('netherite', 0.01, dust, 'minecraft:echo_shard', false);

    sieve('flint', 0.25, dust, 'ae2:sky_dust', false);
    */
});

