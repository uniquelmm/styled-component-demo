import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import data from "../../data";
// 数量减
const ButtonMinus = styled.button`
  padding: 5px 10px;
  height: 39px;
  background: #ececec;
  font-size: 17px;
  border: none;
  cursor: pointer;
`;
// 数字
const Input = styled.input`
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  text-align: center;
  width: 30px;
`;

// 数量增
const ButtonAdd = styled.button`
  padding: 5px 10px;
  height: 39px;
  background: #ececec;
  font-size: 17px;
  border: none;
  cursor: pointer;
`;

interface ProductQuantityProps {
  value: number; // 初始的数量
  onChange: (value: number) => void; // 数量改变
}

export const ProductQuantity: FC<ProductQuantityProps> = ({
  value,
  onChange,
}) => {
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const [productNumber, setProductNumber] = useState(1);
  //产品减少
  const reduceProductNumber = useCallback((value) => {
    onChange(value - 1);
  }, []);
  //产品数量大于0
  const changeProductNumber = (number: number) => {
    if (number - 1 < 1) {
      number = 1;
    }
    setProductNumber(number);
  };
  //产品增加
  const addProductNumber = useCallback(
    (value) => {
      onChange(value + 1);
    },
    [value]
  );

  return (
    <>
      <ButtonMinus onClick={() => reduceProductNumber(value)}>-</ButtonMinus>
      <Input
        value={value}
        onChange={(event) => {
          const value = event.target.value;
          changeProductNumber(Number(value));
          setProductNumber(Number(event.target.value));
        }}
      />
      <ButtonAdd onClick={() => addProductNumber(productNumber)}>+</ButtonAdd>
    </>
  );
};
