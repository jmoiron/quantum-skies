# adapted from public domain software from Merith-TK/modpack-template

VERSION := 0.1.5
#WINUSER := jmoir
WINUSER := jlmoi
PACKNAME := Quantum-Skies
PACKURL := https://github.com/jmoiron/quantum-skies
INSTALLPATH := /mnt/c/Users/${WINUSER}/AppData/Roaming/PrismLauncher/instances/quantum-skies-${VERSION}/minecraft/
#INSTALLPATH := /home/jmoiron/.local/share/PrismLauncher/instances/quantum-skies-${VERSION}/minecraft/

build: refresh preBuild
	-rm -rf build/config/*
	-rm -rf build/kubejs/*
	-mkdir -p build/mods
	-mkdir -p build/resourcepacks
	-cp cache/mods/* build/mods || :
	-cp cache/resourcepacks/* build/resourcepacks || :
	# use packwiz-installer to update mods
	-cp cache/packwiz-installer.jar build/
	cd build && java -jar ../packwiz-installer-bootstrap.jar ../pack/pack.toml && cd ..
	-mv build/packwiz-installer.jar cache/
	# copy the rest of the configuration
	-cp pack/index.toml pack/pack.toml build/
	-cp -r pack/defaultconfigs build/
	-cp -r pack/config build/
	-cp -r pack/kubejs build/
	-cp pack/icon.png build/
	cd build && packwiz cf export && cd ..
	# move the build into the top directory
	mv build/quantum*.zip ./

cf: refresh preBuild
	-./setversion.py
	-rm -rf cfbuild
	-mkdir cfbuild
	-cp -r pack/* cfbuild/
	-cp LICENSE cfbuild/
	# package any embedded mods we need to provide
	-cp cache/mods/*.jar cfbuild/mods/
	# remove probejs
	-rm cfbuild/mods/probejs*
	# export
	cd cfbuild && packwiz cf export && cd ..

pull:
	# pull updates from INSTALLPATH
	-rm -rf pack/config/*
	-rm -rf pack/kubejs/*
	-rm -rf pack/defaultconfigs/*
	-cp -r "${INSTALLPATH}/config/"* ./pack/config/
	-cp -r "${INSTALLPATH}/defaultconfigs/"* ./pack/defaultconfigs/
	-cp -r "${INSTALLPATH}/kubejs/"* ./pack/kubejs/
	-rm -rf pack/config/jei/world
	-rm -rf pack/kubejs/probe
	# do not copy client configs into the modpack; client config defaults
	# should be set with kubejs or the defaultconfig
	-rm -f pack/config/*-client.toml
	-rm -f pack/config/*-client.json*
	-cd pack && find . -type f -exec chmod 644 {} \; && cd ..
	$(MAKE) dos2unix

preBuild:
	-rm -rf build/config/*
	-rm -rf build/kubejs/*
	-mkdir cache

clean:
	-rm -rf build

dos2unix:
	-cd pack && ../eoffix.sh

refresh:
	cd pack && packwiz refresh

default: build

bootstrap:
	go install github.com/packwiz/packwiz@latest
	sudo apt install ripgrep dos2unix openjdk-17-jre

