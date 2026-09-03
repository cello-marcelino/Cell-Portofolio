export const personalInfo = {
  name: "Christian Marcelino",
  shortName: "Marcel",
  title: "Informatics Engineering Student & Junior Developer",
  statusBadge: "Open to Internships & Junior Roles",
  location: "Batam, Indonesia",
  email: "marcelinocello027@gmail.com",
  githubUrl: "https://github.com/cello-marcelino",
  instagramUrl: "https://instagram.com/chrstn_mrclno",
  instagramHandle: "chrstn_mrclno",
  cvDownloadUrl: "/CV_ChristianMarcelino.pdf",
  bio: "I am an Informatics Engineering student at Politeknik Negeri Batam and an aspiring software developer. I enjoy understanding how applications work, building web interfaces and backend services, and exploring practical applied AI through hands-on projects.",
  corePhilosophy: "I focus on writing clean, readable code and understanding fundamentals. Rather than chasing unnecessary complexity, I prefer simple structures where each component has a clear responsibility.",
  brandLogo: "/brand/cell-logo-square.png",
};

export const techPillars = [
  {
    id: "frontend",
    title: "Frontend Development",
    roleDescription: "Building responsive web interfaces with component frameworks and native web standards.",
    skills: [
      { name: "Vue 3 (Composition API, Pinia)", level: "SPA Framework", note: "Built reactive client applications with structured stores and API integration." },
      { name: "Next.js & React (App Router)", level: "Web Framework", note: "Built web interfaces with Next.js and React, including server-rendered and static pages." },
      { name: "Tailwind CSS", level: "Styling", note: "Used utility-first CSS to create clean, consistent, and responsive user interfaces." },
      { name: "Chart.js", level: "Data Views", note: "Implemented interactive charts for monthly payment analytics and data summaries." },
      { name: "JavaScript & DOM APIs", level: "Fundamentals", note: "Used native JavaScript and DOM APIs to build lightweight interactive features." },
    ],
    accent: "teal",
  },
  {
    id: "backend",
    title: "Backend Development",
    roleDescription: "Building modular REST APIs, structuring controllers, and organizing application logic.",
    skills: [
      { name: "Python / Flask", level: "API Service", note: "Structured modular REST endpoints using blueprints, services, and repository layers." },
      { name: "Native Node.js (HTTP & FS)", level: "Fundamentals", note: "Built routing and request handling using Node.js without Express to understand HTTP fundamentals." },
      { name: "PHP / Laravel 13 & Livewire 4", level: "Full-Stack MVC", note: "Implemented full-stack web features, reactive carts, and relational database models." },
      { name: "Layered Structure (Controller-Service-Repo)", level: "Pattern", note: "Separated route handlers, business rules, and database queries for clarity." },
      { name: "Auth & Security Basics (Bcrypt)", level: "Security", note: "Used parameterized queries to reduce SQL injection risk and hashed passwords with Bcrypt." },
    ],
    accent: "purple",
  },
  {
    id: "ai",
    title: "Applied AI & Data Science",
    roleDescription: "Exploring practical text matching, machine learning models, and local LLM prototypes.",
    skills: [
      { name: "Hybrid Text Matching (BM25 + Sentence-BERT)", level: "Text Matching", note: "Combined keyword matching and dense embeddings for semantic search experimentation." },
      { name: "KeyBERT (Keyword Extraction)", level: "NLP Analysis", note: "Extracted overlapping topic keywords to explain recommendation outputs clearly." },
      { name: "Scikit-learn, XGBoost, CatBoost", level: "Machine Learning", note: "Trained tabular classifiers and evaluated accuracy, precision, recall, and F1 scores." },
      { name: "TensorFlow (LSTM Networks)", level: "Deep Learning", note: "Experimented with sequential recurrent neural networks on pattern data." },
      { name: "Streamlit", level: "Tooling", note: "Built interactive dashboards for model diagnostics and parameter testing." },
    ],
    accent: "teal",
  },
  {
    id: "database",
    title: "Database & Development Tools",
    roleDescription: "Designing relational database schemas, writing safe queries, and version control.",
    skills: [
      { name: "MySQL & SQLite3", level: "Relational DB", note: "Designed relational tables with foreign keys and cascade rules for data consistency." },
      { name: "Parameterized SQL Queries", level: "Query Safety", note: "Used parameterized queries in application code to prevent SQL injection." },
      { name: "Schema Migrations & Seeders", level: "Data Management", note: "Used migrations for database schema changes and seeders for test data." },
      { name: "Git & GitHub", level: "Version Control", note: "Used branches, descriptive commit messages, and repository workflows." },
      { name: "Testing Basics (Pytest)", level: "Testing", note: "Wrote unit tests for core scoring functions and utility helpers." },
    ],
    accent: "purple",
  },
];

