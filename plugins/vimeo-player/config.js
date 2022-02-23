const config = {
  id: "vimeo-player",
  name: "Vimeo player",
  description: "Loads a vimeo player and interrupts the video for other plugins.",
  canBeInterrupted: true,
  canBeObserved: true,
  canInterrupt: false,
  canObserve: false,
  storage: [{ id: "video", name: "Video" }],
  interruptionFields: [{ id: "timeInVideo", name: "Tijd in video" }],
}

export default config;
