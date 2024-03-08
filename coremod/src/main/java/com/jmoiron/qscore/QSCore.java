package com.jmoiron.qscore;

import com.gregtechceu.gtceu.api.item.ComponentItem;
import com.gregtechceu.gtceu.api.item.component.IItemComponent;
import com.gregtechceu.gtceu.common.data.GTItems;
import com.gregtechceu.gtceu.common.item.CoverPlaceBehavior;
import com.gregtechceu.gtceu.common.item.TooltipBehavior;
import com.gregtechceu.gtceu.utils.FormattingUtil;
import com.jmoiron.qscore.covers.CoverItems;
import com.jmoiron.qscore.covers.Covers;
import com.mojang.logging.LogUtils;
import com.tterrag.registrate.util.entry.ItemEntry;
import com.tterrag.registrate.util.nullness.NonNullConsumer;
import net.minecraft.client.Minecraft;
import net.minecraft.core.registries.Registries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.CreativeModeTab;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.BuildCreativeModeTabContentsEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
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
        ModLoadingContext.get().registerConfig(ModConfig.Type.COMMON, Config.SPEC);
    }

    public static void init() {
        LOGGER.info("registering quantum skies covers");
        CoverItems.init();
        Registration.REGISTRATE.registerRegistrate();
    }

    public static ResourceLocation id(String name) {
        return new ResourceLocation(MOD_ID, FormattingUtil.toLowerCaseUnder(name));
    }
}
