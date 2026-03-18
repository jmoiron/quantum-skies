# Saturn System — Outstanding Work

## Dimension Registration

- **Saturn gas collector dimension ID** — `server_scripts/gcyr/saturn_chem.js` currently uses
  `"gcyr:saturn"` but the gas collector must point at whichever dimension ID is actually registered
  for Saturn's atmosphere. Confirm the ID and update the `gas_collector` recipe.
- **Titan gas collector dimension ID** — similarly using `"gcyr:titan"`. `data/gcyr/dimension/titan.json`
  exists in kubejs, so `gcyr:titan` is likely correct but needs in-game verification.
- **Gas collector circuit numbers** — Saturn=8 and Titan=9 were chosen to follow the sequence
  (mars=4, venus=5, io=6, europa=7). Verify no conflicts exist with other planets.
- **Saturn orbit sky renderer world field** — `saturn_orbit.json` uses `"world": "gcyr:saturn_orbit"`,
  which matches `data/gcyr/dimension/saturn_orbit.json`. Confirm the renderer activates in-game.

## Germanium

- `kubejs:germanium_dust_additive` is a placeholder dust used in the chalcogenide glass mix recipe.
  The real `GTMaterials.Germanium` exists in GTCEu but has no item forms (element-only). Options:
  1. Use the KubeJS GTCEu material-modify API to add `GENERATE_DUST` to the existing Germanium material
     and rename the recipe input to `gtceu:germanium_dust`.
  2. Source germanium from an existing processing chain — galena smelting byproduct is a real-world
     source; check if GTCEu's galena processing yields anything usable.
  3. Keep the placeholder but give it a proper display name and a source recipe (e.g. distillation
     byproduct from a ZPM-tier process).

## Titanean Selenide Worldgen

- `gtceu:titanean_selenide_ore` has no worldgen definition. Needs an ore vein entry for Titan's
  surface dimension. Look at how existing kubejs jovian moon ore veins are configured and add a
  comparable entry for `gcyr:titan`.

## Optical Fiber Cable Recipe

- The recipe is currently commented out in `server_scripts/gcyr/saturn_chem.js`.
- Before enabling: find the existing optical fiber cable recipe ID in GTCEu or gcyr and remove it
  with `event.remove({id: "..."})`.
- Confirm the output item ID (`gcyr:optical_fiber_cable` or similar).
- Recipe when ready:
  ```js
  greg.assembler("optical_fiber_cable_saturnian")
      .itemInputs("4x gtceu:chalcogenide_glass_fine_wire")
      .itemInputs("2x gtceu:kapton_e_foil")
      .itemOutputs("4x gcyr:optical_fiber_cable")  // confirm ID
      .EUt(GTValues.VA[GTValues.LuV])
      .duration(300);
  ```

## Kapton-E Integration

- **ZPM casing recipe** — per `lategame-short.md`, Kapton-E should gate ZPM casings. Find the
  existing ZPM machine casing recipe and add `gtceu:kapton_e_plate` or `gtceu:kapton_e_foil` as a
  required input.
- **`GENERATE_FINE_WIRE` flag** — used on `chalcogenide_glass` in the startup script. Verify this
  is the correct GTCEu flag name for generating fine wire items; if not, correct the flag and add a
  manual wire mill recipe instead.

## Helium-3 Integration

- Per `lategame.md`, He-3 from Saturn distillation should be required for the ZPM Fusion Reactor
  ignition recipe. Find the ZPM Fusion Reactor recipe and add He-3 as a required input or fuel.

## T4 Rocket

- Per `lategame-short.md`, T4 rockets are LuV-tier and are the gate for reaching the Saturn system.
  The rocket should require naquadah and potentially something from Saturn or Titan to create a
  logical dependency on having already been there. Design and add to VAB recipes.

## Quest Book

- No quest entries exist yet for:
  - Saturn orbit / gas collection
  - Titan surface / gas mining / laser mining
  - Kapton-E production chain
  - Chalcogenide glass / optical fiber cable
  - He-3 fusion integration
  - T4 rocket
