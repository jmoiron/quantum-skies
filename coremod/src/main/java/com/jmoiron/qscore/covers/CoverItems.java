package com.jmoiron.qscore.covers;

import com.gregtechceu.gtceu.api.item.ComponentItem;
import com.gregtechceu.gtceu.api.item.component.IItemComponent;
import com.gregtechceu.gtceu.common.item.CoverPlaceBehavior;
import com.gregtechceu.gtceu.common.item.TooltipBehavior;
import com.jmoiron.qscore.Registration;
import com.tterrag.registrate.util.entry.ItemEntry;
import com.tterrag.registrate.util.nullness.NonNullConsumer;

import net.minecraft.network.chat.Component;
import net.minecraft.world.item.Item;

public class CoverItems {
    @SuppressWarnings("null")
    public static ItemEntry<ComponentItem> ELECTRIC_PUMP_ULV = Registration.REGISTRATE.item("ulv_electric_pump", ComponentItem::create)
            .lang("ULV Electric Pump")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_PUMP.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.electric.pump.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.fluid_transfer_rate", (1280/2) / 20));
            })))
            .defaultModel()
            .register();
    
    public static ItemEntry<Item> ELECTRIC_PUMP_ULV_2 = Registration.REGISTRATE.item("ulv_electric_pump_2", Item::new)
        .lang("ULV Electric Pump 2")
        .defaultModel()
        .register();
    
    @SuppressWarnings("null")
    public static ItemEntry<ComponentItem> CONVEYOR_MODULE_ULV = Registration.REGISTRATE.item("ulv_conveyor_module", ComponentItem::create)
            .lang("ULV Conveyor Module")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_CONVEYOR.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.conveyor.module.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.item_transfer_rate", 4));
            })))
            .defaultModel()
            .register();
    
    public static <T extends ComponentItem> NonNullConsumer<T> attach(IItemComponent... components) {
        return item -> item.attachComponents(components);
    }

    public static void init() {};
}
