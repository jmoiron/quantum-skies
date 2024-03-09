package com.jmoiron.qscore.covers;

import com.gregtechceu.gtceu.api.item.ComponentItem;
import com.gregtechceu.gtceu.api.item.component.IItemComponent;
import com.gregtechceu.gtceu.common.item.CoverPlaceBehavior;
import com.gregtechceu.gtceu.common.item.TooltipBehavior;
import com.jmoiron.qscore.registry.QSCreativeModeTabs;
import com.jmoiron.qscore.registry.QSRegistries;
import com.tterrag.registrate.util.entry.ItemEntry;
import com.tterrag.registrate.util.nullness.NonNullConsumer;

import net.minecraft.network.chat.Component;

@SuppressWarnings("null")
public class CoverItems {
    static {
        QSRegistries.REGISTRATE.creativeModeTab(() -> QSCreativeModeTabs.ITEM);
    }

    public static ItemEntry<ComponentItem> ELECTRIC_PUMP_ULV = QSRegistries.REGISTRATE.item("ulv_electric_pump", ComponentItem::create)
            .lang("ULV Electric Pump")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_PUMP.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.electric.pump.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.fluid_transfer_rate", (1280/2) / 20));
            })))
            .register();
    
    public static ItemEntry<ComponentItem> CONVEYOR_MODULE_ULV = QSRegistries.REGISTRATE.item("ulv_conveyor_module", ComponentItem::create)
            .lang("ULV Conveyor Module")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_CONVEYOR.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.conveyor.module.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.item_transfer_rate", 2));
            })))
            .register();

    public static ItemEntry<ComponentItem> FLUID_REGULATOR_ULV = QSRegistries.REGISTRATE.item("ulv_fluid_regulator", ComponentItem::create)
            .lang("ULV Fluid Regulator")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_FLUID_REGULATOR.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.fluid.regulator.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.fluid_transfer_rate", (1280/2) / 20));
            })))
            .register();
    
    public static ItemEntry<ComponentItem> ROBOT_ARM_LV = QSRegistries.REGISTRATE.item("ulv_robot_arm", ComponentItem::create)
            .lang("ULV Robot Arm")
            .onRegister(attach(new CoverPlaceBehavior(Covers.ULV_ROBOT_ARM.definition)))
            .onRegister(attach(new TooltipBehavior(lines -> {
                lines.add(Component.translatable("item.gtceu.robot.arm.tooltip"));
                lines.add(Component.translatable("gtceu.universal.tooltip.item_transfer_rate", 2));
            })))
            .register();

    public static <T extends ComponentItem> NonNullConsumer<T> attach(IItemComponent... components) {
        return item -> item.attachComponents(components);
    }

    public static void init() {};
}
