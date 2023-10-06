import { useQueryClient } from "@tanstack/react-query";

function HeaderAccountName() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  return <p>dsa</p>;
}

export default HeaderAccountName;
