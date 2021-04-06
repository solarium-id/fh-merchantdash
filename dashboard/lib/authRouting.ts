import nookies from "nookies";
import type { GetServerSidePropsContext } from "next";

export function authRouting(context: GetServerSidePropsContext) {
  let result: string = "";
  const url = context.resolvedUrl;
  const tokenCookies = nookies.get(context).jwt || "empty";

  if (tokenCookies.length >= 100 && url === "/login") {
    result = "/";
  } else if (tokenCookies.length >= 100 && url !== "/login") {
    result = "";
  } else if (tokenCookies.length < 100 && url !== "/login") {
    result = "/login";
  }

  return result;
}
