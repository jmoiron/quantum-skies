# Late Game Integration: Gas & Ice Giants

## Current State

Progression currently ends at the **Jupiter icy moons** (Europa, Ganymede, Callisto → Jovian
Leachate → Naquadah). There is an explicit TODO in `naquadah_chain.js`:

> "Design an alternative process for after Nq w/ the orbital gas drill"

`gcyr:trinaquadalloy_ingot` exists in GCyr Extras but is not in any quest or recipe chain.
Saturn (Tier 4), Titan (Tier 3), Uranus, and Neptune (Tier 5) have planet data but no meaningful
quest content or resource chains.

The gas miner harvests atmosphere directly from gas giants and Titan. The laser miner performs
precision extraction from surfaces and cloud decks — things the gas miner can't reach.

---

## Plan A — Sequential Tier Gates ("The Outer Worlds")

Each gas/ice giant becomes a hard gate for the next voltage tier.

**Titan (Rocket Tier 3) → LuV/ZPM bridge**

Titan's atmosphere is nitrogen-methane-rich. The gas miner produces a Titan Atmospheric Mix
which distills into methane, nitrogen, and a small yield of ethane. This ethane becomes the
feedstock for a new **Kapton-E** polymer — a thermally superior variant of Kapton-K already in
the pack — used in ZPM machine casings. This extends the existing Kapton-K polymer chain from
GCyr naturally, and Titan is reachable at Tier 3 alongside the Jovian moons so it doesn't delay
the player much.

**Saturn (Rocket Tier 4) → ZPM gate**

Saturn's upper atmosphere is the solar system's richest source of Helium-3. The orbital gas
miner (operated from saturn_orbit) produces Saturn Atmospheric Mix → distillation yields He-3.
He-3 is required as ignition fuel in the **ZPM Fusion Reactor** recipe. This makes Saturn a
meaningful stop on the road to ZPM that currently has no planetary tie-in. The laser miner
additionally extracts Saturn cloud deck silicates for ZPM wafer processing.

**Uranus & Neptune (Rocket Tier 5) → UV gate**

Uranus provides methane-rich slush and hydrogen sulfide → novel sulfide etchant for Tritanium
processing. Neptune provides high-pressure ammonia ices → ammonium compound for UV-tier circuit
fabrication. Both are needed for **Tritanium coil blocks**, currently gated only behind the ZPM
assembler with no planetary requirement.

**Laser miner role**: Precision extraction of cloud-deck particulates and Titan surface minerals,
replacing the planetary core drill at the outer-planet tier. Higher throughput but requires
ZPM-tier energy input.

**Strengths**: Clean, linear progression. Each planet feels purposeful. Hard gates encourage
exploration before tech advancement.

**Weaknesses**: Strict gating can feel punishing. Uranus and Neptune are very similar in
resources, making dual-gating feel redundant.

---

## Plan B — Trinaquadalloy as the Post-Naquadah Pivot ("The Alloy Web")

`gcyr:trinaquadalloy_ingot` (currently orphaned in GCyr Extras) becomes the central
post-naquadah material, bridging ZPM and UV, with gas giants providing the required inputs.

**Trinaquadalloy**: Trinium + Naquadah + a gas-giant-sourced third component. Best candidate:
`gtceu:helium_3_bucket` as fusion stabilizer, or a new Jovian Diamond extracted by laser miner
from high-pressure gas giant cores.

**Saturn → He-3 → Trinaquadalloy synthesis**

Gas miner on Saturn or saturn_orbit produces He-3 directly. He-3 feeds a new large chemical
reactor recipe: Trinium dust + Naquadah dust + He-3 + high temperature → Trinaquadalloy dust →
Trinaquadalloy ingot. Trinaquadalloy then becomes required for UV machine casings and UV-tier
energy hatches.

**Titan → alternative Naquadah enrichment (filling the TODO)**

Rather than repeating the Jovian Leachate process at scale, Titan methane chemistry provides an
alternative enrichment pathway: Titan Methane + Naquadah Oxide → Methanolic Naquadah Reduction
→ enriched naquadah product. Players who reach Titan get a faster path to enriched naquadah
during the LuV→ZPM stretch without being blocked by it.

