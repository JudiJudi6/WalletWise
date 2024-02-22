import { useMutation } from "@tanstack/react-query";
import { updateNotifications as updateNotificationsApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateNotifications() {
  const { mutate: updateNotifications, isLoading } = useMutation({
    mutationFn: ({userID, notification}) => {
      updateNotificationsApi(userID, notification);
    },
    onSuccess: () => {
      toast.success("Funds have been sent");
    },
    onError: () => {
      toast.error("Somethind went wrong, please try later");
    },
  });

  return { updateNotifications, isLoading };
}
