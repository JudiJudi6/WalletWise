import supabase from "./supabase";

export async function changeBalance(balance) {
  const { data, error } = await supabase.auth.updateUser({
    data: { balance: balance },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function changeHistory(history) {
  const { data, error } = await supabase.auth.updateUser({
    data: { history: history },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function addFriend(oldFriends, newFriend) {
  const friend = await checkNickNamesList(newFriend);
  console.log(friend);

  if (friend) {
    const { data, error } = await supabase.auth.updateUser({
      data: { friends: [...oldFriends, friend] },
    });

    if (error) throw new Error(error.message);
    return data;
  } else {
    throw new Error("Does not exist");
  }
}

export async function checkNickNamesList(nick) {
  const { data: nickNames, error: nickNamesError } = await supabase
    .from("nickNames")
    .select("*");
  if (nickNamesError) throw new Error(nickNamesError.message);

  const check = nickNames.find((fr) => nick === fr.nickName);
  return check;
}
