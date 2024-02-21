import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

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

function SendToFriends() {
  const [defCurrency, setDefCurrency] = useState("USD");
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
          <p>sa</p>
        ) : (
          <p>You don&apos;t add any friends</p>
        )}
      </div>
    </StyledSendToFriends>
  );
}

export default SendToFriends;
