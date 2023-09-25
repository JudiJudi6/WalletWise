import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserWidth } from "../hooks/useUserWidth";

const StyledButton = styled(motion(NavLink))`
  display: flex;
  align-items: center;
  /* text-transform: uppercase; */
  letter-spacing: 1px;
  background-color: var(--color-black-200);
  height: 4.5rem;
  font-size: 1.6rem;

  ${(props) =>
    props.width > 992 || props.width < 567
      ? css`
          justify-content: flex-start;
          gap: 1rem;
          padding-left: 1rem;
          width: 190px;
          border-radius: 8px;
        `
      : css`
          justify-content: center;
          width: 4.5rem;
          border-radius: 50%;
        `}

  &.active {
    outline: 2px solid var(--color-main);
    outline-offset: -1px;
    background-color: var(--color-black-100);
  }

  &:focus {
    outline: 2px solid var(--color-main);
    outline-offset: -1px;
  }
`;

function NavButton({ to, icon, name, onClick }) {
  const userWidth = useUserWidth();

  return (
    <StyledButton
      whileHover={{ scale: 1.05, backgroundColor: "var(--color-black-100)" }}
      to={to}
      width={userWidth}
      onClick={onClick}
    >
      {icon} {(userWidth > 992 || userWidth < 567) && name}
    </StyledButton>
  );
}

export default NavButton;
