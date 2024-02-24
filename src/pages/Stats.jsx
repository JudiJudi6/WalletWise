import styled from "styled-components";
import { WelcomeInfo } from "./Dashboard";
import { useUser } from "../features/autentication/useUser";
import TransactionsHistory from "../features/Stats/TransactionsHistory";
import TransfersHistory from "../features/Stats/TransfersHistory";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function Stats() {
  const { user } = useUser();

  return (
    <StyledStats>
      <WelcomeInfo>
        <span>
          <p>Here you can see your markets and transfers history.</p>
        </span>
      </WelcomeInfo>
      <TransactionsHistory user={user} />
      <TransfersHistory user={user} />
    </StyledStats>
  );
}

export default Stats;
