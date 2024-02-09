const $WorkableSteamMachineRenderer = Java.loadClass("com.gregtechceu.gtceu.client.renderer.machine.WorkableSteamMachineRenderer");

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {

    event.create("singleblock_sieve")
        .category("singleblock_sieve")
        .setEUIO("in")
        .setMaxIOSize(2, 6, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.CENTRIFUGE);

})

GTCEuStartupEvents.registry("gtceu:machine", event => {

    let _flap = false
    function flap() {
        _flap = !_flap
        return !_flap
    }

    // will become "gtceu:{lp,hp}_steam_sieve"
    event.create("steam_sieve", "steam", true)
        .recipeType("singleblock_sieve")
        .renderer(() => new $WorkableSteamMachineRenderer(flap(), "gtceu:block/machines/macerator"))
        .rotationState(RotationState.NON_Y_AXIS)

    event.create("sieve", "electric", GTValues.LV, GTValues.MV, GTValues.HV)
        .recipeType("singleblock_sieve", true, true)
        .rotationState(RotationState.NON_Y_AXIS)
        .workableTieredHullRenderer("gtceu:block/machines/sifter")

})