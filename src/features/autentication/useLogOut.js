import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
        toast.success("Log out successfully");
    },
    onError: (err) => {
      if (err) throw new Error(err.message);
    },
  });

  return { logOut, isLoading };
}
