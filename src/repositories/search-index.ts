import { EnrichedCallRecord } from "../types/call-record.i";

export class SearchIndex {
  // Accept an array of records
  async index(records: EnrichedCallRecord[]): Promise<void> {
    // Simulate async indexing
    await new Promise(resolve => setTimeout(resolve, 50));

    // Log each record
    records.forEach(r => console.log(`[Search] Indexed: ${r.id}`));
  }
}