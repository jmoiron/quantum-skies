package com.jmoiron.qscore.covers;

import com.gregtechceu.gtceu.api.GTValues;
import com.gregtechceu.gtceu.api.capability.ICoverable;
import com.gregtechceu.gtceu.api.cover.CoverDefinition;
import com.gregtechceu.gtceu.common.cover.PumpCover;

import net.minecraft.core.Direction;

public class PumpCoverExt extends PumpCover {
    public final long maxMilliBucketsPerTick;

    PumpCoverExt(CoverDefinition definition, ICoverable coverHolder, Direction attachedSide, int tier) {
        super(definition, coverHolder, attachedSide, tier);

        int minTier = Math.max(tier, 1);
        this.maxMilliBucketsPerTick = 64 * (long) Math.pow(4, Math.min(minTier - 1, GTValues.IV)); // .5b 2b 8b

        this.currentMilliBucketsPerTick = maxMilliBucketsPerTick;
        this.milliBucketsLeftToTransferLastSecond = currentMilliBucketsPerTick * 20;   
    }
}
