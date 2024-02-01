
ServerEvents.recipes(event => {

    // controller block recipe for the large crucible
    event.shaped(Item.of("gtceu:industrial_sieve"),
        ["CGC", "FXF", "CLC"],
        {
            C: "#gtceu:circuits/hv",
            X: "gtceu:hv_sifter",
            F: "gtceu:stainless_steel_frame",
            G: "gtceu:steel_gearbox",
            L: "gtceu:stainless_steel_large_fluid_pipe",
        }
    );

});