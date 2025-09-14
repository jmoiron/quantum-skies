StartupEvents.registry("item", (event) => {
    // Adapters for Jovian moon Planetary Core Drill recipes
    event.create("jovian_icy_moon_adapter")
        .displayName("Jovian Icy Moon Adapter");

    event.create("jovian_volcanic_moon_adapter")
        .displayName("Jovian Volcanic Moon Adapter");
});
