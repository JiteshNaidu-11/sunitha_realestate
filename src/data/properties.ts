import { properties } from "./mockData";
import type { Property } from "./types";

function normalizePropertyTitle(title: string): string {
  return title.toLowerCase().replace(/\s+/g, " ").trim();
}

export function dedupePropertiesByTitle(list: Property[]): Property[] {
  const seen = new Set<string>();
  const unique: Property[] = [];

  for (const property of list) {
    const normalizedTitle = normalizePropertyTitle(property.title || "");
    if (!normalizedTitle || seen.has(normalizedTitle)) continue;
    seen.add(normalizedTitle);
    unique.push(property);
  }

  return unique;
}

export const uniqueProperties = dedupePropertiesByTitle(properties);
