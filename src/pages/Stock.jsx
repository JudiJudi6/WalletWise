import styled from "styled-components";
import StockInfo from "../features/stock/StockInfo";
import StockCurrenciesWindows from "../features/stock/StockCurrenciesWindows";
import { useState } from "react";

const StyledStock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function Stock() {
  const [defCurrency, setDefCurrency] = useState("USD");
  return (
    <StyledStock>
      <StockInfo defCurrency={defCurrency} setDefCurrency={setDefCurrency}/>
      <StockCurrenciesWindows defCurrency={defCurrency} />
    </StyledStock>
  );
}

export default Stock;
