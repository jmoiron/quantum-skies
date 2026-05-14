# Titan Surface Plan

## What the Existing Moons Are Doing

After reviewing `io`, `europa`, `ganymede`, and `callisto`, the current pattern is:

- each moon gets a small biome set, usually 2-4 biomes
- each moon uses a compact custom block palette rather than dozens of blocks
- terrain identity comes mostly from `noise_settings/*` surface rules plus 1-3 lightweight placed features
- drill outputs mirror the moon's surface blocks, so terrain materials also become progression materials

That suggests Titan should stay focused and legible instead of trying to be a full overworld-style biome explosion.

## Titan Design Direction

Titan should read as:

- low-contrast orange-brown haze world
- large hydrocarbon dune fields as the dominant surface
- dark surface lakes in low basins
- dirty water-ice substrate exposed in flats and shorelines
- some rocky/dissected highlands where the organic sand mantle is thin

This is a better fit than copying Europa's pure ice look or Callisto's dry crater-regolith look. Titan should feel softer, wind-shaped, and chemically organic.

## Proposed Biomes

### 1. `gcyr:titan_dune_seas`

Primary Titan biome. Broad rolling dune fields and the main "default" surface.

- top blocks: `kubejs:titan_hydrocarbon_sand`, patches of `kubejs:tholin_ice_dark`
- subsurface: `kubejs:titan_hydrocarbon_sandstone`
- features: dune ridge piles and occasional dark boulder clusters
- purpose: gives Titan its signature hydrocarbon desert look

### 2. `gcyr:titan_lake_lowlands`

Depressed basins where surface hydrocarbons collect.

- top blocks: `kubejs:methane_clathrate`, `kubejs:titan_dirty_ice`, sparse `kubejs:titan_hydrocarbon_sand`
- lake feature fluid: `gtceu:titan_hydrocarbon_mix`
- barrier block around lakes: `kubejs:methane_clathrate`
- purpose: gives Titan visible liquid bodies without making the whole moon an ocean

### 3. `gcyr:titan_interdune_plains`

Flatter, lighter areas between major dune belts. These can act as spawn-friendlier or traversal-friendlier terrain.

- top blocks: `kubejs:titan_dirty_ice`, `kubejs:tholin_ice_light`, streaks of `kubejs:titan_hydrocarbon_sand`
- features: small hydrocarbon seeps or very rare shallow pools
- purpose: breaks up the dune monotony and exposes the icy crust under the organic mantle

### 4. `gcyr:titan_rocky_uplands`

Higher, rougher terrain where the dune cover thins and bedrock/impact debris is exposed.

- top blocks: `kubejs:titan_cryorock`, `kubejs:titan_boulder_conglomerate`
- secondary surface: `kubejs:titan_dirty_ice`
- features: boulder piles, ridge-like outcrops, optional canyon carver use
- purpose: satisfies the "rocky biome" requirement and supports deeper mining flavor

## Blocks To Create

These are the new Titan-specific blocks worth adding. Existing `tholin_ice_*` blocks should be reused as accent materials rather than duplicated.

### Required New Blocks

- `kubejs:titan_hydrocarbon_sand`
  - main dune material
  - map color: black/brown
- `kubejs:titan_hydrocarbon_sandstone`
  - compacted dune/interior layer
  - used below sand and in dune ridges
- `kubejs:titan_dirty_ice`
  - Titan's water-ice crust with orange-brown contamination
  - main exposed substrate in plains and lowlands
- `kubejs:methane_clathrate`
  - frozen hydrocarbon-rich shoreline/lake-margin material
  - good barrier block for lake features
- `kubejs:titan_cryorock`
  - rocky highland material, darker and harder-looking than the dune palette
  - intended to represent icy-silicate/cryovolcanic rock
- `kubejs:titan_boulder_conglomerate`
  - coarse impact-breccia / exposed rocky mix
  - good for upland noise accents and boulder piles

### Existing Blocks To Reuse

- `kubejs:tholin_ice_light`
- `kubejs:tholin_ice_medium`
- `kubejs:tholin_ice_dark`
- `kubejs:tholin_ice_block`

