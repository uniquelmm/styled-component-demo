import React, { FC, useState } from "react";
import Countdown from "./components/Countdown";
import Product from "./components/Product";

const App: FC = () => {
  const [displayShow, setDisplayShow] = useState("true");
  const [showViewProducts, setShowViewProducts] = useState("true");
  return (
    <div>
      {/* 绿色按钮 */}
      <Countdown
        showViewProducts={showViewProducts}
        setShowViewProducts={setShowViewProducts}
      />
      {/* 产品组件打叉按钮和绿色按钮 */}
      <Product
        setShowViewProducts={setShowViewProducts}
        displayShow={displayShow}
        showViewProducts={showViewProducts}
        setDisplayShow={setDisplayShow}
      />
    </div>
  );
};

export default App;
