import styled, { css } from "styled-components";
import { useUserWidth } from "../hooks/useUserWidth";
import BurgerMenu from "./BurgerMenu";
import HeaderAccountButton from "./HeaderAccountButton";
import HeaderAccountName from "./HeaderAccountName";
import HeaderAccountBalane from "./HeaderAccountBalane";
// import SideTitle from "./SideTitle";

const StyledHeader = styled.div`
  /* width: 100%; */
  background-color: var(--color-black-300);
  padding: 1.2rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid var(--color-main);

  ${(props) =>
    props.width < 567 &&
    css`
      justify-content: space-between;
    `}
`;

const HelperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
`;

const HelperHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.width > 567 ? 'space-between' : 'flex-end'};
  align-items: center;
`;

function Header() {
  const userWidth = useUserWidth();

  return (
    <StyledHeader width={userWidth}>
      {userWidth < 567 && <BurgerMenu />}
      <HelperHeader width={userWidth}>
        {userWidth > 567 && <HeaderAccountBalane />}
        <HelperDiv>
          <HeaderAccountName />
          <HeaderAccountButton />
        </HelperDiv>
      </HelperHeader>
    </StyledHeader>
  );
}

export default Header;
