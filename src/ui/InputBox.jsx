import { motion } from "framer-motion";
import styled from "styled-components";

const StyledInputBox = styled(motion.div)`
  display: flex;
  width: 100%;
  border-bottom: 2px solid var(--color-main);
`;

const IconBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  color: var(--color-main);
  transition: color 0.3s;
`;

function InputBox({ children, icon }) {
  return (
    <StyledInputBox className="inputBox">
      {children}
      <IconBox>{icon}</IconBox>
    </StyledInputBox>
  );
}

export default InputBox;
