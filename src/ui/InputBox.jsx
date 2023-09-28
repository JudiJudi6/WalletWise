import { motion } from "framer-motion";
import styled from "styled-components";

const StyledInputBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconBox = styled(motion.div)`
  width: 30px;
  color: var(--color-main);
  transition: color 0.3s;
`;

const HelperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid var(--color-main);
  width: 100%;
`;

const Error = styled.p`
  color: var(--color-error);
  font-size: 1rem;
`;

function InputBox({ children, icon, errors }) {
  return (
    <StyledInputBox >
      <HelperDiv className="inputBox">
        {children}
        {icon && <IconBox>{icon}</IconBox>}
      </HelperDiv>
      {errors && <Error>{errors}</Error>}
    </StyledInputBox>
  );
}

export default InputBox;
