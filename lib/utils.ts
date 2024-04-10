import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formToObject(formData: FormData) {
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const key of formData.keys()) {
    const value = formData.getAll(key);
    if (value.length === 1) {
      result[key] = value[0] instanceof File ? value : value[0];
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function parseForm<T>(formData: FormData, schema: z.ZodType<T>): T {
  const data = formToObject(formData);
  return schema.parse(data);
}
