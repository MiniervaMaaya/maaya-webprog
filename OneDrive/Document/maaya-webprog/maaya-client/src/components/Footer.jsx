import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 bg-zinc-900 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold text-white">Smiley Haven</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Spreading positivity and good vibes every day.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-white">
            Pages
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/articles" className="hover:text-white">Articles</Link></li>
            <li><Link to="/signin" className="hover:text-white">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase text-white">
            Contact
          </h3>
          <p className="text-sm text-zinc-400">smileyhaven@email.com</p>
          <p className="text-sm text-zinc-400">+63 912 345 6789</p>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        &copy; 2026 Smiley Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
