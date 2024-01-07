import styled from "styled-components";
import ColorText from "../../ui/ColotText";
import Text from "../../ui/Text";
import Spinner from "../../ui/Spinner";
import { useCurrenciesNames } from "./useCurrenciesNames";
import { motion } from "framer-motion";

const StyledStockInfo = styled.div`
  width: 100%;
  background-color: var(--color-black-300);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
`;

const StyledSelect = styled(motion.select)`
  background-color: transparent;
  padding: 5px;
  border: none;
  color: var(--color-main);
  text-transform: uppercase;
  border-radius: 8px;
`;

const StyledOption = styled(motion.option)`
  background-color: var(--color-black-300);
  border: none;
  color: white;
  text-transform: none;
`;

function StockInfo({defCurrency, setDefCurrency}) {
  const { data: currenciesNamesObj, isLoading } = useCurrenciesNames();
  let currenciesNames;
  if (!isLoading)
    currenciesNames = Object.entries(currenciesNamesObj).map(
      ([key, value]) => ({ key, value })
    );

  return (
    <StyledStockInfo>
      <ColorText>
        <h2>Stock market</h2>
      </ColorText>
      <br />
      <Text>
        Discover a seamless way to convert currencies on our platform. With
        real-time exchange rates, you can effortlessly switch between different
        monetary units. Our intuitive interface ensures a hassle-free
        experience. Dive into a world of currencies and stay informed about the
        latest market movements. Begin your exchange journey now!
      </Text>
      <br />
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <label htmlFor="cur">Select your currency: </label>
          <StyledSelect
            value={defCurrency}
            onChange={(e) => setDefCurrency(e.target.value)}
          >
            {currenciesNames.map((currencyName) => (
              <StyledOption value={currencyName.key} key={currencyName.key}>
                {currencyName.value}
              </StyledOption>
            ))}
          </StyledSelect>
        </div>
      )}
    </StyledStockInfo>
  );
}

export default StockInfo;
