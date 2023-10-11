import { motion } from "framer-motion";
import styled from "styled-components";
import { BiLike, BiTrendingUp } from "react-icons/bi";
import { AiOutlinePushpin } from "react-icons/ai";

const StyledWindow = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-black-300);
  border-radius: 8px;
  padding: 25px;
  /* gap: 10px; */
  /* width: 100%; */
  /* min-width: 200px;  */
`;

const HelperRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledPinButton = styled(motion.button)`
  padding: 5px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-black-300);
  }
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
  /* margin-top: 20px; */
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

function StockCurrencyWindow() {
  const trendVariants = {
    trendUp: {
      color: "var(--color-error)",
    },
    trendDown: {
      color: "var(--color-green)", //cza dodac
    },
  };
  return (
    <StyledWindow
      whileHover={{ backgroundColor: "var(--color-black-300-hover)" }}
    >
      <HelperRow>
        <WindowTitle>
          <StyledImg src="USD.png" />
          <span>PLN/USD</span>
        </WindowTitle>
        <StyledTrending style={trendVariants.trendUp}>
          -0.13(0.01%)
        </StyledTrending>
      </HelperRow>
      {/* <HelperRow> */}

      {/* </HelperRow> */}
      <HelperRowPrice>
        <span>Buy/Sell</span>
        <BiTrendingUp style={trendVariants.trendUp}/> 
        <StyledPrice>4.23</StyledPrice>
      </HelperRowPrice>
      {/* <StyledPrice>Buy/Sell: 4.21</StyledPrice> */}
    </StyledWindow>
  );
}

export default StockCurrencyWindow;
