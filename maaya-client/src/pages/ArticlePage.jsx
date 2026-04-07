import Button from '../components/Button';

const articles = [
  {
    id: 1,
    title: "How to Stay Positive Everyday",
    desc: "Simple habits that can improve your mindset and daily happiness.",
    image: "/article1.jpg",
  },
  {
    id: 2,
    title: "Building Healthy Routines",
    desc: "Create routines that support your mental and emotional well-being.",
    image: "/article2.jpg",
  },
  {
    id: 3,
    title: "The Power of Smiling",
    desc: "Why a smile can change your mood and influence others.",
    image: "/article3.jpg",
  },
  {
    id: 4,
    title: "Mindfulness for Beginners",
    desc: "Start practicing mindfulness with simple daily techniques.",
    image: "/article4.jpg",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* ✅ HERO */}
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="text-4xl font-bold text-zinc-900">
          Discover inspiring stories & insights
        </h1>

        <p className="mt-4 max-w-xl text-zinc-600">
          Explore curated articles designed to uplift, inspire, and help you grow.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* ✅ ARTICLES GRID */}
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Featured Articles
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              
              {/* ✅ IMAGE */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[180px] object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-600">
                  {article.desc}
                </p>

                <Button className="mt-4" variant="primary">
                  Read More
                </Button>
              </div>
            </article>
          ))}

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;