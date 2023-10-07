import styled from "styled-components";
import InputBox from "./InputBox";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useUserWidth } from "../hooks/useUserWidth";
import { motion } from "framer-motion";
import { BsFillFileEarmarkPersonFill, BsFillPersonFill } from "react-icons/bs";
import { getUsersNickNames } from "../services/apiAuth";
import { MdNumbers } from "react-icons/md";
import toast from "react-hot-toast";

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

const StyledEditForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
  background-color: var(--color-black-300);
  border-radius: 8px;
`;

const EditBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.3rem;
  width: ${(props) => (props.width > 687 ? "60%" : "100%")};
`;

function EditForm() {
  const width = useUserWidth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

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
    console.log(email, password, fullName, nickName, birthDate, pesel);
  }

  return (
    <StyledEditForm onSubmit={handleSubmit(onSubmit)}>
      <span>Change your personal details</span>
      <EditBox width={width}>
        <InputBox icon={<AiOutlineMail />}>
          <Input
            id="email"
            placeholder="Email"
            type="text"
            disabled
            onTapStart={() => {
              toast.error("You can not change email and pesel");
            }}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
        <InputBox icon={<AiOutlineLock />} errors={errors?.password?.message}>
          <Input
            id="password"
            placeholder="New Password (min. 8 chars.)"
            type="password"
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
        <InputBox
          icon={<AiOutlineLock />}
          errors={errors?.passwordConfirm?.message}
        >
          <Input
            id="passwordConfirm"
            placeholder="Confirm new password"
            type="password"
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            {...register("passwordConfirm", {
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
        <InputBox
          icon={<BsFillPersonFill />}
          errors={errors?.fullName?.message}
        >
          <Input
            id="fullName"
            placeholder="Full name"
            type="text"
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            {...register("fullName", {
              pattern: {
                value: /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/,
                message: "This field need name and surname",
              },
            })}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
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
            {...register("nickName", {
              required: "This field is required",
              validate: async (value) => {
                const result = await getUsersNickNames(value);
                return result.length === 0 || "Nick is already used";
              },
            })}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
        <InputBox errors={errors?.birthDate?.message}>
          <Input
            id="birthDate"
            placeholder="Birth date "
            type="date"
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            {...register("birthDate", {
              validate: (value) => {
                const eighteenYearsAgo = new Date();
                eighteenYearsAgo.setFullYear(
                  eighteenYearsAgo.getFullYear() - 18
                );

                const selectedDate = new Date(value);

                return (
                  selectedDate <= eighteenYearsAgo || "You must be 18 years old"
                );
              },
            })}
          />
        </InputBox>
      </EditBox>
      <EditBox width={width}>
        <InputBox icon={<MdNumbers />}>
          <Input
            id="pesel"
            placeholder="Pesel"
            type="number"
            disabled
            onTapStart={() => {
              toast.error("You can not change email and pesel");
            }}
          />
        </InputBox>
      </EditBox>
    </StyledEditForm>
  );
}

export default EditForm;
