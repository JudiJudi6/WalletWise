import { useMutation } from "@tanstack/react-query";
import { checkNickNamesList } from "../services/apiOperations";

export function useCheckUser() {
  const {
    data,
    mutate: check,
    isLoading,
  } = useMutation({
    mutationFn: checkNickNamesList,
  });
  return { data, check, isLoading };
}
