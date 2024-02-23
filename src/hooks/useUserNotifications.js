import { useQuery } from "@tanstack/react-query";
import { getUserNotifications } from "../services/apiAuth";

export function useUserNotifications(userID) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserNotifications(userID),
    queryKey: ["notifications"],
    refetchInterval: 1000,
  });

  return { data, isLoading };
}
