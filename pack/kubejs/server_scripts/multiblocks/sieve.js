
ServerEvents.recipes(event => {

    // controller block recipe for the large sieve
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

    // large sieve recipes all take in 250mb lava + 250mb water
    // and then produce chanced outputs, based on the mesh

});