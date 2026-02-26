import { EnrichedCallRecord } from "../types/call-record.i";

export default class CallRepository {
  async save(record: EnrichedCallRecord): Promise<void> {
    // Example real choice: PostgreSQL
    console.log("Saved to DB:", record.id);
  }
}