"use client";

import signin from "@/app/actions/signin";
import { ActionState } from "@/types/tipos";
import { faEnvelopeOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signin,
    null,
  );

  return (
    <div className="wrapper gap-5">
      <h1 className="text-5xl font-bold text-secondarytext">Sign In</h1>
      <p className="text-dull-white">Access to our services...</p>

      <form action={formAction} className="space-y-6 text-secondarytext">
        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faEnvelopeOpen}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="email"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            type="email"
            placeholder="Email"
            style={{ padding: "0.5rem 3rem" }}
          />
        </div>

        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faLock}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="password"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            type="password"
            placeholder="Password"
            style={{ padding: "0.5rem 3rem" }}
          />
        </div>

        {state?.error && <p className="text-red-500">{state.error}</p>}
        <button
          className="bg-linear-to-r from-gray-400 to-lime-100 w-full font-semibold rounded-full py-2 hover:bg-linear-to-l hover:from-lime-100 hover:to-gray-400 text-black"
          type="submit"
        >
          {isPending ? "Validating..." : "Sign In"}
        </button>

        <div className="text-dull-white border-t border-white-light pt-4 space-y-4 text-sm">
          <p>Don &apos;t have an account? </p>
          <Link
            href="/signup"
            className="text-blue-500 hover:underline font-semibold cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
