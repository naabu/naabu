const config = {
  id: "hello-world",
  name: "Text Input plugin",
  description: "Prints hello world or name to the page.",
  // The plugin should control when an interruption should take place? 
  // Not sure?
  // Plugins should be independent!
  canBeInterrupted: true,
  canInterrupt: false,
  storage: {
    name : {
      required: true,
      type: "string",
    }
  }
};

export default config;
