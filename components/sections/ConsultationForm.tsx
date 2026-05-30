import type { ConsultationFormContent } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export interface ConsultationFormProps {
  content: ConsultationFormContent;
  className?: string;
}

export function ConsultationForm({ content, className }: ConsultationFormProps) {
  return (
    <Card tone="default" padding="lg" radius="2xl" className={className}>
      <h2 className="border-l-4 border-primary pl-3 text-xl font-bold text-secondary sm:text-2xl">
        {content.title}
      </h2>
      <form
        action={content.action}
        method="post"
        className="mt-5 flex flex-col gap-4"
      >
        {content.fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            inputMode={field.inputMode}
            pattern={field.pattern}
            maxLength={field.maxLength}
          />
        ))}
        <Button type="submit" size="lg" fullWidth iconLeft={<ClipboardIcon className="h-5 w-5" />}>
          {content.submitLabel}
        </Button>
        <p className="flex items-start gap-2 text-xs text-ink-muted">
          <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{content.reassurance}</span>
        </p>
        <p className="rounded-lg border border-dashed border-divider px-3 py-2 text-xs text-ink-muted">
          {content.disclaimer}
        </p>
      </form>
    </Card>
  );
}

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4h6v3H9z" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Zm-1 13L7 11l1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z" />
    </svg>
  );
}
