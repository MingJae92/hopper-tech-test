import { CallRecord, EnrichedCallRecord } from "../types/call-record.i";
import { lookupOperator } from "./operator-lookup";
import { isoToYYMMDD, calculateDuration } from "../utils/date-utils";

export async function enrichRecord(record: CallRecord): Promise<EnrichedCallRecord | null> {
  try {
    const callDate = isoToYYMMDD(record.callStartTime);
    const [fromInfo, toInfo] = await Promise.all([
      lookupOperator(record.fromNumber, callDate),
      lookupOperator(record.toNumber, callDate)
    ]);

    const duration = calculateDuration(record.callStartTime, record.callEndTime);
    const estimatedCost = ((fromInfo.estimatedCostPerMinute + toInfo.estimatedCostPerMinute) / 2) * (duration / 60);

    return {
      ...record,
      duration,
      fromOperator: fromInfo.operator,
      toOperator: toInfo.operator,
      fromCountry: fromInfo.country,
      toCountry: toInfo.country,
      estimatedCost: parseFloat(estimatedCost.toFixed(2))
    };
  } catch (err) {
    console.error(`[Enrichment] Failed for record ${record.id}: ${(err as Error).message}`);
    return null;
  }
}