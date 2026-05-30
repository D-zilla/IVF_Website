import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { label, hint, error, required, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "w-full rounded-lg border border-divider bg-white px-4 py-3 text-base text-ink placeholder:text-ink-subtle",
          "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});
