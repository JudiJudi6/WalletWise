import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend as addFriendApi } from "../services/apiOperations";
import toast from "react-hot-toast";

export function useAddFriend() {
  const queryClient = useQueryClient();

  const { mutate: addFriend, isLoading } = useMutation({
    mutationFn: async (newFriend) => {
      try {
        const data = queryClient.getQueryData(["user"]);
        let oldFriends = data.user.user_metadata.friends;
        await addFriendApi([...oldFriends, newFriend]);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Friend was added to the list");
    },
    onError: (error) => {
      if (error.message === "Does not exist") {
        toast.error("User with this nickname does not exist");
      } else {
        toast.error("An error occurred while adding a friend");
      }
    },
  });

  return { addFriend, isLoading };
}
