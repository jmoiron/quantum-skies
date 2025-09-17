// Reintroduce the removed GTCEu brine→bromine intermediates so existing
// quests and recipes referencing gtceu:* ids continue to work.

GTCEuStartupEvents.registry("gtceu:material", event => {
  const F = GTMaterialFlags;

  // Base and heated brines
  event.create("raw_brine").fluid().color(0x9f6b26);
  event.create("hot_brine").fluid().color(0xbe6026);

  // Chlorinated/brominated intermediate
  event.create("hot_chlorinated_brominated_brine")
    .fluid()
    .color(0xab765d)
    .flags(F.DISABLE_DECOMPOSITION)
    .components("1x hot_brine", "1x chlorine");

  // Debrominated brines
  event.create("hot_debrominated_brine").fluid().color(0xab896d);
  event.create("hot_alkaline_debrominated_brine")
    .fluid()
    .color(0xbe8938)
    .flags(F.DISABLE_DECOMPOSITION)
    .components("2x hot_debrominated_brine", "1x chlorine");
  event.create("debrominated_brine").fluid().color(0xab8c6d);

  // Vapor and exhaust
  event.create("brominated_chlorine_vapor")
    .gas()
    .color(0xbb9b72)
    .flags(F.DISABLE_DECOMPOSITION)
    .components("1x chlorine", "1x bromine", "1x steam");

  event.create("acidic_bromine_exhaust")
    .gas()
    .color(0x8f681e)
    .components("3x steam", "1x chlorine");

  // Solutions used just before distillation
  event.create("acidic_bromine_solution")
    .fluid()
    .color(0x8f5a2b); // approximate visual

  event.create("concentrated_bromine_solution")
    .fluid()
    .color(0x6b3f1e); // approximate visual
});

