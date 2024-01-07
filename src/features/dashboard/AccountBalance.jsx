import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const StyledAccountBalance = styled.div`
  background-color: var(--color-black-300);
  border-radius: 8px;
  box-shadow: 3px 3px 10px -3px #000000;
  width: 100%;
  padding: 5rem;

  @media (min-width: 900px) {
    grid-row: 1/3;
    grid-column: 2;
  }
`;

const MoneyCard = styled(motion(NavLink))`
  height: 50px;
  width: 100%;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  margin-top: 15px;
  letter-spacing: 1px;
`;

const MainMoneyCard = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.4rem;
  /* color: var(--color-green); */
  /* color: white; */
  letter-spacing: 1px;
  /* padding: 1rem; */
  /* display: flex; */
  /* justify-content: center; */
`;

const HelperDiv = styled.div`
  max-height: 200px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  /* color: #dadada; */
`;

const StyledMainImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

function AccountBalance({ user }) {
  let balance = user.user.user_metadata.balance;
  const usd = balance.find((cur) => cur.cur == "USD");
  balance = balance.filter(
    (currency) => (currency.cur !== "USD" && currency.amount !== 0)
  );
  return (
    <StyledAccountBalance>
      {/* <p>Current balance: </p> */}
      <MainMoneyCard>
        <StyledMainImg src={`/${usd.cur}.png`} /> {usd.amount} USD <p></p>
      </MainMoneyCard>
      <HelperDiv>
        {/* <p>Other currencies:</p> */}
        {balance.map((currency) => {
          return (
            <MoneyCard
              key={currency.cur}
              to={`/stock/${currency.cur}?defCurrency=USD`}
              whileHover={{ backgroundColor: "var(--color-black-300-hover)" }}
              transition={{ duration: 0.2 }}
            >
              <StyledImg src={`/${currency.cur}.png`} />
              {currency.amount} {currency.cur}
              <p></p>
            </MoneyCard>
          );
        })}
      </HelperDiv>
    </StyledAccountBalance>
  );
}

export default AccountBalance;
