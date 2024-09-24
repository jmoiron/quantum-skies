ServerEvents.recipes(event => {
  const meshes = ["flint", "iron", "diamond", "emerald", "netherite"]

  meshes.forEach((mesh) => {
    event.remove({ output: `exnihilosequentia:${mesh}_mesh` });
  });

  // the flint mesh uses flint blocks, which are gated by steam compressor
  // this is pretty close to steel but we are gating the iron mesh on the
  // LV assembling machine so that should be okay.
  event.shaped(
    Item.of("exnihilosequentia:flint_mesh"),
    ['ABA', 'BCB', 'ABA'],
    {
      A: "minecraft:string",
      B: "exnihilosequentia:string_mesh",
      C: "gtceu:flint_block"
    }
  );

  // XXX: use conveyors instead of motors
  // single-block sieves
  event.shaped("gtceu:lp_steam_sieve",
    ['PSP', 'PVP', 'PHP'],
    {
      P: "gtceu:bronze_normal_fluid_pipe",
      S: "#forge:pistons",
      V: "exnihilosequentia:oak_sieve",
      H: "gtceu:bronze_brick_casing",
    }
  );

  event.shaped("gtceu:hp_steam_sieve",
    ['PSP', 'WLW', 'WPW'],
    {
      P: "gtceu:tin_alloy_small_fluid_pipe",
      S: "gtceu:steel_plate",
      W: "gtceu:wrought_iron_plate",
      L: "gtceu:lp_steam_sieve",
    }
  );

  event.shaped("gtceu:lv_sieve",
    ['CMC', 'PSP', 'PHP'],
    {
      C: "gtceu:tin_single_cable",
      M: "gtceu:lv_electric_motor",
      H: "gtceu:lv_machine_hull",
      S: "exnihilosequentia:flint_mesh",
      P: "gtceu:steel_plate",
    }
  );

  event.shaped("gtceu:mv_sieve",
    ['CMC', 'PSP', 'PHP'],
    {
      C: "gtceu:copper_single_cable",
      M: "gtceu:mv_electric_motor",
      H: "gtceu:mv_machine_hull",
      S: "exnihilosequentia:iron_mesh",
      P: "gtceu:aluminium_plate",
    }
  );

  event.shaped("gtceu:hv_sieve",
    ['CMC', 'PSP', 'PHP'],
    {
      C: "gtceu:gold_single_cable",
      M: "gtceu:hv_electric_motor",
      H: "gtceu:hv_machine_hull",
      S: "kubejs:aluminium_mesh",
      P: "gtceu:stainless_steel_plate",
    }
  );




  // gating iron mesh on aluminium seems wrong but you gotta toughen up
  // this is gregtech..
  //
  // currently my only idea for what this gates is ruby, which is needed
  // for chrome;  this is probably the last mesh that is usable inside
  // the actual sieves, the rest of the meshes will go into a custom
  // multiblock which produces lower rates of full ores for those juicy
  // byproducts
  event.shaped(
    Item.of("exnihilosequentia:iron_mesh"),
    ['ABA', 'BCB', 'ABA'],
    {
      A: "gtceu:aluminium_rod",
      B: "exnihilosequentia:flint_mesh",
      C: "gtceu:steel_frame",
    }
  );

  event.shaped(
    Item.of("kubejs:aluminium_mesh"),
    ['ABA', 'BCB', 'ABA'],
    {
      A: "gtceu:polytetrafluoroethylene_rod",
      B: "exnihilosequentia:iron_mesh",
      C: "gtceu:aluminium_frame",
    }
  )

  event.shaped(
    Item.of("kubejs:titanium_mesh"),
    ['ABA', 'BCB', 'ABA'],
    {
      A: "gtceu:styrene_butadiene_rubber_rod",
      B: "kubejs:aluminium_mesh",
      C: "gtceu:titanium_frame",
    }
  )

  // forge hammer compatibility w/ ex nihilo crushing
  function forge_hammer(name, input, output) {
    event.recipes.gtceu.forge_hammer(name)
      .itemInputs(input)
      .itemOutputs(output)
      .duration(10)
      .EUt(16)
  }

  forge_hammer("sand_to_dust", "minecraft:sand", "exnihilosequentia:dust")

  let stoneTypes = ["netherrack", "end_stone", "blackstone", "andesite", "basalt", "calcite",
    "deepslate", "diorite", "granite", "tuff"]

  // dripstone is 'dripstone_block' -> dripstone
  event.remove({type: "gtceu:forge_hammer", input: "minecraft:dripstone_block"})
  forge_hammer("crushed_dripstone", "minecraft:dripstone_block", "exnihilosequentia:crushed_dripstone")

  stoneTypes.forEach((st) => {
    event.remove({ type: "gtceu:forge_hammer", input: `minecraft:${st}` })
    forge_hammer(`crushed_${st}`, `minecraft:${st}`, `exnihilosequentia:crushed_${st}`)
  })
  // this is getting killed somehow
  forge_hammer("cobble_to_gravel", "minecraft:cobblestone", "minecraft:gravel")

  let breakerStones = ["deepslate", "blackstone", "andesite", "diorite", "basalt", "calcite",
    "dripstone_block", "tuff", "cobbled_deepslate"]

  breakerStones.forEach((st) => {
    event.remove({type: "gtceu:rock_breaker", output: `minecraft:${st}`})
    event.recipes.gtceu.rock_breaker(`rock_breaker_${st}`)
      .notConsumable(`minecraft:${st}`)
      .itemOutputs(`minecraft:${st}`)
      .EUt(7)
      .duration(16)
      .data({
        fluidA: "minecraft:lava",
        fluidB: "minecraft:water",
      })
  });

    event.recipes.exnihilosequentia.precipitate(
        "minecraft:oak_leaves",
        "minecraft:mangrove_leaves",
        "exnihilosequentia:sea_water"
    );

});
