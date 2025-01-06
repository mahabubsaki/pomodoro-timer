import Navbar from "@/components/others/Navbar";
import Timer from "@/components/others/Timer";


export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined; }; }) {
  return (
    <div className="dark">

      <Navbar />

      <Timer searchParams={searchParams} />
    </div>
  );
}
