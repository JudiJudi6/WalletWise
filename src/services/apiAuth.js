import supabase from "./supabase";

export async function signUp({
  email,
  password,
  fullName,
  nickName,
  birthDate,
  pesel,
}) {
  let userData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    const userID = data.user.id;

    const { data: userTableData, error: userTableError } = await supabase
      .from("profileData")
      .insert([{ userID, fullName, nickName, pesel, birthDate }])
      .select();

    if (userTableError) throw new Error(userTableError.message);
    userData = userTableData;
  } else {
    throw new Error(error.message);
  }
  return { data, userData };
}

export async function login({ password, email }) {
  let profileData;
  let { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error) {
    const userID = user.user.id;
    let { data: profileDataApi, error } = await supabase
      .from("profileData")
      .select("*")
      .eq("userID", userID);
    if (error) throw new Error(error.message);
    profileData = profileDataApi;
  } else {
    throw new Error(error.message);
  }

  return { user, profileData };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function getCurrentProfileData(id) {
  if (!id) return {};
  let { data: profileData, error } = await supabase
    .from("profileData")
    .select("*")
    .eq("userID", id);

  if (error) throw new Error(error.message);

  return profileData;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getUsersNickNames() {
  let { data: nickNames, error } = await supabase
    .from("profileData")
    .select("nickName");

    if (error) throw new Error(error.message);

    return nickNames
}
