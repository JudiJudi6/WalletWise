import { Outlet } from "react-router-dom";
import { css, styled } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUserWidth } from "../hooks/useUserWidth";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;

  height: 100vh;

  ${(props) =>
    props.width > 992
      ? css`
          grid-template-columns: 220px 1fr;
        `
      : props.width < 567
      ? css`
          grid-template-columns: auto;
        `
      : css`
          grid-template-columns: 60px 1fr;
        `}
`;

const Main = styled.main`
  background-color: var(--color-black-200);
  padding: 5rem;
  overflow: scroll;
  box-shadow: 10px 10px 8px -10px black inset;
  height: 100%;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const userWidth = useUserWidth();

  return (
    <StyledAppLayout width={userWidth}>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
