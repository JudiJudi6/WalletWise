import { motion } from "framer-motion";
import styled from "styled-components";
import {BiLike, BiTrendingUp} from 'react-icons/bi'

const StyledWindow = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-black-300);
  border-radius: 8px;
  padding: 30px;
  gap: 10px;
  /* width: 100%; */
  /* max-width: 300px; */
`;

const HelperRow = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function StockCurrencyWindow() {

    const trendVariants ={
        trendUp:{
            color: 'var(--color-error)',
        },
        trendDown:{
            color: 'var(--color-green)', //cza dodac
        }
    }
  return (
    <StyledWindow whileHover={{backgroundColor: 'var(--color-black-300-hover)'}}>
      <HelperRow>
        <span>PLN/USD</span>
        <span><BiLike/></span>
      </HelperRow>
      <HelperRow>
        <span style={trendVariants.trendUp}><BiTrendingUp/> -0.13(0.01%)</span>
        <span style={trendVariants.trendUp}>4.21</span>
      </HelperRow>
    </StyledWindow>
  );
}

export default StockCurrencyWindow;
