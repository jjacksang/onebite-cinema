import { MovieData } from "@/utils/type";

export async function fetchAllMovie(q?: string): Promise<MovieData[]> {
    let baseURL = `http://localhost:12345/movie`;

    if (q) {
        baseURL += `/search?q=${q}`;
    }
    //  else if (id) {
    //     baseURL += `/${id}`;
    // }

    try {
        const res = await fetch(baseURL);

        if (!res.ok) {
            throw new Error("");
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
