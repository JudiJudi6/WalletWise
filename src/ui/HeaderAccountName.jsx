import { useQueryClient } from "@tanstack/react-query";

function HeaderAccountName() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["data"]);
  const profileData = data.profileData;

  return <p>{profileData.nickName}</p>;
}

export default HeaderAccountName;
