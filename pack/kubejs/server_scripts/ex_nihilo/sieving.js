

ServerEvents.recipes(event => {
    // we've moved a bunch of seeds and food to the grass block
    event.shapeless("minecraft:grass_block", [
        "minecraft:dirt",
        "exnihilosequentia:grass_seeds",
    ]);

    event.shaped("minecraft:moss_block",
        ['SSS', 'SDS', 'SSS'],
        {
            S: "#forge:seeds",
            D: "minecraft:dirt",
        }
    );

    // remove the default recipes in favor of the loot tables
    event.remove({type: "exnihilosequentia:sifting"});

    // Merge QS base recipes and optional Croptopia additions
    const mergeSieveMaps = (out, add) => {
        if (!add) return out;
        Object.entries(add).forEach(([mesh, inputs]) => {
            out[mesh] = out[mesh] || {};
            Object.entries(inputs).forEach(([input, outputs]) => {
                out[mesh][input] = (out[mesh][input] || []).concat(outputs);
            });
        });
        return out;
    };

    // mesh -> { inputBlock -> [ [output, chance], ... ] }
    let sieveRecipes = {};

    if (typeof qsSieveRecipes !== 'undefined') {
        sieveRecipes = mergeSieveMaps(sieveRecipes, qsSieveRecipes);
    }
    if (typeof croptopiaSieveRecipes !== 'undefined') {
        sieveRecipes = mergeSieveMaps(sieveRecipes, croptopiaSieveRecipes);
    }

    function makeRolls(meshType, rolls) {
        if (typeof rolls === 'number' ) {
            return [{
                chance: rolls,
                mesh: meshType,
            }];
        }
        return rolls.map((roll) => ({
            chance: roll,
            mesh: meshType
        }));
    }

    function chances(rolls) {
        if (rolls instanceof Array) {
            return rolls.map(r => r*10000);
        }
        return [rolls*10000]
    }

    Object.entries(sieveRecipes).forEach(([meshType, v]) => {
        Object.entries(v).forEach(([input, outputs]) => {
            outputs.forEach((output) => {
                event.custom({
                    "type": "exnihilosequentia:sifting",
                    "input": input,
                    "result": output[0],
                    "rolls": makeRolls(meshType, output[1])
                });

            })

            // if there are more than 7 chanced outputs we'll deal with that manually
            // there is a simple algorithm to fix these for 6 outputs but there's only
            // one outlier right now and it's probably easier to do manually
            var numChances = 0;
            outputs.forEach(output => {
                numChances += chances(output[1]).length
            });

            if (numChances < 7) {
                let rin = input.replace(/[^a-zA-Z0-9]/g, '')
                let r = event.recipes.gtceu.singleblock_sieve(`sieve_${meshType}_${rin}`)
                    .EUt(7)
                    .duration(50)
                    .notConsumable(`exnihilosequentia:${meshType}_mesh`)
                    .itemInputs(input);

                outputs.forEach(output => {
                    chances(output[1]).forEach(chance => r.chancedOutput(output[0], chance, 500));
                });
            }

        })
    });

    // fix sieve for netherrack
    event.recipes.gtceu.singleblock_sieve("sieve_string_crushednetherrackfixed")
        .EUt(7)
        .duration(50)
        .notConsumable("exnihilosequentia:string_mesh")
        .itemInputs("exnihilosequentia:crushed_netherrack")
        .chancedOutput("gtceu:sulfur_dust", 5000, 500)
        .chancedOutput("gtceu:crushed_gold_ore", 5500, 500)
        .chancedOutput("gtceu:crushed_stibnite_ore", 2500, 500)
        .chancedOutput("gtceu:crushed_tetrahedrite_ore", 1500, 500);

});
