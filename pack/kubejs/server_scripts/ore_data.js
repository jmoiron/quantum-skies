

// source: https://docs.google.com/spreadsheets/d/1Rsz0rH9tIVJxr18b1Z6-QxOSaEKssxF7u2naQTq2Mqg/edit#gid=955235406
// license: https://github.com/GTNewHorizons/GT-New-Horizons-Modpack?tab=License-1-ov-file#readme

let gtnhVeins = {
    "ow": [
        ["graphite", "diamond", "coal"],
        ["redstone", "ruby", "cinnabar"],
        ["chalcopyrite", "iron", "pyrite", "copper"],
        // brown limonite not in ceu, banded iron -> hematite
        ["yellow_limonite", "hematite", "malachite"],
        ["kyanite", "mica", "cassiterite", "pollucite"]
        ["lazurite", "sodalite", "lapis", "calcite"],
        ["soapstone", "talc", "glauconite", "pentlandite"],
        // coal and lignite veins are the same w/ opposite concentrations
        ["coal", "lignite_coal"],
        ["apatite", "tricalcium_phosphate", "pyrochlore"],
        ["basaltic_mineral_sand", "granitic_mineral_sand", "fullers_earth", "gypsum"],
        ["kaolinite", "zeolite", "fullers_earth", "glauconite"],
        ["rock_salt", "salt", "lepidolite", "spodumene"], 
        ["oilsands"],
        ["magnetite", "iron", "vanadium_magnetite"],
        ["magnetite", "vanadium_magnetite", "gold"],
        ["tin", "cassiterite"],
        ["chalcopyrite", "vermiculite", "cassiterite", "alunite"]
    ],
    "nether": [
        ["dolomite", "wollastonite", "trona", "andradite"],
        ["sulfur", "sulfur", "pyrite", "sphalerite"],
        ["beryllium", "beryllium", "emerald", "thorium"],
        ["saltpeter", "diatomite", "electrotine", "alunite"],
        ["wulfenite", "molybdenite", "molybdenum", "powellite"],
        ["nether_quartz", "quartzite"],
        ["quartzite", "barite", "certus quartz", "certus quartz"],
        ["tetrahedrite", "tetrahedrite", "copper", "stibnite"],
    ],
    "tf": [
        ["galena", "galena", "silver", "lead"],
        ["galena", "galena", "silver", "lead"],
        ["almandine", "pyrope", "sapphire", "green_sapphire"],
        ["bentonite", "magnesite", "olivine", "glauconite"],
        ["garnierite", "nickel", "cobaltite", "pentlandite"]
    ],
    "end": [
        ["naquadah", "enriched_naquadah"],
        ["scheelite", "tungstate", "lithium"],
        ["sheldonite", "palladium", "platinum", "iridium"]
    ],
    "t1": [ // moon
        ["ilmenite", "chromite", "uvarovite", "perlite"],
        ["bauxite", "ilmenite", "aluminium", "ilmenite"],
        ["bastnasite", "bastnasite", "monazite", "neodymium"],
        ["quartzite", "barite", "certus_quartz"]
    ],
    "t2": [ // mars + moons
        // no galacticraft, no desh
        ["scheelite", "tungstate"],
        // u238 only present as dust/fluid
        ["uraninite"],
        ["draconium", "electrotine", "jade", "vinteum"],
        ["pitchblende", "uraninite"],
        // no oriharukon, tanzanite or vyroxes in CEU
        // mirabilite present only as dust
        // ["oriharukon", "tanzanite", "vyroxeres", "mirabilite"],

        // arsenic, bismuth, antimony present only as dust
        //["arsenic", "bismuth", "antimony", "antimony"]
    ],
    "t3": [
        // chrome only present as chromite
        // manganese only as dust
        ["tungstate", "molybdenum"],
        // chrome
        ["platinum", "sheldonite", "palladium"],
        // no callisto ice, no alduorite
        ["topaz", "blue topaz"],
        // banded iron -> hematite
        ["magnesite", "hematite", "sulfur", "opal"],
        // no ledox, orichalcum, rubracium..  opal in the ore chain above
        // no u238
        ["plutonium 239", "thorium"],
    ]
}

