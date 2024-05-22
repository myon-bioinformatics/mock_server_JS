let headers = "";

export const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    uuid: {
        method: "GET",
        url: "/api/uuid",
        headers: headers,
        cache: "no-cache",
    },
    random: {
        method: "GET",
        url: "/api/random",
        headers: headers,
        cache: "no-cache",
    },
    randomSlice8:{
        method: "GET",
        url: "/api/randomSlice8",
        headers: headers,
        cache: "no-cache",
    }
}