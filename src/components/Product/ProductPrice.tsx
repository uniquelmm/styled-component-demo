import React, { FC } from "react";
import styled from "styled-components";
//产品价格展示组件
interface ProductPriceProps {
  originalPrice: string; // 原价
  discountPrice: string; // 折扣价
  discountRate: number; // 折扣率
}
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
const Percent = styled.div``;
const Off = styled.div``;

export const ProductPrice: FC<ProductPriceProps> = ({
  originalPrice,
  discountPrice,
  discountRate,
}) => {
  return (
    <>
      <DiscountPrice>${originalPrice}</DiscountPrice>
      <OriginalPrice>
        <s>${discountPrice}</s>
      </OriginalPrice>
      <Frame>
        <Percent>{discountRate}</Percent>
        <Off>OFF</Off>
      </Frame>
    </>
  );
};
