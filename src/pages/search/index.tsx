import { ReactNode } from "react";
import SearchAbleLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchAllMovie } from "@/lib/fetch-movies";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const q = context.query.q;

    const movies = await fetchAllMovie(q as string);

    return {
        props: {
            movies,
        },
    };
};

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(movies);

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
