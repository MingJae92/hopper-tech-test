import { CallRecord } from "../types/call-record.i";

export function parseCsv(payload: string): CallRecord[] {
  if (!payload.trim()) return [];

  const [headerLine, ...rows] = payload.split("\n");
  const headers = headerLine.split(",");

  return rows.map(row => {
    const values = row.split(",");
    return headers.reduce((acc, header, i) => {
      acc[header.trim()] = values[i]?.trim();
      return acc;
    }, {} as any) as CallRecord;
  });
}