import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { LuLogOut } from "react-icons/lu";
import { useUserWidth } from "../../hooks/useUserWidth";

const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  height: 4.5rem;
  background-color: var(--color-black-200);

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
`;

function Logout() {
  const userWidth = useUserWidth();

  return (
    <StyledButton
      whileHover={{ scale: 1.05, backgroundColor: "var(--color-black-100)" }}
      width={userWidth}
    >
      <LuLogOut />
      {(userWidth > 992 || userWidth < 567) && "Log out"}
    </StyledButton>
  );
}

export default Logout;
