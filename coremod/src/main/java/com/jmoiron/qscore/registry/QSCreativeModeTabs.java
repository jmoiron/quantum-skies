package com.jmoiron.qscore.registry;

import com.gregtechceu.gtceu.common.data.GTCreativeModeTabs;
import com.jmoiron.qscore.QSCore;
import com.jmoiron.qscore.covers.CoverItems;
import com.tterrag.registrate.util.entry.RegistryEntry;
import net.minecraft.network.chat.Component;
import net.minecraft.world.item.CreativeModeTab;

public class QSCreativeModeTabs {
    @SuppressWarnings("null")
    public static RegistryEntry<CreativeModeTab> ITEM = QSRegistries.REGISTRATE.defaultCreativeTab(QSCore.MOD_ID,
            builder -> builder.displayItems(new GTCreativeModeTabs.RegistrateDisplayItemsGenerator(QSCore.MOD_ID, QSRegistries.REGISTRATE))
                    .icon(CoverItems.ELECTRIC_PUMP_ULV::asStack)
                    .title(Component.literal("Quantum Skies Core"))
                    .build())
            .register();

    public static void init() {

    }
}