import { motion } from "framer-motion";
import styled from "styled-components";
import { useUserWidth } from "../../hooks/useUserWidth";
import InputBox from "../../ui/InputBox";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { MdNumbers } from "react-icons/md";
import { BsFillPersonFill, BsFillFileEarmarkPersonFill } from "react-icons/bs";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import {sub, formatDistanceToNow} from 'date-fns'

const StyledSignUpForm = styled(motion.form)`
  display: flex;
  display: ${(props) => (props.width < 992 && props.display ? "flex" : "none")};
  position: ${(props) => (props.width < 992 ? "relative" : "absolute")};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  left: ${(props) => (props.width < 992 ? "0" : "57%")};
  z-index: 1;
  width: 300px;
  height: 500px;
  background-color: var(--color-black-300);
  border-radius: 40px;
  font-size: 2rem;
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

function SignUpForm({ showRegister }) {
  const userWidth = useUserWidth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const formVariants = {
    hidden: {
      x: 100,
      opacity: 0,
      display: "none",
    },
    visible: {
      x: 0,
      opacity: 1,
      display: "flex",
    },
  };

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

  function onSubmit({ email, password, fullName, nickName, birthDate, pesel }) {
    const date = new Date(birthDate)
    console.log(date)
    console.log(formatDistanceToNow(date))
    console.log("dupa");
    console.log(email, password, fullName, nickName, birthDate, pesel);
  }

  return (
    <StyledSignUpForm
      variants={formVariants}
      initial="hidden"
      exit="hidden"
      animate={showRegister ? "visible" : "hidden"}
      transition={{ duration: 0.4 }}
      width={userWidth}
      display={showRegister.toString()}
      onSubmit={handleSubmit(onSubmit)}
    >
      Register
      <InputBox icon={<AiOutlineMail />} errors={errors?.email?.message}>
        <Input
          id="email"
          placeholder="Email"
          type="text"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a vailid email address",
            },
          })}
        />
      </InputBox>
      <InputBox icon={<AiOutlineLock />} errors={errors?.password?.message}>
        <Input
          id="password"
          placeholder="Password (min. 8 chars.)"
          type="password"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </InputBox>
      <InputBox
        icon={<AiOutlineLock />}
        errors={errors?.passwordConfirm?.message}
      >
        <Input
          id="passwordConfirm"
          placeholder="Repeat password"
          type="password"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </InputBox>
      <InputBox icon={<BsFillPersonFill />} errors={errors?.fullName?.message}>
        <Input
          id="fullName"
          placeholder="Full name"
          type="text"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("fullName", {
            required: "This field is required",
            pattern: {
              value: /^\w+\s\w+$/,
              message: "This field need name and surname",
            },
          })}
        />
      </InputBox>
      <InputBox
        icon={<BsFillFileEarmarkPersonFill />}
        errors={errors?.nickName?.message}
      >
        <Input
          id="nickName"
          placeholder="Nick Name "
          type="text"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("nickName", { required: "This field is required" })}
        />
      </InputBox>
      <InputBox errors={errors?.birthDate?.message}>
        <Input
          id="birthDate"
          placeholder="Birth date "
          type="date"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("birthDate", { required: "This field is required"})}
        />
      </InputBox>
      <InputBox icon={<MdNumbers />} errors={errors?.pesel?.message}>
        <Input
          id="pesel"
          placeholder="Pesel"
          type="number"
          onFocus={handleAddFocus}
          onBlur={handleRemoveFocus}
          {...register("pesel", { required: "This field is required", validate: value => value.length === 11 || "Pesel must have 11 numbers" })}
        />
      </InputBox>
      <Button type="submit" onClick={onSubmit}>
        Sign in
      </Button>
    </StyledSignUpForm>
  );
}

export default SignUpForm;
