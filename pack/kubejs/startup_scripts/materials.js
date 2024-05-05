GTCEuStartupEvents.registry("gtceu:material", event => {
    // bedrock dust

    event.create("bedrock")
        .dust()
        .color(0x565656)
        .iconSet(GTMaterialIconSet.FLINT);

    // moon regolith dust
    event.create("moon_regolith")
        .dust()
        .flags(GTMaterialFlags.FORCE_GENERATE_BLOCK)
        .color(0x959595)
        .iconSet(GTMaterialIconSet.SAND);

    // regolith blocks already exist for mars & venus
    event.create("mars_regolith_d")
        .dust()
        .color(0x521F0A)
        .iconSet(GTMaterialIconSet.SAND);

    event.create("venus_regolith_d")
        .dust()
        .color(0x261D15)
        .iconSet(GTMaterialIconSet.SAND);

    // mercury rock!
    function dust(name, color) {
        event.create(name).dust().color(color);
    }

    function fluid(name, color) {
        event.create(name).fluid().color(color);
    }

    function gas(name, color) {
        event.create(name).gas().color(color);
    }

    fluid("diesel_oil_mud", 0x476471);
    fluid("hot_diesel_oil_mud", 0x666677);

    fluid("bitumen", 0x2d3533);
    fluid("sulphonated_bitumen", 0x003533);
    fluid("hot_heavy_oil", 0x331111);

    // hot heavy oil distills into these bitumen, lube oil, hf + lf
    // lubricating oil..
    fluid("lubricating_oil", 0x444400);

    // hypochloric acid + ethylene
    gas("ethylene_oxide", 0x919174);
    // ethylene oxide + water -> ethylene glycol (antifreeze)
    fluid("ethylene_glycol", 0x70FF79);

    // 1-decene is the base olefin for our PAO
    fluid("i_decene", 0xFFbbbb);
    // poly-a-olefin solution
    dust("i_decene_olefin_sludge", 0xffcccc)
    // quench with distilled water in a washer
    fluid("i_decene_solution", 0xffaaaa)
    // add hydrogen
    fluid("hydrogenated_i_decene_solution", 0xffaaaa)

    // distilled from hydrogenated i_decene solution
    fluid("i_decene_tetramer", 0xddccbb);

    // tier 2 mud
    fluid("poly_alpha_olefin_mud", 0x667788);
    fluid("hot_poly_alpha_olefin_mud", 0x887788);

    // catalyst for PAO production (chem plant)
    event.create("boron_trifluoride")
        .gas()
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .components("1x boron", "3x fluorine")
        .color(0xE6FFE5);

})