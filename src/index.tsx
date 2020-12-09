import { render } from "solid-js/dom"
import { App } from "./App"
import { SettingsStore } from "./SettingsStore"

// Create an instance of the settings store.
const settings = new SettingsStore();

if (window.addEventListener) {
  window.addEventListener("load", () => {
    render(() => <App settings={settings} />, document.getElementById("root") as Node);
  })
}
