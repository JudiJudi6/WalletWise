import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useChangeBalance } from "../../hooks/useChangeBalance";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const StyledDepositWindow = styled.div``;

function DepositWindow() {
  const { changeBalance, isLoading } = useChangeBalance();
  const [deposit, setDeposit] = useState("");
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]);
  const oldBalance = data.user.user_metadata.balance;

    function onClickAction(){
        const newBalance = Number(oldBalance) + Number(deposit);
        changeBalance(newBalance)
    }

  return (
    <StyledDepositWindow>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <p>Declare deposit amount</p>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          <button onClick={onClickAction}>deposit</button>
        </>
      )}
    </StyledDepositWindow>
  );
}

export default DepositWindow;
