import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';

const SignInPage = () => {
  return (
    <AuthLayout
      eyebrow="Lab Activity 4"
      title="Welcome back to your positive space"
      description="Sign in to continue exploring encouragement, wellness stories, and practical reminders made for better daily habits."
      image="/signin-community.jpg"
      imageAlt="Diverse neighbors smiling and helping each other"
      footerText="New to Smiley Haven?"
      footerAction="Create Account"
      footerTo="/signup"
    >
      <form className="grid gap-5">
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
            placeholder="Enter your password"
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
            />
            Remember me
          </label>
          <a href="#" className="font-semibold text-zinc-900 hover:text-zinc-600">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" className="h-12 w-full">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
