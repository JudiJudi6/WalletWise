import { formatCurrency } from "../../utils/helpers";
import {useUser} from '../autentication/useUser'

function HeaderAccountBalane() {
  const { user } = useUser();

  return <p>Balance: {formatCurrency(user.user.user_metadata.balance)}</p>;
}

export default HeaderAccountBalane;
