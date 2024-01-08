import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeHistory as changeHistoryApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useAddTransactionHistory() {
  const queryClient = useQueryClient();

  const { mutate: changeHistory, isLoading } = useMutation({
    mutationFn: (newHistory) => {
      const data = queryClient.getQueryData(["user"]);
      let oldHistory = data.user.user_metadata.history;
      changeHistoryApi([...oldHistory, newHistory])
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again later");
    },
  });

  return { changeHistory, isLoading };
}
