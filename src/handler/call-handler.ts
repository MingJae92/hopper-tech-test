import { CallRecord, EnrichedCallRecord } from "../types/call-record.i";
import { parseCsv } from "../utils/csv-parser";
import { enrichRecord } from "../services/call-enricher";
import { saveToDatabase } from "../repositories/database";
import { SearchIndex } from "../repositories/search-index";

type Response = { ok: boolean; error?: string };

export class CallHandler {
  private searchIndex = new SearchIndex();

  public async handleBatch(payload: string): Promise<Response> {
    let records: CallRecord[] = [];
    try {
      records = parseCsv(payload);
      if (!records.length) return { ok: false, error: 'Empty batch' };
    } catch {
      return { ok: false, error: 'Invalid CSV format' };
    }

    // Quick acknowledgment (<500ms)
    process.nextTick(() => this.processBatch(records));

    return { ok: true };
  }

  private async processBatch(records: CallRecord[]) {
    const enrichedRecords: EnrichedCallRecord[] = [];

    // Enrich all records in parallel
    await Promise.all(records.map(async r => {
      const enriched = await enrichRecord(r);
      if (enriched) enrichedRecords.push(enriched);
    }));

    // Save & index if any enriched records
    if (enrichedRecords.length > 0) {
      await saveToDatabase(enrichedRecords);
      await this.searchIndex.index(enrichedRecords);
    }
  }
}