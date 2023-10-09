import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Logo from "./Logo";
import NavButton from "./NavButton";
import { RxDashboard } from "react-icons/rx";
import { IoIosStats } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import Logout from "../features/autentication/Logout";
import { FaArrowTrendUp } from "react-icons/fa6";

const StyledMobileNav = styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 2rem;
  width: 230px;
  background-color: var(--color-black-300);
`;

const HelperDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function MobileNav({ onCloseNav, isOpen }) {
  const ref = useOutsideClick(onCloseNav);
  const isInView = useInView(ref);

  const navVariants = {
    hidden: { x: -240 },
    visible: { x: 0 },
  };

  return (
    <StyledMobileNav
      ref={ref}
      variants={navVariants}
      initial="hidden"
      exit="hidden"
      animate={isOpen ? "visible" : "hidden"}
      transition={{ ease: "easeInOut" }}
    >
      <motion.div
        animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Logo />
      </motion.div>

      <HelperDiv>
        <motion.div
          animate={
            isInView ? { x: [-50, 0], opacity: [0, 1] } : { x: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <NavButton
            to={"/dashboard"}
            icon={<RxDashboard />}
            name="Dashboard"
            onClick={onCloseNav}
          />
        </motion.div>
        <motion.div
          animate={
            isInView ? { x: [-50, 0], opacity: [0, 1] } : { x: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <NavButton
            to={"/stats"}
            icon={<IoIosStats />}
            name="Stats"
            onClick={onCloseNav}
          />
        </motion.div>
        <motion.div
          animate={
            isInView ? { x: [-50, 0], opacity: [0, 1] } : { x: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <NavButton
            to={"/stock"}
            icon={<FaArrowTrendUp />}
            name="Stock"
            onClick={onCloseNav}
          />
        </motion.div>
        <motion.div
          animate={
            isInView ? { x: [-50, 0], opacity: [0, 1] } : { x: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <NavButton
            to={"/account"}
            icon={<VscAccount />}
            name="Account"
            onClick={onCloseNav}
          />
        </motion.div>
      </HelperDiv>
      <motion.div
        animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Logout />
      </motion.div>
    </StyledMobileNav>
  );
}

export default MobileNav;
