import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">

      <h1 className="text-6xl font-bold text-zinc-900">404</h1>

      <p className="mt-4 text-lg text-zinc-600">
        Oops! Page not found.
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        The page you're looking for doesn’t exist or was moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition"
      >
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFoundPage;