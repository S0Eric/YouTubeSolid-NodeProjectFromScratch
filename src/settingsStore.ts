import { createStore } from "solid-js/store"

type StoreType = {
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
}

export const settingsStore = () => {
  const getThemeSettingsLight: () => StoreType = () => ({
    textColor: "black",
    backgroundColor: "white",
    buttonColor: "lightgrey"
  });
  const getThemeSettingsDark: () => StoreType = () => ({
    textColor: "white",
    backgroundColor: "black",
    buttonColor: "darkgrey"
  });

  let [store, setStore] = createStore<StoreType>(getThemeSettingsLight());

  return {
    store,
    setThemeLight: () => { setStore(getThemeSettingsLight()) },
    setThemeDark: () => { setStore(getThemeSettingsDark()) },
    setThemeCustom: (textColor: string, backgroundColor: string, buttonColor: string) => {
      setStore({ textColor, backgroundColor, buttonColor });
    }
  };
};
