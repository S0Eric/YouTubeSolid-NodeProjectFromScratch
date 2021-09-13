import { Component, createSignal } from "solid-js";
import { settingsStore } from "./settingsStore";

type AppPropsType = {
  settings: ReturnType<typeof settingsStore>
}

export const App: Component<AppPropsType> = ({settings}) => {
  const handleAsyncOpClick = (finishNotify: () => void) => {
    setTimeout(finishNotify, 1000);
  }
  return (
    <div style={{
      color: settings.store.textColor,
      "background-color": settings.store.backgroundColor }}>
      <ButtonBar
        buttonColor={settings.store.buttonColor}
        onLightClick={() => settings.setThemeLight()}
        onDarkClick={() => settings.setThemeDark()}
        onCustomClick={(text, bg, btn) =>
                       settings.setThemeCustom(text, bg, btn)}
        onAsyncOpClick={handleAsyncOpClick} />
      <div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
      eiusmod tempor incidunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrum exercitationem ullam
      corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur. Quis aute iure reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      obcaecat cupiditat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
      </p>
      </div>
    </div>
  )
}

type ButtonBarPropsType = {
  buttonColor: string
  onLightClick: () => void
  onDarkClick: () => void
  onCustomClick: (textColor: string,
                  bgColor: string,
                  btnColor: string) => void
  onAsyncOpClick: (finishNotify: () => void) => void
}

const ButtonBar: Component<ButtonBarPropsType> = (props) => {
  let inputTextColor: HTMLInputElement =
          undefined as unknown as HTMLInputElement
  let inputBgColor: HTMLInputElement =
          undefined as unknown as HTMLInputElement
  let inputBtnColor: HTMLInputElement =
          undefined as unknown as HTMLInputElement
  const onCustomClickHandler =
          () => props.onCustomClick(inputTextColor.value,
                                    inputBgColor.value,
                                    inputBtnColor.value)
  const getBtnStyle = () => ({ "background-color": props.buttonColor })
  const [getIsAsyncOpCalling, setIsAsyncOpCalling] =
          createSignal(false)
  const getAsyncOpBtnStyle = () => ({
    "background-color": getIsAsyncOpCalling()
      ? "red" 
      : props.buttonColor
  })
  const doAsyncOpClick = () => {
    // Only start async op if one isn't already in progress.
    if (!getIsAsyncOpCalling()) {
      // Indicate an async operation is in progress.
      setIsAsyncOpCalling(true);
      // Invoke passed callback.
      props.onAsyncOpClick(() => setIsAsyncOpCalling(false))
    }
  }
  return (
    <div style="display: inline">
      <button type="button"
              onClick={(_) => props.onLightClick()}
              style={getBtnStyle()}>
        Light
      </button>
      <button type="button"
              onClick={(_) => props.onDarkClick()}
              style={getBtnStyle()}>
        Dark
      </button>
      <button type="button"
              onClick={onCustomClickHandler}
              style={getBtnStyle()}>
        Custom
      </button>
      <button type="button"
              onClick={doAsyncOpClick}
              style={getAsyncOpBtnStyle()}>
        Async-Operation
      </button>
      <label for="textColor">Text:</label>
      <input id="textColor" type="text"
              value="darkblue" ref={inputTextColor} />
      <label for="bgColor">Background:</label>
      <input id="bgColor" type="text"
              value="lightgreen" ref={inputBgColor} />
      <label for="btnColor">Button:</label>
      <input id="btnColor" type="text"
              value="orange" ref={inputBtnColor} />
    </div>
  )
}
