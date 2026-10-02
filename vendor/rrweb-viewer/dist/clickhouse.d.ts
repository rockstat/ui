import { ParseOptions } from './parse.js';
import { Recording, RrwebRow, UidSummary } from './types.js';
export interface ClickHouseSourceOptions {
    /**
     * Адрес HTTP-интерфейса ClickHouse: `https://host:8443` или путь прокси вроде `/ch`.
     * Логин и пароль можно передать прямо в URL: `https://user:pass@host:8443`.
     */
    url: string;
    /** База данных (по умолчанию `stats`; берётся из пути URL, если он есть). */
    database?: string;
    /** Таблица (по умолчанию `rrweb`). */
    table?: string;
    user?: string;
    password?: string;
    /**
     * Как передавать логин/пароль: `url` — параметрами запроса (не требует preflight в браузере),
     * `header` — заголовками `X-ClickHouse-User/Key`, `basic` — `Authorization: Basic`.
     * По умолчанию `url`.
     */
    auth?: 'url' | 'header' | 'basic';
    /** Дополнительные заголовки (например, для прокси). */
    headers?: Record<string, string>;
    /** Дополнительные настройки ClickHouse, уходят параметрами запроса. */
    settings?: Record<string, string | number>;
    /** Своя реализация fetch (Node < 18, тесты). */
    fetch?: typeof fetch;
    /** Какие колонки выбирать вместе с данными. */
    columns?: string[];
}
export interface FetchRowsOptions {
    /** Ограничить период по колонке `date` (снижает объём чтения — таблица партиционирована по дате). */
    from?: Date | number | string;
    to?: Date | number | string;
    projectId?: number;
    /** Максимум строк (по умолчанию без ограничения). */
    limit?: number;
}
export interface ListUidsOptions {
    from?: Date | number | string;
    to?: Date | number | string;
    projectId?: number;
    limit?: number;
    /** Подстрока домена или uid для фильтра. */
    search?: string;
}
/** Колонки, которые нужны парсеру и карточке записи. */
export declare const DEFAULT_COLUMNS: string[];
/**
 * Источник данных: ходит в HTTP-интерфейс ClickHouse и достаёт строки таблицы `rrweb` по uid.
 * Работает и в браузере, и в Node.
 */
export declare class ClickHouseSource {
    readonly baseUrl: string;
    readonly database: string;
    readonly table: string;
    private readonly user?;
    private readonly password?;
    private readonly authMode;
    private readonly headers;
    private readonly settings;
    private readonly fetchImpl;
    private readonly columns;
    constructor(opts: ClickHouseSourceOptions);
    get tableRef(): string;
    /** Выполняет произвольный запрос, результат — массив объектов (`FORMAT JSONEachRow`). */
    query<T = Record<string, unknown>>(sql: string, params?: Record<string, string | number>): Promise<T[]>;
    /** Сырые строки таблицы по одному пользователю, в порядке приёма. */
    fetchRows(uid: string | number, opts?: FetchRowsOptions): Promise<RrwebRow[]>;
    /** Строки → записи. */
    fetchRecordings(uid: string | number, opts?: FetchRowsOptions, parse?: ParseOptions): Promise<Recording[]>;
    /** Список пользователей с записями, последние — первыми. Удобно для выбора uid в интерфейсе. */
    listUids(opts?: ListUidsOptions): Promise<UidSummary[]>;
}
