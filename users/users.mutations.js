import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // 1. username 이나 email이 DB에 이미 있는지 확인할 것.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
      // 2. hash password
      // 3. 잘 진행되었다면 저장 -> user를 return
    },
  },
};
