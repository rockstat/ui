import { Recording, RrwebRow } from './types.js';
export interface ParseOptions {
    /** Куда писать предупреждения (по умолчанию — никуда). */
    onWarning?: (message: string, context?: unknown) => void;
    /** Отбрасывать события до первого FullSnapshot (по умолчанию true — rrweb без снимка их не применит). */
    dropBeforeSnapshot?: boolean;
}
/**
 * Превращает строки таблицы `rrweb` (любых пользователей) в список записей,
 * готовых к воспроизведению. Записи отсортированы по времени начала.
 */
export declare function parseRows(rows: RrwebRow[], opts?: ParseOptions): Recording[];
/** Группирует записи по uid — удобно, если в выборке несколько пользователей. */
export declare function groupByUid(recordings: Recording[]): Map<string, Recording[]>;
