import { motion } from "framer-motion";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import styled from "styled-components";
import Button from "./Button";

const StyledLoginForm = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  height: 300px;
  background-color: var(--color-black-300);
  border-radius: 40px;
  font-size: 2rem;
  margin-top: 2rem;
  padding: 2.5rem 3rem;
`;

const Input = styled(motion.input)`
  height: 30px;
  width: 80px;
  border: none;
  flex-grow: 1;
  padding-left: 8px;
  font-size: 1.4rem;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const InputBox = styled(motion.div)`
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

function LoginForm() {
  function handleAddFocus(e) {
    const parent = e.target.closest(".inputBox");
    const icon = e.target.nextSibling;
    parent.style.borderBottom = "2px solid var(--color-purple)";
    icon.style.color = "var(--color-purple)";
  }

  function handleRemoveFocus(e) {
    const parent = e.target.closest(".inputBox");
    const icon = e.target.nextSibling;
    parent.style.borderBottom = "2px solid var(--color-main)";
    icon.style.color = "var(--color-main)";
  }

  return (
    <StyledLoginForm>
      Login
      <InputBox className="inputBox">
        <Input onFocus={handleAddFocus} onBlur={handleRemoveFocus} />
        <IconBox>
          <AiOutlineMail />
        </IconBox>
      </InputBox>
      <InputBox className="inputBox">
        <Input onFocus={handleAddFocus} onBlur={handleRemoveFocus} />
        <IconBox>
          <AiOutlineLock />
        </IconBox>
      </InputBox>
      <Button whileHover={{ scale: 1.05 }}>Login</Button>
    </StyledLoginForm>
  );
}

export default LoginForm;
