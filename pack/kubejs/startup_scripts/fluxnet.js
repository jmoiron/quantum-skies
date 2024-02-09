GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("bedrock")
        .dust()
        .color(0x565656)
        .iconSet(GTMaterialIconSet.FLINT);
})

// TODO: move to its own file or rename this to something else
StartupEvents.registry('item', event => {
    event.create("aluminium_mesh")
    event.create("titanium_mesh")
})