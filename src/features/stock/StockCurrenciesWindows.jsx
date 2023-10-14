import styled from "styled-components";
import { useCurrencies } from "./useCurrencies";
import StockCurrencyWindow from "./StockCurrencyWindow";
import { format } from "date-fns";
import Spinner from "../../ui/Spinner";

const StyledStockCurrenciesWindows = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 10px 0;

  @media (min-width: 740) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 811px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

function StockCurrenciesWindows({ defCurrency = 'USD' }) {
  const { data, isLoading } = useCurrencies();

  if (isLoading) return <Spinner />;
  console.log(data)

  const rates = data.data.rates;
  const yesteday = rates[data.secondLastKey];
  const today = rates[data.todayKey];
  const currenciesArray = Object.entries(today).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <StyledStockCurrenciesWindows>
      {currenciesArray.map((currency) => (
        <StockCurrencyWindow
          key={currency.key}
          windowName={currency.key}
          today={1 / today[currency.key]}
          yesteday={1 / yesteday[currency.key]}
          defCurrency={defCurrency}
        />
      ))}
    </StyledStockCurrenciesWindows>
  );
}

export default StockCurrenciesWindows;
