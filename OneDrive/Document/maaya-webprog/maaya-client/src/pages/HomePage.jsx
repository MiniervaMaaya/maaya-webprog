import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* ✅ HERO SECTION */}
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          
          {/* TEXT */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Homepage Hero Section
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-zinc-900">
              Welcome to Smiley Haven
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-zinc-600">
              Smiley Haven is a digital platform dedicated to fostering positivity 
              and well-being. Discover inspiring content, meaningful connections, 
              and a brighter outlook every day.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          {/* ✅ HERO IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/people.jpg"
              alt="Happy people smiling"
              className="w-full h-[320px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* ✅ KPI SECTION */}
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "12", label: "Projects" },
            { value: "08", label: "Sections" },
            { value: "24", label: "Screens" },
            { value: "04", label: "Layouts" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
              <p className="text-2xl font-bold text-zinc-900">{item.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FEATURE CARDS */}
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Features
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What Smiley Haven Offers
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* CARD 1 */}
          <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            <img
              src="/boy.jpg"
              alt="Positive content"
              className="rounded-xl w-full h-[180px] object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Daily Positivity
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Get daily inspiration and uplifting content to brighten your day.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          {/* CARD 2 */}
          <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            <img
              src="/community.jpg"
              alt="Community"
              className="rounded-xl w-full h-[180px] object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Community Support
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Connect with like-minded people and share positive experiences.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          {/* CARD 3 */}
          <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            <img
              src="/wellness.jpg"
              alt="Well-being"
              className="rounded-xl w-full h-[180px] object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Wellness Resources
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Explore tools and guides to improve mental and emotional well-being.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;