These already match Titan's orange organic chemistry better than they match Europa's bright clean ice, so Titan should become their primary terrain home.

## Worldgen Features To Add

Titan only needs a small feature set, similar to Ganymede and Callisto.

### `gcyr:titan_hydrocarbon_lakes`

- configured as a `minecraft:lake`
- fluid: `gtceu:titan_hydrocarbon_mix`
- barrier: `kubejs:methane_clathrate`
- placed mostly in `titan_lake_lowlands`

### `gcyr:titan_dune_ridges`

- configured as a `minecraft:block_pile`
- blocks: weighted `titan_hydrocarbon_sand` / `titan_hydrocarbon_sandstone`
- placed in `titan_dune_seas`

### `gcyr:titan_boulder_pile`

- configured as a `minecraft:block_pile`
- blocks: weighted `titan_cryorock` / `titan_boulder_conglomerate`
- placed in `titan_rocky_uplands`

### Optional Later Feature

- `gcyr:titan_seep_pools`
  - tiny, rarer hydrocarbon pools for interdune plains
  - only add this if the lake lowlands feel too sparse after testing

## Surface Rule Plan

Titan should follow the same structure as `ganymede.json` and `callisto.json`: one `noise_settings/titan.json` with biome-specific surface rules.

Recommended surface behavior:

- default block: `kubejs:titan_dirty_ice`
- default fluid: `gtceu:titan_hydrocarbon_mix`
- aquifers: `false`
- sea level: around `40-50`

Biome-specific surface rules:

- `titan_dune_seas`
  - mostly `titan_hydrocarbon_sand`
  - noise accents of `titan_hydrocarbon_sandstone`
  - occasional `tholin_ice_dark`
- `titan_lake_lowlands`
  - `methane_clathrate` near flatter/erosion-prone zones
  - `titan_dirty_ice` as base
  - sparse `tholin_ice_block` or `tholin_ice_medium` accents
- `titan_interdune_plains`
  - mostly `titan_dirty_ice`
  - `tholin_ice_light` and `titan_hydrocarbon_sand` mixed by surface noise
- `titan_rocky_uplands`
  - mostly `titan_cryorock`
  - patches of `titan_boulder_conglomerate`
  - limited `titan_dirty_ice` in smoother spots

## Dimension / Biome Source Plan

`pack/kubejs/data/gcyr/dimension/titan.json` is currently just a placeholder using `gcyr:luna` and a fixed biome. It needs to be upgraded to the same pattern as Ganymede/Callisto:

- dimension type: `gcyr:titan`
- settings: `gcyr:titan`
- biome source: `minecraft:multi_noise`

Suggested multi-noise distribution:

- `titan_dune_seas`: most common, middling continentalness, middling erosion
- `titan_lake_lowlands`: lower continentalness / higher erosion
- `titan_interdune_plains`: moderate continentalness / smoother weirdness band
- `titan_rocky_uplands`: higher continentalness / lower erosion / stronger weirdness

Titan also likely needs:

- `pack/kubejs/data/gcyr/dimension_type/titan.json`

That file does not exist yet, while the Jovian moons already have dedicated dimension types.

## Material / Progression Integration

Titan terrain should feed into the existing Saturn/Titan chemistry chain instead of being decorative only.

### Add Titan Blocks To Grind/Process

Update `pack/kubejs/server_scripts/gcyr/worldgen.js` so the new Titan blocks macerate into useful dust outputs, similar to the Jovian moon blocks.

Recommended outputs:

- `titan_hydrocarbon_sand` -> hydrocarbon-rich dust or oilsands-style dust
- `titan_hydrocarbon_sandstone` -> same family, slightly lower yield
- `titan_dirty_ice` -> mixed ice/regolith dust
- `methane_clathrate` -> icy dust plus small hydrocarbon fluid output later if desired
- `titan_cryorock` / `titan_boulder_conglomerate` -> rocky dusts used for Titan mining chains

### Titan Drill / Mining Follow-Up

Titan should eventually get a surface-resource recipe in `pack/kubejs/server_scripts/multiblocks/planetary_core_drill.js`, similar to the Jovian moons, but with Titan-specific outputs:

