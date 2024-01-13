ServerEvents.recipes(event => {
    const meshes = ["flint", "iron", "diamond", "emerald", "netherite"]

    
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

    event.custom({
      "type": "gtceu:forge_hammer",
      "duration": 10,
      "inputs": {
        "item": [
          {
            "content": {
              "type": "gtceu:sized",
              "fabric:type": "gtceu:sized",
              "count": 1,
              "ingredient": {
                "tag": "minecraft:sand"
              }
            },
            "chance": 1.0,
            "tierChanceBoost": 0.0
          }
        ]
      },
      "outputs": {
        "item": [
          {
            "content": {
              "type": "gtceu:sized",
              "fabric:type": "gtceu:sized",
              "count": 1,
              "ingredient": {
                "item": "exnihilosequentia:dust"
              }
            },
            "chance": 1.0,
            "tierChanceBoost": 0.0
          }
        ]
      },
      "tickInputs": {
        "eu": [
          {
            "content": 16,
            "chance": 1.0,
            "tierChanceBoost": 0.0
          }
        ]
      },
      "tickOutputs": {}
    })
});
