import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBalanceApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useChangeBalance() {
    const queryClient = useQueryClient();

  const { mutate: changeBalance, error } = useMutation({
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

  return { changeBalance, error };
}
