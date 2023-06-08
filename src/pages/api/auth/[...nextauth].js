import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "263dd21271b08194ce00",
      clientSecret: "60c7cc58b230c2c3146f7b592250d9d9bf429bda",
    }),
  ],
  secret: "d0y1ee2351",
};
export default NextAuth(authOptions);
