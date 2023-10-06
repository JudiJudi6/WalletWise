import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(['user'], data.user)
    },
  });

  return { signUp, isLoading };
}
