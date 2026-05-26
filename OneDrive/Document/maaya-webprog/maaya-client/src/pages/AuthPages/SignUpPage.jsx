import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';

const SignUpPage = () => {
  return (
    <AuthLayout
      eyebrow="Lab Activity 4"
      title="Create your Smiley Haven account"
      description="Join the community and keep your favorite positivity articles, wellness notes, and daily inspiration in one friendly place."
      image="/wellness.jpg"
      imageAlt="Wellness materials on a calm table"
      footerText="Already have an account?"
      footerAction="Sign In"
      footerTo="/signin"
    >
      <form className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            First name
            <input
              type="text"
              placeholder="Minierva"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Last name
            <input
              type="text"
              placeholder="Maaya"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-zinc-800">
          Email address
          <input
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-zinc-800">
          Password
          <input
            type="password"
            placeholder="Create a password"
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
          />
        </label>

        <label className="flex items-start gap-3 text-sm leading-6 text-zinc-600">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900"
          />
          I agree to receive positive updates and wellness reminders from Smiley
          Haven.
        </label>

        <Button type="submit" variant="primary" className="h-12 w-full">
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
