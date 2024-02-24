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
    grid-row: 1/3;
    grid-column: 2;
  }
`;

export const StyledHeader = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const Card = styled.div`
  max-height: 69vh;
  overflow-y: auto;
  /* font-size: 16px;
  margin-bottom: 10px;
  padding-left: 15px; */
`;

function TransactionsHistory({ user }) {
  const historyArray = user.user.user_metadata.history;

  console.log(historyArray);

  return (
    <StyledMarketHistory to={"/stats"}>
      <StyledHeader>Market History</StyledHeader>
      <Card>
        {historyArray.length === 0 ? (
          <p>Go to the Stock to do some operations</p>
        ) : (
          historyArray
            .reverse()
            .map((item, i) => <HistoryItem item={item} key={i} more={false} />)
        )}
      </Card>
    </StyledMarketHistory>
  );
}

export default TransactionsHistory;
