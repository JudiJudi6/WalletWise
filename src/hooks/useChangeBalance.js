import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBalance as changeBalanceApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useChangeBalance() {
  const queryClient = useQueryClient();

  const { mutate: changeBalance, isLoading } = useMutation({
    mutationFn: (depositObj) => {
      const data = queryClient.getQueryData(["user"]);
      let oldBalance = data.user.user_metadata.balance;
      let newBalance;

      const curFind = oldBalance.find((cur) => cur.cur === depositObj.cur);

      if (curFind) {
        oldBalance = oldBalance.filter((cur) => cur !== curFind);
        curFind.amount = +curFind.amount + +depositObj.amount;
        newBalance = [...oldBalance, curFind];
      } else {
        newBalance = [...oldBalance, depositObj];
      }
      changeBalanceApi(newBalance);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again later");
    },
  });

  return { changeBalance, isLoading };
}
