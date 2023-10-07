import { useQueryClient } from "@tanstack/react-query";
import { styled } from "styled-components";
import ColorText from "../ui/ColotText";
import SignUpForm from "../features/autentication/SignUpForm";
import InputBox from "../ui/InputBox";
import { AiOutlineMail } from "react-icons/ai";
import Input from "../ui/Input";
import { useUserWidth } from "../hooks/useUserWidth";
import EditForm from "../ui/EditForm";

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
  padding: 3rem;
  background-color: var(--color-black-300);
  border-radius: 8px;
  width: ${(props) => (props.width ? props.width : "")};
  margin-bottom: 1rem;
`;

const StyledAccount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const HelperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: ${(props) => (props.width < 768 ? "column" : "row")};
  width: 100%;
  height: fit-content;
  gap: 0 3rem;
`;

function Account() {
  const userWidth = useUserWidth();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]).nickName;

  return (
    <StyledAccount>
      <HelperDiv width={userWidth}>
        <Box>
          <div>
            <span>
              Hi, <ColorText size="1.7rem">{user}</ColorText>{" "}
            </span>
          </div>
          <div>here you can edit your profile details.</div>
        </Box>
        <Box>
          <span>Edit your avatar:</span>
        </Box>
      </HelperDiv>
      <EditForm />
    </StyledAccount>
  );
}

export default Account;
