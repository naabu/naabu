const config = {
  id: "vimeo-player",
  name: "vimeo-player-name",
  description: "vimeo-player-description",
  canBeInterrupted: true,
  canBeObserved: true,
  canInterrupt: false,
  canObserve: false,
  storage: [{ id: "video", name: "video" }],
  interruptionFields: [{ id: "timeInVideo", name: "time-in-video" }],
  type: "activity",
}

export default config;
