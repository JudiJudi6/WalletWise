import { useQuery } from "@tanstack/react-query";
import { getUserNotifications } from "../services/apiAuth";

export function useUserNotifications(userID) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserNotifications(userID),
    queryKey: ["notifications"],
  });

  return { data, isLoading };
}
