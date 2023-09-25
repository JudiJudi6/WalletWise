import styled from "styled-components";

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-black-100);
  color: var(--color-white-100);
`;

const MainBlock = styled.div`
  background-color: white;
  width: 80%;
  height: 80%;
`;

// const LoginForm = styled.div{
//     wi
// }

function Login() {
  return (
    <StyledLoginPage>
      <MainBlock>dsa</MainBlock>
    </StyledLoginPage>
  );
}

export default Login;