- `titan_hydrocarbon_sand`
- `titan_dirty_ice`
- `methane_clathrate`
- `titan_cryorock`
- chance for `gtceu:titanean_selenide_ore` or a Titan-specific precursor block

That part is not strictly required for first-pass terrain generation, but the plan should assume it follows shortly after so Titan terrain materials are actually useful.

## Implementation Plan

### Phase 1: block registration and assets

Files:

- `pack/kubejs/startup_scripts/gcyr/blocks.js`
- `pack/kubejs/assets/kubejs/textures/block/*`

Work:

- register the 6 Titan blocks above
- assign map colors consistent with dark orange/brown/black Titan terrain
- create textures for the new blocks
- reuse the existing `tholin_ice_*` textures for accent surfaces

### Phase 2: biome JSONs

Files:

- `pack/kubejs/data/gcyr/worldgen/biome/titan_dune_seas.json`
- `pack/kubejs/data/gcyr/worldgen/biome/titan_lake_lowlands.json`
- `pack/kubejs/data/gcyr/worldgen/biome/titan_interdune_plains.json`
- `pack/kubejs/data/gcyr/worldgen/biome/titan_rocky_uplands.json`

Work:

- copy the structure of the existing Ganymede/Callisto biome files
- give Titan a warmer orange/brown fog/sky palette than the blue Jovian moons
- attach only the small Titan feature set above

### Phase 3: configured and placed features

Files:

- `pack/kubejs/data/gcyr/worldgen/configured_feature/titan_hydrocarbon_lakes.json`
- `pack/kubejs/data/gcyr/worldgen/configured_feature/titan_dune_ridges.json`
- `pack/kubejs/data/gcyr/worldgen/configured_feature/titan_boulder_pile.json`
- `pack/kubejs/data/gcyr/worldgen/placed_feature/titan_hydrocarbon_lakes.json`
- `pack/kubejs/data/gcyr/worldgen/placed_feature/titan_dune_ridges.json`
- `pack/kubejs/data/gcyr/worldgen/placed_feature/titan_boulder_pile.json`

Work:

- use `minecraft:lake` for hydrocarbon lakes
- use `minecraft:block_pile` for dune ridge and boulder features
- keep placement simple and sparse on the first pass

### Phase 4: Titan noise settings and dimension hookup

Files:

- `pack/kubejs/data/gcyr/worldgen/noise_settings/titan.json`
- `pack/kubejs/data/gcyr/dimension/titan.json`
- `pack/kubejs/data/gcyr/dimension_type/titan.json`

Work:

- create Titan-specific `noise_settings`
- add biome-specific surface rules using the new block palette
- replace the placeholder fixed lunar biome source with a Titan multi-noise source
- ensure the dimension points at the new Titan settings and type

### Phase 5: progression integration

Files:

- `pack/kubejs/server_scripts/gcyr/worldgen.js`
- `pack/kubejs/server_scripts/multiblocks/planetary_core_drill.js`
- optionally `pack/kubejs/server_scripts/gcyr/saturn_chem.js`

Work:

- add macerator/decomposition support for Titan blocks
- add Titan drill outputs once terrain materials feel right
- decide whether `gtceu:titan_hydrocarbon_mix` should stay atmosphere-only or also appear in lake/drill chains

### Phase 6: verification

Work:

- `/reload` and create a fresh Titan test world
- verify that all 4 biomes actually appear
- verify that lake basins place `titan_hydrocarbon_mix` on the surface
- verify dunes are visually distinct from plains
- verify rocky uplands do not get buried under the dune palette
- run `make build` once the data pack and assets are wired in

## Recommended Scope For First Pass

To keep this tractable, the first implementation should stop at:

- 4 biomes
- 6 new blocks
- 3 placed/configured features
- 1 Titan noise settings file
- dimension hookup from placeholder lunar terrain to Titan multi-noise terrain

That is enough to make Titan feel complete and recognizable. Additional complexity like cryovolcanic vents, shoreline variants, or rare seep pools can come later after in-game testing.
