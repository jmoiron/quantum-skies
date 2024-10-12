GTCEuStartupEvents.registry("gtceu:material", event => {
    // bedrock dust
    function dust(name, color) {
        return event.create(name).dust().color(color);
    }

    function fluid(name, color) {
        return event.create(name).fluid().color(color);
    }

    function gas(name, color) {
        event.create(name).gas().color(color);
    }

    // yttrium
    event.create("euxenite")
        .components("2x yttrium", "1x thorium", "6x oxygen")
        .color(0x0B502B)
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .dust();

    gas("venus_air", 0xfff9c6);
    gas("mars_air", 0xDB5D4C);
    fluid("liquid_venus_air", 0xfff9c6);
    fluid("liquid_mars_air", 0xdb5d4c);

    const flint = GTMaterialIconSet.FLINT;
    const sand = GTMaterialIconSet.SAND;
    const star = GTMaterialIconSet.NETHERSTAR;

    dust("bedrock", 0x565656).iconSet(flint);
    dust("moon_regolith", 0x959595)
        .flags(GTMaterialFlags.FORCE_GENERATE_BLOCK)
        .iconSet(sand);

    // regolith blocks already exist for mars & venus
    dust("mars_regolith_d", 0x521F0A).iconSet(sand);
    dust("venus_regolith_d", 0x261D15).iconSet(sand);

    dust("martian_nether", 0x719287).iconSet(star);
    dust("venusian_star", 0xfbfcc4).iconSet(star);
    dust("planetary_nether_star", 0x9cb2a7).iconSet(star);

    // mercury rock!

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

    fluid("nitrogen_tetroxide", 0x9C9C04);

    // catalyst for PAO production (chem plant)
    event.create("boron_trifluoride")
        .gas()
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .components("1x boron", "3x fluorine")
        .color(0xE6FFE5);

    // add polyvinyl butyral rods
    GTMaterials.PolyvinylButyral.addFlags(GTMaterialFlags.GENERATE_ROD);

})