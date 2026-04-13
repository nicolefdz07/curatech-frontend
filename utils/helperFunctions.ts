import { createHash } from "crypto";

export default function toHash(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

console.log(toHash("holamellamoleo"));
