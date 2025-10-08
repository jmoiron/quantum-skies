
const qsSieveRecipes = {
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
      ["exnihilosequentia:blackstone_pebble", [0.5, 0.1]]
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
      ["minecraft:slime_ball", 0.1]
    ],
    "minecraft:jungle_leaves": [
      ["minecraft:cocoa_beans", 0.2],
      ["minecraft:melon_seeds", 0.1]
    ],
    "minecraft:mangrove_leaves": [
      ["minecraft:seagrass", 0.1],
      ["minecraft:sea_pickle", 0.1],
      ["minecraft:kelp", 0.25],
      ["minecraft:mangrove_propagule", 0.03]
    ],
    "minecraft:moss_block": [
      ["minecraft:sunflower", 0.25],
      ["minecraft:dandelion", 0.25],
      ["minecraft:peony", 0.25],
      ["minecraft:poppy", 0.25],
      ["minecraft:wither_rose", 0.25],
      ["minecraft:cornflower", 0.25]
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
      ["gtceu:crushed_iron_ore", 0.35],
      ["gtceu:crushed_magnetite_ore", 0.15],
      ["gtceu:crushed_copper_ore", 0.15],
      ["gtceu:crushed_malachite_ore", 0.15],
      ["gtceu:crushed_tin_ore", 0.15],
      ["gtceu:crushed_cassiterite_ore", 0.15]
    ],
    "minecraft:sand": [
      ["gtceu:crushed_salt_ore", 0.25],
      ["gtceu:crushed_rock_salt_ore", 0.25],
      ["gtceu:crushed_lepidolite_ore", 0.10],
      ["minecraft:lapis_lazuli", [0.2, 0.1]]
    ],
    "exnihilosequentia:dust": [
      ["gtceu:crushed_redstone_ore", [0.5, 0.30]],
      ["minecraft:glowstone_dust", [0.3, 0.20]],
      ["minecraft:bone_meal", 0.1]
    ],
    "exnihilosequentia:crushed_andesite": [
      ["gtceu:crushed_magnetite_ore", 0.25],
      ["gtceu:crushed_vanadium_magnetite_ore", 0.20],
      ["gtceu:crushed_gold_ore", 0.15]
    ],
    "exnihilosequentia:crushed_netherrack": [
      ["gtceu:crushed_gold_ore", [0.35, 0.2]],
      ["gtceu:sulfur_dust", [1, 0.5, 0.5, 0.25, 0.25]],
      ["gtceu:crushed_tetrahedrite_ore", 0.25],
      ["gtceu:crushed_stibnite_ore", 0.15]
    ],
    "exnihilosequentia:crushed_end_stone": [
      ["gtceu:ender_pearl_dust", [0.45, 0.45, 0.20, 0.20]]
    ],
    "minecraft:soul_sand": [
      ["minecraft:quartz", [1.0, 0.33]]
    ],
    "minecraft:soul_soil": [
      ["exnihilosequentia:warped_nylium_spores", 0.1],
      ["exnihilosequentia:crimson_nylium_spores", 0.1]
    ],
    "exnihilosequentia:crushed_basalt": [
      ["4x exnihilosequentia:basalt_pebble", 0.50],
      ["exnihilosequentia:dripstone_pebble", 0.25]
    ],
    "exnihilosequentia:crushed_diorite": [
      ["4x exnihilosequentia:diorite_pebble", 0.50],
      ["exnihilosequentia:calcite_pebble", 0.25]
    ]
  },
  "flint": {
    "#forge:gravel": [
      ["gtceu:crushed_magnetite_ore", 0.25],
      ["gtceu:crushed_gold_ore", 0.10],
      ["gtceu:crushed_garnierite_ore", 0.30],
      ["minecraft:coal", 0.25]
    ],
    "minecraft:sand": [
      ["gtceu:crushed_calcite_ore", 0.25],
      ["gtceu:crushed_lazurite_ore", 0.20],
      ["gtceu:crushed_gypsum_ore", 0.20],
      ["gtceu:crushed_talc_ore", 0.20],
      ["minecraft:diamond", 0.05]
    ],
    "minecraft:soul_sand": [
      ["gtceu:crushed_light_oilsands_ore", [0.25, 0.1]]
    ],
    "exnihilosequentia:crushed_netherrack": [
      ["gtceu:crushed_pyrite_ore", 0.30],
      ["gtceu:crushed_sphalerite_ore", 0.25],
      ["gtceu:crushed_beryllium_ore", 0.10],
      ["gtceu:crushed_stibnite_ore", 0.25]
    ],
    "exnihilosequentia:crushed_granite": [
      ["gtceu:crushed_silver_ore", 0.35],
      ["gtceu:crushed_galena_ore", 0.35],
      ["gtceu:crushed_lead_ore", 0.20]
    ],
    "exnihilosequentia:crushed_blackstone": [
      ["gtceu:crushed_pyrolusite_ore", 0.25],
      ["gtceu:crushed_grossular_ore", 0.25],
      ["gtceu:crushed_spessartine_ore", 0.20],
      ["gtceu:crushed_tantalite_ore", 0.20]
    ],
    "exnihilosequentia:crushed_andesite": [
      ["gtceu:crushed_realgar_ore", 0.05],
      ["gtceu:crushed_zeolite_ore", 0.15],
      ["gtceu:crushed_cassiterite_ore", 0.20],
      ["gtceu:crushed_chalcopyrite_ore", 0.20]
    ],
    "exnihilosequentia:crushed_diorite": [
      ["gtceu:crushed_almandine_ore", 0.25],
      ["gtceu:crushed_pyrope_ore", 0.20],
      ["gtceu:crushed_sapphire_ore", 0.20],
      ["gtceu:crushed_green_sapphire_ore", 0.20]
    ],
    "exnihilosequentia:crushed_deepslate": [
      ["gtceu:crushed_coal_ore", 0.30],
      ["gtceu:crushed_graphite_ore", 0.25],
      ["gtceu:crushed_diamond_ore", 0.15],
      ["ae2:sky_dust", 0.10]
    ]
  },
  "iron": {
    "exnihilosequentia:crushed_deepslate": [
      ["gtceu:crushed_ruby_ore", 0.15],
      ["gtceu:crushed_cinnabar_ore", 0.15],
      ["gtceu:crushed_redstone_ore", 0.25]
    ],
    "exnihilosequentia:crushed_netherrack": [
      ["gtceu:crushed_emerald_ore", 0.20],
      ["gtceu:crushed_beryllium_ore", 0.25],
      ["gtceu:crushed_thorium_ore", 0.10]
    ],
    "exnihilosequentia:crushed_andesite": [
      ["gtceu:crushed_apatite_ore", 0.25],
      ["gtceu:crushed_tricalcium_phosphate_ore", 0.20],
      ["gtceu:crushed_pyrochlore_ore", 0.15]
    ],
    "exnihilosequentia:crushed_diorite": [
      ["gtceu:crushed_red_garnet_ore", 0.25],
      ["gtceu:crushed_yellow_garnet_ore", 0.20],
      ["gtceu:crushed_amethyst_ore", 0.20],
      ["gtceu:crushed_opal_ore", 0.20]
    ],
    "exnihilosequentia:crushed_blackstone": [
      ["gtceu:crushed_wulfenite_ore", 0.25],
      ["gtceu:crushed_powellite_ore", 0.20],
      ["gtceu:crushed_molybdenite_ore", 0.20]
    ]
  },
  "diamond": {},
  "netherite": {}
};
