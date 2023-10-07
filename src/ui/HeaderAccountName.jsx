import { useQueryClient } from "@tanstack/react-query";

function HeaderAccountName() {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user'])?.nickName

  return <p>{user}</p>;
}

export default HeaderAccountName;
