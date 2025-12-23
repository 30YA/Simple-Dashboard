import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/useApi";
import { useAuthStore } from "../store/auth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { mutate: login, isPending } = useLoginMutation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    login(values, {
      onSuccess: (res) => {
        setAuth(res.token, {
          first_name: "test",
          last_name: "test2",
          username: "test.test",
          avatar: "",
        });
        navigate("/dashboard", { replace: true });
      },
      onError: (e) => {
        setServerError(e.message);
      },
    });
  }

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
      <div className="p-8 w-full max-w-md bg-white rounded-lg border shadow-xl border-slate-200 shadow-slate-100">
        <div className="flex justify-center pb-6 w-full h-[112px] items-center">
          <img alt="logo" src="/ariana-logo.svg" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>
          <p className="text-sm text-slate-500">
            Enter your username and password to login to your account.
          </p>
        </div>

        {serverError ? (
          <div className="px-4 py-3 mt-4 text-sm font-semibold text-red-700 bg-red-50 rounded-xl border border-red-200">
            {serverError}
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="username"
            label="Username"
            autoComplete="username"
            placeholder="Please enter your username"
            error={errors.username?.message}
            {...register("username", { required: "Username is required" })}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Please enter your password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />

          <Button type="submit" className="mt-2 w-full" isLoading={isPending}>
            {isPending ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <Link
            className="font-semibold text-slate-900 underline-offset-2 hover:underline"
            to="/register"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
