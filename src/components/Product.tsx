import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import data from "../data";

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
  padding: 10em 1em;
  margin: 1em 0;
  border-radius: 4px;
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

const ProductSelect = styled.select`
  width: 100%;
  padding: 10px 30px 10px 10px;
  appearance: none;
`;

// 数量
const NumberControl = styled.div`
  display: flex;
  margin-left: 10px;
`;

// 数量减
const ButtonOne = styled.button`
  padding: 5px 10px;
  height: 39px;
  background: #ececec;
  font-size: 17px;
  border: none;
  cursor: pointer;
`;

// 数字
const Input = styled.input`
type:number;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  text-align: center;
  width: 30px;
  
`;

// 数量增
const ButtonTow = styled.button`
  padding: 5px 10px;
  height: 39px;
  background: #ececec;
  font-size: 17px;
  border: none;
  cursor: pointer;
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

// 产品现价
const DiscountPrice = styled.div`
  margin-right: 5px;
  color: #0773f1;
  font-size: 1.5em;
  font-weight: 600;
`;

// 产品原价
const OriginalPrice = styled.div`
  margin-right: 5px;
  color: #f41b1b;
  font-weight: 600;
  font-size: 1.5em;
`;

const Frame = styled.div`
  border: 1px solid #0773f1;
  border-radius: 50px;
  text-align: center;
  padding: 5px 7px;
  font-size: 12px;
  color: #0773f1;
  display: flex;
  justify-content: center;
`;

const ForkTop = styled.div`
  right: 13px;
  top: 8px;
  cursor: pointer;
  position: absolute;
  z-index: 99999;
`;

const Percent = styled.div``;
const Off = styled.div``;

//产品组件打叉
const Product: FC<DisplayShowProps> = ({
  setDisplayShow,
  displayShow,
  setShowViewProducts,
  showViewProducts,
}) => {
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const [productNumber, setProductNumber] = useState(1);

  const handleChangeProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    data.variants.find((variant: any) => {
      // console.log(variant);
      if (variant.id === JSON.parse(event.target.value)) {
        // console.log(variant);
        setCurrentProduct(variant);
      }
    });
  };
//产品减少
const reduceProductNumber=(number:number)=>{
  changeProductNumber(number-1)
}
  //产品数量大于0
  const changeProductNumber=(number:number)=>{
    if(number-1<1){
      number=1;
    }
    setProductNumber(number)
    }
//产品增加
const addProductNumber =(number:number)=>{
  changeProductNumber(number+1)
}
  const handleProductData = () => {
    let totalPrices = currentProduct.discountPrice * productNumber;
    console.log(totalPrices);
    console.log(productNumber);
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
                <ProductSelect onChange={handleChangeProduct}>
                  {data?.variants?.map((variant: any) => {
                    let fruits = ["ariant.option1", "ariant.option2", "ariant.option3"];
                    let options = fruits.join('/');
                    return (
                      <option key={variant.id} value={variant.id}>
                        {options}
                      </option>
                    );
                  })}
                </ProductSelect>
              </ProductIcon>
              <NumberControl>
                <ButtonOne onClick={() => reduceProductNumber(productNumber) }>
                  -
                </ButtonOne>
                <Input 
                value={productNumber} 
                onChange={(event)=>{
                  const value=event.target.value;
                changeProductNumber(Number(value));
                setProductNumber(Number(event.target.value))}}
                />
                <ButtonTow onClick={() => addProductNumber(productNumber)}>
                  +
                </ButtonTow>
              </NumberControl>
            </Size>
            <Price>
              <DiscountPrice>${currentProduct.discountPrice}</DiscountPrice>
              <OriginalPrice>
                <s>${currentProduct.price}</s>
              </OriginalPrice>
              <Frame>
                <Percent>{currentProduct.percentage}</Percent>
                <Off>OFF</Off>
              </Frame>
            </Price>
            <Button onClick={handleProductData}>Accept</Button>
          </ProductContainer>
        </BigProductContainer>
    </div>
  );
};

export default Product;
