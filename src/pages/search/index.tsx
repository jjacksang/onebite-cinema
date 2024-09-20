import { ReactNode, useEffect, useState } from "react";
import SearchAbleLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { fetchAllMovie } from "@/pages/api/fetch-movies";
import { useRouter } from "next/router";
import { MovieData } from "@/utils/type";

// export const getStaticProps = async (context: GetServerSidePropsContext) => {
//     const q = context.query.q;

//     const movies = await fetchAllMovie(q as string);

//     return {
//         props: {
//             movies,
//         },
//     };
// };

export default function Page() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchAllMovie(q as string);
        setMovies(data);
    };

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);

    return (
        <div className={style.container}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
