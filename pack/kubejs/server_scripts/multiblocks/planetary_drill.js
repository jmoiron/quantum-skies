/*
File containing multiblocks, recipes, and extra chemistry for planetary drills
and their support machinery.

A Planetary drill (planet core drill) is a type of void miner that produces resources
endlessly, provided power and lubricant.  Resources vary by planet.

Ordinary drilling fluid is not enough for the high temperature application of a planetary
drill, so new lubricants must be used (different ones in different planets) that involve
the base GT machines, but also a ChemPlant and a support multiblock the Mudpit.

Several of the steps should have dimensional requirements to force the construction of
off-world infrastructure..  eg. the mudpit, chemplant, and drill itself are large
complex structures.

A quick search on the subject yields the following materials and their purposes, which
can be used to provide some spice to the processing chains.  We should probably require
that some of these materials are gathered on-world first.

- oil muds contain a base-oil, brine, lime, emulsifier, wetting agent, and viscosifier
- surfactants are added to drilling muds to emulsify water and prevent instability

- diesel, base-oil used in diesel-oil mud
- kerosene, base-oil also used in diesel-oil mud
- poly-alpha-olefin (PAO), better for enviro/health/safety, can be hydrogenated/hydrocracked
- perfluoropolyether (PFPE), high oxidation stability base oil
- water based drilling fluid

- barite, used to control for oil mud viscosity (adds weight)
- bentonite, added to oil based muds
- calcium carbonate (calcite) can be added
- lime (quicklime)
- soda ash
- hydrochloric acid to control for PH
- bitumen (asphalt), another component in diesel-oil mud
- sulphonated asphalt, a blend of sulphonated asphalt, polymers, and "other additives"

Intended mechanics:

Drill, Mudpit, and potentially other supporting infrastructure have dimensional
requirements and must be on-world.

The drill takes mud and a drill tip.  It outputs 50-75% of its hot mud (tier based?),
and chance outputs the tip, with higher chances for better tips;  only a few tips are
usable, and some may not be usable in all environments.  The hot mud can be cooled in
a freezer for re-use to cut down on mud requirements.

Also output is a large amt of planet oriented materials;  regolith, ores, potentially
magmas that can be centrifuged, etc.

Open questions:
* how much chem should be done in chem reactors, chem plant, etc? vs the final mixing
  in the mudpit?

Intended drilling fluids are as follows:

moon -> Diesel-oil Mud, which uses drilling fluid, kerosene, diesel, bitumen and soda ash.
    Bitumen is produced by heating heavy oil in a fluid heater to create hot crude oil,
    and then distilling it (which should yield other useful heavy petrochem fluids).

mars -> ? PAO

venus -> ? PFPE

mercury -> ? PFPE

Asteroids, if we can add them, should have martian requirements.  I don't think it's interesting
to set up the same thing 12 times for progress, but if we can get the jovian moons + titan going, 
we should add some support for them.  By the time someone as technology to do harvesting out
that far, they should have access to orbital drills, which will require higher tier tech and more
power, but be simpler to set up.

*/