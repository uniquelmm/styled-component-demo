import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import data from "../../data";
//产品 select 选择框组件
interface ProductVariantSelectProps {
  variants: any; // 所有变种
  value: string; // 当前变种 Id
  onChange: (value: string) => void; // select 选择框改变时触发
}
const ProductSelect = styled.select`
  width: 100%;
  padding: 10px 30px 10px 10px;
  appearance: none;
`;
export const ProductPrice: FC<ProductVariantSelectProps> = ({
  variants,
  value,
  onChange,
}) => {
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const handleChangeProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    data.variants.find((variant: any) => {
      if (variant.id === JSON.parse(event.target.value)) {
        setCurrentProduct(variant);
      }
    });
  };
  return (
    <>
      <ProductSelect onChange={handleChangeProduct}>
        {data?.variants?.map((variant: any) => {
          let fruits = [variant.option1, variant.option2, variant.option3];
          let options = fruits.join("/");
          return (
            <option key={variant.id} value={variant.id}>
              {options}
            </option>
          );
        })}
      </ProductSelect>
    </>
  );
};
