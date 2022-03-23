const config = {
  id: "youtube-player",
  name: "youtube-player-name",
  description: "youtube-player-description",
  canBeInterrupted: true,
  canBeObserved: true,
  canInterrupt: false,
  canObserve: false,
  storage: [{ id: "video", name: "Video" }],
  interruptionFields: [{ id: "timeInVideo", name: "Tijd in video" }],
}

export default config;
