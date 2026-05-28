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
    <main className="min-h-screen p-6 sm:p-10 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-300 mb-8 inline-block hover:text-blue-200 transition-colors">← Back to Portfolio</Link>

        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight text-white">{blog.title}</h1>
        <div className="text-sm sm:text-base text-white/70 mb-8 font-medium">{blog.category}</div>

        {blog.externalUrl && (
          <a
            href={blog.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-2xl px-5 py-3 glass text-sm sm:text-base text-white/85 hover:text-white transition-colors mb-10 font-medium"
          >
            Read Original Post ↗
          </a>
        )}

        <article className="blog-content">
          {blog.fullContent.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </div>
    </main>
  );
}
