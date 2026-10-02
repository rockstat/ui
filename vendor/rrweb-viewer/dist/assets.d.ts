import { eventWithTime } from './types.js';
export type AssetKind = 'stylesheet' | 'image' | 'media' | 'font' | 'other';
/**
 * Возвращает новый URL ресурса или `null`/`undefined`, чтобы оставить как есть.
 * Вызывается для каждого внешнего ресурса записанной страницы.
 */
export type AssetUrlRewriter = (url: string, kind: AssetKind) => string | null | undefined;
/** Переписывает `url()` и `@import` в тексте CSS. Относительные ссылки разрешаются относительно `base`. */
export declare function rewriteCssUrls(css: string, rewrite: AssetUrlRewriter, base?: string): string;
/**
 * Подменяет URL внешних ресурсов (стили, картинки, шрифты) во всех событиях записи —
 * в полном снимке и в мутациях. Полезно, когда оригинальный сайт не отдаёт ресурсы
 * плееру (hotlink-защита, авторизация, устаревшая версия сборки) и их нужно
 * проксировать. События изменяются на месте; чтобы сохранить оригинал, передайте копию.
 */
export declare function rewriteAssetUrls(events: eventWithTime[], rewrite: AssetUrlRewriter): eventWithTime[];
/**
 * Готовый переписыватель для прокси вида `/asset?url=<encoded>`.
 * `only` ограничивает типы ресурсов (по умолчанию — все).
 */
export declare function proxyRewriter(prefix?: string, only?: AssetKind[]): AssetUrlRewriter;
