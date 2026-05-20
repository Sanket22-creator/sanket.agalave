import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/content";

export default function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <main className="min-h-screen p-10 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Blog not found</h1>
          <Link to="/" className="text-blue-300">Go back</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-300 mb-6 inline-block">← Back</Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="text-sm text-white/60 mb-8">{blog.category}</div>

        <article className="prose prose-invert max-w-none text-white/90">
          {blog.fullContent.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
