const config = {
  id: "vimeo-player",
  name: "Vimeo player plugin",
  description: "Loads a vimeo player and interrupts the video for other plugins.",
  canBeInterrupted: true,
  canBeObserved: true,
  canInterrupt: false,
  canObserve: false,
  storage: {
    video: {
    }
  },
  interruptionFields:
  {
    timeInVideo: {
    }
  }
}

export default config;
