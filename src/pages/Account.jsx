import { useQueryClient } from "@tanstack/react-query";
import { styled } from "styled-components";
import ColorText from "../ui/ColotText";
import { useUserWidth } from "../hooks/useUserWidth";
import EditForm from "../ui/EditForm";
import { useUser } from "../features/autentication/useUser";
import EditAvatar from "../ui/EditAvatar";

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
  const { user } = useUser();

  return (
    <StyledAccount>
      <HelperDiv width={userWidth}>
        <Box>
          <div>
            <span>
              Hi, <ColorText size="1.7rem">{user.nickName}</ColorText>{" "}
            </span>
          </div>
          <div>here you can edit your profile details.</div>
        </Box>
        <Box>
          <EditAvatar />
        </Box>
      </HelperDiv>
      <EditForm />
    </StyledAccount>
  );
}

export default Account;
