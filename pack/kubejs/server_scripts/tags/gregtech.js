ServerEvents.tags("item", (event) => {
  event.add("ad_astra:fuel", "gtceu:diesel");
  event.add("ad_astra:fuel", "gtceu:rocket_fuel");
  event.add("ad_astra:fuel", "gtceu:rp_1_rocket_fuel");
  event.add("ad_astra:fuel", "gtceu:udmh_rocket_fuel");
  event.add("ad_astra:fuel", "gtceu:methylhydrazine_nitrate_rocket_fuel");

  // remove planks from treated planks, which is getting this tag
  // from an unknown source
  event.remove("minecraft:planks", "gtceu:treated_wood_planks");
});
