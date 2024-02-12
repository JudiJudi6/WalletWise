import styled from "styled-components";

const StyledSendToFriends = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 2/5;
    grid-column: 1;
  }
`;

function SendToFriends() {
  return <StyledSendToFriends>dsad</StyledSendToFriends>;
}

export default SendToFriends;
