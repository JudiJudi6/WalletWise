import { useMutation } from "@tanstack/react-query";
import { confirmNotification as confirmNotificationApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useUserConfirmTransaction() {
  const { mutate: confirmNotification, isSuccess } = useMutation({
    mutationFn: ({ userID, index }) => {
      console.log(userID, index);
      confirmNotificationApi(userID, index);
    },
    onSuccess: () => {
        toast.success("Funds has been added")
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { confirmNotification, isSuccess };
}
