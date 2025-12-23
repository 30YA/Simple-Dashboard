import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/useApi";
import { useAuthStore } from "../store/auth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegisterMutation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const {
    register: formRegister,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);

    const formData = new FormData();
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("confirm_password", values.confirmPassword);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    register(formData, {
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
      <div className="p-8 w-full max-w-md bg-white rounded-2xl border shadow-xl border-slate-200/80 shadow-slate-100">
        <div className="flex justify-center pb-6 w-full h-[112px] items-center">
          <img alt="logo" src="/ariana-logo.svg" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">Sign Up</h1>
          <p className="text-sm text-slate-500">
            Enter your information to create an account.
          </p>
        </div>

        {serverError ? (
          <div className="px-4 py-3 mt-4 text-sm font-semibold text-red-700 bg-red-50 rounded-xl border border-red-200">
            {serverError}
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center px-4 py-3 rounded-xl border border-slate-200">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <div className="flex gap-3 items-center">
              <img
                alt="profile-icon"
                src={previewUrl || "/profile-icon.svg"}
                className={
                  previewUrl ? "object-cover w-10 h-10 rounded-full" : ""
                }
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">Upload</p>
                <p className="text-xs text-slate-500">Optional profile photo</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={handleUploadClick}
            >
              {selectedFile ? "Change" : "Upload +"}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="firstName"
              label="First name"
              placeholder="Please enter your first name"
              error={errors.firstName?.message}
              {...formRegister("firstName", {
                required: "First name is required",
              })}
            />

            <Input
              id="lastName"
              label="Last name"
              placeholder="Please enter your last name"
              error={errors.lastName?.message}
              {...formRegister("lastName", {
                required: "Last name is required",
              })}
            />
          </div>

          <Input
            id="username"
            label="Username"
            autoComplete="username"
            placeholder="Please enter username"
            error={errors.username?.message}
            {...formRegister("username", {
              required: "Username is required",
            })}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Please enter password"
            error={errors.password?.message}
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Must be at least 6 characters",
              },
            })}
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="Please re-enter your password"
            error={errors.confirmPassword?.message}
            {...formRegister("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match.",
            })}
          />

          <Button className="mt-2 w-full" type="submit" isLoading={isPending}>
            {isPending ? "Creating account..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link
            className="font-semibold text-slate-900 underline-offset-2 hover:underline"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
