import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import InputBox from "../../ui/InputBox";
import { FaUserFriends } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Button from "../../ui/Button";
import AcceptTransaction, { StyledSpan } from "./AcceptTransaction";
import toast from "react-hot-toast";

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 3rem;
  }

  @media (min-width: 900px) {
    grid-row: 2/4;
    grid-column: 1;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  text-align: left;
  padding: 0.5rem;
  border-radius: 8px;
  outline: none;
  width: 100%;

  &:hover {
    background-color: var(--color-black-100);
  }

  &:focus {
    outline: none;
    background-color: var(--color-black-100);
  }
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  /* justify-content: start; */
  align-items: start;
  overflow-y: auto;
  width: 100%;
`;

const SendFriend = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  /* padding: 0 3rem; */
  width: 100%;
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

const Row = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 1rem;
`;

const RowBetween = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  /* gap: rem; */
`;

const Header = styled.p`
  font-size: 20px;
  /* margin-bottom: 1rem; */
`;

const FriendsListContainer = styled.div`
  width: 100%;
  margin-right: 2rem;

  @media (min-width: 1200px) {
    width: 200px;
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

  function setAmountFn(value) {
    if (/^[0-9]{1,6}$/.test(value) || value === "") {
      setAmount(value);
    } else {
      toast.error("You cannot use negative amount");
    }
  }

  function clearForm() {
    setAmount(0);
    setSelectedFriend("");
    setMessage("");
  }

  return (
    <StyledSendToFriends>
      <RowBetween>
        <div>
          <Header>Send founds to your friends</Header>
          <Column>
            <Row>
              <p>Select currency: </p>
              <StyledSelect
                value={defCurrency}
                onChange={(e) => setDefCurrency(e.target.value)}
              >
                {balance.map((currencyName) => {
                  if (currencyName.amount !== 0) {
                    return (
                      <StyledOption
                        value={currencyName.cur}
                        key={currencyName.cur}
                      >
                        {currencyName.cur}
                      </StyledOption>
                    );
                  }
                })}
              </StyledSelect>
            </Row>
            <p>
              You have{" "}
              <StyledSpan>
                {formatCurrency(amountOfDef)} {defCurrency}
              </StyledSpan>
            </p>
          </Column>
        </div>
        <FriendsListContainer>
          <StyledSpan>Friends List:</StyledSpan>
          {user.user.user_metadata.friends.length !== 0 ? (
            <FriendsList>
              {user.user.user_metadata.friends.map((fr, i) => (
                <StyledButton
                  key={i}
                  onClick={() => setSelectedFriend(fr.nickName)}
                >
                  {fr.nickName}
                </StyledButton>
              ))}
            </FriendsList>
          ) : (
            <p>You don&apos;t add any friends</p>
          )}
        </FriendsListContainer>
      </RowBetween>
      <SendFriend>
        <InputBox icon={<FaUserFriends />}>
          <Input
            placeholder="Amount"
            type="text"
            value={amount}
            onChange={(e) => setAmountFn(e.target.value)}
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
          user={user}
          amountOfDef={amountOfDef}
          clearForm={clearForm}
        />
      )}
    </StyledSendToFriends>
  );
}

export default SendToFriends;
