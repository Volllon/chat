import useUserInfo from "./useUserInfo";

export default () => {
  const { role } = useUserInfo();

  if (role === null) {
    return null;
  }

  return role !== 'unlogged';
}
