import { useQueryClient } from "@tanstack/react-query";
import { styled } from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 3rem;
  background-color: var(--color-black-300);
  /* border: 2px solid var(--color-main); */
  border-radius: 8px;
`;

const StyledAccount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Account() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  //   console.log(profileData.fullName);

  return (
    <StyledAccount>
      <Box>
        <div><span>Hi, dsa </span></div>
        <div>here you can edit your profile details.</div>
      </Box>
      <Box>
        
      </Box>
    </StyledAccount>
  );
}

export default Account;
