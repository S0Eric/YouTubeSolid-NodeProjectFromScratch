import { render } from "solid-js/web"
import { App } from "./App"
import { settingsStore } from "./settingsStore"

// Create an instance of the settings store.
const settings = settingsStore();

if (window.addEventListener) {
  window.addEventListener("load", () => {
    render(() => <App settings={settings} />, document.getElementById("root") as Node);
  })
}
