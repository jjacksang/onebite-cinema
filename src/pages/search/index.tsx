import { ReactNode, useEffect, useState } from "react";
import SearchAbleLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { fetchAllMovie } from "@/pages/api/fetch-movies";
import { useRouter } from "next/router";
import { MovieData } from "@/utils/type";
import Head from "next/head";

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
            <Head>
                <title>한 입 시네마 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content={q as string} />
                <meta
                    property="og:description"
                    content="한 입 시네마 영화관에 오신걸 환영합니다!"
                />
            </Head>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
