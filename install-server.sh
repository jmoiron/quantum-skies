#!/bin/bash

curl -LO https://github.com/packwiz/packwiz-installer-bootstrap/releases/download/v0.0.3/packwiz-installer-bootstrap.jar

java -jar packwiz-installer-bootstrap.jar -s server https://raw.githubusercontent.com/jmoiron/quantum-skies/master/pack/pack.toml

curl -LO https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.2.19/forge-1.20.1-47.2.19-installer.jar

java -jar forge-1.20.1-47.2.19-installer.jar --installServer