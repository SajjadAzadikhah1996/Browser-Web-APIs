import Link from "next/link";

export default function Home() {
    return (
        <main className = "w-full h-screen flex justify-center items-center">
            <h1 className = "text-2xl">Home Page</h1>
            <Link href = "/fallback" prefetch = {true}/>
        </main>
    );
}
