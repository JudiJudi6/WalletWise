import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBalance as changeBalanceApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useChangeBalance() {
    const queryClient = useQueryClient();

  const { mutate: changeBalance, isLoading } = useMutation({
    mutationFn: changeBalanceApi,
    onSuccess: (data) => {
      toast.success("Deposit done");
      queryClient.setQueryData(["user"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again later");
    },
  });

  return { changeBalance, isLoading };
}
