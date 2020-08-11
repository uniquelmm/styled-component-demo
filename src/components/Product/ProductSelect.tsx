import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import data from "../../data";
//产品 select 选择框组件
interface ProductVariantSelectProps {
  variants: VariantFragment[]; // 所有变种
  value: string; // 当前变种 Id
  onChange: (value: string) => void; // select 选择框改变时触发
}

export interface VariantFragment {
  id: any;
  title: string;
  option1: string;
  option2: string;
  option3?: any;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: FeaturedImage;
  available: boolean;
  name: string;
  public_title: string;
  options: string[];
  price: number;
  weight: number;
  compare_at_price: number;
  inventory_management: string;
  barcode?: any;
  featured_media: FeaturedMedia;
}
export interface FeaturedMedia {
  alt?: any;
  id: any;
  position: number;
  preview_image: PreviewImage;
}
export interface PreviewImage {
  aspect_ratio: number;
  height: number;
  width: number;
  src: string;
}
export interface FeaturedImage {
  id: any;
  product_id: any;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
}

const Select = styled.select`
  width: 100%;
  padding: 10px 30px 10px 10px;
  appearance: none;
`;
export const ProductSelect: FC<ProductVariantSelectProps> = ({
  variants,
  value,
  onChange,
}) => {
  const handleProductVariant = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      <Select onChange={handleProductVariant} value={value}>
        {data?.variants?.map((variant: any) => {
          let fruits = [variant.option1, variant.option2, variant.option3];
          let options = fruits.join("/");
          return (
            <option key={variant.id} value={variant.id}>
              {options}
            </option>
          );
        })}
      </Select>
    </>
  );
};
