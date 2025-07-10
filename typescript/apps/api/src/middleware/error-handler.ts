import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorHandler = async (c: Context, next: Next) => {
	try {
		await next();
	} catch (err) {
		if (err instanceof HTTPException) {
			return c.json(
				{
					ok: false,
					message: err.message,
				},
				err.status
			);
		}

		console.error("Unexpected error:", err);
		return c.json(
			{
				ok: false,
				message: "Internal server error",
			},
			500
		);
	}
};
