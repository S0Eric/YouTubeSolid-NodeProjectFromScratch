import { createState, State, SetStateFunction } from "solid-js"

type StateType = {
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
}

export class SettingsStore {
  state: State<StateType>
  private setState: SetStateFunction<StateType>

  constructor() {
    [this.state, this.setState] = createState<StateType>(this.getThemeSettingsLight())
  }

  private getThemeSettingsLight: () => StateType =
        () => ({
          textColor: "black",
          backgroundColor: "white",
          buttonColor: "lightgrey"
        })
  private getThemeSettingsDark: () => StateType =
        () => ({
          textColor: "white",
          backgroundColor: "black",
          buttonColor: "darkgrey"
        })

  setThemeLight() { this.setState(this.getThemeSettingsLight()) }
  setThemeDark() { this.setState(this.getThemeSettingsDark()) }
  setThemeCustom(txtColor: string, bgColor: string, btnColor: string) {
    this.setState({
      textColor: txtColor,
      backgroundColor: bgColor,
      buttonColor: btnColor })
  }
}
