![](art/quantum-skies-banner-big.png)

Quantum skies is a GTCEu-modern based skyblock modpack for Minecraft 1.20.1.

Resource acquisition is "classic" ex nihilo, with some alterations to suit gregtech's progression. The stone age features a lot of QoL that make it go by fast. Light automation starts in the stone age, ramping into the full steam age.

Much of the later QoL is oriented towards power/item/fluid logistics. Flux Networks and Entangled are provided to make power, item, and fluid distribution much simpler, but the last mile will have to be GT pipenets or AE2. Since nearly all resources are functionally unlimited in skyblock, a lot of power generation options are viable, but only GT sources exist.

To balance some of this out, there are no storage drawers.

GTCEu modern is still under some heavy development and major apects of the later game progression may still see some changes.

Quantum Skies is playable to UV, with a tutorial-style quest book mapping out progress through ZPM.

Inspiration:

* [Agrarian Skies](https://www.curseforge.com/minecraft/modpacks/agrarian-skies), the original expert skyblock
* [Gregblock](https://www.curseforge.com/minecraft/modpacks/gregblock), the original gregtech skyblock
* [Gregicality Skyblock](https://www.curseforge.com/minecraft/modpacks/gregicality-skyblock-edition), gtceu skyblock before gtceu exists
* [Star Technology](https://www.curseforge.com/minecraft/modpacks/star-technology), a 1.19 gtceu modern skyblock
* [Gregtech Community Pack](https://www.curseforge.com/minecraft/modpacks/gregtech-community-pack)
  (+[Modern](https://www.curseforge.com/minecraft/modpacks/gregtech-community-pack-modern)), great GT tutorial pack

Credits:

* icon & banner artwork by [ulstick](https://www.behance.net/ulstick)
* Many GT oriented quest lines are adapted directly or inspired by GCP
* AE2 greficiation is currently directly from GCP (may change, or not)
* Lanthanides, Platinum chain are from GTNH via GTEC (may be adapted further over time)

## Development

You will need packwiz, java-jre-17 and make.

```sh
$ make build
```

This should build a full-zip with all mods included.

To support mods and resource packs that cannot be downloaded form the API, place them in `./cache/{mods,resourcepacks}` before running the build command.