export const featuredProjects = [
  {
    id: "siredo-v3",
    title: "SiReDo v3 — Lecturer Recommendation System",
    tagline: "Thesis supervisor and examiner recommendation prototype using lexical and semantic text matching.",
    category: "Applied NLP Project",
    filterCategory: "ai",
    year: "Semester 4 Project",
    architecture: "Decoupled Setup (Flask REST API + Vue 3 SPA + Tailwind CSS)",
    repoUrl: "https://github.com/cello-marcelino/Sistem-Rekomendasi-Dosen",
    overview:
      "SiReDo is a university prototype built during Semester 4 to explore how lexical and semantic text matching can help match students with thesis supervisors and examiners. It compares submitted thesis proposals with lecturer academic profiles and provides keyword explanations for each recommendation.",
    caseStudy: {
      whatIBuilt:
        "Built a decoupled web application with a Python Flask REST API backend and a Vue 3 single-page application frontend. The system accepts thesis titles and abstracts, scores lecturer relevance, and presents ranked recommendations alongside explanatory keywords.",
      howItWorks:
        "Uses BM25Okapi to match specific domain terminology and Sentence-BERT to evaluate semantic similarity beyond exact keywords. Employs KeyBERT to identify shared keywords between the proposal and lecturer profiles as recommendation explanations. Inverted index vectors are cached to disk to improve response times.",
      whatILearned:
        "Learned how to cleanly separate API endpoints from text matching services, manage embedding vectors and local disk caching, structure Vue 3 components with Pinia, and present algorithmic outputs in an accessible way.",
    },
    highlights: [
      "Lexical & Semantic Matching: Combines BM25 keyword matching with Sentence-BERT semantic similarity.",
      "Recommendation Explanations: Uses KeyBERT to extract shared keywords that explain why a lecturer was recommended.",
      "Decoupled Structure: Organizes API routes, matching logic, and database operations into clear layers.",
      "Local CLI Helper: Created a small command-line script to assist with local server startup and mock data seeding.",
    ],
    techStack: ["Python", "Flask", "Sentence-BERT", "KeyBERT", "BM25Okapi", "Vue 3", "Tailwind CSS", "Pinia", "SQLite / MySQL"],
    screenshots: [
      {
        title: "Search & Topic Input",
        src: "/projects/siredo-api-landing-page.png",
        caption: "Input form to submit thesis title, abstract, and research criteria.",
      },
      {
        title: "Recommendation Results",
        src: "/projects/siredo-api-single-recommendation.png",
        caption: "Result view showing recommended lecturers with similarity scores and explanatory keyword tags.",
      },
      {
        title: "API Documentation",
        src: "/projects/siredo-api-dokumentasi.png",
        caption: "Documentation view illustrating the available API endpoints and request formats.",
      },
      {
        title: "Admin Dashboard",
        src: "/projects/siredo-admin-dashboard.png",
        caption: "Administrative console for managing lecturer datasets, quotas, and expertise areas.",
      },
      {
        title: "Staff Login",
        src: "/projects/siredo-admin-login.png",
        caption: "Login portal for administrative access.",
      },
    ],
  },
  {
    id: "manies-cakery",
    title: "Manies Cakery — Bakery Ordering Web Application",
    tagline: "Bakery web application featuring product catalog, reactive shopping cart, and order tracking.",
    category: "Web Application",
    filterCategory: "web",
    year: "Semester 2 Project",
    architecture: "Laravel 13 + Livewire 4 + MySQL + Tailwind CSS",
    repoUrl: "https://github.com/cello-marcelino/manies-cakery",
    overview:
      "A university semester project built with Laravel and Livewire for a local bakery business scenario. It features product browsing, shopping cart updates without full page reloads, an order placement flow, and a simple administrative dashboard for order tracking.",
    caseStudy: {
      whatIBuilt:
        "Developed a full-stack e-commerce web application with customer-facing catalog pages, an interactive cart, and an admin management interface for reviewing customer orders.",
      howItWorks:
        "Used Laravel Livewire 4 to handle dynamic cart state changes on the server side without writing custom client API endpoints. Designed relational database tables linking users, products, orders, and order items with foreign key constraints.",
      whatILearned:
        "Gained practical experience with relational schema design, database transactions for multi-item orders, server-driven reactive components in Livewire, and role-based route protection.",
    },
    highlights: [
      "Reactive Cart: Uses Livewire 4 for dynamic cart adjustments without writing boilerplate client-side fetch logic.",
      "Relational Integrity: Designed structured MySQL tables with foreign key constraints connecting orders and items.",
      "Role-Based Access: Separated customer storefront pages from staff order management views.",
      "Responsive Layout: Styled with Tailwind CSS for mobile and desktop screens.",
    ],
    techStack: ["PHP", "Laravel 13", "Livewire 4", "Tailwind CSS", "Flowbite", "MySQL", "Vite"],
    screenshots: [
      {
        title: "Storefront & Catalog",
        src: "/projects/manies-cakery-landing-page.png",
        caption: "Storefront page showcasing available bakery products and categories.",
      },
      {
        title: "Admin Order Dashboard",
        src: "/projects/manies-cakery-admin-dashboard.png",
        caption: "Dashboard view for reviewing incoming orders, order statuses, and sales summaries.",
      },
      {
        title: "User Authentication",
        src: "/projects/manies-cakery-login.png",
        caption: "Authentication page for customers and staff accounts.",
      },
    ],
  },
];

