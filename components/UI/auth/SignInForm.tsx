"use client";

import signin from "@/app/actions/signin";
import { ActionState } from "@/types/tipos";
import { faEnvelopeOpen, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pill } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signin,
    null,
  );

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="flex min-h-screen w-full items-center justify-center bg-[#8f9765]">
      
      <div className="wrapper gap-5 flex flex-col items-center">
        {/* Logo */}
        <div className="flex gap-3 items-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Pill className="h-5 w-10 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-secondarytext">CuraTech</span>
        </div>
        <h1 className="text-5xl font-bold text-secondarytext text-center">Sign In</h1>
        <p className="text-dull-white text-center">Access to our services...</p>

        <form action={formAction} className="space-y-6 text-secondarytext flex flex-col items-center w-full">
          {/* Email Input */}
          <div className="relative w-80">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-white-medium rounded-full p-2 flex items-center justify-center w-[2.2rem] h-[2.3rem]">
              <FontAwesomeIcon
                className="text-blue-300"
                icon={faEnvelopeOpen}
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            <input
              name="email"
              className="w-full rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12 py-2"
              type="email"
              placeholder="Email"
              required
              style={{ paddingLeft: "3.5rem", paddingRight: "1rem" }}
            />
          </div>

         
          <div className="relative w-80">
          
            <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-white-medium rounded-full p-2 flex items-center justify-center w-[2.2rem] h-[2.3rem]">
              <FontAwesomeIcon
                className="text-blue-300"
                icon={faLock}
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            
            <input
              name="password"
              className="w-full rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg py-2"
               
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={{ paddingLeft: "3.5rem", paddingRight: "3rem" }}
            />

            
            <button
              type="button"  
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-blue-300 hover:text-neon-blue transition-colors cursor-pointer"
            >
              <FontAwesomeIcon 
                icon={showPassword ? faEyeSlash : faEye} 
                style={{ fontSize: "1.2rem" }}
              />
            </button>
          </div>

          {state?.error && <p className="text-red-500">{state.error}</p>}
          
          <button
            className="bg-linear-to-r from-gray-400 to-lime-100 w-80 font-semibold rounded-full py-2 hover:bg-linear-to-l hover:from-lime-100 hover:to-gray-400 text-black cursor-pointer"
            type="submit"
          >
            {isPending ? "Validating..." : "Sign In"}
          </button>

          <div className="text-dull-white border-t border-white-light pt-4 space-y-4 text-sm text-center w-80">
            <p>Don&apos;t have an account? </p>
            <Link
              href="/signup"
              className="text-blue-500 hover:underline font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  
  );
}