**Laser miner → Jovian/Saturnian diamond rain**

Under gas giant pressure, carbon is compressed into diamond. The laser miner deployed into
Jupiter/Saturn/Uranus orbit extracts compressed carbon crystals → industrial diamond → used in
UV-tier cutting equipment (laser engravers, UV drill heads). This gives the laser miner an
evocative and distinct role from the gas miner.

**Strengths**: Fills the explicit TODO. Gives trinaquadalloy a purpose. Provides both a hard gate
AND an alternate path, which is less punishing than Plan A. The two miners have clearly different
roles.

**Weaknesses**: Trinaquadalloy is a GCyr Extras item that needs recipe design from scratch.
Two separate naquadah enrichment paths could create confusion about which to use when.

---

## Plan C — Atmospheric Chemistry Cascade ("Gas Chemistry Web")

Gas giants contribute a network of atmospheric fluids that feed into existing chemistry chains
and open parallel progression paths. No hard locks — gas giants accelerate and enrich rather
than strictly gate.

**Jupiter atmosphere → LuV gap filler**

Jupiter's atmosphere (not the moons) is mined via gas miner: Jovian Atmospheric Mix →
distillation → hydrogen, helium, ammonia, methane, and trace **phosphine**. Phosphine →
phosphorus compound → LuV-tier circuit board substrate. Deployable at Jupiter orbit (same
rocket tier as the Jovian moons), so it's a natural first use of the gas miner.

**Saturn/Titan → ZPM organic chemistry shortcut**

Saturn produces He-3 and Saturn Methane. Titan produces a Nitrogen-Ethane atmosphere. Combined
in a new chemical plant recipe: Saturn Methane + Titan Ethane → Cryo-Fracked Ethylene at much
better yield than the current petrochemical routes. This ethylene gates ZPM plastic components,
making gas giants a superior ethylene source compared to terrestrial coal chemistry at this tier.

**Uranus → UV-tier nitrogen chemistry**

Uranus has a hydrogen sulfide and ammonia-ice atmosphere. Gas miner produces Uranian Atmospheric
Slurry → distillation yields heavy nitrogen compounds, H2S, and trace noble gases. The H2S +
exotic amine chain → nitrogenated polymer required for UV-tier cable insulation, a higher grade
than the current polytetrafluoroethylene used at ZPM.

**Neptune → Dyson Sphere on-ramp**

Neptune's methane-ice and ammonia-ice composition → Deep Ice Extract via laser miner (which
penetrates Neptune's dense upper atmosphere to reach the ice layer, something the gas miner
cannot do). Deep Ice Extract → photovoltaic enhancement material for `gcyr:dyson_solar_cell`,
making Neptune the last planetary stop before the Dyson Sphere endgame.

**Laser miner role**: Deployed at ice giants specifically to extract crystalline ices from below
the cloud tops, complementing the gas miner which works on the atmosphere above.

**Strengths**: No hard locks, encourages organic exploration. Each planet contributes something
distinct to existing chains. The Dyson Sphere gets a clear on-ramp. Most flexible for players
who want to skip ahead.

**Weaknesses**: Without gates, players may skip gas giants entirely if alternatives exist.
Parallel paths dilute the sense of required exploration. More recipes to design and balance.

---

## Recommendation

**Plan B as the spine, with Plan A's Saturn→ZPM gate added.**

Make Trinaquadalloy the signature post-naquadah material — this fills the explicit TODO and
gives GCyr Extras a real role. Require He-3 from Saturn for its synthesis, making Saturn a hard
gate for UV. Add the Titan methane alternative enrichment path as a quality-of-life shortcut for
the LuV→ZPM stretch.

For UV tier, use Plan A's Uranus/Neptune dual-gate for Tritanium coils. Those two planets are
intentionally symmetric in the game, so requiring both is coherent rather than redundant.

The laser miner extracts cloud-deck minerals and compressed carbon that the gas miner can't
reach — a clear division of labor that makes both tools feel necessary rather than one being a
strict upgrade of the other.