export const projectsAndExperiments = [
  {
    id: "mini-llm-local",
    title: "Mini LLM Local Service",
    badge: "Technical Experiment",
    category: "Local AI Experiment",
    filterCategory: "ai",
    repoUrl: "https://github.com/cello-marcelino/mini-llm-local",
    summary:
      "An experimental backend service exploring local language model execution using FastAPI. Built to understand model loading, prompt structuring, and API streaming without relying on external cloud APIs.",
    tech: ["Python", "FastAPI", "Local LLM", "Pydantic", "Uvicorn"],
    highlights: [
      "Implemented a singleton model manager to keep model weights loaded in memory.",
      "Built chat completion and prompt generation endpoints with structured request validation.",
      "Experimented with local inference on consumer hardware and measured latency trade-offs.",
    ],
    caseStudy: {
      whatIBuilt: "A local API server providing chat and completion endpoints powered by smaller local language models.",
      howItWorks: "FastAPI routes receive user prompts, pass them through a singleton model service, and return formatted responses.",
      whatILearned: "Learned about memory management with local weights, tokenization, and structuring API responses for model outputs.",
    },
    screenshots: [
      {
        title: "Landing & Overview",
        src: "/projects/mini-llm-landing-page.png",
        caption: "Web interface overview for testing local model endpoints.",
      },
      {
        title: "Interactive Chat Interface",
        src: "/projects/mini-llm-chat.png",
        caption: "Chat interaction view testing local model responses.",
      },
    ],
  },
  {
    id: "web-pembayaran-spp",
    title: "Web Pembayaran SPP (Refactored)",
    badge: "SMK Capstone (Refactored)",
    category: "Backend Fundamentals",
    filterCategory: "native",
    repoUrl: "https://github.com/cello-marcelino/web-spp-refactored",
    summary:
      "A student tuition payment web application where I refactored the backend using Node.js's built-in HTTP and filesystem modules without web frameworks like Express, to understand request lifecycles from scratch.",
    tech: ["Native Node.js", "SQLite3", "Bcrypt", "Chart.js", "HTML / CSS / JS"],
    highlights: [
      "Built using Node.js built-in HTTP and FS modules without Express.",
      "Structured application code into configuration, controller, service, and repository folders.",
      "Used parameterized SQL queries with SQLite3 to reduce SQL injection risk and Bcrypt for passwords.",
      "Displayed monthly payment status using interactive Chart.js charts.",
    ],
    caseStudy: {
      whatIBuilt: "Refactored tuition tracking application using native Node.js without third-party web frameworks.",
      howItWorks: "Implemented URL routing with regex, parsed incoming request body streams manually, and queried SQLite with parameterized statements.",
      whatILearned: "Understood HTTP headers, request-response streams, session cookies, and database parameterization at a foundational level.",
    },
    screenshots: [
      {
        title: "Admin Dashboard & Metrics",
        src: "/projects/web-spp-admin-dashboard.png",
        caption: "Overview of student payment records and monthly transaction summaries with Chart.js.",
      },
      {
        title: "Login Screen",
        src: "/projects/web-spp-login.png",
        caption: "Login gateway with session authentication for administrators and students.",
      },
    ],
  },
  {
    id: "ml-dashboard",
    title: "Machine Learning Diagnostic Platform",
    badge: "Semester 3 Project",
    category: "Machine Learning",
    filterCategory: "ai",
    summary:
      "A practical dashboard built with Streamlit for testing machine learning workflows, comparing algorithm performance, and visualizing evaluation metrics across multiple models.",
    tech: ["Python", "Streamlit", "Scikit-learn", "XGBoost", "CatBoost", "TensorFlow / LSTM", "Pandas"],
    highlights: [
      "Trained and compared standard models (Scikit-learn) and gradient boosting models (XGBoost, CatBoost).",
      "Experimented with LSTM sequential neural networks using TensorFlow.",
      "Visualized evaluation metrics (Accuracy, Precision, Recall, F1, RMSE) side by side.",
    ],
    caseStudy: {
      whatIBuilt: "An interactive Streamlit tool to upload datasets, run standard preprocessing, train models, and compare metrics.",
      howItWorks: "Applies automated scaling, splits data, executes model training, and plots comparative ROC curves and confusion matrices.",
      whatILearned: "Deepened practical understanding of feature preparation, train-test splitting, and interpreting evaluation metric trade-offs.",
    },
    screenshots: [
      {
        title: "Platform Overview",
        src: "/projects/ml-dashboard-overview.png",
        caption: "Data exploration and model configuration interface in Streamlit.",
      },
      {
        title: "Model Analysis",
        src: "/projects/ml-dashboard-model-analysis.png",
        caption: "Comparison view displaying metrics and charts across trained models.",
      },
    ],
  },
  {
    id: "miawoof-petshop",
    title: "MiaWoof Petshop CMS & Booking",
    badge: "Semester 1 Project",
    category: "Web Fundamentals",
    filterCategory: "native",
    repoUrl: "https://github.com/cello-marcelino/miawoof-petshop",
    summary:
      "A pet shop website prototype built in Semester 1 using native Node.js and SQLite to practice fundamental CRUD operations, form handling, and basic database storage.",
    tech: ["Native Node.js", "SQLite3", "Formidable", "Layered Code", "Vanilla JS"],
    highlights: [
      "Handled multipart form submissions and image uploads using Formidable.",
      "Designed basic SQLite tables for pet services, inventory items, and bookings.",
      "Practiced separating routing and database operations across separate files.",
    ],
    caseStudy: {
      whatIBuilt: "A simple pet shop booking and catalog web application developed during my first semester.",
      howItWorks: "Handles form submissions, uploads images to local storage, and performs CRUD queries against a local SQLite database.",
      whatILearned: "Provided initial hands-on practice with database relations, form validation, and asynchronous JavaScript.",
    },
    screenshots: [
      {
        title: "Storefront & Services",
        src: "/projects/miawoof-petshop-landing-page.png",
        caption: "Storefront interface showing pet grooming services and catalog items.",
      },
      {
        title: "Admin Management",
        src: "/projects/miawoof-petshop-admin-dashboard.png",
        caption: "Management view for reviewing appointments and product inventory.",
      },
      {
        title: "Staff Login",
        src: "/projects/miawoof-petshop-login.png",
        caption: "Staff login interface with basic session authentication.",
      },
    ],
  },
];

