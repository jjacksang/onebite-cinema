import SearchAbleLayout from "@/components/searchable-layout";
import { ReactNode } from "react";

export default function Home() {
    return <div></div>;
}

Home.getLayout = (page: ReactNode) => {
    return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
