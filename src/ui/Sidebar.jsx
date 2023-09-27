import styled from "styled-components";
import { useUserWidth } from "../hooks/useUserWidth";
import Logo from "./Logo";
import NavButton from "./NavButton";
import Logout from "./Logout";
import {IoIosStats} from 'react-icons/io'
import {RxDashboard} from 'react-icons/rx'
import {VscAccount} from 'react-icons/vsc'

const StyledSideBar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  /* padding: 3.2rem 2.4rem; */
  background-color: var(--color-black-300);
  grid-row: 1 / -1;
`;

const HelperDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Sidebar() {
  const userWidth = useUserWidth();

  if(userWidth < 567) return null

  return (
    <StyledSideBar>
      <Logo />
      <HelperDiv>
        <NavButton to={"/dashboard"} icon={<RxDashboard/>} name='Dashboard'/>
        <NavButton to={"/stats"} icon={<IoIosStats/>} name='Stats'/>
        <NavButton to={"/account"} icon={<VscAccount/>} name='Account'/>
      </HelperDiv>
      <Logout/>
    </StyledSideBar>
  );
}

export default Sidebar;
