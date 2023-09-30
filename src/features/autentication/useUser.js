import { useCurrentUser } from "./useCurrentUser";
import { useProfileData } from "./useProfileData";

export function useUser() {
  const { user, isLoadingUser, id } = useCurrentUser();
  const { profileData, isLoadingProfileData } = useProfileData(id);

  const isLoading = isLoadingUser || isLoadingProfileData;

  return {
    user,
    profileData,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
