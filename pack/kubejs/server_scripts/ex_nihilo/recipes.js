ServerEvents.recipes(event => {
    const meshes = ["flint", "iron", "diamond", "emerald", "netherite"]

    // remove the default recipes in favor of the loot tables in ex_nihilo/sieving.js
    event.remove({type: "exnihilosequentia:sifting"});
    
    meshes.forEach((mesh) => {
        event.remove({output: `exnihilosequentia:${mesh}_mesh`});
    });
    // the flint mesh uses flint blocks, which are gated by steam compressor
    // this is pretty close to steel but we are gating the iron mesh on the
    // LV assembling machine so that should be okay.
    event.shaped(
        Item.of("exnihilosequentia:flint_mesh"),
        ['ABA', 'BCB', 'ABA'],
        {
            A: "minecraft:string",
            B: "exnihilosequentia:string_mesh",
            C: "gtceu:flint_block"
        }
    );
    event.remove({output: "#ex"})
});
