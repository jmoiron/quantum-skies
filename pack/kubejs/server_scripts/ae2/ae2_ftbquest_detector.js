ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    event.remove({ output: "ae2_ftbquest_detector:me_quests_detector" });
    event.shaped("ae2_ftbquest_detector:me_quests_detector", ["LPE", "FBA", "CPI"], {
        L: "ae2:logic_processor",
        E: "ae2:engineering_processor",
        C: "ae2:calculation_processor",
        I: "ae2:interface",
        B: "ftbquests:book",
        F: "ae2:formation_core",
        A: "ae2:annihilation_core",
        P: "gtceu:energistic_steel_plate",
    });

})
