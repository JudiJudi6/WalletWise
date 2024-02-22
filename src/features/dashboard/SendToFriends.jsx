import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import InputBox from "../../ui/InputBox";
import { FaUserFriends } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AcceptTransaction from "./AcceptTransaction";

const StyledSelect = styled(motion.select)`
  background-color: transparent;
  padding: 5px;
  border: none;
  color: var(--color-main);
  text-transform: uppercase;
  border-radius: 8px;
`;

const StyledOption = styled(motion.option)`
  background-color: var(--color-black-300);
  border: none;
  color: white;
  text-transform: none;
`;

const StyledSendToFriends = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 2/5;
    grid-column: 1;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SendFriend = styled.form``;

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

function SendToFriends() {
  const [defCurrency, setDefCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [acceptModal, setAcceptModal] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const balance = user.user.user_metadata.balance;

  const amountOfDef = balance.find((cur) => cur.cur === defCurrency).amount;

  console.log(user.user.user_metadata.friends);

  return (
    <StyledSendToFriends>
      <p>Send founds to your friends</p>
      <p>Select currency: </p>
      <div>
        <StyledSelect
          value={defCurrency}
          onChange={(e) => setDefCurrency(e.target.value)}
        >
          {balance.map((currencyName) => (
            <StyledOption value={currencyName.cur} key={currencyName.cur}>
              {currencyName.cur}
            </StyledOption>
          ))}
        </StyledSelect>
        <p>
          You have {formatCurrency(amountOfDef)} {defCurrency}
        </p>
      </div>
      <div>
        {user.user.user_metadata.friends.length !== 0 ? (
          <FriendsList>
            {user.user.user_metadata.friends.map((fr) => (
              <StyledButton
                key={fr.nickName}
                onClick={() => setSelectedFriend(fr.nickName)}
              >
                {fr.nickName}
              </StyledButton>
            ))}
          </FriendsList>
        ) : (
          <p>You don&apos;t add any friends</p>
        )}
      </div>
      <SendFriend>
        <InputBox icon={<FaUserFriends />}>
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InputBox>
        <InputBox icon={<FaUserFriends />}>
          <Input
            placeholder="Friend"
            type="text"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
          />
        </InputBox>{" "}
        <InputBox icon={<FaMessage />}>
          <Input
            placeholder="Message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputBox>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setAcceptModal(true);
          }}
          disabled={!selectedFriend || !amount || !message}
        >
          Send
        </Button>
      </SendFriend>
      {acceptModal && (
        <AcceptTransaction
          setAcceptModal={setAcceptModal}
          amount={amount}
          message={message}
          selectedFriend={selectedFriend}
          defCurrency={defCurrency}
        />
      )}
    </StyledSendToFriends>
  );
}

export default SendToFriends;
