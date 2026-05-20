import React, { useEffect, useRef, useState } from "react";
import Logo from "./components/Logo";
import { asset } from "./utils/asset";
import {
  navLinks,
  roles,
  announcements,
  education,
  experience,
  projects,
  blogs,
  instagramProfileUrl,
  instagramPosts,
} from "./data/content";

export default function App() {
  const [open, setOpen] = useState(false);
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    const container = galleryRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction * Math.round(container.clientWidth * 0.9),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
    } else if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src={asset("/background.mp4")}
      />

      <div className="fixed inset-0 bg-black/20 z-[1]" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5 z-[1]" />

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 sm:pt-6 px-4 gap-2">
          <div className="glass rounded-full w-11 h-11 flex items-center justify-center">
            <Logo />
          </div>

          <div className="glass rounded-2xl px-5 sm:px-8 py-3 flex items-center gap-4 sm:gap-8 overflow-x-auto">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[14px] sm:text-[16px] whitespace-nowrap text-white/80 hover:text-white font-semibold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <section className="min-h-screen flex items-end px-6 sm:px-12 md:px-20 lg:px-28 pb-20">
          <div className="max-w-xl">
            <h1 className="text-[3rem] sm:text-[4.8rem] md:text-[5.8rem] leading-[0.9] font-semibold tracking-tight mb-6">
              Sanket
              <br />
              Agalave
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {roles.map((role) => (
                <div key={role} className="glass rounded-full px-3 py-1 text-[11px] sm:text-[12px] text-white/75">
                  {role}
                </div>
              ))}
            </div>

            <h2 className="text-[1.2rem] sm:text-[1.5rem] font-medium leading-[1.3] mb-5">Engineering That Solves Problems</h2>

            <p className="text-[14px] leading-relaxed text-white/60 max-w-md mb-8">
              Exploring manufacturing systems, operational intelligence, supply chains, and digital transformation through research, engineering, and strategic thinking.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <a href="#projects" className="glass rounded-full px-5 py-3 text-[13px] hover:bg-white/10 transition-all duration-300">View Projects ↗</a>
              <a href="#blogs" className="glass rounded-full px-5 py-3 text-[13px] hover:bg-white/10 transition-all duration-300">Read Blogs ↗</a>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">About</span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10 items-center">
              <div className="glass rounded-3xl overflow-hidden">
                <img src={asset("/profile.jpeg")} alt="Sanket" className="w-full h-[500px] object-cover" />
              </div>

              <div>
                <h2 className="text-[2rem] sm:text-[2.8rem] leading-[1.05] font-semibold mb-8">Engineering systems with a focus on operational resilience, reliability, and intelligent decision-making.</h2>

                <p className="text-white/65 leading-relaxed mb-6">I am currently pursuing a Master’s in Strategic Management in Logistics in Berlin while working across engineering and operational systems.</p>

                <p className="text-white/45 leading-relaxed mb-10">My interests lie in manufacturing systems, safety engineering, process optimization, and resilient supply chains.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Manufacturing Systems", "Safety & Reliability Engineering", "Supply Chain Strategy", "Digital Transformation"].map((item) => (
                    <div key={item} className="glass rounded-2xl p-5">
                      <div className="text-white/90 font-medium">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="announcements" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Announcements</span>

            <div className="mt-10 space-y-4">
              {announcements.map((item) => (
                <div key={item} className="glass rounded-2xl px-6 py-5 text-white/75">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Education</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {education.map((e) => (
                <div key={e.degree} className="glass rounded-3xl p-8">
                  <div className="flex items-start justify-between mb-10">
                    <img src={e.logo} alt={e.school} className="w-16 h-16 object-contain" />
                    <div className="text-[12px] text-white/55">{e.date}</div>
                  </div>

                  <h3 className="text-[1.4rem] font-semibold mb-4">{e.degree}</h3>
                  <p className="text-white/70">{e.school}</p>
                  <p className="text-white/40 text-[13px] mt-2">{e.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Experience</span>

            <div className="mt-10 space-y-6">
              {experience.map((item) => (
                <div key={item.role} className="glass rounded-3xl p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div className="glass rounded-2xl w-16 h-16 flex items-center justify-center">
                        <img src={item.logo} alt={item.company} className="w-10 h-10 object-contain" />
                      </div>

                      <div>
                        <h3 className="text-[1.5rem] sm:text-[2rem] font-semibold mb-2">{item.role}</h3>
                        <p className="text-white/70">{item.company}</p>
                      </div>
                    </div>

                    <div className="text-white/45 text-[13px]">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blogs" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Blogs</span>

            <a
              href={blogs[0]?.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="block glass rounded-3xl p-10 mt-10 hover:bg-white/5 transition-colors"
            >
              <div className="text-[12px] text-blue-200 mb-5">Aerospace Reliability Systems</div>

              <h3 className="text-[2rem] sm:text-[2.8rem] leading-[1.05] font-semibold max-w-3xl mb-6">From Reactive to Predictive: <br /> Weibull-Based Aerospace Reliability Systems</h3>

              <p className="text-white/60 max-w-2xl leading-relaxed mb-8">Exploring predictive maintenance systems and Weibull-based reliability models in aerospace operations and lifecycle engineering.</p>

              <div className="inline-flex items-center rounded-2xl px-5 py-4 glass text-sm text-white/80 hover:text-white transition-colors">
                Open Full Blog ↗
              </div>
            </a>
          </div>
        </section>

        <section id="projects" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Projects</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {projects.map((item) => (
                <a
                  key={item.title}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-3xl p-10 transition-all duration-300 hover:bg-white/5 block"
                >
                  <div className="flex flex-col justify-between h-full min-h-[240px]">
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.2em] text-white/40 mb-6">Category</div>
                      <h3 className="text-[1.8rem] sm:text-[2rem] font-semibold leading-tight text-white">{item.title}</h3>
                      <p className="text-white/50 mt-5 leading-relaxed text-sm max-w-sm">{item.desc}</p>
                    </div>

                    <div className="pt-10 text-sm text-white/45">
                      {item.linkText}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="border-t border-white/5 bg-black/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-28">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.25em] text-blue-200 font-semibold">Gallery</span>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => scrollGallery(-1)}
                  aria-label="Previous gallery post"
                  className="glass rounded-full w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollGallery(1)}
                  aria-label="Next gallery post"
                  className="glass rounded-full w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  →
                </button>

                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 hover:text-white underline underline-offset-4"
                >
                  Visit Instagram Profile ↗
                </a>
              </div>
            </div>

            <div
              ref={galleryRef}
              className="no-scrollbar mt-10 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            >
              {instagramPosts.map((post) => (
                <div
                  key={post.url}
                  className="glass rounded-3xl p-4 sm:p-6 overflow-hidden snap-start flex-none w-[320px] sm:w-[420px] lg:w-[460px]"
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{
                      background: "#fff",
                      border: 0,
                      borderRadius: "12px",
                      boxShadow: "none",
                      margin: 0,
                      minWidth: "320px",
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <a href={post.url} target="_blank" rel="noreferrer">
                      View this post on Instagram
                    </a>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer id="contact" className="max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-20 lg:px-28 pb-16 mt-24">
          <div className="glass rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="glass rounded-full w-11 h-11 flex items-center justify-center"><Logo /></div>
                  <span className="text-xl font-medium">Sanket Agalave</span>
                </div>

                <p className="text-sm leading-relaxed max-w-sm text-white/60">Engineering systems, exploring operational intelligence, and documenting ideas across manufacturing, logistics, and digital transformation.</p>

                <button onClick={() => setOpen(true)} className="glass rounded-full px-5 py-3 text-[13px] mt-8 hover:bg-white/10 transition-all duration-300">Subscribe for Updates</button>
              </div>

              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-white mb-4">Explore</h3>
                  <ul className="space-y-3 text-xs text-white/60">
                    <li><a href="#about">About</a></li>
                    <li><a href="#announcements">Announcements</a></li>
                    <li><a href="#blogs">Blogs</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-white mb-4">Work</h3>
                  <ul className="space-y-3 text-xs text-white/60">
                    <li><a href="#education">Education</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#projects">Supply Chain Management</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-white mb-4">Connect</h3>
                  <ul className="space-y-3 text-xs text-white/60">
                    <li><a href="mailto:yourmail@example.com">Email</a></li>
                    <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
                    <li><a href="https://github.com" target="_blank">GitHub</a></li>
                    <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Designed & Engineered by Sanket Agalave</p>

              <div className="flex items-center gap-5 text-xs text-white/50">
                <a href="https://linkedin.com" target="_blank">LinkedIn</a>
                <a href="https://github.com" target="_blank">GitHub</a>
                <a href="https://instagram.com" target="_blank">Instagram</a>
                <a href="mailto:yourmail@example.com">Email</a>
              </div>
            </div>
          </div>
        </footer>

        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md px-6">
            <div className="glass rounded-3xl w-full max-w-md p-8 relative">
              <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-white/50 hover:text-white">✕</button>

              <h3 className="text-2xl font-semibold mb-3">Subscribe</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-8">Get notified about new projects, articles, announcements, and updates.</p>

              <form className="space-y-4">
                <input type="text" required placeholder="First Name *" className="glass w-full rounded-2xl px-5 py-4 bg-transparent outline-none placeholder:text-white/30" />
                <input type="text" required placeholder="Last Name *" className="glass w-full rounded-2xl px-5 py-4 bg-transparent outline-none placeholder:text-white/30" />
                <input type="email" placeholder="Email Address (Optional)" className="glass w-full rounded-2xl px-5 py-4 bg-transparent outline-none placeholder:text-white/30" />
                <button type="submit" className="glass w-full rounded-2xl py-4 hover:bg-white/10 transition-all duration-300">Join the Journey</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
