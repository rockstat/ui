import { eventWithTime } from './types.js';
/** Версия упаковщика rrweb (`@rrweb/packer`), которую пишет трекер в поле `v`. */
export declare const PACK_MARK = "v1";
/**
 * Распаковывает одно событие в том виде, в котором его сохраняет трекер:
 * `zlib(JSON.stringify({...event, v: 'v1'}))`, закодированный как latin1-строка.
 * Совместимо с `pack()` из `@rrweb/packer`. Обычный JSON тоже принимается.
 */
export declare function unpackEvent(raw: string | eventWithTime): eventWithTime;
/**
 * Достаёт целые строки из текста JSON-массива строк `["...","..."]`,
 * даже если начало или конец массива потеряны (пропала часть батча).
 *
 * @param text     текст (склеенные подряд идущие части батча)
 * @param anchored true, если текст начинается с начала массива (часть 0)
 */
export declare function extractStrings(text: string, anchored: boolean): string[];
