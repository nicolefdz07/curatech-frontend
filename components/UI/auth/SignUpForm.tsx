import signup from "@/app/actions/signup";
import {
  faBookMedical,
  faCalendar,
  faEnvelopeOpen,
  faLock,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUpForm() {
  return (
    <div className="wrapper gap-5">
      <h1 className="text-5xl font-bold text-secondarytext">Sign Up</h1>
      <p className="text-dull-white">Access to our services...</p>

      <form action={signup} className="space-y-6 text-secondarytext">
        <div className="relative ">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faSignature}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="first_name"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            style={{ padding: "0.5rem 3rem" }}
            type="text"
            placeholder="First name"
          />
        </div>

        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faSignature}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="last_name"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            style={{ padding: "0.5rem 3rem" }}
            type="text"
            placeholder="Last name"
          />
        </div>

        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faCalendar}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="birth_date"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            type="date"
            style={{ padding: "0.5rem 3rem" }}
          />
        </div>

        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faBookMedical}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="health_condition"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            type="text"
            placeholder="Health condition"
            style={{ padding: "0.5rem 3rem" }}
          />
        </div>

        <div className="relative">
          <div className="absolute top-1.1 left-0.8 bg-white-medium rounded-full p-2 flex flex-items justify-center w-[2.2rem] h-[2.3rem]">
            <FontAwesomeIcon
              className="text-blue-300"
              icon={faSignature}
              style={{ fontSize: "1.5rem", width: "1.5rem" }}
            />
          </div>
          <input
            name="caregiver_name"
            className="w-80 rounded-full bg-white-light focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg px-12"
            type="text"
            placeholder="Caregiver name"
            style={{ padding: "0.5rem 3rem" }}
          />
        </div>

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

        
        <button
          className="bg-linear-to-r from-gray-400 to-lime-100 w-full font-semibold rounded-full py-2 hover:bg-linear-to-l hover:from-lime-100 hover:to-gray-400 text-black"
          type="submit"
        >
          Sign Up
        </button>
       

        <div className="text-dull-white border-t border-white-light pt-4 space-y-4 text-sm">
          <p>
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-blue-500 hover:underline font-semibold cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
    
  );
}