let gtceuVeins = {
    "end": [
        ["bauxite", "ilmenite", "aluminium"],
        ["magnetite", "vanadium_magnetite", "chromite", "gold"],
        ["naquadah", "plutonium_239"],
        ["pitchblende", "uraninite"],
        ["scheelite", "tungstate", "lithium"],
        ["bornite", "cooperite", "platinum", "palladium"],
    ],
    "nether": [
        ["goethite", "yellow_limonite", "hematite", "gold"],
        ["beryllium", "emerald"],
        ["quartzite", "certus_quartz", "barite"],
        ["grossular", "pyrolusite", "tantalite"],
        ["wulfenite", "molybdenite", "molybdenum", "powellite"],
        ["bastnasite", "molybdenum", "neodymium"],
        ["nether_quartz", "quartzite"]
        ["redstone", "ruby", "cinnabar"],
        ["saltpeter", "diatomite", "electrotine", "alunite"],
        ["sulfur", "pyrite", "sphalerite"],
        ["tetrahedrite", "copper", "stibnite"],
        ["blue_topaz", "topaz", "chalcocite", "bornite"]
    ],
    "ow": [
        ["apatite", "tricalcium_phosphate", "pyrochlore"],
        ["tin", "cassiterite"],
        ["coal"],
        ["chalcopyrite", "zeolite", "cassiterite", "realgar"],
        ["galena", "silver", "lead"],
        ["cassiterite_sand", "garnet_sand", "asbestos", "diatomite"],
        ["garnet_red", "garnet_yellow", "amethyst", "opal"],
        ["goethite", "yellow_limonite", "hematite", "malachite"],
        ["soapstone", "talc", "glauconite", "pentlandite"],
        ["magnetite", "vanadium_magnetite", "gold"],
        ["basaltic_mineral_sand", "granitic_mineral_sand", "fullers_earth", "gypsum"],
        ["garnierite", "nickel", "cobaltite", "pentlandite"],
        ["rock_salt", "salt", "lepidolite", "spodumene"],
        ["oilsands"],
    ],
    "deepslate": [
        ["chalcopyrite", "iron", "pyrite", "copper"],
        ["diamond", "graphite", "coal"],
        ["lazurite", "sodalite", "lapis", "calcite"],
        ["grossular", "spessartine", "pyrolusite", "tantalite"],
        ["kyanite", "mica", "bauxite", "pollucite"],
        ["bentonite", "magnetite", "olivine", "glauconite_sand"],
        ["redstone", "ruby", "cinnabar"],
        ["almandine", "pyrope", "sapphire", "green_sapphire"],
    ],
}

// metal/tier progression
// mc materials (redstone, nether quartz) need to unlock early for automation
//
// iron, copper, tin needed for steam age 
//   - lead unlocks potin (pipes, steam oven)
//   - silver unlocks solar boilers
//   - redstone (red alloy) for first circuits
//   - sulfur for rubber
// steel for LV
//   - stibnite needed for antimony (battery alloy)
//   - realgar needed for arsenic (gallium arsenite for 1st MV)
//   - sapphire for early aluminium
//   - graphite needed for arc furnace
// aluminium for MV (sapphire/clay)
//   - vanadium for vanadium steel (mv cutter)
//   - chromium (ruby) for vanadium steel (mv cutter) + stainless (hv)
//   - emerald, ruby, sapphire, diamond for wafer lenses
//   - manganese for stainless steel (hv)
// stainless for HV
//   - electrotine for blue steel (but can be made w/ silver+gold & redstone)
//   - tantalite for SMD components (optional, boost)
//   - bauxite or ilmenite for titanium 
// titanium for EV 
//   - plutonium + uranium for radon (circuit asm)
//   - platinum (circuit asm, sheldonite for gtec plat chain)
//   - monazite for monazite chain (source of uranium)


