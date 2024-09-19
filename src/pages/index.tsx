import SearchAbleLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import { InferGetStaticPropsType } from "next";
import { fetchAllMovie } from "@/lib/fetch-movies";
import fetchRandomMovie from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
    const [allMovies, recoMovies] = await Promise.all([fetchAllMovie(), fetchRandomMovie()]);
    return {
        props: {
            allMovies,
            recoMovies,
        },
    };
};

export default function Home({
    allMovies,
    recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 가장 추천하는 영화</h3>
                <div className={style.reco_container}>
                    {recoMovies.slice(0, 3).map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            </section>
            <section>
                <h3>등록된 모든 영화</h3>
                <div className={style.all_container}>
                    {allMovies.map((movie) => (
                        <MovieItem key={movie.id} {...movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
