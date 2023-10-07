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
import Button from "./Button";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../features/autentication/useUpdateUser";

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

const HelperDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  width: 60%;
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
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]);
  let currentNickName = data.nickName;
  const { updateUser, isLoading } = useUpdateUser();
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

  function onSubmit({ password, fullName, nickName, birthDate }) {
    // currentNickName = nickName;
    // console.log(password, fullName, nickName, birthDate, currentNickName);
    console.log(password, fullName, nickName, birthDate, currentNickName);
    updateUser({password, fullName, birthDate, nickName, currentNickName});
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
            value={data.user.email}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            defaultValue={data.user.user_metadata.fullName}
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            disabled={isLoading}
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
            placeholder="Nick name"
            type="text"
            defaultValue={data.nickName}
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            disabled={isLoading}
            {...register("nickName", {
              validate: async (value) => {
                if (value === currentNickName) return;
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
            type="date"
            defaultValue={data.user.user_metadata.birthDate}
            onFocus={handleAddFocus}
            onBlur={handleRemoveFocus}
            disabled={isLoading}
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
            value={data.user.user_metadata.pesel}
            disabled
            onTapStart={() => {
              toast.error("You can not change email and pesel");
            }}
          />
        </InputBox>
      </EditBox>
      <HelperDiv>
        <Button disabled={isLoading}>Save changes</Button>
      </HelperDiv>
    </StyledEditForm>
  );
}

export default EditForm;
