import { zValidator } from "@hono/zod-validator";
import { PrismaPg } from "@prisma/adapter-pg";
import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "../prisma/generated/prisma";
import { auth } from "./lib/auth";

export const prisma = () => {
	const connectionString = `postgresql://postgres:postgres@localhost:54329/postgres`;
	const adapter = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter });
	return prisma;
};

const app = new Hono().on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth(prisma()).handler(c.req.raw);
});

const routes = app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/posts", async (c) => {
		return c.json({
			ok: true,
			message: "Hello asdffdsHono!",
		});
	})
	.post(
		"/posts",
		zValidator(
			"form",
			z.object({
				title: z.string(),
				body: z.string(),
			})
		),
		(c) => {
			// ...
			return c.json(
				{
					ok: true,
					message: "Created!",
				},
				201
			);
		}
	);

export default app;
export type AppType = typeof routes;
