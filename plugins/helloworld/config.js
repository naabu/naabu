const config = {
  id: "hello-world",
  name: "Text Input plugin",
  description: "Prints hello world or name to the page.",
  // The plugin should control when an interuption should take place? 
  // Not sure?
  // Plugins should be independent!
  canBeInterupted: true,
  canInterupt: false,
  storage: {
    name : {
      required: true,
      type: "string",
    }
  }
};

export default config;
