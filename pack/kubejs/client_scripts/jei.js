/*
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove("ae2:facade");
    const exNiIngotTypes = ["lead", "nickel", "silver", "tin", "aluminum", "platinum", "uranium", "zinc"];

    event.remove('#exnihilosequentia:pieces');
    exNiIngotTypes.forEach((mat) => {
        event.remove(`exnihilosequentia:${mat}_ingot`);
        event.remove(`exnihilosequentia:${mat}_nugget`);
        event.remove(`exnihilosequentia:raw_${mat}`);
    });
});
*/

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

  event.hide("qs_icon")
  event.hide("qs_icon_cropped")

  event.hide("ae2:facade")

  event.hide("expatternprovider:ex_charger")
  event.hide("expatternprovider:ex_inscriber")
  event.hide("expatternprovider:silicon_block")

  event.hide("ae2:inscriber")
  event.hide("ae2:name_press")

  // FIXME: there is a jei blacklist config which is more repetitive but may load faster
});

JEIEvents.hideFluids(event => {
  //event.hide('example:fluid')
});

JEIEvents.addItems(event => {
  // for some reason this doesn't show in JEI by default
  event.add("craftingstation:crafting_station");
});