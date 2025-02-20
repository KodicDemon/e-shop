import NextAuth from "next-auth";
import { authConfing } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfing);
