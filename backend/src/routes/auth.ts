import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma";
import { sanitizeObject } from "../utils/sanitize";
import {
  loginSchema,
  signupSchema
} from "../validators/authValidator";

const router = express.Router();

const GENERIC_ERROR =
  "Invalid input provided.";

const SALT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    console.log(
      "[REGISTER REQUEST RECEIVED]"
    );

    const sanitizedData =
      sanitizeObject(req.body);

    const result =
      signupSchema.safeParse(
        sanitizedData
      );

    if (!result.success) {

      console.error(
        "[AUTH VALIDATION FAILED]",
        {
          route: "/register",
          ip: req.ip,
          errors:
            result.error.flatten(),
          timestamp:
            new Date()
        }
      );

      return res.status(400).json({
        success: false,
        message: GENERIC_ERROR
      });

    }

    const {
      email,
      password,
      name
    } = result.data;

    // Normalize inputs
    const normalizedEmail =
      email.toLowerCase().trim();

    const normalizedName =
      name.trim();

    const normalizedPassword =
      password.trim();

    console.log(
      "[CHECKING USER]",
      normalizedEmail
    );

    const existingUser =
      await prisma.user.findUnique({

        where: {
          email:
            normalizedEmail
        }

      });

    if (existingUser) {

      return res.status(409).json({

        success: false,

        message:
          "Email already registered"

      });

    }

    console.log(
      "[HASHING PASSWORD]"
    );

    const hashedPassword =
      await bcrypt.hash(
        normalizedPassword,
        SALT_ROUNDS
      );

    console.log(
      "[CREATING USER]"
    );

    const user =
      await prisma.user.create({

        data: {

          name:
            normalizedName,

          email:
            normalizedEmail,

          password:
            hashedPassword

        },

        select: {

          id: true,
          name: true,
          email: true,
          role: true

        }

      });

    console.log(
      "[USER CREATED]",
      user.id
    );

    return res.status(201).json({

      success: true,

      user

    });

  } catch (error) {

    console.error(
      "[REGISTER ERROR]",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Something went wrong"

    });

  }

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    const sanitizedData =
      sanitizeObject(req.body);

    const result =
      loginSchema.safeParse(
        sanitizedData
      );

    if (!result.success) {

      console.error(
        "[AUTH VALIDATION FAILED]",
        {
          route: "/login",
          ip: req.ip,
          errors:
            result.error.flatten(),
          timestamp:
            new Date()
        }
      );

      return res.status(400).json({

        success: false,
        message: GENERIC_ERROR

      });

    }

    const normalizedEmail =
      result.data.email
      .toLowerCase()
      .trim();

    const normalizedPassword =
      result.data.password
      .trim();

    console.log(
      "[LOGIN EMAIL]",
      normalizedEmail
    );

    const user =
      await prisma.user.findUnique({

        where: {
          email:
            normalizedEmail
        }

      });

    console.log(
      "[USER FOUND]",
      !!user
    );

    if (!user || !user.password) {

      return res.status(401).json({

        success: false,
        message:
          "Invalid credentials"

      });

    }

    // Account lock check

    if (
      user.lockedUntil &&
      user.lockedUntil > new Date()
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account temporarily locked. Try again later."

      });

    }

    const passwordMatch =
      await bcrypt.compare(
        normalizedPassword,
        user.password
      );

    console.log(
      "[PASSWORD MATCH]",
      passwordMatch
    );

    // Wrong password

    if (!passwordMatch) {

      const attempts =
        user.failedLoginAttempts + 1;

      await prisma.user.update({

        where: {
          id: user.id
        },

        data: {

          failedLoginAttempts:
            attempts,

          lockedUntil:
            attempts >= MAX_LOGIN_ATTEMPTS
              ? new Date(
                  Date.now() +
                  LOCK_TIME
                )
              : null
        }

      });

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials"

      });

    }

    // Reset attempts after success

    await prisma.user.update({

      where: {
        id:
          user.id
      },

      data: {

        failedLoginAttempts: 0,
        lockedUntil: null

      }

    });

    const token =
      jwt.sign(

        {
          userId:
            user.id,

          email:
            user.email,

          role:
            user.role
        },

        process.env.JWT_SECRET!,

        {
          expiresIn: "7d"
        }

      );

    return res.json({

      success: true,

      token,

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role
      }

    });

  } catch (error) {

    console.error(
      "[LOGIN ERROR]",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Something went wrong"

    });

  }

});

export default router;
