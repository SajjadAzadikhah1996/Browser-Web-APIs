'use client';
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className = "w-full h-screen flex justify-center items-center">
            <div className = "text-center">
                <span className = "text-2xl">You are currently offline</span><br/>
                <span>Please check your connection and try again</span><br/><br/>
                <button className = "px-6 py-2 bg-black text-white" onClick = {() => router.refresh()}>
                    Reconnect
                </button>
            </div>
        </div>
    );

}