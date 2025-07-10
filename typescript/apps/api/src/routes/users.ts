import { Hono } from "hono";
import type { PrismaClient } from "../../prisma/generated/prisma";
import { auth } from "../lib/auth";

export const usersRoutes = (prisma: () => PrismaClient) => {
	const app = new Hono().post("/launch", async (c) => {
		const authSession = await auth(prisma()).api.getSession({
			headers: c.req.raw.headers,
		});

		if (!authSession) {
			return c.json(
				{
					ok: false,
					message: "Unauthorized",
				},
				401
			);
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
			return c.json(
				{
					ok: false,
					message: "Failed to update launch time",
				},
				500
			);
		}
	});

	return app;
};
