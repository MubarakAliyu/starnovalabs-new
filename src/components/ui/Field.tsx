'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

type FieldKind = 'text' | 'email' | 'tel' | 'textarea' | 'select';

interface FieldProps {
  name: string;
  label: string;
  kind?: FieldKind;
  required?: boolean;
  autoComplete?: string;
  /** Options for kind="select". */
  options?: { value: string; label: string }[];
  error?: string;
  defaultValue?: string;
  className?: string;
}

/**
 * Form field with a floating label and a bottom rule that turns blue on focus.
 * Errors are linked with aria-describedby. Used by the contact form in Batch 2.
 */
export function Field({
  name,
  label,
  kind = 'text',
  required,
  autoComplete,
  options,
  error,
  defaultValue,
  className,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [filled, setFilled] = useState(Boolean(defaultValue));
  const [focused, setFocused] = useState(false);
  const raised = filled || focused || kind === 'select';

  const shared = {
    id,
    name,
    required,
    autoComplete,
    defaultValue,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errorId : undefined,
    onFocus: () => setFocused(true),
    onBlur: (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setFocused(false);
      setFilled(event.target.value.trim().length > 0);
    },
    className: cn(
      'peer w-full appearance-none rounded-none border-0 border-b bg-transparent pt-6 pb-2 outline-none',
      't-body max-w-none',
      error ? 'border-error' : 'border-line focus:border-blue',
      'focus:border-b-2',
    ),
  };

  return (
    <div className={cn('relative', className)}>
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-0 origin-left transition-all duration-200 ease-out',
          raised ? 't-label text-body top-0' : 'text-body top-6',
        )}
      >
        {label}
        {/* Spelled out, so the requirement is never carried by colour alone. */}
        {required ? <span className="text-body"> (required)</span> : null}
      </label>

      {kind === 'textarea' ? (
        <textarea rows={4} {...shared} />
      ) : kind === 'select' ? (
        <select {...shared}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={kind} {...shared} />
      )}

      {error ? (
        <p id={errorId} role="alert" className="t-small text-error mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}
