const functions = require("firebase-functions");

let ssrServer;
exports.ssr = functions.https.onRequest(async (request, response) => {
      if (!ssrServer) {
              functions.logger.info("Initializing SvelteKit SSR Handler");
              ssrServer = require("./ssr/index").default;
              functions.logger.info("SvelteKit SSR Handler initialised!");
      }
      functions.logger.info(process.env);
      return await ssrServer(request, response);
});