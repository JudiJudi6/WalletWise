import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../autentication/useUser";

function HeaderAccountName() {
  const { user } = useUser();

  return <p>{user.nickName}</p>;
}

export default HeaderAccountName;
