import { useState } from "react";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import styled from "styled-components";
import { motion } from "framer-motion";
import InputBox from "../../ui/InputBox";
import { BsCash } from "react-icons/bs";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

const Title = styled.p`
  font-size: 2rem;
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

const Price = styled.p`
  font-size: 18px;
`;

function BuyModal({ name, curID, defCur, price, onCloseModal }) {
  const [buy, setBuy] = useState("");
  const { changeBalance, isLoading } = useChangeBalance();

  function onClickAction() {
    // const newBalance = Number(oldBalance) + Number(deposit);
    changeBalance({ amount: buy, cur: "USD" }, { onSettled: onCloseModal() });
  }
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title>
            {name} {curID}/{defCur} {price}
          </Title>
          <InputBox icon={<BsCash />}>
            <Input
              placeholder="Amount"
              type="number"
              value={buy}
              onChange={(e) => setBuy(e.target.value)}
            />
          </InputBox>
          <Price>Price: {price * buy}</Price>
          <Button onClick={onClickAction}>Buy</Button>
        </>
      )}
    </div>
  );
}

export default BuyModal;
