package com.jmoiron.qscore;

import com.gregtechceu.gtceu.config.ConfigHolder;
import com.gregtechceu.gtceu.utils.FormattingUtil;
import com.jmoiron.qscore.covers.CoverItems;
import com.jmoiron.qscore.data.QSDatagen;
import com.jmoiron.qscore.registry.QSCreativeModeTabs;
import com.jmoiron.qscore.registry.QSRegistries;
import com.mojang.logging.LogUtils;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.slf4j.Logger;

// The value here should match an entry in the META-INF/mods.toml file
@Mod(QSCore.MOD_ID)
public class QSCore {
    public static final String MOD_ID = "qscore";

    private static final Logger LOGGER = LogUtils.getLogger();

    public QSCore()
    {
        QSCore.init();
        var bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.register(this);
        // MinecraftForge.EVENT_BUS.register(this);
        // ModLoadingContext.get().registerConfig(ModConfig.Type.COMMON, Config.SPEC);
    }

    public static void init() {
        ConfigHolder.init();

        LOGGER.info("initializing quantum skies coremod");
        CoverItems.init();
        QSCreativeModeTabs.init();
        QSDatagen.init();

        QSRegistries.REGISTRATE.registerRegistrate();
    }

    public static ResourceLocation id(String name) {
        return new ResourceLocation(MOD_ID, FormattingUtil.toLowerCaseUnder(name));
    }
}
