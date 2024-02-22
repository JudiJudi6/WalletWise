import { useUser } from "../autentication/useUser";

function HeaderAccountName() {
  const { user } = useUser();

  return <p>{user.nickName}</p>;
}

export default HeaderAccountName;
