// src/utils/sanitize.ts

import sanitizeHtml from "sanitize-html";

export const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  })
    .replace(/[^\w\s@.-]/g, "") // remove special chars
    .trim();
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized: Record<string, any> = {};

  for (const key in obj) {
    sanitized[key] =
      typeof obj[key] === "string"
        ? sanitizeInput(obj[key])
        : obj[key];
  }

  return sanitized as T;
};
