import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const postSchema = z.object({
	title: z.string(),
	body: z.string(),
});

export const postsRoutes = new Hono()
	.get("/", async (c) => {
		return c.json({
			ok: true,
			message: "Hello asdffdsHono!",
		});
	})
	.post("/", zValidator("form", postSchema), (c) => {
		const data = c.req.valid("form");
		return c.json(
			{
				ok: true,
				message: "Created!",
				data,
			},
			201
		);
	});
