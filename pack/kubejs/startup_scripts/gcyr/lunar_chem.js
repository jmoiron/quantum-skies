GTCEuStartupEvents.registry("gtceu:material", event => {

    // Moissanite — natural SiC gem found in lunar regolith near ancient impact craters.
    // Faintly greener than diamond.
    event.create("moissanite")
        .gem()
        .ore()
        .color(0xD8FFE8)
        .secondaryColor(0xB8E0C8)
        .iconSet(GTMaterialIconSet.DIAMOND)
        .formula("SiC")
        .addOreByproducts(GTMaterials.Silicon, GTMaterials.Silicon)
        .flags(
            GTMaterialFlags.NO_SMASHING,
            GTMaterialFlags.NO_SMELTING,
            GTMaterialFlags.GENERATE_LENS
        );

    // Intermediates for the moissanite → silicon carbide ingot chain.
    // sic_suspension: HF-etched moissanite grains in aqueous colloidal suspension.
    // sic_sintering_slurry: suspension with boron sintering aid added.
    event.create("sic_suspension").fluid().color(0xD0E8E0);
    event.create("sic_sintering_slurry").fluid().color(0xB8D0C8);

    // Silicon Carbide — advanced structural ceramic sintered from moissanite dust.
    // Plate and foil forms for chip substrate integration.
    // Sintering requires RTM alloy coils (4000K > Nichrome 3600K) at IV energy.
    event.create("silicon_carbide")
        .ingot()
        .color(0x506070)
        .secondaryColor(0x2A3040)
        .iconSet(GTMaterialIconSet.DULL)
        .components("1x silicon", "1x carbon")
        .flags(
            GTMaterialFlags.GENERATE_PLATE,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING
        )
        .blastTemp(4000, "low", GTValues.VA[GTValues.IV], 20 * 120);

});
