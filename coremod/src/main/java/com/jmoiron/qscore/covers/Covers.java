package com.jmoiron.qscore.covers;

import com.gregtechceu.gtceu.api.GTValues;
import com.gregtechceu.gtceu.api.cover.CoverDefinition;
import com.gregtechceu.gtceu.api.registry.GTRegistries;
import com.gregtechceu.gtceu.common.cover.*;
import com.jmoiron.qscore.QSCore;
import com.gregtechceu.gtceu.client.renderer.cover.*;

import net.minecraft.resources.ResourceLocation;

public class Covers {

    public static class CoverInfo {
        public ResourceLocation id;
        public CoverDefinition definition;
    
        CoverInfo(String id, CoverDefinition.TieredCoverBehaviourProvider behavior, ICoverRenderer renderer) {
            this.id = QSCore.id(id);
            this.definition = register(id, behavior, renderer);
        }
    };

    public final static CoverInfo ULV_CONVEYOR = new CoverInfo(
        "conveyor",
        ConveyorCover::new,
        new SimpleCoverRenderer(new ResourceLocation("gtceu:block/cover/overlay_conveyor"))
    );

    public final static CoverInfo ULV_PUMP = new CoverInfo(
        "pump",
        PumpCoverExt::new,
        new SimpleCoverRenderer(new ResourceLocation("gtceu:block/cover/overlay_pump"))
    );
    
    public static CoverDefinition register(
            String id, 
            CoverDefinition.TieredCoverBehaviourProvider behavior, 
            ICoverRenderer renderer
        ) {
        var definition = new CoverDefinition(QSCore.id(id), 
            (def, coverable, side) -> behavior.create(def, coverable, side, GTValues.ULV), 
            renderer);

        return definition;
    }
}