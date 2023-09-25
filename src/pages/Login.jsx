import styled from "styled-components";

const StyledLoginPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-black-200);
  color: var(--color-white-100);
`;

const MainBlock = styled.div`
    background-color: var(--color-black-100);
    width: 70%;
    height: 70%;
`

function Login() {
  return <StyledLoginPage>
    <MainBlock>
        dsa
    </MainBlock>
  </StyledLoginPage>;
}

export default Login;
