GTCEuStartupEvents.registry("gtceu:material", event => {
    // bedrock dust

    event.create("bedrock")
        .dust()
        .color(0x565656)
        .iconSet(GTMaterialIconSet.FLINT);

    // moon regolith dust
    event.create("moon_regolith")
        .dust()
        .flags(GTMaterialFlags.FORCE_GENERATE_BLOCK)
        .color(0x959595)
        .iconSet(GTMaterialIconSet.SAND);
    
    // regolith blocks already exist for mars & venus
    event.create("mars_regolith_d")
        .dust()
        .color(0x521F0A)
        .iconSet(GTMaterialIconSet.SAND);
    
    event.create("venus_regolith_d")
        .dust()
        .color(0x261D15)
        .iconSet(GTMaterialIconSet.SAND);

    // mercury rock!

})