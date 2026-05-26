import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.id}
          className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-[180px] w-full object-cover"
          />

          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {article.desc}
            </p>

            <Button to="/articles" className="mt-4">
              Read More
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
