# adapted from public domain software from Merith-TK/modpack-template

VERSION := 0.7.4

HOME := ${HOME}
PACKNAME := Quantum-Skies
PACKURL := https://github.com/jmoiron/quantum-skies
PACK_INSTANCE := quantum-skies-${VERSION}

PRISMLAUNCHER_INSTANCE := PrismLauncher/instances/${PACK_INSTANCE}/minecraft/

LINUX_INSTALL := ${HOME}/.local/share/${PRISMLAUNCHER_INSTANCE}
MAC_INSTALL := ${HOME}/Library/Application Support/${PRISMLAUNCHER_INSTANCE}
WIN_INSTALL := $(shell ls -1d /mnt/c/Users/*/AppData/Roaming/${PRISMLAUNCHER_INSTANCE} 2>/dev/null | head -n 1)

# INSTALLPATH resolves to the first detected PrismLauncher instance location across Linux, macOS, and WSL.
INSTALLPATH ?=
ifeq ($(strip $(INSTALLPATH)),)
ifneq ($(shell test -d "$(LINUX_INSTALL)" && printf 'y'),)
INSTALLPATH := ${LINUX_INSTALL}
else ifneq ($(shell test -d "$(MAC_INSTALL)" && printf 'y'),)
INSTALLPATH := ${MAC_INSTALL}
else ifneq ($(strip $(WIN_INSTALL)),)
INSTALLPATH := ${WIN_INSTALL}
else
INSTALLPATH := ${LINUX_INSTALL}
$(warning INSTALLPATH not detected; defaulting to ${INSTALLPATH})
endif
endif

default: build

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

server: refresh preBuild
	-rm -rf server-files
	-rm -f quantum-skies-${VERSION}-server.zip
	-mkdir -p server-files/mods/
	-cp cache/forge*.jar server-files/
	-cp cache/packwiz-installer.jar server-files/
	-cp cache/mods/*.jar server-files/mods/
	cd server-files && java -jar ../packwiz-installer-bootstrap.jar -g -s server ../pack/pack.toml && cd ..
	-mv server-files/packwiz-installer.jar cache/
	-cp -r pack/defaultconfigs server-files/
	-cp -r pack/config server-files/
	-cp -r pack/kubejs server-files/
	-cp -r art/server-icon.png server-files/
	cd server-files && java -jar forge*.jar --installServer
	rm server-files/forge*.jar*
	rm server-files/packwiz.json
	mv server-files quantum-skies-${VERSION}
	zip -r quantum-skies-${VERSION}-server.zip quantum-skies-${VERSION}
	mv quantum-skies-${VERSION} server-files


cf: refresh preBuild
	-./setversion.py
	-rm -rf cfbuild
	-mkdir cfbuild
	-cp -r pack/* cfbuild/
	-cp LICENSE cfbuild/
	# package any embedded mods we need to provide
	# -cp cache/mods/*.jar cfbuild/mods/
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

push-kubejs:
	-rm -rf "${INSTALLPATH}/kubejs"
	-cp -r pack/kubejs "${INSTALLPATH}/kubejs"

preBuild:
	-rm -rf build/config/*
	-rm -rf build/kubejs/*
	-mkdir cache

clean:
	-rm -rf build

dos2unix:
	-cd pack && ../eoffix.sh
	-./sort.sh pack/config/skyblockbuilder/data/dimensions.txt

refresh:
	cd pack && packwiz refresh

bootstrap:
	go install github.com/packwiz/packwiz@latest
	# sudo apt install ripgrep dos2unix openjdk-17-jre
	#
test:
	tsmc --schema-path ${HOME}/mc/mcheck/tsmc/schema/ validate -d ./pack/kubejs/data/ --validator spyglass --ignore-undeclared-symbols
	jq -e .  pack/kubejs/assets/gtceu/lang/en_us.json >/dev/null 2>&1

test-verbose:
	tsmc --schema-path ${HOME}/mc/mcheck/tsmc/schema/ validate -d ./pack/kubejs/data/ -v --validator spyglass --ignore-undeclared-symbols

path:
	@echo ${INSTALLPATH}
