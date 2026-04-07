import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "bg-zinc-900 text-zinc-50"
      : "border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-300 bg-white shadow-sm h-20 flex items-center">
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ✅ LOGO */}
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img
            src="/logo.png"
            alt="Smiley Haven Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold text-zinc-900">
            Smiley Haven
          </span>
        </NavLink>

        {/* ✅ NAV LINKS */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;