ServerEvents.recipes(event => {

    event.remove({output: "sophisticatedbackpacks:stack_upgrade_starter_tier"});

    event.shaped("sophisticatedbackpacks:stack_upgrade_starter_tier",
        ['PCP', 'PBP', 'PSP'],
        {
            'P': "gtceu:double_copper_plate",
            'B': "sophisticatedbackpacks:upgrade_base",
            'C': "ae2:cell_component_1k",
            'S': "gtceu:lv_super_chest",
        }
    )

    event.remove({output: "sophisticatedbackpacks:backpack"});
    event.shaped("sophisticatedbackpacks:backpack",
        ["SLS", "SCS", "LLL"],
        {S: "minecraft:string", L: "minecraft:leather", C: "gtceu:wood_crate"},
    );

    event.replaceInput({mod: "sophisticatedbackpacks"},
        "minecraft:ender_pearl",
        "ae2:ender_dust"
    );

    ["sophisticatedcore", "sophisticatedbackpacks"].forEach(mod => {
        [
            ["minecraft:ender_pearl", "ae2:ender_dust"],
            ["minecraft:iron_ingot", "gtceu:iron_plate"],
            ["minecraft:gold_ingot", "gtceu:gold_plate"],
            ["minecraft:redstone", "gtceu:red_alloy_ingot"],
        ].forEach(([src, dst]) => {
            event.replaceInput({mod: mod}, src, dst);
        });

    });

    event.remove({output: "sophisticatedbackpacks:magnet_upgrade"})
    event.shaped("sophisticatedbackpacks:magnet_upgrade",
        ["DPD", "PUP", "RML"],
        {
            D: "ae2:ender_dust",
            P: "gtceu:iron_plate",
            U: "sophisticatedbackpacks:pickup_upgrade",
            R: "gtceu:red_alloy_ingot",
            L: "gtceu:lapis_plate",
            M: "gtceu:lv_item_magnet"
        }
    );

    // gregify backpack tier recipes

    [ ["copper", "backpack", "bronze"],
      ["iron", "copper_backpack", "steel"],
      ["gold", "iron_backpack", "aluminium"],
      ["diamond", "gold_backpack", "stainless_steel"]
    ].forEach(([mat, prev, crate]) => {
        event.remove({output: `sophisticatedbackpacks:${mat}_backpack`})
        event.custom({
            "type": "sophisticatedbackpacks:backpack_upgrade",
            "conditions": [
                {
                    "type": "sophisticatedcore:item_enabled",
                    "itemRegistryName": `sophisticatedbackpacks:${mat}_backpack`
                }
            ],
            "key": {
                P: { "item": `gtceu:${mat}_plate` },
                B: { "item": `sophisticatedbackpacks:${prev}` },
                C: { "item": `gtceu:${crate}_crate` },
                s: { "tag": "forge:tools/hammers" }
            },
            "pattern": [
                "PCP",
                "PBP",
                "PsP"
            ],
            "result": {
                "item": `sophisticatedbackpacks:${mat}_backpack`
            }
        })
    });

    // make stack upgraedes incredibly expensive

    ["tier_1", "tier_2", "tier_3", "tier_4"].forEach(tier => {
        event.remove({output: `sophisticatedbackpacks:stack_upgrade_${tier}`});
    });

    event.shaped("sophisticatedbackpacks:stack_upgrade_tier_1",
        ['PCP', 'PBP', 'PSP'],
        {
            'P': "gtceu:double_iron_plate",
            'B': "sophisticatedbackpacks:stack_upgrade_starter_tier",
            'C': "ae2:cell_component_4k",
            'S': "gtceu:mv_super_chest",
        }
    );

    event.shaped("sophisticatedbackpacks:stack_upgrade_tier_2",
        ['PCP', 'PBP', 'PSP'],
        {
            'P': "gtceu:double_gold_plate",
            'B': "sophisticatedbackpacks:stack_upgrade_tier_1",
            'C': "ae2:cell_component_16k",
            'S': "gtceu:hv_super_chest",
        }
    )

    event.shaped("sophisticatedbackpacks:stack_upgrade_tier_3",
        ['PCP', 'PBP', 'PSP'],
        {
            'P': "gtceu:exquisite_diamond_gem",
            'B': "sophisticatedbackpacks:stack_upgrade_tier_2",
            'C': "ae2:cell_component_64k",
            'S': "gtceu:ev_super_chest",
        }
    )

    event.shaped("sophisticatedbackpacks:stack_upgrade_tier_4",
        ['PCP', 'PBP', 'PSP'],
        {
            'P': "minecraft:netherite_block",
            'B': "sophisticatedbackpacks:stack_upgrade_tier_3",
            'C': "ae2:cell_component_256k",
            'S': "gtceu:iv_quantum_chest",
        }
    )
});
