import styled from "styled-components";
import HistoryItem from "../../ui/HistoryItem";

const StyledMarketHistory = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 3/5;
    grid-column: 2;
  }
`;

export const StyledHeader = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const CardInfo = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  padding-left: 15px;
`;

function MarketHistory({ user }) {
  const historyArray = user.user.user_metadata.history;
  const last3History = historyArray.slice(
    historyArray.length - 3,
    historyArray.length
  );

  console.log(historyArray);

  return (
    <StyledMarketHistory to={"/stats"}>
      <StyledHeader>Market History</StyledHeader>
      <CardInfo>Last 3 operations:</CardInfo>
      {last3History.length === 0 ? (
        <p>Go to the Stock to do some operations</p>
      ) : (
        last3History
          .reverse()
          .map((item, i) => <HistoryItem item={item} key={i} />)
      )}
    </StyledMarketHistory>
  );
}

export default MarketHistory;
