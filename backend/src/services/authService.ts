import bcrypt from "bcrypt";
import prisma from "../config/prisma";

import {
   generateToken,
   TokenPayload
} from "../utils/jwt";

const SALT_ROUNDS = 12;

export interface RegisterInput {
   name: string;
   email: string;
   password: string;
}

export interface LoginInput {
   email: string;
   password: string;
}

class AuthService {

   // =====================
   // REGISTER
   // =====================

  async register(
  input:RegisterInput
){

console.log("REGISTER FUNCTION STARTED");

try{

console.log("Step 1: received input");

const existingUser =
await prisma.user.findUnique({

   where:{
      email:
      input.email
      .toLowerCase()
      .trim()
   }

});

console.log("Step 2: checked existing user");

if(existingUser){

   throw{
      statusCode:409,
      message:"Email already registered"
   };

}

console.log("Step 3: hashing password");

const hashedPassword =
await bcrypt.hash(
   input.password,
   SALT_ROUNDS
);

console.log("Step 4: password hashed");

const user =
await prisma.user.create({

   data:{

      name:
      input.name.trim(),

      email:
      input.email
      .toLowerCase()
      .trim(),

      password:
      hashedPassword

   },

   select:{

      id:true,
      name:true,
      email:true,
      role:true

   }

});

console.log("Step 5: user created");

const payload:TokenPayload={

   userId:user.id,
   email:user.email,
   role:user.role

};

console.log("Step 6: creating token");

const token=
generateToken(payload);

console.log("Step 7: completed");

return{

   token,
   user

};

}catch(error){

console.log("REGISTER ERROR:");
console.log(error);

throw{

   statusCode:400,
   message:"Registration failed"

};

}

}
   // =====================
   // LOGIN
   // =====================

   async login(
      input: LoginInput
   ) {

      try {

         const user =
         await prisma.user.findUnique({

            where: {

               email:
               input.email
               .toLowerCase()
               .trim()

            }

         });

         if (
            !user ||
            !user.password
         ) {

            throw {

               statusCode: 401,

               message:
               "Incorrect email or password"

            };

         }

         const valid =
         await bcrypt.compare(

            input.password,
            user.password

         );

         if (!valid) {

            throw {

               statusCode: 401,

               message:
               "Incorrect email or password"

            };

         }

         const payload: TokenPayload = {

            userId: user.id,
            email: user.email,
            role: user.role

         };

         const token =
         generateToken(payload);

         return {

            token,

            user: {

               id: user.id,
               name: user.name,
               email: user.email,
               role: user.role

            }

         };

      } catch (error: any) {

         console.error(
            "AuthService Login Error:",
            error
         );

         throw {

            statusCode:
            error?.statusCode || 400,

            message:
            error?.message ||
            "Login failed"

         };

      }

   }

}

export const authService =
new AuthService();
