import { fetchData } from "../helpers/fetchData.mts";
import type { optionsFetchdata } from "../types/optionsFetchdata.mjs";

let refreshPromise: Promise<string> | null = null;

export async function safeFetchData(
    endpoint: string,
    options: optionsFetchdata
) {
    try {
        return await fetchData(endpoint, options);

    } catch (error: any) {

        if (error?.status !== 401) {
            throw error;
        }


        // Si un refresh est déjà en cours, on attend celui-ci au lieu d'en lancer un autre.
        if (!refreshPromise) {
            refreshPromise = fetchData(
                "api/auth/refresh",
                {
                    method: "POST",
                }
            )
                .then((refreshResult) => {

                    const accessToken =
                        refreshResult.result.accessToken;

                    return accessToken;
                })
                .finally(() => {

                    // Le refresh est terminé
                    refreshPromise = null;
                });
        }


        try {

            const accessToken = await refreshPromise;

            return await fetchData(
                endpoint,
                {
                    ...options,
                    token: accessToken,
                }
            );

        } catch (error) {
            throw error
        }

    }
}