const config = {
  id: "vimeo-player",
  name: "vimeo-player-name",
  description: "vimeo-player-description",
  canBeInterrupted: true,
  canBeObserved: true,
  canInterrupt: false,
  canObserve: false,
  storage: [{ id: "video", name: "Video" }],
  interruptionFields: [{ id: "timeInVideo", name: "Tijd in video" }],
}

export default config;
