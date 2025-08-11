'use client';

import { useState, useEffect } from "react";

type Post = {
    id: number;
    title: string;
    body: string;
}

export default function PostsPage() {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=2")
            const data = await res.json();
            setPosts(data)

        }
        fetchPosts();
    }, [])


    return (
        <div className="bg-gray-100 min-h-screen">
            <h1
                className="text-3xl font-bold mb-6 text-center">
                Últimos Posts
            </h1>
            {posts.map((post)=>(
                <div key={post.id} className="bg-violet-100 p-4 m-4 rounded shadow">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600">{post.body}</p>
                </div>
            ))}

        </div>
    )
}