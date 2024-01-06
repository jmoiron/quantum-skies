# adapted from public domain software from Merith-TK/modpack-template

PACKNAME := "Quantum-Skies"
PACKURL := "https://github.com/jmoiron/quantum-skies"

build: refresh
	-mkdir -p build/mods
	-mkdir -p build/resourcepacks
	-cp cache/mods/* build/mods || :
	-cp cache/resourcepacks/* build/resourcepacks || :
	cd build && java -jar ../packwiz-installer-bootstrap.jar ../pack/pack.toml && cd ..
	-cp pack/index.toml pack/pack.toml build/
	-cp -r pack/config build/
	cd build && packwiz cf export && cd ..

clean:
	-rm -rf build

refresh:
	cd pack && packwiz refresh
