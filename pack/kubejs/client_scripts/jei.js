
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

  // FIXME: there is a jei blacklist config which is more repetitive but may load faster
});

JEIEvents.hideFluids(event => {
  //event.hide('example:fluid')
});

JEIEvents.addItems(event => {
  // for some reason this doesn't show in JEI by default
  event.add("craftingstation:crafting_station");
});