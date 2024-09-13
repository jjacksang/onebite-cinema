import { MovieData } from "@/utils/type";

export default async function fetchRandomMovie(): Promise<MovieData[]> {
    const url = "http://localhost:12345/movie/random";

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error();
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
