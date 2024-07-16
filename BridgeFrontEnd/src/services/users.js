import authAxios from "./authAxios";

export const sendInviteAccount = async ({ username }) => {
  const { data } = await authAxios.post(`/api/v1/email/emailInviteToCreateAccountBridge?to=${username}`);
  return data;
};

