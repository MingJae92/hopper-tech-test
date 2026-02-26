# Hopper Tech Test

## Getting Started

Please refer to [coding-exercise.md](./coding-exercise.md) for the full problem description and instructions.

## Submitting your solution

Create you solution in a fork of this repository. Once you're ready to submit, please add dmanning-resilient as a collaborate on your private repository and send us a message.

## Candidate Notes

<!-- 
  Please update this section with details about your solution, including:
  - How to install dependencies and run your code (if applicable)
  - Any assumptions or trade-offs you made
  - Anything else you'd like the reviewer to know
-->

# Call Record Processing System

## Overview

This project is a TypeScript-based call record processing system designed to:

1. Accept batches of call records in CSV format.
2. Parse and validate the CSV data.
3. Quickly acknowledge receipt (<500ms).
4. Enrich records with operator/country metadata and estimated costs.
5. Store enriched records in a database and index them for search.

> For the purposes of this exercise, **actual database and search engine integrations are not included** — instead, mock implementations are used to demonstrate the flow.

---

## Architecture

CSV Input
│
▼
CallHandler
│
▼
CSV Parser
│
▼
Enrichment Service
│
▼
+-----------------+ +------------------+
| Mock Database | | Mock Search Index |
| saveToDatabase() | | SearchIndex.index() |
+-----------------+ +------------------+


**Steps:**

1. **CSV Input**: Incoming batch of call records in CSV format.
2. **CallHandler**: Handles the batch, validates the CSV, and immediately acknowledges receipt.
3. **CSV Parser**: Converts CSV rows into `CallRecord` objects.
4. **Enrichment Service**: Looks up operators, countries, and calculates call duration and estimated cost.
5. **Storage & Search**:  
   - **Mock Database**: `saveToDatabase()` simulates persisting enriched records (e.g., PostgreSQL or MongoDB in a real system).  
   - **Mock Search Index**: `SearchIndex.index()` simulates indexing for search (e.g., Elasticsearch/OpenSearch).

---

## Mock Implementations

### Database

```ts
async function saveToDatabase(records: EnrichedCallRecord[]) {
  // In a real system, this would persist records to a relational DB (PostgreSQL) or NoSQL DB (MongoDB)
  console.log(`[DB] Saved ${records.length} records`);
}

```

### Search Index

```ts

export class SearchIndex {
  async index(records: EnrichedCallRecord[]) {
    // In a real system, this would index records for search in Elasticsearch or OpenSearch
    records.forEach(r => console.log(`[Search] Indexed: ${r.id}`));
  }
}

```

### Explanation:

.These mocks allow the pipeline to run end-to-end without external dependencies.

.The console output demonstrates data flow through the system.

## How to run

### Install dependencies:
npm install

### Start the test script:

npm start

### Example output:

Acknowledgment: { ok: true }
[DB] Saved 3 records
[Search] Indexed: cdr_001
[Search] Indexed: cdr_002
[Search] Indexed: cdr_003

### Example CSV Input

id,callStartTime,callEndTime,fromNumber,toNumber,callType,region
cdr_001,2026-01-21T14:30:00.000Z,2026-01-21T14:35:30.000Z,+14155551234,+442071234567,voice,us-west
cdr_002,2026-01-21T14:31:15.000Z,2026-01-21T14:33:45.000Z,+442071234567,+14155551234,voice,eu-west
cdr_003,2026-01-21T14:32:00.000Z,2026-01-21T14:47:30.000Z,+14155559876,+447911123456,video,us-west

### Future optimisations:

.Replace mocks with real database (PostgreSQL/MongoDB) and search engine (Elasticsearch/OpenSearch).

.Add retry logic for failed operator lookups.

.Scale enrichment to handle larger batches or streaming data.

.Add automated unit and integration tests for production readiness.

### Summary of assignment

.Replace mocks with real database (PostgreSQL/MongoDB) and search engine (Elasticsearch/OpenSearch).

.Add retry logic for failed operator lookups.

.Scale enrichment to handle larger batches or streaming data.

.Add automated unit and integration tests for production readiness.

