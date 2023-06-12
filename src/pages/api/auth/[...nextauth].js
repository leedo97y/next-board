import { clientPromise } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      // 1. 로그인 페이지 폼을 자동으로 생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 2. 로그인요청시 실행되는코드
      // 직접 DB에서 아이디, 비번 비교하고
      // 아이디, 비번 맞으면 결과를 return, 틀리면 null을 return 해야함
      async authorize(credentials) {
        let client = await clientPromise;
        let db = client.db("next-board");
        let user = await db
          .collection("user")
          .findOne({ email: credentials.email });

        if (!user) {
          console.log("Register first!");
          return null;
        }

        let pwChecker = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwChecker) {
          console.log("Wrong password!");
          return null;
        }

        return user;
      },
    }),
  ],

  // 3. jwt 써놔야함. + jwt 만료일설정 (30일)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // 4. jwt 만들 때 실행되는 코드
    // user에는 DB의 유저정보가 담겨있고 token.user에 저장하면 jwt에 들어감.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    // 5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
