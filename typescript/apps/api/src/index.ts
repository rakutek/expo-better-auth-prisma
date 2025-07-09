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
	)
	.post("/users/launch", async (c) => {
		const authSession = await auth(prisma()).api.getSession({
			headers: c.req.raw.headers,
		});

		if (!authSession) {
			return c.json({
				ok: false,
				message: "Unauthorized",
			}, 401);
		}

		const db = prisma();
		try {
			await db.user.update({
				where: {
					id: authSession.user.id,
				},
				data: {
					lastLaunchedAt: new Date(),
				},
			});

			return c.json({
				ok: true,
				message: "Launch time updated successfully",
			});
		} catch (error) {
			console.error("Failed to update last launched at:", error);
			return c.json({
				ok: false,
				message: "Failed to update launch time",
			}, 500);
		}
	});

export default app;
export type AppType = typeof routes;
