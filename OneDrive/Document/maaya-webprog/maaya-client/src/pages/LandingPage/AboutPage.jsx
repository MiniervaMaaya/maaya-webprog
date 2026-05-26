import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">


      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/about.jpg"
              alt="About Smiley Haven"
              className="w-full h-[320px] object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>

            <h1 className="max-w-xl text-4xl font-bold text-zinc-900">
              Building a space for positivity and connection
            </h1>

            <p className="mt-4 max-w-lg text-base text-zinc-600">
              Smiley Haven is designed to inspire individuals through uplifting
              content, meaningful connections, and a supportive environment.
              Our mission is to create a digital space where people can grow,
              reflect, and stay positive every day.
            </p>

            <div className="mt-6 flex gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>

        </div>
      </section>

      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Our Impact
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "16", label: "Projects" },
            { value: "9", label: "Clients" },
            { value: "3", label: "Focus Areas" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs uppercase text-zinc-500 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

   
      <section className="border-y border-zinc-300 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* TEXT BLOCKS */}
          <div className="space-y-5">
            <div className="p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-semibold">Our Mission</h3>
              <p className="text-sm text-zinc-600 mt-2">
                To spread positivity and create meaningful digital experiences.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-semibold">Our Vision</h3>
              <p className="text-sm text-zinc-600 mt-2">
                A world where everyone has access to encouragement and growth.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-semibold">Our Values</h3>
              <p className="text-sm text-zinc-600 mt-2">
                Positivity, community, and continuous improvement.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img src="/about1.jpg" className="rounded-xl object-cover h-40 w-full" />
            <img src="/about2.jpg" className="rounded-xl object-cover h-40 w-full" />
            <img src="/about3.jpg" className="rounded-xl object-cover h-40 w-full" />
            <img src="/about4.jpg" className="rounded-xl object-cover h-40 w-full" />
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
