import { asset } from "../utils/asset";

export const navLinks = [
  "About",
  "Announcements",
  "Education",
  "Experience",
  "Blogs",
  "Projects",
  "Gallery",
  "Contact",
];

export const roles = [
  "Masters Student",
  "Strategic Thinker",
  "Systems Engineer",
  "Researcher",
];

export const announcements = [
  "Working on portfolio V2 architecture",
  "Exploring Weibull-based aerospace reliability systems",
  "Building manufacturing systems case studies",
];

export const education = [
  {
    degree: "M.Sc Strategic Management in Logistics",
    school: "BBW University",
    date: "2024 – 2026",
    location: "Berlin, Germany",
    logo: asset("/bbw.svg"),
  },
  {
    degree: "Bachelor’s in Mechanical Engineering",
    school: "Savitribai Phule Pune University",
    date: "2018 – 2022",
    location: "Pune, India",
    logo: asset("/sppu.png"),
  },
];

export const experience = [
  {
    role: "Lifecycle Engineering Werkstudent",
    company: "Rolls-Royce Deutschland",
    date: "07/2025 – Present",
    logo: asset("/rollsroyce.svg"),
  },
  {
    role: "Overhaul Methods Engineer",
    company: "Infosys",
    date: "11/2022 – 10/2024",
    logo: asset("/infosys.svg"),
  },
  {
    role: "Supply Chain Intern",
    company: "Cummins Generator Technologies",
    date: "09/2021 – 10/2021",
    logo: asset("/cummins.svg"),
  },
];

export const projects = [
  {
    title: "Supply Chain Management",
    desc: "Sustainable supply chain systems, aerospace logistics, resilience frameworks, and operational strategy.",
    externalUrl: "https://chainofthought22.blogspot.com/2025/04/sustainable-supply-chain-management-in.html?m=1",
    linkText: "Open Project ↗",
  },
  {
    title: "Logistics & Analytics",
    desc: "Dashboards, operational intelligence, inventory systems, KPI tracking, and logistics optimization.",
    externalUrl: "https://chainofthought22.blogspot.com/2025/12/development-of-last-mile-delivery.html?m=1",
    linkText: "Open Project ↗",
  },
  {
    title: "Manufacturing Systems",
    desc: "Reliability engineering, lifecycle systems, manufacturing operations, and process optimization.",
    externalUrl: "https://chainofthought22.blogspot.com/2024/12/design-and-manufacturing-of.html?m=1",
    linkText: "Open Project ↗",
  },
  {
    title: "Digital Transformation",
    desc: "Automation systems, workflow optimization, digital operations, and intelligent transformation.",
    externalUrl: "https://chainofthought22.blogspot.com/2025/07/inventory-insights-data-driven.html?m=1",
    linkText: "Open Project ↗",
  },
];

export const instagramProfileUrl =
  "https://www.instagram.com/echoes_of_san?igsh=aWtneGN0cXBpd3Y2";

export const instagramPosts = [
  {
    title: "Latest Reel 1",
    url: "https://www.instagram.com/reel/DIZ8eSxtzqg/?igsh=eHVtMjR2OGxyYWV6",
  },
  {
    title: "Latest Reel 2",
    url: "https://www.instagram.com/reel/DIHWm7CtLa3/?igsh=MTkxanZya3UxeXFxcw==",
  },
  {
    title: "Latest Post 3",
    url: "https://www.instagram.com/p/DVRvkHZjfj1/?igsh=MWRpazducWx6bm85Nw==",
  },
  {
    title: "Latest Post 4",
    url: "https://www.instagram.com/p/DTjLhK8CB9t/?igsh=NnA0YTVmOTk1OHZt",
  },
];

export const blogs = [
  {
    id: "weibull-aerospace",
    title: "From Reactive to Predictive: Weibull-Based Aerospace Reliability Systems",
    category: "Aerospace Reliability Systems",
    externalUrl:
      "https://chainofthought22.blogspot.com/2026/05/from-reactive-to-predictive-weibull.html?m=1",
    excerpt:
      "Exploring predictive maintenance systems and Weibull-based reliability models in aerospace operations and lifecycle engineering.",
    fullContent:
      `Please paste the full blog content here.\n\nYou can include multiple paragraphs. This field will be rendered as the full blog when visiting /blog/weibull-aerospace`,
  },
];

export const formspreeEndpoint = "https://formspree.io/f/mgoqogrk"; // Formspree form ID provided by user
