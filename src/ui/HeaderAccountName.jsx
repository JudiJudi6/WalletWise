import { useQueryClient } from "@tanstack/react-query";

function HeaderAccountName() {
  const queryClient = useQueryClient();
//   const profileData = queryClient.getQueryData(['profileData']).at(0)
//   const nickName = profileData.nickName
//   console.log(nickName);
//   return <p>{nickName}</p>;
  return <p></p>
}

export default HeaderAccountName;
