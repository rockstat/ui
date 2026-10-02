import { AssetUrlRewriter } from './assets.js';
import { ParseOptions } from './parse.js';
import { Recording, RrwebRow } from './types.js';
export type ViewerState = 'empty' | 'loading' | 'paused' | 'playing' | 'finished';
export interface RecordingSource {
    fetchRecordings(uid: string | number): Promise<Recording[]>;
}
export interface ViewerOptions {
    /** Скорость по умолчанию. */
    speed?: number;
    /** Варианты скорости в селекте. */
    speeds?: number[];
    /** Пропускать паузы без активности пользователя. */
    skipInactive?: boolean;
    /** Запускать воспроизведение сразу после выбора записи. */
    autoPlay?: boolean;
    /** По окончании записи переходить к следующей. */
    autoNext?: boolean;
    /** Показывать список записей слева. */
    showList?: boolean;
    /** Показывать панель с информацией о записи. */
    showInfo?: boolean;
    /** «Хвост» за курсором. */
    mouseTail?: boolean;
    /** Пауза (мс) между действиями пользователя, которая считается бездействием. */
    inactiveThreshold?: number;
    locale?: 'ru' | 'en';
    /** Настройки парсера для `loadRows()`. */
    parse?: ParseOptions;
    /**
     * Подмена URL внешних ресурсов записанной страницы (стили, картинки, шрифты) перед
     * воспроизведением — например, на свой прокси, если сайт не отдаёт их плееру.
     * См. `proxyRewriter()`.
     */
    rewriteAssets?: AssetUrlRewriter;
    onSelect?: (recording: Recording | null, index: number) => void;
    onStateChange?: (state: ViewerState) => void;
}
export declare function formatDuration(ms: number): string;
/**
 * Плеер записей: список записей пользователя + rrweb Replayer с управлением.
 *
 * ```ts
 * const viewer = new RrwebViewer('#app');
 * viewer.loadRows(rowsFromClickHouse);
 * ```
 */
export declare class RrwebViewer {
    readonly root: HTMLElement;
    private readonly t;
    private readonly opts;
    private recordings;
    private replayer;
    private currentIndex;
    private state;
    private totalTime;
    private speed;
    private skipInactive;
    private raf;
    private dragging;
    private destroyed;
    private readonly resizeObserver?;
    private readonly ui;
    constructor(container: HTMLElement | string, options?: ViewerOptions);
    get current(): Recording | null;
    get currentIndexValue(): number;
    get list(): readonly Recording[];
    get playing(): boolean;
    /** Заменяет список записей и выбирает первую воспроизводимую. */
    setRecordings(recordings: Recording[]): void;
    /** Сырые строки таблицы → записи → в плеер. */
    loadRows(rows: RrwebRow[]): Recording[];
    /** Загружает записи пользователя через источник (например, `ClickHouseSource`). */
    load(uid: string | number, source: RecordingSource): Promise<Recording[]>;
    /** Выбирает запись по индексу и монтирует плеер. */
    select(index: number, autoPlay?: boolean): void;
    play(): void;
    pause(): void;
    toggle(): void;
    /** Перемотка на смещение (мс) от начала записи. */
    seek(offset: number): void;
    setSpeed(speed: number): void;
    setSkipInactive(value: boolean): void;
    /** Переходить ли к следующей записи по окончании текущей. */
    setAutoNext(value: boolean): void;
    next(): void;
    prev(): void;
    toggleFullscreen(): void;
    destroy(): void;
    private mount;
    private unmount;
    private setState;
    private startTicker;
    private updateProgress;
    private fit;
    private setControlsEnabled;
    private bindTrack;
    private onKeyDown;
    private renderTrack;
    private renderList;
    private highlightList;
    private renderInfo;
}
