import { type ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-800" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
              : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm font-semibold text-rose-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
