import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
//改变类型
interface DisplayShow {
  displayShow: string;
}

const CountdownContainer = styled.div<DisplayShow>`
  ${(props) => {
    // console.log("props", props);
    return (
      props.displayShow &&
      css`
        display: ${props.displayShow};
      `
    );
  }}

  background: #222a33;
  opacity: 0.9;
  color: #fff;
  width: 100%;
  justify-content: flex-start;
  z-index: 999999;
  position: fixed;
  left: 0;
  bottom: 0;
  flex-wrap: wrap;
  position: absolute;
`;
const ProductTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 15px;
  flex: 1 1 auto;
`;
const CountdownChunk = styled.div``;
const Span = styled.span`
  border: 1px dashed #fff;
  display: flex;
  justify-content: center;
  padding: 6px 10px;
  margin: 0 8.4px;
`;

const SmallCountdownContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CountdownDiscount = styled.div`
  padding: 15px 0;
`;
//改变类型
interface DisplayViewProductsProps {
  displayViewProducts: string;
  setDisplayViewProducts: (value: string) => void;
}

const ViewProducts = styled.div`
  background-color: green;
  padding: 4px;
  margin-left: 4px;
  border-radius: 5px;
  cursor: pointer;
`;
// 绿色按钮
//
const Countdown: FC<DisplayViewProductsProps> = ({
  displayViewProducts,
  setDisplayViewProducts,
}) => {
  const handleViewProducts = () => {
    setDisplayViewProducts("flex");
  };

  //倒计时的打叉
  const [displayShow, setDisplayShow] = useState("flex");
  const handleChangeShow = () => {
    setDisplayShow("none");
  };

  const CountDownDiv = ({ minutes = 0, seconds = 0 }) => {
    //定义两个state变量 over time
    const [over, setOver] = useState(false);
    // time 默认值是一个 object

    const [time, setTime] = useState({
      minutes: parseInt(minutes.toString()),
      seconds: parseInt(seconds.toString()),
    });
    //tick的方法
    const tick = () => {
      // 暂停，或已结束
      //当分钟和秒都为零，已结束
      if (time.minutes === 0 && time.seconds === 0) {
        setOver(true);
        timeOver();
      }

      //当秒为零  分钟减一，秒从59秒开始
      else if (time.seconds === 0)
        setTime({
          minutes: time.minutes - 1,
          seconds: 59,
        });
      //否则正常操作 秒减一
      else
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
    };
    //timeOver方法，当倒计时结束（setOver为true）以后执行该方法，setOver设为false重新开始倒计时
    const timeOver = () => {
      setTime({
        minutes: parseInt(minutes.toString()),
        seconds: parseInt(seconds.toString()),
      });
      setOver(false);
    };

    // useEffect 函数组件增加了操作副作用的能力   执行定时和清理定时
    React.useEffect(() => {
      // 执行定时
      let timerID = setInterval(() => tick(), 1000);
      // 卸载组件时进行清理
      return () => {
        clearInterval(timerID);
      };
    });

    return (
      <div>
        {/* padStart() 會將用給定用於填充的字串，
        以重複的方式，插入到目標字串的起頭(左側)，
        直到目標字串到達指定長度。第一个参数为目标字串的长度 第二个参数补全字符串 0 */}
        <p style={{ padding: "0 6px" }}>{`${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
      </div>
    );
  };

  return (
    <>
      <CountdownContainer displayShow={displayShow}>
        <ProductTitle>
          <SmallCountdownContainer>
            <CountdownDiscount>
              <CountdownChunk>您的折扣已激活 ! </CountdownChunk>
            </CountdownDiscount>
          </SmallCountdownContainer>

          <SmallCountdownContainer>
            <Span>
              <CountdownChunk>优惠</CountdownChunk>
              <CountdownChunk>券：DISCOUNTCODE XYZ</CountdownChunk>
            </Span>
          </SmallCountdownContainer>
          <SmallCountdownContainer>
            <CountdownChunk>在</CountdownChunk>
            <CountDownDiv seconds={5} />
            <CountdownChunk>秒后</CountdownChunk>
            <CountdownChunk>&ensp;过期</CountdownChunk>
          </SmallCountdownContainer>
          <SmallCountdownContainer>
            <ViewProducts onClick={handleViewProducts}>
              View Products
            </ViewProducts>
          </SmallCountdownContainer>
        </ProductTitle>
        <div>
          <div
            onClick={handleChangeShow}
            style={{ position: "fixed", right: "3px", cursor: "pointer" }}
          >
            ✕
          </div>
        </div>
      </CountdownContainer>
    </>
  );
};

export default Countdown;
