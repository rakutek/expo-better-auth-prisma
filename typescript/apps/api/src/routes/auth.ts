import { Hono } from "hono";
import type { PrismaClient } from "../../prisma/generated/prisma";
import { auth } from "../lib/auth";

export const authRoutes = (prisma: () => PrismaClient) => {
	const app = new Hono().on(["POST", "GET"], "/*", (c) => {
		return auth(prisma()).handler(c.req.raw);
	});

	return app;
};
