package com.jmoiron.qscore;

import com.gregtechceu.gtceu.api.addon.GTAddon;
import com.gregtechceu.gtceu.api.addon.IGTAddon;
import com.gregtechceu.gtceu.api.registry.GTRegistries;
import com.gregtechceu.gtceu.api.registry.registrate.GTRegistrate;
import com.jmoiron.qscore.covers.Covers;
import com.jmoiron.qscore.registry.QSRegistries;

@GTAddon
public class QSCoreAddon implements IGTAddon {

    @Override
    public GTRegistrate getRegistrate() {
        return QSRegistries.REGISTRATE;
    }

    @Override
    public void initializeAddon() {
    }

    @Override
    public String addonModId() {
        return QSCore.MOD_ID;
    }
    
    @Override
    public void registerCovers() {
        GTRegistries.COVERS.register(Covers.ULV_PUMP.id, Covers.ULV_PUMP.definition);
        GTRegistries.COVERS.register(Covers.ULV_CONVEYOR.id, Covers.ULV_CONVEYOR.definition);
    }
}
