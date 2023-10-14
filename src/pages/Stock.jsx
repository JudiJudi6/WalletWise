import styled from "styled-components";
import StockInfo from "../features/stock/StockInfo";
import StockCurrenciesWindows from "../features/stock/StockCurrenciesWindows";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const StyledStock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function Stock() {
  const [defCurrencyParam, setDefCurrencyParam] = useSearchParams();
  const [defCurrency, setDefCurrency] = useState("USD");
  useEffect(
    function () {
      if (
        defCurrencyParam.get("defCurrency") &&
        defCurrencyParam.get("defCurrency") !== "USD"
      ) {
        setDefCurrency(defCurrencyParam.get("defCurrency"));
      }
    },
    [defCurrencyParam]
  );
  useEffect(
    function () {
      setDefCurrencyParam({ defCurrency });
    },
    [setDefCurrencyParam, defCurrency]
  );
  return (
    <StyledStock>
      <StockInfo defCurrency={defCurrency} setDefCurrency={setDefCurrency} />
      <StockCurrenciesWindows defCurrency={defCurrency} />
    </StyledStock>
  );
}

export default Stock;
