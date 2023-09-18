import { AxiosResponse } from "axios";
import { AuthApi } from "../services/auth-api";

export async function verifyPlan(
  cookie: string
): Promise<AxiosResponse<any, any>> {
  return await AuthApi(cookie)("/me/plan");
}
