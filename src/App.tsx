import React, { FC, useState } from "react";
import Countdown from "./components/Countdown";
import Product from "./components/Product";

const App: FC = () => {
  const [displayShow, setDisplayShow] = useState("flex");
  const [displayViewProducts, setDisplayViewProducts] = useState("flex");
  return (
    <div>
      {/* 绿色按钮 */}
      <Countdown
        displayViewProducts={displayViewProducts}
        setDisplayViewProducts={setDisplayViewProducts}
      />
      {/* 产品组件打叉按钮和绿色按钮 */}
      <Product
        setDisplayViewProducts={setDisplayViewProducts}
        displayShow={displayShow}
        displayViewProducts={displayViewProducts}
        setDisplayShow={setDisplayShow}
      />
    </div>
  );
};

export default App;
