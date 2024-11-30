
ServerEvents.recipes(event => {

    event.remove({output: "rechiseled:chisel"})
    event.shaped("rechiseled:chisel",
      ["FP ", "S  ", "   "],
      {
        F: "#forge:tools/files",
        P: "gtceu:iron_plate",
        S: "minecraft:stick"
      }
    );

    event.shaped("gtceu:lv_chiseler",
      ["WMW", "PCP", "PHP"],
      {
        W: "gtceu:tin_single_cable",
        M: "gtceu:lv_electric_motor",
        P: "gtceu:steel_plate",
        H: "gtceu:lv_machine_hull",
        C: "rechiseled:chisel"
      }
    );

    event.shaped("gtceu:mv_chiseler",
      ["WMW", "PCP", "PHP"],
      {
        W: "gtceu:copper_single_cable",
        M: "gtceu:mv_electric_motor",
        P: "gtceu:aluminium_plate",
        H: "gtceu:mv_machine_hull",
        C: "rechiseled:chisel"
      }
    );

    event.shaped("gtceu:hv_chiseler",
      ["WMW", "PCP", "PHP"],
      {
        W: "gtceu:gold_single_cable",
        M: "gtceu:hv_electric_motor",
        P: "gtceu:stainless_steel_plate",
        H: "gtceu:hv_machine_hull",
        C: "rechiseled:chisel"
      }
    );

    let greg = event.recipes.gtceu;

    let inputTypes = [
      "amethyst_block",
      "acacia_planks",
      "andesite",
      "basalt",
      "bamboo_planks",
      "birch_planks",
      "blackstone",
      "blue_ice",
      "bone_block",
      "cherry_planks",
      "coal_block",
      "cobbled_deepslate",
      "cobblestone",
      "copper_block",
      "crimson_planks",
      "dark_oak_planks",
      "dark_prismarine",
      "diamond_block",
      "diorite",
      "dirt",
      "emerald_block",
      "end_stone",
      "glowstone",
      "gold_block",
      "granite",
      "iron_block",
      "jungle_planks",
      "lapis_block",
      "mangrove_planks",
      "netherrack",
      "nether_bricks",
      "netherite_block",
      "oak_planks",
      "obsidian",
      "prismarine_bricks",
      "quartz_block",
      "red_nether_bricks",
      "red_sandstone",
      "redstone_block",
      "sandstone",
      "spruce_planks",
      "stone",
      "warped_planks"
    ]

    inputTypes.forEach((input) => {
      let reg = new RegExp(`rechiseled:${input}.*`)
      let alts = Ingredient.of(reg).itemIds;

      alts.forEach((alt) => {
        greg.chiseler(`${input}_${alt}`.replace(":", "_"))
            .itemInputs(`minecraft:${input}`)
            .notConsumable(alt)
            .itemOutputs(alt)
            .EUt(7)
            .duration(10);
      })

    });

});