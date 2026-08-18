import { apiBaseUrl } from "../services/baseUrl.mjs";
import type { optionsFetchdata } from "../types/optionsFetchdata.mjs";
export async function fetchData(endpoint: string, options: optionsFetchdata) {
    const {
        method = "GET",
        data = null,
        token = "",
        headers = {},
    } = options;

    const res = await fetch(`${apiBaseUrl}/${endpoint}`, {
        method,
        credentials: "include",
        headers: {
            ...(data instanceof FormData ? {} : {
                "Content-Type": "application/json"
            }),

            "Accept": "application/json",

            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...headers
        },
        // body: data ? JSON.stringify(data) : null
        body: data instanceof FormData ? data
            : data
                ? JSON.stringify(data)
                : null
    });
    const status = res.status;
    if (status === 401) {
        const refreshRes = await fetch(`${apiBaseUrl}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                ...(data instanceof FormData ? {} : {
                    "Content-Type": "application/json"
                }),

                "Accept": "application/json",

            },
        })
        if (!refreshRes.ok) {
            throw {
                status,
                message: "Session expirée"
            }
        }
        const refreshResult = await refreshRes.json().catch(() => null)
        const accessToken = refreshResult.accessToken
        //localStorage.setItem("acces", refreshResult.accessToken)
        
        return await fetchData(endpoint, {
            ...options,
            token: accessToken
        })
    }

    if (status === 204) return { result: null, status };
    const result = await res.json().catch(() => null);
    if (!res.ok) {
        throw {
            status,
            message: result?.message
        };
    }

    return { result, status };
}
