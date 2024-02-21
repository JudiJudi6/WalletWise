import styled from "styled-components";
import InputBox from "./InputBox";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserFriends } from "react-icons/fa";
import { useAddFriend } from "./../hooks/useAddFriend";
import toast from "react-hot-toast";

const StyledAddFriend = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  /* align-items: center; */

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 5;
    grid-column: 1;
  }
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

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

function AddFriend() {
  const [friend, setFriend] = useState("");
  const queryClient = useQueryClient();
  const { addFriend } = useAddFriend();
  const user = queryClient.getQueryData(["user"]);
  const friends = user.user.user_metadata.friends;

  console.log(friends);

  function onClickAction() {
    if (friends.find((fr) => fr === friend)) {
      toast.error(`${friend} is your friend`);
    } else {
      addFriend(friend);
      setFriend("");
    }
  }

  return (
    <StyledAddFriend>
      <p>Search for friends:</p>
      <StyledMain>
        <InputBox icon={<FaUserFriends />}>
          <Input
            placeholder="Friend"
            type="text"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />
        </InputBox>
        <Button onClick={onClickAction} disabled={!friend}>Add</Button>
      </StyledMain>
    </StyledAddFriend>
  );
}

export default AddFriend;
