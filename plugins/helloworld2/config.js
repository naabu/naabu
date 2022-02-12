
const config = {
  id: "hello-world2",
  name: "Number plugin",
  description: "Prints a number to the page.",
  canBeInterupted: false,
  canInterupt: true,
  storage: {
    number : {
      required: true,
      type: "number",
    }
  }
};

export default config;