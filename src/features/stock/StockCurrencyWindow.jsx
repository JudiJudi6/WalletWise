import { motion } from "framer-motion";
import styled from "styled-components";
import {  BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { Link } from "react-router-dom";

const StyledWindow = styled(motion(Link))`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-black-300);
  border-radius: 8px;
  padding: 25px;
`;

const HelperRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTrending = styled.span`
  text-align: center;
  font-size: 1.3rem;
`;

const StyledImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const StyledPrice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;

const WindowTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const HelperRowPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 20px;
  margin-top: 10px;
`;

function StockCurrencyWindow({ windowName, today, yesteday, defCurrency }) {
  const trendVariants = {
    trendDown: {
      color: "var(--color-error)",
    },
    trendUp: {
      color: "var(--color-green)",
    },
  };
  return (
    <StyledWindow
          to={`${windowName}`}
          whileHover={{ backgroundColor: "var(--color-black-300-hover)" }}
    >
      <HelperRow>
        <WindowTitle>
          <StyledImg src={`${windowName}.png`} />
          <span>{windowName}/{defCurrency}</span>
        </WindowTitle>
        <StyledTrending style={today > yesteday ? trendVariants.trendUp : trendVariants.trendDown}>
          {`${(today-yesteday).toFixed(4)}(${((today-yesteday)/yesteday*100).toFixed(2)}%)`}
        </StyledTrending>
      </HelperRow>
      <HelperRowPrice>
        <span>Buy/Sell</span>
        {today > yesteday ? <BiTrendingUp style={trendVariants.trendUp} /> : <BiTrendingDown style={trendVariants.trendDown} /> }
        <StyledPrice>{today.toFixed(4)}</StyledPrice>
      </HelperRowPrice>
    </StyledWindow>
  );
}

export default StockCurrencyWindow;
