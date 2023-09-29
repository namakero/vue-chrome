import { defineManifest } from "@crxjs/vite-plugin";

export const manifest = defineManifest({
  "manifest_version": 3,
  "name": "chrome-extend-function",
  "version": "1.1.0",
  "permissions": ["storage"],
  "action": { "default_popup": "index.html" },
  "content_scripts": [{
    "js": ["./src/scripts/content.ts"],
    "matches": ["https://www.google.com/*"]
  }]
});