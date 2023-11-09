import { useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useCurrenciesNames } from "./useCurrenciesNames";
import { useEffect, useState } from "react";
import { useCurrencyDetails } from "./useCurrencyDetails";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../../ui/Spinner";

const StyledCurrency = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: var(--color-black-300);
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 8px;
  flex-direction: column;
  gap: 2rem;

  /* @media (min-width: 600px) {
    flex-direction: row;
  } */
`;

const StyledSelect = styled.select`
  background-color: transparent;
  padding: 5px;
  border: none;
  color: var(--color-main);
  text-transform: uppercase;
  border-radius: 8px;
  font-size: 2rem;
`;

const StyledOption = styled.option`
  background-color: var(--color-black-300);
  border: none;
  color: white;
  text-transform: none;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  align-self: flex-start;
`;

const PriceText = styled.span`
  font-size: 2.8rem;
  color: var(--color-main);
  /* font-weight: bold; */
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  gap: 2rem;
  h2 {
    font-size: 3rem;
    font-weight: 400;
  }
`;

const StyledImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

function Currency() {
  const { currencyID } = useParams();
  const [defCurrencyParam] = useSearchParams();
  const queryClient = useQueryClient();
  const defCurrency = defCurrencyParam.get("defCurrency");
  const [range, setRange] = useState("7");
  const { data: currencies, isLoading: isLoadingNames } = useCurrenciesNames();
  console.log(range);
  const {
    data,
    isLoading: isLoadingDetails,
    refetch,
    isRefetching,
  } = useCurrencyDetails(defCurrency, range, currencyID);

  
  
  
  useEffect(function(){
    function refetchCurrency() {
      queryClient.invalidateQueries(["currencyDetails"]);
      refetch();
    }
    refetchCurrency()
    
  }, [range, queryClient, refetch])
  
  if (isLoadingDetails || isLoadingNames) return <Spinner />;
  
  const currenciesArray = Object.entries(data?.rates).map(([date, Price]) => ({
    date,
    Price: (1 / Price[currencyID]).toFixed(3),
  }));
  
  return (
    <StyledCurrency>
      <Box>
        <Title>
          <StyledImg src={`/${currencyID}.png`} />
          <h2>{currencies[currencyID]}</h2>{" "}
          <span>
            {currencyID}/{defCurrency}
          </span>
        </Title>
        <Row>
          <Price>
            <PriceText>
              {currenciesArray[currenciesArray.length - 1].Price} {defCurrency}
            </PriceText>
          </Price>

          <StyledSelect
            value={range}
            onChange={(e) => {
          //    console.log(isLoadingDetails);
              console.log(range);
              setRange(e.target.value);
              console.log(range);
            //  console.log(isLoadingDetails);
              //refetchCurrency();
            // setRange(e.target.value);
            }}
          >
            <StyledOption value={7}>5 days</StyledOption>
            <StyledOption value={30}>30 days</StyledOption>
            <StyledOption value={90}>90 days</StyledOption>
            <StyledOption value={365}>1 year</StyledOption>
            <StyledOption value={1825}>5 years</StyledOption>
            <StyledOption value={"all"}>all</StyledOption>
          </StyledSelect>
        </Row>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={currenciesArray}>
            <XAxis dataKey="date" hide={true} />
            <YAxis
              type="number"
              domain={["dataMin - 0.01", "dataMax + 0.01"]}
              hide={true}
            />
            <CartesianGrid strokeDasharray="1 3" opacity="0.3" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-black-300)",
                borderRadius: "8px",
                border: "1px solid var(--color-main)",
              }}
            />
            <Line
              type="monotone"
              dataKey="Price"
              stroke="var(--color-main)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </StyledCurrency>
  );
}

export default Currency;
