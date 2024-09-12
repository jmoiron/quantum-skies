
ServerEvents.recipes(event => {

    // controller block recipe for the large crucible
    event.shaped(Item.of("gtceu:basic_crucible"),
        ["CGC", "WXH", "CLC"],
        {
            C: "gtceu:ulv_machine_casing",
            X: "exnihilosequentia:fired_crucible",
            W: "#forge:tools/wrenches",
            H: "#forge:tools/hammers",
            L: "minecraft:lava_bucket",
            G: "minecraft:glass",
        }
    );

    event.shaped(Item.of("gtceu:industrial_crucible"),
        ["CGC", "WXH", "CLC"],
        {
            C: "gtceu:heatproof_machine_casing",
            X: "gtceu:basic_crucible",
            W: "#forge:tools/wrenches",
            H: "#forge:tools/hammers",
            L: "gtceu:stainless_steel_gearbox",
            G: "gtceu:tempered_glass",
        }
    )

    event.recipes.gtceu.crucible("lava_from_stone")
        .itemInputs("4x #forge:cobblestone")
        .outputFluids("minecraft:lava 1000")
        .circuit(1)
        .duration(400);

    event.recipes.gtceu.crucible("obsidian_from_stone")
        .itemInputs("4x #forge:cobblestone")
        .circuit(2)
        .itemOutputs("minecraft:obsidian")
        .duration(400);

    event.recipes.gtceu.crucible("lava_from_stone_powered")
        .itemInputs("4x #forge:cobblestone")
        .outputFluids("minecraft:lava 1000")
        .circuit(3)
        .duration(200)
        .EUt(10)

    event.recipes.gtceu.crucible("obsidian_from_stone_powered")
        .itemInputs("4x #forge:cobblestone")
        .circuit(4)
        .itemOutputs("minecraft:obsidian")
        .duration(200)
        .EUt(10)

    event.recipes.gtceu.crucible("endstone")
        .itemInputs("4x #forge:cobblestone", "minecraft:glowstone_dust")
        .circuit(5)
        .itemOutputs("4x minecraft:end_stone")
        .duration(200)
        .EUt(10)

    event.recipes.gtceu.crucible("netherrack")
        .itemInputs("4x #forge:cobblestone", "minecraft:redstone")
        .circuit(6)
        .itemOutputs("4x minecraft:netherrack")
        .duration(200)
        .EUt(10)
})