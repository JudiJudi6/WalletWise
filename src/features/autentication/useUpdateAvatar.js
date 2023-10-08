import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../services/apiAuth";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isLoading: isUpdating } = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (user) => {
      toast.success("User avatar successfully updated");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateAvatar, isUpdating };
}
