import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";
import data from "../../data";
import { ProductPrice } from "./ProductPrice";
import { ProductQuantity } from "./ProductQuantity";
import { ProductSelect } from "./ProductSelect";
//改变类型
interface DisplayShowProps {
  setDisplayShow: (value: string) => void;
  displayShow: string;
  showViewProducts: string;
  setShowViewProducts: (value: string) => void;
}

const BigProductContainer = styled.div`
  width: 100%;
  z-index: 99999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75); /* 0.75 透明度 */
  filter: alpha(opacity=50);
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
  /* padding: 15.5em 0em; */
  height: 100%;
  margin: 1em 0;
  overflow: hidden;
  justify-content: center;
  margin: auto;
`;

// 每个商品展示
const ProductContainer = styled.div`
  padding: 14px;
  max-width: 250px;

  flex: 1 1 auto;
  margin: 0 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  position: relative;
  margin: auto;
`;

// 图片
const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 20px;
`;

// 图片名
const Name = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 1rem;
  height: 38px;
  overflow: hidden;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
`;

// 产品尺码选择
const Size = styled.div`
  display: flex !important;
  width: 100%;
  justify-content: center;
  font-size: 15px;
`;

const ProductIcon = styled.div`
  position: relative;
  margin-right: 10px;
  &:before {
    content: "↓";
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    padding: 10px;
    pointer-events: none;
  }
`;

// 数量
const NumberControl = styled.div`
  display: flex;
  margin-left: 10px;
`;

// 产品价格
const Price = styled.div`
  margin: 5px;
  margin-top: 12px;
  display: flex;
  border-radius: 3px;
`;

//  accept 按钮
const Button = styled.button`
  padding: 14px;
  width: 220px;
  background-color: #0773f1;
  color: #fff;
  cursor: pointer;
  margin-top: 14px;
  border-radius: 3px;
  width: 100%;
  border: none;
`;

const ForkTop = styled.div`
  right: 13px;
  top: 8px;
  cursor: pointer;
  position: absolute;
  z-index: 99999;
`;

//产品组件打叉
const Product: FC<DisplayShowProps> = ({
  setDisplayShow,
  displayShow,
  setShowViewProducts,
  showViewProducts,
}) => {
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const [productNumber, setProductNumber] = useState(1);

  const handleProductVariant = (id: string) => {
    data.variants.find((variant: any) => {
      if (variant.id === Number(id)) {
        setCurrentProduct(variant);
      }
    });
  };

  //产品减少
  const reduceProductNumber = useCallback((value) => {
    changeProductNumber(value - 1);
  }, []);
  //产品数量大于0
  const changeProductNumber = (number: number) => {
    if (number - 1 < 1) {
      number = 1;
    }
    setProductNumber(number);
  };
  //产品增加
  const addProductNumber = useCallback((value) => {
    changeProductNumber(value + 1);
  }, []);

  const handleProductData = () => {
    let totalPrices = currentProduct.discountPrice * productNumber;
    console.log(
      "产品id：" +
        currentProduct.id +
        " 产品数量：" +
        productNumber +
        "产品总价：" +
        totalPrices
    );
  };

  return (
    <div style={{ display: showViewProducts }}>
      <BigProductContainer>
        <ProductContainer>
          <ForkTop onClick={() => setShowViewProducts("none")}> ✕</ForkTop>
          <Image src={currentProduct.featured_image.src} />
          <Name>{currentProduct.title}</Name>
          <Size>
            <ProductIcon>
              <ProductSelect
                variants={data.variants}
                value={data.variants.id}
                onChange={handleProductVariant}
              />
            </ProductIcon>
            <NumberControl>
              <ProductQuantity
                value={productNumber}
                onChange={changeProductNumber}
              />
            </NumberControl>
          </Size>
          <Price>
            <ProductPrice
              originalPrice={currentProduct.price}
              discountPrice={currentProduct.discountPrice}
              discountRate={currentProduct.percentage}
            />
          </Price>
          <Button onClick={handleProductData}>Accept</Button>
        </ProductContainer>
      </BigProductContainer>
    </div>
  );
};

export default Product;
