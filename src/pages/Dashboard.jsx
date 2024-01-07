import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useUser } from "../features/autentication/useUser";
import ColorText from "../ui/ColotText";
import AccountBalance from "../features/dashboard/AccountBalance";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }
  /* 
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  } */
`;

const WelcomeInfo = styled.div`
  grid-row: 1;
  grid-column: 1;
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 5rem;
`;

const InfoCard = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 5rem;
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
            here you can manage your account, make transfers to friends and see
            your stats.
          </p>
        </span>
      </WelcomeInfo>
      {/* <InfoCard> */}
        <AccountBalance user={user} />
      {/* </InfoCard> */}
      <InfoCard>sda</InfoCard>
      <InfoCard>sda</InfoCard>
      <InfoCard>sda</InfoCard>
      <InfoCard>sda</InfoCard>
    </StyledDashboard>
  );
}

export default Dashboard;
