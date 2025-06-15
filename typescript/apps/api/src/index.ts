import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { auth } from "./lib/auth";
import { Prisma, PrismaClient } from "../prisma/generated/prisma"

const app = new Hono()
.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth(new PrismaClient()).handler(c.req.raw);
});

const routes = app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.post(
		"/posts",
		zValidator(
			"form",
			z.object({
				title: z.string(),
				body: z.string(),
			}),
		),
		(c) => {
			// ...
			return c.json(
				{
					ok: true,
					message: "Created!",
				},
				201,
			);
		},
	);

export default app;
export type AppType = typeof routes;
