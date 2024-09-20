import { MovieData } from "@/utils/type";

export async function fetchAllMovie(q?: string): Promise<MovieData[]> {
    let baseURL = `https://onebite-cinema-api-main.vercel.app/movie`;

    if (q) {
        baseURL += `/search?q=${q}`;
    }

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
