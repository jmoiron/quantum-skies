
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
});

JEIEvents.hideFluids(event => {
  //event.hide('example:fluid')
});