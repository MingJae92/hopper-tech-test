import { CallRecord } from "../types/call-record.i";

export function parseCsv(csv: string): CallRecord[] {
  const lines = csv
    .trim()
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0); // skip empty lines

  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const record: any = {};

    headers.forEach((h, i) => {
      record[h] = values[i] ?? "";
    });

    // Optional: basic validation
    if (!record.id || !record.fromNumber || !record.toNumber) {
      console.warn(`[CSV] Invalid row skipped: ${line}`);
      return null;
    }

    return record as CallRecord;
  }).filter((r): r is CallRecord => r !== null); // remove nulls
}