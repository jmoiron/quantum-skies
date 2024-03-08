package com.jmoiron.qscore.data;

import com.jmoiron.qscore.data.lang.LangHandler;
import com.jmoiron.qscore.registry.QSRegistries;
import com.tterrag.registrate.providers.ProviderType;

public class QSDatagen {
    public static void init() {
        QSRegistries.REGISTRATE.addDataGenerator(ProviderType.LANG, LangHandler::init);
    }
}
