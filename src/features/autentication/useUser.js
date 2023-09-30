import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useCurrentUser } from "./useCurrentUser";
// import { useProfileData } from "./useProfileData";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUser() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const { data, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['data']
  });

  return {data, isLoading, isAuthenticated: data?.user?.role};

  // const { user, isLoadingUser, id } = useCurrentUser();
  // const { profileData, isLoadingProfileData } = useProfileData(id);

  // const isLoading = isLoadingUser || isLoadingProfileData;

  // return {
  //   user,
  //   profileData,
  //   isLoading,
  //   isAuthenticated: user?.role === "authenticated",
  // };
}
