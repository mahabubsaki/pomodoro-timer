
import Timer from "@/components/others/Timer";


export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined; }; }) {
  return (
    <div className="">

      <Timer searchParams={searchParams} />
    </div>
  );
}
