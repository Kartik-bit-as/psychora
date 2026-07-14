import {
    NextFunction,
    Request,
    Response
} from "express";

import {
    authService
} from "../services/authService";


// ==========================
// Register User
// ==========================

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log("AUTH CONTROLLER HIT");

    try {

        const result =
            await authService.register(
                req.body
            );

        return res
            .status(201)
            .json({

                success: true,
                data: result

            });

    } catch (error: any) {

        console.error(
            "Register error:",
            error
        );

        return res
            .status(
                error?.statusCode || 500
            )
            .json({

                success: false,

                message:
                    error?.message ||
                    "Registration failed"

            });
    }

};


// ==========================
// Login User
// ==========================

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const result =
            await authService.login(
                req.body
            );

        return res
            .status(200)
            .json({

                success: true,
                data: result

            });

    } catch (error: any) {

        console.error(
            "Login error:",
            error
        );

        return res
            .status(
                error?.statusCode || 500
            )
            .json({

                success: false,

                message:
                    error?.message ||
                    "Login failed"

            });
    }

};


// ==========================
// Get User Profile
// ==========================

export const getProfile = async (
    req: any,
    res: Response
) => {

    try {

        return res
            .status(200)
            .json({

                success: true,
                data: req.user

            });

    } catch (error: any) {

        console.error(
            "Profile error:",
            error
        );

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Failed to fetch profile"

            });
    }

};
