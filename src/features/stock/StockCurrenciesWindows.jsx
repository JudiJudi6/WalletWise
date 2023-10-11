import styled from "styled-components";
import { useCurrencies } from "./useCurrencies";
import StockCurrencyWindow from "./StockCurrencyWindow";

const StyledStockCurrenciesWindows = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 10px 0;

  @media(min-width: 400px){
    grid-template-columns: 1fr;
  }

  @media(min-width: 811px){
    grid-template-columns: 1fr 1fr;
  }

  @media(min-width: 992px){
    grid-template-columns: 1fr 1fr 1fr ;
  }
`;

function StockCurrenciesWindows({ defCurrency }) {
  const { data, isLoading } = useCurrencies(defCurrency);

  console.log(data);

  return (
    <StyledStockCurrenciesWindows>
      <StockCurrencyWindow />
      <StockCurrencyWindow />
      <StockCurrencyWindow />
      <StockCurrencyWindow />
      <StockCurrencyWindow />
      <StockCurrencyWindow />
    </StyledStockCurrenciesWindows>
  );
}

export default StockCurrenciesWindows;
