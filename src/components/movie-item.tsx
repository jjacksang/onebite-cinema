import type { MovieData } from "@/utils/type";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem(props: MovieData) {
    return (
        <Link href={`/movie/${props.id}`} className={style.container}>
            <img src={props.posterImgUrl} />
        </Link>
    );
}
