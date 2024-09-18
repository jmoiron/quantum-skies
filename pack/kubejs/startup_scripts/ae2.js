GTCEuStartupEvents.registry("gtceu:material", event => {
    // bedrock dust
    event.create("energistic_steel")
        .ingot()
        .color(16547540)
        .secondaryColor(0x252F59)
        .flags(
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_ROD
        )
        .iconSet(GTMaterialIconSet.FINE)
        .blastTemp(3000, 'low', GTValues.VA[GTValues.HV], 20*45);
});