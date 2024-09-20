import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchMovieItem from "@/pages/api/fetch-Movie-item";
import { useRouter } from "next/router";
import Head from "next/head";
import { fetchAllMovie } from "../api/fetch-movies";

export const getStaticPaths = async () => {
    const movies = await fetchAllMovie();
    return {
        paths: movies.map((movie) => {
            return {
                params: {
                    id: movie.id.toString,
                },
            };
        }),
        fallback: "blocking",
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const movie = await fetchMovieItem(Number(id));

    if (!movie) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            movie,
        },
    };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback)
        return (
            <>
                <Head>
                    <title>한 입 시네마</title>
                    <meta property="og:image" content="/thumbnail.png" />
                    <meta property="og:title" content="한 입 시네마" />
                    <meta
                        property="og:description"
                        content="한 입 시네마 영화관에 오신걸 환영합니다!"
                    />
                </Head>
                <div>로딩중입니다.</div>
            </>
        );

    if (!movie) return "문제가 발생하였습니다.";

    const {
        id,
        title,
        subTitle,
        releaseDate,
        company,
        genres,
        description,
        runtime,
        posterImgUrl,
    } = movie;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={posterImgUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Head>
            <div>
                <div
                    style={{ backgroundImage: `url('${posterImgUrl})` }}
                    className={style.cover_img_container}
                >
                    <img src={posterImgUrl} />
                </div>
                <div className={style.info_container}>
                    <div className={style.title}>{title}</div>
                    <div>
                        {releaseDate} / {genres.join(", ")} / {runtime} 분
                    </div>
                    <div>{company}</div>
                    <div className={style.subTitle}>{subTitle}</div>
                    <div className={style.description}>{description}</div>
                </div>
            </div>
        </>
    );
}
