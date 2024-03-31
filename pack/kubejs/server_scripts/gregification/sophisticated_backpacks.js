
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

    // gregify backpack tier recipes

    [ ["copper", "backpack", "bronze"],
      ["iron", "copper_backpack", "steel"],
      ["gold", "iron_backpack", "aluminium"],
      ["diamond", "gold_backpack", "stainless_steel"]
    ].forEach(([mat, prev, crate]) => {
        event.remove({output: `sophisticatedbackpacks:${mat}_backpack`})
        event.shaped(`sophisticatedbackpacks:${mat}_backpack`,
            ['PCP', 'PBP', 'PsP'],
            {
                P: `gtceu:${mat}_plate`,
                B: `sophisticatedbackpacks:${prev}`,
                C: `gtceu:${crate}_crate`,
                s: "#forge:tools/hammers"
            }
        )
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
