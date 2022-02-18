const config = {
  id: "hello-world",
  name: "Text Input plugin",
  description: "Prints hello world or name to the page.",
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
