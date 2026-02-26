import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: new Headers(req.headers as any)
        });

        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = session.user.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
