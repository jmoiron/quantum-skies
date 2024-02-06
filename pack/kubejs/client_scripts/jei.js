
JEIEvents.hideItems(event => {
  // hide exnihilo material variants
  // TODO: replace nuggets in all recipes with gtceu ones?
  const exNiIngotTypes = ["lead", "nickel", "silver", "tin", "aluminum", "platinum", "uranium", "zinc"];

  event.hide('#exnihilosequentia:pieces');
  exNiIngotTypes.forEach((mat) => {
    event.hide(`exnihilosequentia:${mat}_ingot`);
    event.hide(`exnihilosequentia:${mat}_nugget`);
    event.hide(`exnihilosequentia:raw_${mat}`);
  });

  // PA recipes have been removed, no need to show in JEI
  event.hide("gtceu:iv_processing_array");
  event.hide("gtceu:luv_processing_array");

  // don't need mek gas and it might be confusing with steam
  event.hide("pipez:gas_pipe")

  // FIXME: there is a jei blacklist config which is more repetitive but may load faster
});

JEIEvents.hideFluids(event => {
  //event.hide('example:fluid')
});

JEIEvents.addItems(event => {
  // for some reason this doesn't show in JEI by default
  event.add("craftingstation:crafting_station");
});