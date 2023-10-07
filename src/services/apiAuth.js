import supabase from "./supabase";

export async function signUp({
  email,
  password,
  fullName,
  nickName,
  birthDate,
  pesel,
}) {
  let userID, nickNames;
  const { data: user, error: errorUser } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        pesel,
        birthDate,
        avatar: "",
        friends: [],
        balance: 50,
      },
    },
  });

  if (errorUser) throw new Error(errorUser.message);

  userID = user.user.id;

  if (!errorUser) {
    const { data: nickNamesApi, error: errorNickNames } = await supabase
      .from("nickNames")
      .insert([{ userID, nickName }])
      .select();

    if (errorNickNames) throw new Error(errorNickNames.message);
    nickNames = nickNamesApi;
  }

  return { user: user.user, nickNames };
}

export async function login({ password, email }) {
  let nickName;
  let { data: user, error: errorUser } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    }
  );
  if (errorUser) throw new Error(errorUser.message);

  if (!errorUser) {
    let { data: nickNameApi, error } = await supabase
      .from("nickNames")
      .select("*")
      .eq("userID", user.user.id);

    if (error) throw new Error(error.message);
    nickName = nickNameApi.at(0).nickName;
  }

  return { user: user.user, nickName };
}

export async function getCurrentUser() {
  let nickName;
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error: errorUser } = await supabase.auth.getUser();
  if (errorUser) throw new Error(errorUser.message);

  if (!errorUser) {
    let { data: nickNameApi, error } = await supabase
      .from("nickNames")
      .select("*")
      .eq("userID", user.user.id);

    if (error) throw new Error(error.message);
    nickName = nickNameApi?.at(0)?.nickName;
  }

  return { user: user.user, nickName };
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getUsersNickNames(nick) {
  let { data, error } = await supabase
    .from("nickNames")
    .select("*")
    .eq("nickName", nick);

  if (error) throw error.message;

  return data;
}

export async function updateUser({
  password,
  fullName,
  birthDate,
  nickName,
  currentNickName,
}) {
  let updateData, userID;

  console.log(fullName);
  console.log(password, fullName, birthDate, nickName, currentNickName);

  if (!password) updateData = { data: { fullName, birthDate } };
  if (password && fullName && birthDate)
    updateData = { password, data: { fullName, birthDate } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (nickName === currentNickName) {
    return { user: data.user, nickName: currentNickName };
  } else {
    userID = data.user.id;

    const { error } = await supabase
      .from("nickNames")
      .delete()
      .eq("userID", userID);

    if (error) throw new Error(error.message);

    const { error: errorNickNames } = await supabase
      .from("nickNames")
      .insert([{ userID, nickName }])
      .select();

    if (errorNickNames) throw new Error(errorNickNames.message);
    return { user: data.user, nickName };
  }
}

// export async function updateCurrentUser({ password, avatar, fullName }) {
//   let updateData;

//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };

//   const { data, error } = await supabase.auth.updateUser(updateData);
//   if (error) throw new Error(error.message);
//   if(!avatar) return data

//   const fileName = `avatar-${data.user.id}-${Math.random()}`

//   const {error: storageError} = await supabase.storage.from('avatars').upload(fileName, avatar)
//   if (storageError) throw new Error(storageError.message);

//   const {data: updatedUser, error: error2} = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
//     }
//   })

//   if (error2) throw new Error(error2.message);
//   return updatedUser
// }
