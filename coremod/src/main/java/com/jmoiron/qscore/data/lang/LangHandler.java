package com.jmoiron.qscore.data.lang;

import java.util.Set;

import com.gregtechceu.gtceu.api.data.chemical.material.Material;
import com.tterrag.registrate.providers.RegistrateLangProvider;
import com.gregtechceu.gtceu.utils.FormattingUtil;

public class LangHandler extends com.gregtechceu.gtceu.data.lang.LangHandler {


    private static final Set<Material> MATERIALS = Set.of();


    public static void init(RegistrateLangProvider provider) {
        // provider.add("gtec.recipe.cleanerroom.display_name", "Ultra-sterile Cleanroom");
        initItemTooltips(provider);
    }
    private static void initItemTooltips(RegistrateLangProvider provider) {

        // materials
        for (Material material : MATERIALS) {
            provider.add(material.getUnlocalizedName(), FormattingUtil.toEnglishName(material.getName()));
        }

        multilineLang(provider, "item.qscore.ulv_conveyor_module", "ULV Conveyor Module");
        multilineLang(provider, "item.qscore.ulv_electric_pump", "ULV Electric Pump");
    }
}