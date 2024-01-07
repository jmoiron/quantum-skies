# adapted from public domain software from Merith-TK/modpack-template

PACKNAME := "Quantum-Skies"
PACKURL := "https://github.com/jmoiron/quantum-skies"

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
	-rm build/packwiz-installer.jar
	# copy the rest of the configuration
	-cp pack/index.toml pack/pack.toml build/
	-cp -r pack/config build/
	-cp -r pack/kubejs build/
	-cp pack/icon.png build/
	-cp instance.cfg build/
	cd build && packwiz cf export && cd ..
	# move the build into the top directory
	mv build/Quantum*.zip ./

preBuild:
	-rm -rf build/config/*
	-rm -rf build/kubejs/*

clean:
	-rm -rf build

dos2unix:
	-cd pack && find . -type f -exec dos2unix {} \;

refresh:
	cd pack && packwiz refresh

default: build
