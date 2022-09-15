import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // username, email 중복확인
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
        // 이미 유저가 존재할 경우 에러 처리
        if (existingUser) {
          throw new Error("이 username 혹은 email은 이미 존재합니다.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
