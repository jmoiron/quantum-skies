const $WorkableSteamMachineRenderer = Java.loadClass("com.gregtechceu.gtceu.client.renderer.machine.WorkableSteamMachineRenderer");

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {

    event.create("singleblock_sieve")
        .category("singleblock_sieve")
        .setEUIO("in")
        .setMaxIOSize(2, 6, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.CENTRIFUGE);

    event.create("chiseler")
        .category("chiseler")
        .setEUIO("in")
        .setMaxIOSize(2, 6, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_LATHE, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.MIXER);

})

GTCEuStartupEvents.registry("gtceu:machine", event => {

    event.create("steam_sieve", "steam")
        .hasHighPressure(true)
        .definition((hp, builder) => (
            builder
                .recipeType("singleblock_sieve")
                .workableTieredHullRenderer('gtceu:block/machines/macerator')
        ));

    event.create("sieve", "simple")
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV)
        .definition((tier, builder) =>
            builder
                //.langValue(GTValues.VLVH[tier] + " Sieve")
                .recipeType("singleblock_sieve")
                .workableTieredHullRenderer("gtceu:block/machines/sifter")
        );

    event.create("chiseler", "simple")
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV)
        .definition((tier, builder) =>
            builder
                .recipeType("chiseler")
                .workableTieredHullRenderer("gtceu:block/machines/lathe")
        );

})