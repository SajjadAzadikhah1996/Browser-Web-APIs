'use client';
import {useState} from "react";

type UserType = {
    id: number
    name: string
};

export default function Home() {
    const [users, setUsers] = useState<UserType[]>([]);
    const fetchUsers = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
    };

    return (
        <main className = "w-full h-screen flex justify-center items-center">
            <div>
                <h1 className = "text-2xl">Home Page</h1>
                <button onClick = {fetchUsers} className = "px-4 py-1 bg-black text-white">fetch users</button>
                <ul>
                    {
                        users.map(user => (
                            <li key = {user.id}>
                                {user.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </main>
    );
}
