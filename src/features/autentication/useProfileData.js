import { useQuery } from "@tanstack/react-query";
import { getCurrentProfileData } from "../../services/apiAuth";

export function useProfileData(id) {
  const { data: profileData, isLoading } = useQuery({
    queryFn: () => getCurrentProfileData(id),
    queryKey: ["profileData"],
  });

  return { profileData, isLoading };
}
