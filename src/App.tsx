import React, { ReactElement, useEffect } from "react";
import { useLocalStorage } from "react-use";

declare global {
  interface Window {
    //  stickyCartConfig: StickyCartConfig;
    //  setStickyCartConfig: (config: StickyCartConfig) => void;
    stickyCartConfig: any;
    setStickyCartConfig: (config: any) => void;
  }
}

window.setStickyCartConfig = (config) => {
  postMessage({ type: "STICKY_CART_UPDATE_CONFIG", data: config }, "*");
};

function App(): ReactElement {
  const [config, setConfig] = useLocalStorage(
    "STICKY_CART_UPDATE_CONFIG",
    window.stickyCartConfig
  );

  useEffect(() => {
    function receiveMessage(this: Window, event: MessageEvent) {
      if (event?.data?.type === "STICKY_CART_UPDATE_CONFIG") {
        setConfig(event?.data?.data);
      }
    }

    window.addEventListener("message", receiveMessage, false);

    return () => window.removeEventListener("message", receiveMessage);
  }, [setConfig]);

  // 监听配置变化
  useEffect(() => console.log("sticky cart config change", config), [config]);

  // 页面准备好后发送事件
  useEffect(
    () => window.parent.postMessage({ type: "STICKY_CART_READY" }, "*"),
    []
  );

  return <>Upsell-master</>;
}

export default App;
