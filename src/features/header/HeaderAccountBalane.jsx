import { formatCurrency } from "../../utils/helpers";
import { useUser } from "../autentication/useUser";

function HeaderAccountBalane() {
  const { user } = useUser();
  const balance = user.user.user_metadata.balance;
  const usd = balance.find((cur) => cur.cur === "USD");
  return <p>Balance: {formatCurrency(usd.amount)} USD</p>;
}

export default HeaderAccountBalane;
