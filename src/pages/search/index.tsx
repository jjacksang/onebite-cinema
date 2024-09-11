import { useRouter } from "next/router";
import { ReactNode } from "react";
import SearchAbleLayout from "@/components/searchable-layout";

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

Search.getLayout = (page: ReactNode) => {
    return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
