"use client";

import { FormEvent, useRef, useState } from "react";
import type { ConsultationFormContent, ConsultationFormField } from "@/lib/types";
import { SendIcon, ShieldCheckIcon, PhoneIcon } from "@/components/ui/icons";
import { Toast, type ToastVariant } from "@/components/ui/Toast";

export interface ConsultationFormProps {
  content: ConsultationFormContent;
  className?: string;
}

const DEFAULT_SUCCESS = "Thank you for reaching out — we'll contact you soon.";
const DEFAULT_ERROR =
  "Something went wrong sending your request. Please try again or call us directly.";
/** How long the button stays in its "sent" state before resetting. */
const SUCCESS_RESET_MS = 4000;

function validateField(field: ConsultationFormField, value: string): boolean {
  const v = value.trim();
  if (!field.required && v === "") return true;
  if (field.required && v === "") return false;
  if (field.pattern) return new RegExp(`^(?:${field.pattern})$`).test(v);
  if (field.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return true;
}

export function ConsultationForm({ content, className }: ConsultationFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(content.fields.map((f) => [f.name, ""])),
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const successMessage = content.successMessage ?? DEFAULT_SUCCESS;
  const errorMessage = content.errorMessage ?? DEFAULT_ERROR;

  function handleSuccess() {
    setSent(true);
    setValues(Object.fromEntries(content.fields.map((f) => [f.name, ""])));
    setToast({ message: successMessage, variant: "success" });
    // Return the button to its original state after a short pause.
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setSent(false), SUCCESS_RESET_MS);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const next: Record<string, boolean> = {};
    content.fields.forEach((f) => {
      if (!validateField(f, values[f.name])) next[f.name] = true;
    });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No action configured — fall back to local success (e.g. previews).
    if (!content.action) {
      handleSuccess();
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      content.fields.forEach((f) => {
        if (f.entryId) body.append(f.entryId, values[f.name].trim());
      });
      // Google Forms blocks CORS reads; no-cors fires the request and we
      // treat completion as success (response is opaque by design).
      await fetch(content.action, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      handleSuccess();
    } catch {
      setToast({ message: errorMessage, variant: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`rounded-panel border border-[#eee] bg-white p-8 shadow-panel ${className ?? ""}`}
    >
      <div className="mb-6 flex items-center gap-3.5">
        <div className="h-[34px] w-[5px] rounded-[3px] bg-brand-orange" />
        <h2 className="text-[26px] font-bold">{content.title}</h2>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {content.fields.map((f) => (
          <div key={f.name} className="mb-[18px]">
            <label htmlFor={`field-${f.name}`} className="mb-2.5 block text-base font-bold">
              {f.label}
              {f.required && <span className="text-brand-orange">*</span>}
            </label>
            <input
              id={`field-${f.name}`}
              type={f.type}
              inputMode={f.inputMode}
              maxLength={f.maxLength}
              value={values[f.name]}
              placeholder={f.placeholder}
              aria-invalid={errors[f.name] || undefined}
              aria-describedby={errors[f.name] ? `error-${f.name}` : undefined}
              onChange={(e) => {
                setValues({ ...values, [f.name]: e.target.value });
                if (errors[f.name]) setErrors({ ...errors, [f.name]: false });
              }}
              className={`w-full rounded-[9px] border px-4 py-3.5 text-[15px] outline-none transition focus:border-brand-orange focus:ring-[3px] focus:ring-brand-orange/10 ${
                errors[f.name] ? "border-[#e23b3b]" : "border-[#d6d6d6]"
              }`}
            />
            {errors[f.name] && (
              <span id={`error-${f.name}`} className="mt-1.5 block text-[13px] text-[#e23b3b]">
                Please enter a valid {f.label.toLowerCase()}.
              </span>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={`flex w-full items-center justify-center gap-2.5 rounded-card px-4 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${
            sent ? "bg-brand-green" : "bg-brand-orange hover:bg-brand-orangeDark"
          }`}
        >
          {sent ? (
            `✓ ${successMessage}`
          ) : submitting ? (
            content.sendingLabel ?? "Sending…"
          ) : (
            <>
              <SendIcon className="h-[18px] w-[18px] fill-white" aria-hidden="true" />
              {content.submitLabel}
            </>
          )}
        </button>

        <div className="my-4 flex items-center gap-2 text-sm leading-snug text-muted">
          <ShieldCheckIcon className="h-4 w-4 shrink-0 fill-brand-green" aria-hidden="true" />
          {content.reassurance}
        </div>

        <div className="flex gap-2.5 rounded-[10px] border-[1.5px] border-dashed border-[#cfcfcf] p-4 text-sm leading-snug text-muted">
          <PhoneIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 fill-ink" aria-hidden="true" />
          <span>{content.disclaimer}</span>
        </div>
      </form>

      <Toast
        message={toast?.message ?? null}
        variant={toast?.variant}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
