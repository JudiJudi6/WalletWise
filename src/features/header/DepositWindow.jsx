import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import { useState } from "react";
import InputBox from "../../ui/InputBox";
import { motion } from "framer-motion";
import { BsCash } from "react-icons/bs";
import toast from "react-hot-toast";

const StyledDepositWindow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 25px;
`;

const Header = styled.p`
  font-size: 1.8rem;
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

const Info = styled.p`
  font-size: 1rem;
`;

function DepositWindow({ onCloseModal }) {
  const { changeBalance, isLoading } = useChangeBalance();
  const [deposit, setDeposit] = useState("");

  function setDepositFn(value) {
    if (/^[0-9]{1,6}$/.test(value) || value === "") {
      setDeposit(value);
    } else {
      toast.error("You cannot deposit negative amount");
    }
  }

  function onClickAction() {
    changeBalance(
      { amount: deposit, cur: "USD" },
      { onSettled: onCloseModal(), onSuccess: toast.success("Deposit done") }
    );
  }

  return (
    <StyledDepositWindow>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>Declare deposit amount</Header>
          <InputBox icon={<BsCash />}>
            <Input
              placeholder="Deposit"
              type="text"
              value={deposit}
              onChange={(e) => setDepositFn(e.target.value)}
            />
          </InputBox>
          <Button onClick={onClickAction}>Deposit</Button>
          <Info>In the future, i will implement here PayU or something</Info>
        </>
      )}
    </StyledDepositWindow>
  );
}

export default DepositWindow;
