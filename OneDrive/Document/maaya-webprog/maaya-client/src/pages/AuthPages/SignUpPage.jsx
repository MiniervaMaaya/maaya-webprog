import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const initialForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "female",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await createUser(form);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Sign up failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your Smiley Haven account"
      description="Join the community and keep your favorite positivity articles, wellness notes, and daily inspiration in one friendly place."
      image="/wellness.jpg"
      imageAlt="Wellness materials on a calm table"
      footerText="Already have an account?"
      footerAction="Sign In"
      footerTo="/signin"
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            First name
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="Minierva"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Last name
            <input
              type="text"
              value={form.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="Maaya"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
              required
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Age
            <input
              type="number"
              value={form.age}
              onChange={(event) => updateField("age", event.target.value)}
              placeholder="20"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Contact number
            <input
              type="text"
              value={form.contactNumber}
              onChange={(event) => updateField("contactNumber", event.target.value)}
              placeholder="09171234567"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
              required
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-zinc-800">
          Email address
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            required
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Username
            <input
              type="text"
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              placeholder="miniervamaaya"
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Role
            <select
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
              className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-zinc-800">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            placeholder="Create a password"
            className="h-12 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-zinc-800">
          Address
          <textarea
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            placeholder="Sampaloc, Manila"
            className="min-h-24 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
            required
          />
        </label>

        <Button type="submit" variant="primary" className="h-12 w-full">
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
