export const prerender = false;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request, setHeaders }) {
  let session = {
    environment: process.env['environment'],
    fb: process.env['fb'],
    fbApiKey: process.env['fbApiKey'],
    fbAuthDomain: process.env['fbAuthDomain'],
    fbProjectId: process.env['fbProjectId'],
    fbStorageBucket: process.env['fbStorageBucket'],
    fbMessagingSenderId: process.env['fbMessagingSenderId'],
    fbAppI: process.env['fbAppI'],
    fbMeasurementId: process.env['fbMeasurementId'],
    defaultLanguage: process.env["defaultLanguage"],
  }

  return {
    session: session
  };
}
