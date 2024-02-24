import styled from "styled-components";
import HistoryTransfer from "./HistoryTransfer";

const StyledtransfersHistory = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 2/3;
    grid-column: 1;
  }
`;

export const StyledHeader = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const Card = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`;

function TransfersHistory({ user }) {
  const historyArray = user.user.user_metadata.transactionHistory;

  return (
    <StyledtransfersHistory>
      <StyledHeader>Transfers History</StyledHeader>
      <Card>
        {historyArray.length === 0 ? (
          <p>Go to the dashboard to send some funds</p>
        ) : (
          historyArray
            .reverse()
            .map((item, i) => <HistoryTransfer item={item} key={i} />)
        )}
      </Card>
    </StyledtransfersHistory>
  );
}

export default TransfersHistory;
