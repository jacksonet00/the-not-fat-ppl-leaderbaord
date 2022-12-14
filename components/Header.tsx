import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-center items-center flex-col pb-10">
            <div className="pb-2 pt-5">
                <Link href="/">
                    <h1 className="text-5xl">🍏</h1>
                </Link>
            </div>
            <div>
                <Link href="/">
                    <h1 className="text-4xl font-bold">the not fat ppl</h1>
                </Link>
            </div>
        </div>
    );
}