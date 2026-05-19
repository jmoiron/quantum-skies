GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("copper_anode_slime")
        .dust()
        .color(0x5a4938);

    event.create("selenium_dioxide")
        .dust()
        .color(0xe7dcc2)
        .formula("SeO2");

    event.create("tellurium_dioxide")
        .dust()
        .color(0xd8c7a3)
        .formula("TeO2");

    event.create("selenious_acid")
        .fluid()
        .color(0xc6b697)
        .formula("H2SeO3");
});
