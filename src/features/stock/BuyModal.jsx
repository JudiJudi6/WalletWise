import { useState } from "react";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import styled from "styled-components";
import { motion } from "framer-motion";
import InputBox from "../../ui/InputBox";
import { BsCash } from "react-icons/bs";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";
import { useAddTransactionHistory } from "../../hooks/useAddTransactionHistory";

const StyledBuyModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 90%;
  height: 300px;

  @media (min-width: 500px) {
    width: 400px;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;

  @media (min-width: 480px) {
    font-size: 2rem;
  }
`;

const Equal = styled.span`
  display: block;
  font-size: 1.3rem;
  color: var(--color-main);

  @media (min-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Info = styled.span`
  display: block;
  font-size: 1.3rem;

  @media (min-width: 480px) {
    font-size: 1.7rem;
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

const Price = styled.p`
  font-size: 18px;
`;

function BuyModal({ name, curID, defCur, price, onCloseModal }) {
  const [buy, setBuy] = useState("");
  const { changeBalance, isLoading } = useChangeBalance();
  const queryClient = useQueryClient();
  const { changeHistory, isLoading: isLoadingHistory } =
    useAddTransactionHistory();
  const user = queryClient.getQueryData(["user"]);
  const balance = user.user.user_metadata.balance;
  const yourMoneyDef = balance.find((cur) => cur.cur === defCur).amount;
  const yourMoneyBuy = balance.find((cur) => cur.cur === curID)?.amount || 0;
  const today = new Date();

  function onClickAction() {
    const money = balance.find((cur) => cur.cur === defCur)?.amount;
    if (price * buy > money) {
      toast.error("You don't have enough money to make the transaction");
    } else {
      changeBalance({ amount: -(price * buy), cur: defCur });
      changeHistory({
        type: "buy",
        amount: buy,
        price: price * buy,
        date: today.toLocaleDateString(),
        cur: curID,
        defCur: defCur,
      });
      changeBalance(
        { amount: +buy, cur: curID },
        {
          onSettled: onCloseModal(),
          onSuccess: toast.success("Transaction done"),
        }
      );
    }
  }
  return (
    <StyledBuyModal>
      {isLoading || isLoadingHistory ? (
        <Spinner />
      ) : (
        <>
          <Title>
            {name}{" "}
            <Equal>
              1 {curID} = {price} {defCur}
            </Equal>
            <Info>
              You have {formatCurrency(yourMoneyBuy)} {curID} and{" "}
              {formatCurrency(yourMoneyDef)} {defCur}
            </Info>
          </Title>
          <InputBox icon={<BsCash />}>
            <Input
              placeholder="Amount"
              type="number"
              value={buy}
              onChange={(e) => setBuy(e.target.value)}
            />
          </InputBox>
          <Price>
            To pay: {formatCurrency(price * buy)} {defCur}
          </Price>
          <Button disabled={!buy} onClick={onClickAction}>
            Buy
          </Button>
        </>
      )}
    </StyledBuyModal>
  );
}

export default BuyModal;
