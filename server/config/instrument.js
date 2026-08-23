import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://68a0a3a80bf461ec5f2a9b0bec3119ef@o4511958486155264.ingest.us.sentry.io/4511958498476032",
  debug: true,   // 👈 add this
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});