GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("bedrock")
        .dust()
        .color(0x565656)
        .iconSet(GTMaterialIconSet.FLINT);
})

StartupEvents.registry('item', event => {
    event.create("aluminium_mesh")
    event.create("titanium_mesh")
})