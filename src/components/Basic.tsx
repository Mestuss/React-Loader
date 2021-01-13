import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface GProp {
  pointColor?: string;
  circleSize?: "sm" | "md" | "lg";
}

interface BarProp extends GProp {
  readonly rotate?: string;
  readonly zIndex?: number;
  readonly delay?: string;
}

const Container = styled.div.attrs((props: GProp) => ({
  style: {
    width: `${
      props.circleSize === "sm" ? 30 : props.circleSize === "md" ? 40 : 60
    }px`,
    height: `${
      props.circleSize === "sm" ? 30 : props.circleSize === "md" ? 40 : 60
    }px`,
  },
}))<GProp>`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ro = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const op = (props: BarProp) => keyframes`
  0% {
    background-color: ${props.pointColor};
  }
  50% {
    background-color: transparent;
  }
`;

const Mask = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  animation: ${ro} 2s linear infinite;
`;

const Bar = styled.div.attrs((props: BarProp) => ({
  style: {
    zIndex: props.zIndex,
    transform: props.rotate,
  },
}))<BarProp>`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Point = styled.div<BarProp>`
  width: 10%;
  height: 100%;
  border-radius: 50%;
  animation: ${(props) => op(props)} 1.6s linear infinite
    ${(props) => props.delay};
`;

const Basic: React.FunctionComponent<GProp> = ({
  pointColor = "orange",
  circleSize = "sm",
}) => {
  const [lastBars, setLastBars] = useState<BarProp[]>([]);
  useEffect(() => {
    let bars: BarProp[] = [];
    let i: number = 0;
    const max: number = 130;
    while (i < max) {
      bars = [
        ...bars,
        {
          rotate: `rotate(${90 + i * 2}deg)`,
          zIndex: max - i,
          delay: `${(i / 1000) * 4}s`,
        },
      ];
      i++;
    }
    setLastBars(bars);
  }, []);
  return (
    <Container circleSize={circleSize}>
      <Mask>
        {lastBars.map((bar: BarProp, idx: number) => (
          <Bar key={idx} rotate={bar.rotate} zIndex={bar.zIndex}>
            <Point pointColor={pointColor} delay={bar.delay} />
          </Bar>
        ))}
      </Mask>
    </Container>
  );
};

export default Basic;
