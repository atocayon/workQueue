export function validation(setError,loginCreds){
  const {usernameOrEmail, password} = loginCreds;
  const error = {};
  if (!usernameOrEmail) error.usernameOrEmail = "Username or Email is required";
  if (!password) error.password = "Password is required";

  setError(error);

  return Object.keys(error).length === 0;
}