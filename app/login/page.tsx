"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "../../services/auth.service";


import Button from "../components/Button";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <form onSubmit={handleSubmit} style={{ width: 320 }}>
        <h1>Welcome to the Crowd Management System</h1>

        <label>
          Email / Login ID
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </label>

        <label>
          Password
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v: boolean) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {error && <ErrorMessage message={error} />}

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Login"}
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
