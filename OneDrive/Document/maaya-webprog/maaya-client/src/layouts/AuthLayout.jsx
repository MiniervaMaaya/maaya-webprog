import Button from '../components/Button';

const AuthLayout = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  footerText,
  footerAction,
  footerTo,
}) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              {eyebrow}
            </p>
          )}

          <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-600 sm:text-base">
            {description}
          </p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-6">
            <p className="text-sm text-zinc-600">{footerText}</p>
            <Button to={footerTo} variant="secondary">
              {footerAction}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[280px] bg-zinc-900">
          <img
            src={image}
            alt={imageAlt}
            className="h-full min-h-[280px] w-full object-cover opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 bg-zinc-950/70 p-6 text-zinc-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
              Smiley Haven
            </p>
            <p className="mt-2 max-w-sm text-lg font-semibold">
              A calmer way to begin, reflect, and build positive routines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
