import { motion } from "framer-motion";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import styled from "styled-components";
import Button from "../../ui/Button";
import InputBox from "../../ui/InputBox";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

const StyledLoginForm = styled.form`
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

function LoginForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit } = useForm();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

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
    <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
      Login
      <InputBox icon={<AiOutlineMail />}>
        <Input
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          id="email"
          placeholder="Email"
          type="email"
          {...register("email")}
          disabled={isLoading}
        />
      </InputBox>
      <InputBox icon={<AiOutlineLock />}>
        <Input
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          id="password"
          placeholder="Password"
          type="password"
          {...register("password")}
          disabled={isLoading}
        />
      </InputBox>
      <Button whileHover={{ scale: 1.05 }} disabled={isLoading}>Login</Button>
    </StyledLoginForm>
  );
}

export default LoginForm;
