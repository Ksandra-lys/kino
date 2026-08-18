import { fetchData } from "../helpers/fetchData.mts";
import type { optionsFetchdata } from "../types/optionsFetchdata.mjs";
export async function safeFetchData(
    endpoint: string,
    options: optionsFetchdata
) {
    try {
        return await fetchData(endpoint, options);
    } catch (error: any) {
        if (error.status !== 401) {
            throw error;
        }

        try {
            const refreshResult = await fetchData(
                "api/auth/refresh",
                {
                    method: "POST"
                }
            );

            const accessToken =
                refreshResult.result.accessToken;


            return await fetchData(
                endpoint,
                {
                    ...options,
                    token: accessToken
                }
            );

        } catch (refreshError: any) {

            // Le refresh a échoué
            if (refreshError.status === 401) {

                console.log("Session expirée");

                localStorage.removeItem("accessToken");

                //window.location.href = "loginPage.html";
            }

            throw refreshError;
        }
    }
}