export const experienceTimeline = [
  {
    period: "2025 – Present",
    role: "Production Operator (EV Cable Assembly)",
    company: "PT Volex Indonesia",
    location: "Batam, Indonesia",
    type: "Work Experience",
    badgeColor: "teal",
    description:
      "Working in EV charging cable assembly while continuing my Informatics Engineering degree at Politeknik Negeri Batam. I operate computerized production systems, check part numbers, assemble cables according to standard procedures, and perform routine quality checks.",
    keyTakeaways: [
      "Operate computerized tracking systems for order numbers and assembly line verification.",
      "Follow standard operating procedures and quality checklists during assembly.",
      "Balance rotating factory shifts with university coursework and software project work.",
    ],
  },
  {
    period: "2024 – Present",
    role: "Diploma III (D3) in Informatics Engineering",
    company: "Politeknik Negeri Batam",
    location: "Batam, Indonesia",
    type: "Education",
    badgeColor: "purple",
    description:
      "Pursuing a degree in Informatics Engineering. Progression across semesters has built a structured foundation moving from programming fundamentals toward web development, databases, machine learning, and applied NLP.",
    keyTakeaways: [
      "Semester 4: Applied NLP and recommendation prototype (SiReDo v3).",
      "Semester 3: Machine learning evaluation and testing (ML Dashboard).",
      "Semester 2: Full-stack web application development with Laravel (Manies Cakery).",
      "Semester 1: Programming fundamentals and native Node.js development.",
    ],
  },
  {
    period: "June 2024 – November 2024",
    role: "Administrative Staff",
    company: "LPK Global Lentera Kasih",
    location: "Batam, Indonesia",
    type: "Work Experience",
    badgeColor: "teal",
    description:
      "Assisted with administrative operations, participant records, and digital archiving for vocational training programs.",
    keyTakeaways: [
      "Organized and indexed digital participant files and training documentation.",
      "Maintained structured digital archives to ensure rapid document retrieval.",
      "Assisted with day-to-day office coordination and computer equipment reliability.",
    ],
  },
  {
    period: "January 2024 – April 2024",
    role: "Archive Document Control Intern",
    company: "BP Batam (Badan Pengusahaan Batam)",
    location: "Batam, Indonesia",
    type: "Internship",
    badgeColor: "teal",
    description:
      "Internship focused on institutional land documentation archives. Assisted with classifying physical and digital records, and built a small database application prototype to help retrieve files.",
    keyTakeaways: [
      "Classified and cataloged land administration files to support systematic record retrieval.",
      "Developed a simple database application prototype to streamline document lookups.",
      "Learned institutional document workflows and archival standards.",
    ],
  },
  {
    period: "2021 – 2024",
    role: "Vocational High School (SMK) in Software Engineering",
    company: "SMK Permata Harapan 2",
    location: "Batam, Indonesia",
    type: "Education",
    badgeColor: "purple",
    description:
      "Built an early foundation in programming, databases, and web development through vocational software engineering coursework.",
    keyTakeaways: [
      "Learned algorithm fundamentals, basic OOP concepts, and SQL queries.",
      "Built a student tuition payment web application as a capstone project.",
      "Developed an early interest in software development and system design.",
    ],
  },
];

export const experienceHighlights = [
  {
    label: "Time Management",
    metric: "Shift & Study Balance",
    description: "Balancing rotating shifts in manufacturing with full-time university coursework and completing software projects.",
    accent: "purple",
  },
  {
    label: "Attention to Detail",
    metric: "Process Compliance",
    description: "Experience following standard operating procedures, verifying part numbers, and conducting checklist-based quality inspections.",
    accent: "teal",
  },
  {
    label: "Data Organization",
    metric: "Structured Documentation",
    description: "Hands-on practice indexing, classifying, and organizing digital and physical records during institutional internships.",
    accent: "purple",
  },
];
