"use client";

import { FormEvent, useState } from "react";
import type { ConsultationFormContent, ConsultationFormField } from "@/lib/types";
import { SendIcon, ShieldCheckIcon, PhoneIcon } from "@/components/ui/icons";

export interface ConsultationFormProps {
  content: ConsultationFormContent;
  className?: string;
}

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    content.fields.forEach((f) => {
      if (!validateField(f, values[f.name])) next[f.name] = true;
    });
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setValues(Object.fromEntries(content.fields.map((f) => [f.name, ""])));
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
          className={`flex w-full items-center justify-center gap-2.5 rounded-card px-4 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 ${
            sent ? "bg-brand-green" : "bg-brand-orange hover:bg-brand-orangeDark"
          }`}
        >
          {sent ? (
            "✓ Request Sent — We'll call you within 15 minutes"
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
    </div>
  );
}
