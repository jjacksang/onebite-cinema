import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchMovieItem from "@/lib/fetch-Movie-item";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

export default function Page({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(movie);
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
    );
}
