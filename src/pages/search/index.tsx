import { useRouter } from "next/router";

export default function Search() {
    const router = useRouter();

    const { q } = router.query;

    console.log(router);
    return (
        <div>
            <h2>검색결과 : {q}</h2>
        </div>
    );
}
