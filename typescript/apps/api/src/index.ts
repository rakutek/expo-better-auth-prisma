import { PrismaPg } from "@prisma/adapter-pg";
import { Hono } from "hono";
import { PrismaClient } from "../prisma/generated/prisma";
import { errorHandler } from "./middleware/error-handler";
import { authRoutes } from "./routes/auth";
import { postsRoutes } from "./routes/posts";
import { usersRoutes } from "./routes/users";

export const prisma = () => {
	const connectionString = "postgresql://postgres:postgres@localhost:54329/postgres";
	const adapter = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter });
	return prisma;
};

const app = new Hono()
	.use("*", errorHandler)
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.route("/api/auth", authRoutes(prisma))
	.route("/posts", postsRoutes)
	.route("/users", usersRoutes(prisma));

export default app;
export type AppType = typeof app;
