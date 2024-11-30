
ServerEvents.recipes(event => {

  event.replaceInput({mod: "framedblocks"},
    "framedblocks:framed_cube",
    "gtceu:wood_frame"
  );

  event.remove({id: "framedblocks:framed_cube"})

  event.shaped("framedblocks:framed_cube",
    ["FF", "FF"],
    {
      F: "gtceu:wood_frame"
    }
  );

});