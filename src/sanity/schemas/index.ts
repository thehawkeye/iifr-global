/**
 * src/sanity/schemas/index.ts
 *
 * Central schema registry — add every schema here.
 */
import { programme } from "./programme";
import { cohort } from "./cohort";
import { event } from "./event";

export const schemaTypes = [programme, cohort, event];
