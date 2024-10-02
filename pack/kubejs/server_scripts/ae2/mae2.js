ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    const removals = [
        "mae2:network/crafting/4x_crafting_accelerator",
        "mae2:network/crafting/16x_crafting_accelerator",
        "mae2:network/crafting/64x_crafting_accelerator",
        "mae2:network/crafting/256x_crafting_accelerator",
        "mae2:network/parts/multi_p2p_tunnel_pattern",
    ]

    removals.forEach(id => {event.remove({id: id})});

    ["4", "16", "64", "256"].forEach(size => {
        greg.canner(`${size}x_crafting_accelerator`)
            .itemInputs(`ae2:cell_component_${size}k`)
            .itemInputs("ae2:crafting_accelerator")
            .itemOutputs(`mae2:${size}x_crafting_accelerator`)
            .EUt(GTValues.VHA[GTValues.MV])
            .duration(100);
    });

    const tunnels = [
        "eu", "fe", "item", "fluid", "pattern", "redstone"
    ];

    tunnels.forEach(tunnel => {

        event.remove({id: `mae2:network/parts/multi_p2p_tunnel_${tunnel}`});
        // event.remove({output: `mae2:${tunnel}_multi_p2p_tunnel`, type: "minecraft:crafting"});

        var base = ["eu", "pattern"].includes(tunnel) ? `mae2:${tunnel}_p2p_tunnel` : `ae2:${tunnel}_p2p_tunnel`;

        console.log("configuring tunnel type " + tunnel + " from base " + base);

        greg.assembler(`mae2_${tunnel}_multi_p2p_tunnel`)
            .itemInputs("gtceu:simple_soc")
            .itemInputs(`2x ${base}`)
            .itemInputs("#gtceu:circuits/mv")
            .itemOutputs(`mae2:${tunnel}_multi_p2p_tunnel`)
            .EUt(GTValues.VA[GTValues.HV])
            .duration(200);

    })

});