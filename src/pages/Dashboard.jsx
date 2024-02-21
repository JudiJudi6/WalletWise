import styled from "styled-components";
import { useEffect } from "react";
import { useUser } from "../features/autentication/useUser";
import ColorText from "../ui/ColotText";
import AccountBalance from "../features/dashboard/AccountBalance";
import MarketHistory from "../features/dashboard/MarketHistory";
import SendToFriends from "../features/dashboard/SendToFriends";
import AddFriend from "../ui/AddFriend";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const WelcomeInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  grid-row: 1;
  grid-column: 1;
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 5rem;
  }
`;

function Dashboard() {
  const { user } = useUser();

  useEffect(function () {}, []);

  return (
    <StyledDashboard>
      <WelcomeInfo>
        <span>
          Hi, <ColorText size="1.7rem">{user.nickName}</ColorText>{" "}
          <p>
            here you can manage your balance, make transfers to friends and see
            your stats.
          </p>
        </span>
      </WelcomeInfo>
      <AccountBalance user={user} />
      <MarketHistory user={user} />
      <SendToFriends user={user} />
      <AddFriend user={user} />
    </StyledDashboard>
  );
}

export default Dashboard;
