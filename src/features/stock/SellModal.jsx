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

const StyledSellModal = styled.div`
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

function SellModal({ name, curID, defCur, price, onCloseModal }) {
  const [sell, setSell] = useState("");
  const { changeBalance, isLoading: isLoadingBalance } = useChangeBalance();
  const { changeHistory, isLoading: isLoadingHistory } =
    useAddTransactionHistory();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const balance = user.user.user_metadata.balance;
  const money = balance.find((cur) => cur.cur === curID)?.amount || 0;
  const today = new Date();

  function onClickAction() {
    if (sell > money) {
      toast.error("You don't have enough money to sell");
    } else {
      changeBalance({ amount: price * sell, cur: defCur });

      changeHistory({
        type: "sell",
        amount: sell,
        price: price * sell,
        defCur: defCur,
        date: today.toLocaleDateString(),
        cur: curID,
      });
      changeBalance(
        { amount: -sell, cur: curID },
        {
          onSettled: onCloseModal(),
          onSuccess: toast.success("Transaction done"),
        }
      );
    }
  }
  return (
    <StyledSellModal>
      {isLoadingBalance || isLoadingHistory ? (
        <Spinner />
      ) : (
        <>
          <Title>
            {name}{" "}
            <Equal>
              1 {curID} = {price} {defCur}{" "}
              <span style={{ color: "white", display: "block" }}>
                You have: {formatCurrency(money)} {curID}
              </span>
            </Equal>
          </Title>
          <InputBox icon={<BsCash />}>
            <Input
              placeholder="Amount"
              type="number"
              value={sell}
              onChange={(e) => setSell(e.target.value)}
            />
          </InputBox>
          <Price>
            {sell && (
              <span>
                You sell {sell} {curID} for {formatCurrency(price * sell)}{" "}
                {defCur}
              </span>
            )}
          </Price>
          <Button disabled={!sell} onClick={onClickAction}>
            Sell
          </Button>
        </>
      )}
    </StyledSellModal>
  );
}

export default SellModal;
