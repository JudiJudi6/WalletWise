import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeHistoryTransaction as changeHistoryTransactionApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useAddOperationsHistory() {
  const queryClient = useQueryClient();

  const { mutate: changeHistory, isLoading } = useMutation({
    mutationFn: (newHistory) => {
      const data = queryClient.getQueryData(["user"]);
      let oldHistory = data.user.user_metadata.transactionHistory;
      changeHistoryTransactionApi([newHistory, ...oldHistory]);
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
