import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // 인자로 들어온 username을 가진 유저 찾기
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "username이 존재하지 않습니다.",
        };
      }
      // 비밀번호가 인자로 들어온 비밀번호와 같은지 체크
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 일치하지 않습니다.",
        };
      }
      // 둘다 체크되면 token을 발행해서 user한테 리턴
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
