import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3">

        <div>
          <h2 className="text-xl font-bold text-white">Smiley Haven</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Spreading positivity and good vibes every day.
          </p>
        </div>

        
        <div>
          <h3 className="text-sm font-semibold uppercase mb-3 text-white">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/articles" className="hover:text-white">Articles</Link></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-sm font-semibold uppercase mb-3 text-white">Contact</h3>
          <p className="text-sm text-zinc-400">smileyhaven@email.com</p>
          <p className="text-sm text-zinc-400">+63 912 345 6789</p>
        </div>

      </div>

      <div className="text-center text-xs text-zinc-500 border-t border-zinc-800 py-4">
        © 2026 Smiley Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;