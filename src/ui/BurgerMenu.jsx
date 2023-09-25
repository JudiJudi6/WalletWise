import styled from "styled-components";
import { motion } from "framer-motion";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";
import MobileNav from "./MobileNav";

const StyledButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 8px;
  padding: 1rem;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenNav() {
    setIsOpen(true);
  }

  function handleCloseNav() {
    setIsOpen(false);
  }

  return (
    <>
      <StyledButton
        whileHover={{ scale: 1.2, color: "var(--color-main)" }}
        whileFocus={{ outline: "none", scale: 1.2, color: "var(--color-main)" }}
        onClick={handleOpenNav}
      >
        <FaBarsStaggered />
      </StyledButton>

      <MobileNav onCloseNav={handleCloseNav} isOpen={isOpen} />
    </>
  );
}

export default BurgerMenu;
