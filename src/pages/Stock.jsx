import styled from "styled-components";
import { useCurrencies } from "../features/stock/useCurrencies";
import StockInfo from "../ui/StockInfo";

const StyledStock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function Stock() {
  const { data } = useCurrencies();
  return (
    <StyledStock>
      <StockInfo />
    </StyledStock>
  );
}

export default Stock;
