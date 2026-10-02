//#region node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var e = Uint8Array, t = Uint16Array, n = Int32Array, r = new e([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), i = new e([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), a = new e([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), o = function(e, r) {
	for (var i = new t(31), a = 0; a < 31; ++a) i[a] = r += 1 << e[a - 1];
	for (var o = new n(i[30]), a = 1; a < 30; ++a) for (var s = i[a]; s < i[a + 1]; ++s) o[s] = s - i[a] << 5 | a;
	return {
		b: i,
		r: o
	};
}, s = o(r, 2), c = s.b, l = s.r;
c[28] = 258, l[258] = 28;
var u = o(i, 0), d = u.b;
u.r;
for (var f = new t(32768), p = 0; p < 32768; ++p) {
	var m = (p & 43690) >> 1 | (p & 21845) << 1;
	m = (m & 52428) >> 2 | (m & 13107) << 2, m = (m & 61680) >> 4 | (m & 3855) << 4, f[p] = ((m & 65280) >> 8 | (m & 255) << 8) >> 1;
}
for (var h = (function(e, n, r) {
	for (var i = e.length, a = 0, o = new t(n); a < i; ++a) e[a] && ++o[e[a] - 1];
	var s = new t(n);
	for (a = 1; a < n; ++a) s[a] = s[a - 1] + o[a - 1] << 1;
	var c;
	if (r) {
		c = new t(1 << n);
		var l = 15 - n;
		for (a = 0; a < i; ++a) if (e[a]) for (var u = a << 4 | e[a], d = n - e[a], p = s[e[a] - 1]++ << d, m = p | (1 << d) - 1; p <= m; ++p) c[f[p] >> l] = u;
	} else for (c = new t(i), a = 0; a < i; ++a) e[a] && (c[a] = f[s[e[a] - 1]++] >> 15 - e[a]);
	return c;
}), g = new e(288), p = 0; p < 144; ++p) g[p] = 8;
for (var p = 144; p < 256; ++p) g[p] = 9;
for (var p = 256; p < 280; ++p) g[p] = 7;
for (var p = 280; p < 288; ++p) g[p] = 8;
for (var _ = new e(32), p = 0; p < 32; ++p) _[p] = 5;
var v = /*#__PURE__*/ h(g, 9, 1), y = /*#__PURE__*/ h(_, 5, 1), b = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, x = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, S = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, C = function(e) {
	return (e + 7) / 8 | 0;
}, ee = function(t, n, r) {
	return (n == null || n < 0) && (n = 0), (r == null || r > t.length) && (r = t.length), new e(t.subarray(n, r));
}, w = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], T = function(e, t, n) {
	var r = Error(t || w[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, T), !n) throw r;
	return r;
}, E = function(t, n, o, s) {
	var l = t.length, u = s ? s.length : 0;
	if (!l || n.f && !n.l) return o || new e(0);
	var f = !o, p = f || n.i != 2, m = n.i;
	f && (o = new e(l * 3));
	var g = function(t) {
		var n = o.length;
		if (t > n) {
			var r = new e(Math.max(n * 2, t));
			r.set(o), o = r;
		}
	}, _ = n.f || 0, w = n.p || 0, E = n.b || 0, D = n.l, O = n.d, te = n.m, ne = n.n, re = l * 8;
	do {
		if (!D) {
			_ = x(t, w, 1);
			var ie = x(t, w + 1, 3);
			if (w += 3, !ie) {
				var k = C(w) + 4, ae = t[k - 4] | t[k - 3] << 8, oe = k + ae;
				if (oe > l) {
					m && T(0);
					break;
				}
				p && g(E + ae), o.set(t.subarray(k, oe), E), n.b = E += ae, n.p = w = oe * 8, n.f = _;
				continue;
			}
			if (ie == 1) D = v, O = y, te = 9, ne = 5;
			else if (ie == 2) {
				var se = x(t, w, 31) + 257, ce = x(t, w + 10, 15) + 4, le = se + x(t, w + 5, 31) + 1;
				w += 14;
				for (var ue = new e(le), de = new e(19), A = 0; A < ce; ++A) de[a[A]] = x(t, w + A * 3, 7);
				w += ce * 3;
				for (var fe = b(de), pe = (1 << fe) - 1, j = h(de, fe, 1), A = 0; A < le;) {
					var M = j[x(t, w, pe)];
					w += M & 15;
					var k = M >> 4;
					if (k < 16) ue[A++] = k;
					else {
						var me = 0, he = 0;
						for (k == 16 ? (he = 3 + x(t, w, 3), w += 2, me = ue[A - 1]) : k == 17 ? (he = 3 + x(t, w, 7), w += 3) : k == 18 && (he = 11 + x(t, w, 127), w += 7); he--;) ue[A++] = me;
					}
				}
				var ge = ue.subarray(0, se), _e = ue.subarray(se);
				te = b(ge), ne = b(_e), D = h(ge, te, 1), O = h(_e, ne, 1);
			} else T(1);
			if (w > re) {
				m && T(0);
				break;
			}
		}
		p && g(E + 131072);
		for (var ve = (1 << te) - 1, ye = (1 << ne) - 1, be = w;; be = w) {
			var me = D[S(t, w) & ve], xe = me >> 4;
			if (w += me & 15, w > re) {
				m && T(0);
				break;
			}
			if (me || T(2), xe < 256) o[E++] = xe;
			else if (xe == 256) {
				be = w, D = null;
				break;
			} else {
				var Se = xe - 254;
				if (xe > 264) {
					var A = xe - 257, Ce = r[A];
					Se = x(t, w, (1 << Ce) - 1) + c[A], w += Ce;
				}
				var we = O[S(t, w) & ye], Te = we >> 4;
				we || T(3), w += we & 15;
				var _e = d[Te];
				if (Te > 3) {
					var Ce = i[Te];
					_e += S(t, w) & (1 << Ce) - 1, w += Ce;
				}
				if (w > re) {
					m && T(0);
					break;
				}
				p && g(E + 131072);
				var Ee = E + Se;
				if (E < _e) {
					var De = u - _e, Oe = Math.min(_e, Ee);
					for (De + E < 0 && T(3); E < Oe; ++E) o[E] = s[De + E];
				}
				for (; E < Ee; ++E) o[E] = o[E - _e];
			}
		}
		n.l = D, n.p = be, n.b = E, n.f = _, D && (_ = 1, n.m = te, n.d = O, n.n = ne);
	} while (!_);
	return E != o.length && f ? ee(o, 0, E) : o.subarray(0, E);
}, D = /*#__PURE__*/ new e(0), O = function(e, t) {
	return ((e[0] & 15) != 8 || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31) && T(6, "invalid zlib data"), (e[1] >> 5 & 1) == +!t && T(6, "invalid zlib data: " + (e[1] & 32 ? "need" : "unexpected") + " dictionary"), (e[1] >> 3 & 4) + 2;
};
function te(e, t) {
	return E(e.subarray(O(e, t && t.dictionary), -4), { i: 2 }, t && t.out, t && t.dictionary);
}
var ne = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), re = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	re.decode(D, { stream: !0 });
} catch {}
var ie = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: ee(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function k(t, n) {
	if (n) {
		for (var r = new e(t.length), i = 0; i < t.length; ++i) r[i] = t.charCodeAt(i);
		return r;
	}
	if (ne) return ne.encode(t);
	for (var a = t.length, o = new e(t.length + (t.length >> 1)), s = 0, c = function(e) {
		o[s++] = e;
	}, i = 0; i < a; ++i) {
		if (s + 5 > o.length) {
			var l = new e(s + 8 + (a - i << 1));
			l.set(o), o = l;
		}
		var u = t.charCodeAt(i);
		u < 128 || n ? c(u) : u < 2048 ? (c(192 | u >> 6), c(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | t.charCodeAt(++i) & 1023, c(240 | u >> 18), c(128 | u >> 12 & 63), c(128 | u >> 6 & 63), c(128 | u & 63)) : (c(224 | u >> 12), c(128 | u >> 6 & 63), c(128 | u & 63));
	}
	return ee(o, 0, s);
}
function ae(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (re) return re.decode(e);
	var i = ie(e), a = i.s, n = i.r;
	return n.length && T(8), a;
}
//#endregion
//#region src/unpack.ts
var oe = "v1";
function se(e) {
	if (typeof e != "string") return e;
	if (e.charCodeAt(0) === 123) try {
		let t = JSON.parse(e);
		if (t && typeof t.timestamp == "number") return t;
	} catch {}
	let t = ae(te(k(e, !0))), n = JSON.parse(t);
	if (n.v !== void 0 && n.v !== "v1") throw Error(`Неподдерживаемая версия упаковщика: ${n.v} (ожидалась v1)`);
	return delete n.v, n;
}
function ce(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; r--) n++;
	return n % 2 == 1;
}
function le(e, t) {
	let n = [], r = e.length, i = 0;
	if (t) {
		for (; i < r && e[i] !== "[";) i++;
		i++;
	} else {
		let t = -1;
		for (let n = 0; n < r - 2; n++) if (e[n] === "\"" && e[n + 1] === "," && e[n + 2] === "\"" && !ce(e, n)) {
			t = n + 2;
			break;
		}
		if (t < 0) return n;
		i = t;
	}
	for (; i < r;) {
		let t = e[i];
		if (t === "," || t === " " || t === "\n" || t === "\r" || t === "	") {
			i++;
			continue;
		}
		if (t !== "\"") break;
		let a = i + 1, o = !1;
		for (; a < r;) {
			let t = e[a];
			if (t === "\\") {
				a += 2;
				continue;
			}
			if (t === "\"") {
				o = !0;
				break;
			}
			a++;
		}
		if (!o) break;
		try {
			n.push(JSON.parse(e.slice(i, a + 1)));
		} catch {}
		i = a + 1;
	}
	return n;
}
//#endregion
//#region src/parse.ts
var ue = 4, de = 2, A = 3, fe = 2, pe = 2;
function j(e, t = 0) {
	if (e == null || e === "") return t;
	let n = typeof e == "number" ? e : Number(e);
	return Number.isFinite(n) ? n : t;
}
function M(e) {
	return e == null ? "" : String(e);
}
function me(e) {
	let t = typeof e.data_d == "string" ? e.data_d : "", n = M(e.name);
	return n !== "rec_start" && n !== "rec_batch" && (n = t ? "rec_batch" : "rec_start"), n === "rec_batch" && !t ? null : {
		uid: M(e.uid),
		name: n,
		timestamp: j(e.timestamp),
		seq: j(e.data_seq),
		part: j(e.data_part),
		of: Math.max(1, j(e.data_of, 1)),
		data: t,
		sessStart: M(e.sess_start),
		pageNum: M(e.sess_pageNum),
		raw: e
	};
}
function he(e) {
	let t = [], n = /* @__PURE__ */ new Set(), r = [], i = -1;
	for (let a of e) {
		let e = `${a.seq}:${a.part}`, o = t[t.length - 1];
		if (o && a.seq > i + 2 && !n.has(e)) {
			o.push(a);
			continue;
		}
		n.has(e) && (t.push(r), r = [], n = /* @__PURE__ */ new Set(), i = -1), n.add(e), r.push(a), a.seq > i && (i = a.seq);
	}
	return r.length && t.push(r), t;
}
function ge(e) {
	let t = /* @__PURE__ */ new Map(), n = 1;
	for (let r of e) t.has(r.part) || t.set(r.part, r.data), r.of > n && (n = r.of);
	let r = [...t.keys()].sort((e, t) => e - t), i = Math.max(0, n - r.length);
	if (i === 0) {
		let e = r.map((e) => t.get(e)).join("");
		try {
			let t = JSON.parse(e);
			if (Array.isArray(t)) return {
				strings: t.filter((e) => typeof e == "string"),
				lostParts: i
			};
		} catch {}
		return {
			strings: le(e, !0),
			lostParts: i
		};
	}
	let a = [], o = [], s = () => {
		if (!o.length) return;
		let e = o.map((e) => t.get(e)).join("");
		a.push(...le(e, o[0] === 0)), o = [];
	};
	for (let e of r) o.length && e !== o[o.length - 1] + 1 && s(), o.push(e);
	return s(), {
		strings: a,
		lostParts: i
	};
}
function _e(e) {
	let t = {};
	if (!e) return { raw: t };
	for (let [n, r] of Object.entries(e)) n !== "data_d" && (t[n] = r);
	let n = (...e) => e.map(M).filter(Boolean).join(" ");
	return {
		serverTime: j(e.timestamp) || void 0,
		sessStart: j(e.sess_start) || void 0,
		sessNum: j(e.sess_num) || void 0,
		pageNum: j(e.sess_pageNum) || void 0,
		browser: n(e.uap_browser_name ?? e.uapc_browser_family, e.uap_browser_version ?? e.uapc_browser_version) || void 0,
		os: n(e.uap_os_name ?? e.uapc_os_family, e.uap_os_version ?? e.uapc_os_version) || void 0,
		device: n(e.uap_device_type, e.uap_device_vendor ?? e.uapc_device_brand, e.uap_device_model ?? e.uapc_device_family) || void 0,
		country: M(e.mmgeo_country_iso ?? e.ip2lgeo_country_iso) || void 0,
		city: M(e.mmgeo_city_en ?? e.ip2lgeo_city_en) || void 0,
		ip: M(e.td_ip) || void 0,
		userId: M(e.user_id) || void 0,
		locale: M(e.user_locale) || void 0,
		userAgent: M(e.td_ua) || void 0,
		raw: t
	};
}
function ve(e, t, n, r, i) {
	let a = i.onWarning ?? (() => {}), o = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = o.get(e.seq);
		t || o.set(e.seq, t = []), t.push(e);
	}
	let s = [], c = 0, l = 0;
	for (let t of [...o.keys()].sort((e, t) => e - t)) {
		let { strings: n, lostParts: r } = ge(o.get(t));
		c += r, r && a(`Запись ${e}: батч ${t} — потеряно частей: ${r}, восстановлено событий: ${n.length}`);
		for (let r of n) try {
			let e = se(r);
			e && typeof e.timestamp == "number" && typeof e.type == "number" ? s.push(e) : l++;
		} catch (n) {
			l++, a(`Запись ${e}: батч ${t} — не удалось распаковать событие`, n);
		}
	}
	if (!s.length) return null;
	s.sort((e, t) => e.timestamp - t.timestamp);
	let u = [], d = s.findIndex((e) => e.type === de), f = d >= 0, p = s;
	if (!f) u.push("Нет FullSnapshot — воспроизведение невозможно (потерян первый батч)");
	else if (i.dropBeforeSnapshot !== !1 && d > 0) {
		let e = s.slice(0, d).filter((e) => e.type !== ue);
		e.length && u.push(`Отброшено событий до первого снимка: ${e.length}`), p = [...s.slice(0, d).filter((e) => e.type === ue), ...s.slice(d)];
	}
	let m = r ?? n[0].raw, h = _e(m), g = p.find((e) => e.type === ue), _ = j(g?.data.width) || j(m.browser_w), v = j(g?.data.height) || j(m.browser_h), y = M(m.page_url) || g?.data.href || "";
	f && (!g || p[0].type !== ue) && ((!_ || !v) && (_ ||= 1280, v ||= 720), p = [{
		type: ue,
		data: {
			href: y,
			width: _,
			height: v
		},
		timestamp: p[0].timestamp
	}, ...p], u.push("Meta-событие восстановлено из колонок browser_w/browser_h")), c && u.push(`Потеряно частей батчей: ${c}`), l && u.push(`Не распаковано событий: ${l}`);
	let b = p[0].timestamp, x = p[p.length - 1].timestamp, S = p.filter((e) => e.type === A && e.data.source === fe && e.data.type === pe).length;
	return {
		id: e,
		uid: t,
		index: 0,
		pageUrl: y,
		pageTitle: M(m.page_title),
		startTime: b,
		endTime: x,
		duration: x - b,
		width: _,
		height: v,
		events: p,
		playable: f,
		warnings: u,
		stats: {
			batches: o.size,
			lostParts: c,
			decodeErrors: l,
			events: p.length,
			clicks: S,
			snapshots: p.filter((e) => e.type === de).length
		},
		meta: h
	};
}
function ye(e, t = {}) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = me(t);
		if (!e) continue;
		let r = `${e.uid}:${e.sessStart}:${e.pageNum}`, i = n.get(r);
		i || n.set(r, i = {
			uid: e.uid,
			key: r,
			starts: [],
			batches: []
		}), (e.name === "rec_start" ? i.starts : i.batches).push(e);
	}
	let r = [];
	for (let e of n.values()) {
		let n = (e, t) => e.timestamp - t.timestamp || e.seq - t.seq || e.part - t.part;
		e.starts.sort(n), e.batches.sort(n), he(e.batches).forEach((n, i) => {
			let a = n[0].timestamp, o = [...e.starts].reverse().find((e) => e.timestamp <= a + 1e3) ?? e.starts[0], s = ve(`${e.key}:${i}`, e.uid, n, o?.raw, t);
			s && r.push(s);
		});
	}
	return r.sort((e, t) => e.startTime - t.startTime), r.forEach((e, t) => e.index = t), r;
}
function be(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = t.get(n.uid);
		e || t.set(n.uid, e = []), e.push(n);
	}
	return t;
}
//#endregion
//#region src/clickhouse.ts
var xe = /* @__PURE__ */ "uid.id.timestamp.name.data_seq.data_part.data_of.data_packed.data_d.sess_start.sess_num.sess_pageNum.page_url.page_title.page_domain.browser_w.browser_h.uap_browser_name.uap_browser_version.uap_os_name.uap_os_version.uap_device_type.uap_device_vendor.uap_device_model.mmgeo_country_iso.mmgeo_city_en.td_ip.td_ua.user_id.user_locale".split(".");
function Se(e) {
	let t = e instanceof Date ? e : new Date(e);
	if (Number.isNaN(t.getTime())) throw Error(`Некорректная дата: ${String(e)}`);
	return t.toISOString().slice(0, 10);
}
function Ce(e) {
	if (!/^[A-Za-z_][A-Za-z0-9_.]*$/.test(e)) throw Error(`Недопустимый идентификатор: ${e}`);
	return e.split(".").map((e) => `\`${e}\``).join(".");
}
var we = class {
	baseUrl;
	database;
	table;
	user;
	password;
	authMode;
	headers;
	settings;
	fetchImpl;
	columns;
	constructor(e) {
		let t = e.url, n = e.user, r = e.password, i = e.database;
		if (/^https?:\/\//.test(t)) {
			let e = new URL(t);
			e.username && (n ??= decodeURIComponent(e.username)), e.password && (r ??= decodeURIComponent(e.password));
			let a = e.pathname.replace(/^\/|\/$/g, "");
			a && !i && (i = a), e.username = "", e.password = "", e.pathname = "/", e.search = "", t = e.toString().replace(/\/$/, "");
		}
		if (this.baseUrl = t.replace(/\/$/, ""), this.database = i ?? "stats", this.table = e.table ?? "rrweb", this.user = n, this.password = r, this.authMode = e.auth ?? "url", this.headers = e.headers ?? {}, this.settings = e.settings ?? {}, this.fetchImpl = (e.fetch ?? globalThis.fetch)?.bind(globalThis), this.columns = e.columns ?? xe, !this.fetchImpl) throw Error("fetch недоступен — передайте его в options.fetch");
	}
	get tableRef() {
		return `${Ce(this.database)}.${Ce(this.table)}`;
	}
	async query(e, t = {}) {
		let n = new URLSearchParams();
		n.set("database", this.database), n.set("default_format", "JSONEachRow"), n.set("add_http_cors_header", "1"), n.set("output_format_json_quote_64bit_integers", "1");
		for (let [e, t] of Object.entries(this.settings)) n.set(e, String(t));
		for (let [e, r] of Object.entries(t)) n.set(`param_${e}`, String(r));
		let r = { ...this.headers };
		this.user !== void 0 && (this.authMode === "url" ? (n.set("user", this.user), this.password !== void 0 && n.set("password", this.password)) : this.authMode === "header" ? (r["X-ClickHouse-User"] = this.user, this.password !== void 0 && (r["X-ClickHouse-Key"] = this.password)) : r.Authorization = `Basic ${btoa(`${this.user}:${this.password ?? ""}`)}`);
		let i = await this.fetchImpl(`${this.baseUrl}/?${n.toString()}`, {
			method: "POST",
			body: e,
			headers: r
		}), a = await i.text();
		if (!i.ok) throw Error(`ClickHouse HTTP ${i.status}: ${a.slice(0, 500)}`);
		let o = [];
		for (let e of a.split("\n")) e.trim() && o.push(JSON.parse(e));
		return o;
	}
	async fetchRows(e, t = {}) {
		let n = ["uid = {uid:UInt64}"], r = { uid: String(e) };
		t.from !== void 0 && (n.push("date >= {from:Date}"), r.from = Se(t.from)), t.to !== void 0 && (n.push("date <= {to:Date}"), r.to = Se(t.to)), t.projectId !== void 0 && (n.push("projectId = {projectId:UInt32}"), r.projectId = t.projectId);
		let i = `SELECT ${this.columns.map(Ce).join(", ")} FROM ${this.tableRef} WHERE ${n.join(" AND ")} ORDER BY timestamp, data_seq, data_part` + (t.limit ? ` LIMIT ${Math.floor(t.limit)}` : "");
		return this.query(i, r);
	}
	async fetchRecordings(e, t = {}, n = {}) {
		return ye(await this.fetchRows(e, t), n);
	}
	async listUids(e = {}) {
		let t = ["1"], n = {};
		e.from !== void 0 && (t.push("date >= {from:Date}"), n.from = Se(e.from)), e.to !== void 0 && (t.push("date <= {to:Date}"), n.to = Se(e.to)), e.projectId !== void 0 && (t.push("projectId = {projectId:UInt32}"), n.projectId = e.projectId), e.search && (t.push("(positionCaseInsensitive(page_domain, {search:String}) > 0 OR startsWith(toString(uid), {search:String}))"), n.search = e.search);
		let r = `SELECT toString(uid) AS uid, count() AS rows, countIf(name = 'rec_start') AS recordings, min(timestamp) AS firstSeen, max(timestamp) AS lastSeen, sum(length(data_d)) AS bytes, anyLast(page_domain) AS domain, anyLast(uap_browser_name) AS browser, anyLast(mmgeo_country_iso) AS country FROM ${this.tableRef} WHERE ${t.join(" AND ")} GROUP BY uid HAVING bytes > 0 ORDER BY lastSeen DESC LIMIT ${Math.floor(e.limit ?? 100)}`;
		return (await this.query(r, n)).map((e) => ({
			uid: String(e.uid),
			rows: Number(e.rows),
			recordings: Number(e.recordings),
			firstSeen: Number(e.firstSeen),
			lastSeen: Number(e.lastSeen),
			bytes: Number(e.bytes),
			domain: String(e.domain ?? ""),
			browser: String(e.browser ?? ""),
			country: String(e.country ?? "")
		}));
	}
}, Te = 2, Ee = 3, De = 0, Oe = 2;
function ke(e, t, n) {
	switch (e) {
		case "link": {
			let e = String(t.rel ?? "").toLowerCase(), r = String(t.as ?? "").toLowerCase();
			if (n !== "href") return null;
			if (e.includes("stylesheet")) return "stylesheet";
			if (e.includes("preload") || e.includes("prefetch")) {
				if (r === "style") return "stylesheet";
				if (r === "font") return "font";
				if (r === "image") return "image";
			}
			return e.includes("icon") ? "image" : null;
		}
		case "img":
		case "image": return n === "src" || n === "srcset" || n === "href" || n === "xlink:href" ? "image" : null;
		case "source": return n === "src" || n === "srcset" ? "media" : null;
		case "video":
		case "audio": return n === "src" || n === "poster" ? "media" : null;
		case "iframe":
		case "embed":
		case "object": return n === "src" || n === "data" ? "other" : null;
		default: return null;
	}
}
function Ae(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("//");
}
function je(e, t, n) {
	return e.split(",").map((e) => {
		let r = e.trim();
		if (!r) return r;
		let [i, ...a] = r.split(/\s+/);
		return [(Ae(i) ? n(i, t) : null) || i, ...a].join(" ");
	}).join(", ");
}
var Me = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g, Ne = /@import\s+(['"])([^'"]+)\1/g;
function Pe(e, t, n) {
	let r = (e) => {
		if (/^(data|blob):/i.test(e) || e.startsWith("#")) return null;
		let r = e;
		if (!Ae(e)) {
			if (!n) return null;
			try {
				r = new URL(e, n).toString();
			} catch {
				return null;
			}
		}
		let i = /\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(r) ? "font" : /\.css(\?|#|$)/i.test(r) ? "stylesheet" : "image";
		return t(r, i) ?? (r === e ? null : r);
	};
	return e.replace(Ne, (e, t, n) => {
		let i = r(n);
		return i ? `@import ${t}${i}${t}` : e;
	}).replace(Me, (e, t, n) => {
		let i = r(n);
		return i ? `url(${t}${i}${t})` : e;
	});
}
function Fe(e, t, n) {
	for (let [r, i] of Object.entries(t)) {
		if (typeof i != "string" || !i) continue;
		if (r === "_cssText" || r === "style" && i.includes("url(")) {
			t[r] = Pe(i, n);
			continue;
		}
		let a = ke(e, t, r);
		if (a) {
			if (r === "srcset") t[r] = je(i, a, n);
			else if (Ae(i)) {
				let e = n(i, a);
				e && (t[r] = e);
			}
		}
	}
}
function Ie(e, t) {
	if (e && (e.type === Oe && e.tagName && e.attributes && Fe(e.tagName.toLowerCase(), e.attributes, t), e.childNodes)) for (let n of e.childNodes) Ie(n, t);
}
function Le(e, t) {
	for (let n of e) if (n.type === Te) Ie(n.data.node, t);
	else if (n.type === Ee && n.data.source === De) {
		let e = n.data;
		for (let n of e.adds ?? []) Ie(n.node, t);
		for (let n of e.attributes ?? []) {
			let e = n.attributes;
			for (let [n, r] of Object.entries(e)) if (typeof r == "string" && r) {
				if (n === "style" && r.includes("url(")) e[n] = Pe(r, t);
				else if (n === "srcset") e[n] = je(r, "image", t);
				else if ((n === "src" || n === "href" || n === "poster") && Ae(r)) {
					let i = t(r, /\.css(\?|#|$)/i.test(r) ? "stylesheet" : n === "href" ? "other" : "image");
					i && (e[n] = i);
				}
			}
		}
	}
	return e;
}
function Re(e = "/asset?url=", t) {
	return (n, r) => t && !t.includes(r) || n.startsWith(e) ? null : e + encodeURIComponent(n.startsWith("//") ? `https:${n}` : n);
}
//#endregion
//#region node_modules/.pnpm/rrweb@2.1.6/node_modules/rrweb/dist/rrweb.js
var ze = Object.defineProperty, Be = (e, t, n) => t in e ? ze(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, N = (e, t, n) => Be(e, typeof t == "symbol" ? t : t + "", n), Ve = Object.defineProperty, He = (e, t, n) => t in e ? Ve(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Ue = (e, t, n) => He(e, typeof t == "symbol" ? t : t + "", n), P = /* @__PURE__ */ ((e) => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(P || {}), We = {
	Node: [
		"childNodes",
		"parentNode",
		"parentElement",
		"textContent",
		"ownerDocument",
		"firstChild",
		"lastChild",
		"nextSibling",
		"previousSibling"
	],
	ShadowRoot: ["host", "styleSheets"],
	Element: [
		"shadowRoot",
		"querySelector",
		"querySelectorAll"
	],
	MutationObserver: []
}, Ge = {
	Node: ["contains", "getRootNode"],
	ShadowRoot: ["getSelection"],
	Element: [],
	MutationObserver: ["constructor"]
}, Ke = {}, qe = {}, Je = () => !!globalThis.Zone;
function Ye(e) {
	if (Ke[e]) return Ke[e];
	let t = globalThis[e], n = t.prototype, r = e in We ? We[e] : void 0, i = !!(r && r.every((e) => !!(Object.getOwnPropertyDescriptor(n, e)?.get)?.toString().includes("[native code]"))), a = e in Ge ? Ge[e] : void 0, o = !!(a && a.every((e) => typeof n[e] == "function" && n[e]?.toString().includes("[native code]")));
	if (i && o && !Je()) return Ke[e] = t.prototype, t.prototype;
	try {
		let r = document.createElement("iframe");
		r.style.display = "none", document.body.appendChild(r);
		let i = r.contentWindow;
		if (!i) return t.prototype;
		let a = i[e].prototype;
		if (!a) return r.remove(), n;
		let o = navigator.userAgent;
		return o.includes("Safari") && !o.includes("Chrome") ? (r.classList.add("rr-block"), r.setAttribute("__rrwebUntaintedMutationObserver", ""), qe[e] = () => r.remove()) : r.remove(), Ke[e] = a;
	} catch {
		return n;
	}
}
var Xe = {};
function F(e, t, n) {
	let r = Xe[e]?.[n];
	if (r) return r.call(t);
	let i = Ye(e), a = Object.getOwnPropertyDescriptor(i, n)?.get;
	return a ? ((Xe[e] || (Xe[e] = {}))[n] = a, a.call(t)) : t[n];
}
var Ze = {};
function Qe(e, t, n) {
	let r = `${e}.${String(n)}`;
	if (Ze[r]) return Ze[r].bind(t);
	let i = Ye(e)[n];
	return typeof i == "function" ? (Ze[r] = i, i.bind(t)) : t[n];
}
function $e(e) {
	return F("Node", e, "ownerDocument");
}
function et(e) {
	return F("Node", e, "childNodes");
}
function tt(e) {
	return F("Node", e, "parentNode");
}
function nt(e) {
	return F("Node", e, "parentElement");
}
function rt(e) {
	return F("Node", e, "textContent");
}
function it(e) {
	return F("Node", e, "firstChild");
}
function at(e) {
	return F("Node", e, "lastChild");
}
function ot(e) {
	return F("Node", e, "nextSibling");
}
function st(e) {
	return F("Node", e, "previousSibling");
}
function ct(e, t) {
	return Qe("Node", e, "contains")(t);
}
function lt(e) {
	return Qe("Node", e, "getRootNode")();
}
function ut(e) {
	return !e || !("host" in e) ? null : F("ShadowRoot", e, "host");
}
function dt(e) {
	return e.styleSheets;
}
function ft(e) {
	return !e || !("shadowRoot" in e) ? null : F("Element", e, "shadowRoot");
}
function pt(e, t) {
	return F("Element", e, "querySelector")(t);
}
function mt(e, t) {
	return F("Element", e, "querySelectorAll")(t);
}
function ht() {
	return [Ye("MutationObserver").constructor, qe.MutationObserver ?? (() => {})];
}
var gt = Date.now;
/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString()) || (gt = () => (/* @__PURE__ */ new Date()).getTime());
function _t(e, t, n) {
	try {
		if (!(t in e)) return () => {};
		let r = e[t], i = n(r);
		return typeof i == "function" && (i.prototype = i.prototype || {}, Object.defineProperties(i, { __rrweb_original__: {
			enumerable: !1,
			value: r
		} })), e[t] = i, () => {
			e[t] = r;
		};
	} catch {
		return () => {};
	}
}
var I = {
	ownerDocument: $e,
	childNodes: et,
	parentNode: tt,
	parentElement: nt,
	textContent: rt,
	firstChild: it,
	lastChild: at,
	nextSibling: ot,
	previousSibling: st,
	contains: ct,
	getRootNode: lt,
	host: ut,
	styleSheets: dt,
	shadowRoot: ft,
	querySelector: pt,
	querySelectorAll: mt,
	nowTimestamp: gt,
	mutationObserverCtor: ht,
	patch: _t
};
function vt(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function yt(e) {
	let t = e && "host" in e && "mode" in e && I.host(e) || null;
	return !!(t && "shadowRoot" in t && I.shadowRoot(t) === e);
}
function bt(e) {
	return Object.prototype.toString.call(e) === "[object ShadowRoot]";
}
function xt(e) {
	return e.includes(" background-clip: text;") && !e.includes(" -webkit-background-clip: text;") && (e = e.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")), e;
}
function St(e) {
	let { cssText: t } = e;
	if (t.split("\"").length < 3) return t;
	let n = ["@import", `url(${JSON.stringify(e.href)})`];
	return e.layerName === "" ? n.push("layer") : e.layerName && n.push(`layer(${e.layerName})`), e.supportsText && n.push(`supports(${e.supportsText})`), e.media.length && n.push(e.media.mediaText), n.join(" ") + ";";
}
function Ct(e) {
	try {
		let t = e.rules || e.cssRules;
		if (!t) return null;
		let n = e.href;
		return !n && e.ownerNode && (n = e.ownerNode.baseURI), xt(Array.from(t, (e) => wt(e, n)).join(""));
	} catch {
		return null;
	}
}
function wt(e, t) {
	if (Et(e)) {
		let t;
		try {
			t = Ct(e.styleSheet) || St(e);
		} catch {
			t = e.cssText;
		}
		return e.styleSheet.href ? Ht(t, e.styleSheet.href) : t;
	}
	{
		let n = e.cssText;
		return Dt(e) && e.selectorText.includes(":") && (n = Tt(n)), t ? Ht(n, t) : n;
	}
}
function Tt(e) {
	return e.replace(/(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, "$1\\$2");
}
function Et(e) {
	return "styleSheet" in e;
}
function Dt(e) {
	return "selectorText" in e;
}
var Ot = class {
	constructor() {
		Ue(this, "idNodeMap", /* @__PURE__ */ new Map()), Ue(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
	}
	getId(e) {
		return e ? this.getMeta(e)?.id ?? -1 : -1;
	}
	getNode(e) {
		return this.idNodeMap.get(e) || null;
	}
	getIds() {
		return Array.from(this.idNodeMap.keys());
	}
	getMeta(e) {
		return this.nodeMetaMap.get(e) || null;
	}
	removeNodeFromMap(e) {
		let t = this.getId(e);
		this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e) => this.removeNodeFromMap(e));
	}
	has(e) {
		return this.idNodeMap.has(e);
	}
	hasNode(e) {
		return this.nodeMetaMap.has(e);
	}
	add(e, t) {
		let n = t.id;
		this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t);
	}
	replace(e, t) {
		let n = this.getNode(e);
		if (n) {
			let e = this.nodeMetaMap.get(n);
			e && this.nodeMetaMap.set(t, e);
		}
		this.idNodeMap.set(e, t);
	}
	reset() {
		this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
	}
};
function kt() {
	return new Ot();
}
function At({ element: e, maskInputOptions: t, tagName: n, type: r, value: i, maskInputFn: a }) {
	let o = i || "", s = r && jt(r);
	return (t[n.toLowerCase()] || s && t[s]) && (o = a ? a(o, e) : "*".repeat(o.length)), o;
}
function jt(e) {
	return e.toLowerCase();
}
var Mt = "__rrweb_original__";
function Nt(e) {
	let t = e.getContext("2d");
	if (!t) return !0;
	for (let n = 0; n < e.width; n += 50) for (let r = 0; r < e.height; r += 50) {
		let i = t.getImageData, a = Mt in i ? i[Mt] : i;
		if (new Uint32Array(a.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some((e) => e !== 0)) return !1;
	}
	return !0;
}
function Pt(e, t) {
	return !e || !t || e.type !== t.type ? !1 : e.type === P.Document ? e.compatMode === t.compatMode : e.type === P.DocumentType ? e.name === t.name && e.publicId === t.publicId && e.systemId === t.systemId : e.type === P.Comment || e.type === P.Text || e.type === P.CDATA ? e.textContent === t.textContent : e.type === P.Element && e.tagName === t.tagName && JSON.stringify(e.attributes) === JSON.stringify(t.attributes) && e.isSVG === t.isSVG && e.needBlock === t.needBlock;
}
function Ft(e) {
	let t = e.type;
	return e.hasAttribute("data-rr-is-password") ? "password" : t ? jt(t) : null;
}
function It(e, t) {
	let n;
	try {
		n = new URL(e, t ?? window.location.href);
	} catch {
		return null;
	}
	return n.pathname.match(/\.([0-9a-z]+)(?:$)/i)?.[1] ?? null;
}
function Lt(e) {
	let t = "";
	return t = e.indexOf("//") > -1 ? e.split("/").slice(0, 3).join("/") : e.split("/")[0], t = t.split("?")[0], t;
}
var Rt = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, zt = /^(?:[a-z+]+:)?\/\//i, Bt = /^www\..*/i, Vt = /^(data:)([^,]*),(.*)/i;
function Ht(e, t) {
	return (e || "").replace(Rt, (e, n, r, i, a, o) => {
		let s = r || a || o, c = n || i || "";
		if (!s) return e;
		if (zt.test(s) || Bt.test(s) || Vt.test(s)) return `url(${c}${s}${c})`;
		if (s[0] === "/") return `url(${c}${Lt(t) + s}${c})`;
		let l = s.split("#")[0], u = s.substring(l.length), d = t.split("#")[0].split("/"), f = l.split("/");
		d.pop();
		for (let e of f) if (e === ".") continue;
		else e === ".." ? d.pop() : d.push(e);
		return `url(${c}${d.join("/")}${u}${c})`;
	});
}
function Ut(e, t = !1) {
	return t ? e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "") : e.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "").replace(/0px/g, "0");
}
function Wt(e, t, n = !1) {
	let r = Array.from(t.childNodes), i = [], a = 0;
	if (r.length > 1 && e && typeof e == "string") {
		let t = Ut(e, n), o = t.length / e.length;
		for (let s = 1; s < r.length; s++) if (r[s].textContent && typeof r[s].textContent == "string") {
			let c = Ut(r[s].textContent, n), l = 3;
			for (; l < c.length && (c[l].match(/[a-zA-Z0-9]/) || c.indexOf(c.substring(0, l), 1) !== -1); l++);
			for (; l < c.length; l++) {
				let u = c.substring(0, l), d = t.split(u), f = -1;
				if (d.length === 2) f = d[0].length;
				else if (d.length > 2 && d[0] === "" && r[s - 1].textContent !== "") f = t.indexOf(u, 1);
				else if (d.length === 1) {
					if (u = u.substring(0, u.length - 1), d = t.split(u), d.length <= 1) return i.push(e), i;
					l = 101;
				} else l === c.length - 1 && (f = t.indexOf(u));
				if (d.length >= 2 && l > 100) {
					let e = r[s - 1].textContent;
					if (e && typeof e == "string") {
						let n = Ut(e).length;
						f = t.indexOf(u, n);
					}
					f === -1 && (f = d[0].length);
				}
				if (f !== -1) {
					let s = Math.floor(f / o);
					for (; s > 0 && s < e.length;) {
						if (a += 1, a > 50 * r.length) return i.push(e), i;
						let c = Ut(e.substring(0, s), n);
						if (c.length === f) {
							i.push(e.substring(0, s)), e = e.substring(s), t = t.substring(f);
							break;
						}
						c.length < f ? s += Math.max(1, Math.floor((f - c.length) / o)) : s -= Math.max(1, Math.floor((c.length - f) * o));
					}
					break;
				}
			}
		}
	}
	return i.push(e), i;
}
function Gt(e, t) {
	return Wt(e, t).join("/* rr_split */");
}
var Kt = 1, qt = /* @__PURE__ */ RegExp("[^a-z0-9-_:]"), Jt = -2;
function Yt() {
	return Kt++;
}
function Xt(e) {
	if (e instanceof HTMLFormElement) return "form";
	let t = jt(e.tagName);
	return qt.test(t) ? "div" : t;
}
var Zt, Qt, $t = /^[^ \t\n\r\u000c]+/, en = /^[, \t\n\r\u000c]+/;
function tn(e, t) {
	if (t.trim() === "") return t;
	let n = 0;
	function r(e) {
		let r, i = e.exec(t.substring(n));
		return i ? (r = i[0], n += r.length, r) : "";
	}
	let i = [];
	for (; r(en), !(n >= t.length);) {
		let a = r($t);
		if (a.slice(-1) === ",") a = rn(e, a.substring(0, a.length - 1)), i.push(a);
		else {
			let r = "";
			a = rn(e, a);
			let o = !1;
			for (;;) {
				let e = t.charAt(n);
				if (e === "") {
					i.push((a + r).trim());
					break;
				}
				if (o) e === ")" && (o = !1);
				else {
					if (e === ",") {
						n += 1, i.push((a + r).trim());
						break;
					}
					e === "(" && (o = !0);
				}
				r += e, n += 1;
			}
		}
	}
	return i.join(", ");
}
var nn = /* @__PURE__ */ new WeakMap();
function rn(e, t) {
	return !t || t.trim() === "" ? t : on(e, t);
}
function an(e) {
	return !!(e.tagName === "svg" || e.ownerSVGElement);
}
function on(e, t) {
	let n = nn.get(e);
	if (n || (n = e.createElement("a"), nn.set(e, n)), !t) t = "";
	else if (t.startsWith("blob:") || t.startsWith("data:")) return t;
	return n.setAttribute("href", t), n.href;
}
function sn(e, t, n, r) {
	return r && (n === "src" || n === "href" && (t !== "use" || r[0] !== "#") || n === "xlink:href" && r[0] !== "#" || n === "background" && [
		"table",
		"td",
		"th"
	].includes(t) ? rn(e, r) : n === "srcset" ? tn(e, r) : n === "style" ? Ht(r, on(e)) : t === "object" && n === "data" ? rn(e, r) : r);
}
function cn(e, t, n) {
	return ["video", "audio"].includes(e) && jt(t) === "autoplay";
}
function ln(e, t, n) {
	try {
		if (typeof t == "string") {
			if (e.classList.contains(t)) return !0;
		} else for (let n = e.classList.length; n--;) {
			let r = e.classList[n];
			if (t.test(r)) return !0;
		}
		if (n) return e.matches(n);
	} catch {}
	return !1;
}
function un(e, t, n) {
	if (!e) return !1;
	if (e.nodeType !== e.ELEMENT_NODE) return n ? un(I.parentNode(e), t, n) : !1;
	for (let n = e.classList.length; n--;) {
		let r = e.classList[n];
		if (t.test(r)) return !0;
	}
	return n ? un(I.parentNode(e), t, n) : !1;
}
function dn(e, t, n, r) {
	let i;
	if (vt(e)) {
		if (i = e, !I.childNodes(i).length) return !1;
	} else if (I.parentElement(e) === null) return !1;
	else i = I.parentElement(e);
	try {
		if (typeof t == "string") {
			if (r) {
				if (i.closest(`.${t}`)) return !0;
			} else if (i.classList.contains(t)) return !0;
		} else if (un(i, t, r)) return !0;
		if (n) {
			if (r) {
				if (i.closest(n)) return !0;
			} else if (i.matches(n)) return !0;
		}
	} catch {}
	return !1;
}
function fn(e, t, n) {
	let r = e.contentWindow;
	if (!r) return;
	let i = !1, a;
	try {
		a = r.document.readyState;
	} catch {
		return;
	}
	if (a !== "complete") {
		let r = setTimeout(() => {
			i ||= (t(), !0);
		}, n);
		e.addEventListener("load", () => {
			clearTimeout(r), i = !0, t();
		});
		return;
	}
	let o = "about:blank";
	if (r.location.href !== o || e.src === o || e.src === "") return setTimeout(t, 0), e.addEventListener("load", t);
	e.addEventListener("load", t);
}
function pn(e, t, n) {
	let r = !1, i;
	try {
		i = e.sheet;
	} catch {
		return;
	}
	if (i) return;
	let a = setTimeout(() => {
		r ||= (t(), !0);
	}, n);
	e.addEventListener("load", () => {
		clearTimeout(a), r = !0, t();
	});
}
function mn(e, t) {
	let { doc: n, mirror: r, blockClass: i, blockSelector: a, needsMask: o, inlineStylesheet: s, maskInputOptions: c = {}, maskTextFn: l, maskInputFn: u, dataURLOptions: d = {}, inlineImages: f, recordCanvas: p, keepIframeSrcFn: m, newlyAddedElement: h = !1, cssCaptured: g = !1 } = t, _ = hn(n, r);
	switch (e.nodeType) {
		case e.DOCUMENT_NODE: return e.compatMode === "CSS1Compat" ? {
			type: P.Document,
			childNodes: []
		} : {
			type: P.Document,
			childNodes: [],
			compatMode: e.compatMode
		};
		case e.DOCUMENT_TYPE_NODE: return {
			type: P.DocumentType,
			name: e.name,
			publicId: e.publicId,
			systemId: e.systemId,
			rootId: _
		};
		case e.ELEMENT_NODE: return _n(e, {
			doc: n,
			blockClass: i,
			blockSelector: a,
			inlineStylesheet: s,
			maskInputOptions: c,
			maskInputFn: u,
			dataURLOptions: d,
			inlineImages: f,
			recordCanvas: p,
			keepIframeSrcFn: m,
			newlyAddedElement: h,
			rootId: _
		});
		case e.TEXT_NODE: return gn(e, {
			doc: n,
			needsMask: o,
			maskTextFn: l,
			rootId: _,
			cssCaptured: g
		});
		case e.CDATA_SECTION_NODE: return {
			type: P.CDATA,
			textContent: "",
			rootId: _
		};
		case e.COMMENT_NODE: return {
			type: P.Comment,
			textContent: I.textContent(e) || "",
			rootId: _
		};
		default: return !1;
	}
}
function hn(e, t) {
	if (!t.hasNode(e)) return;
	let n = t.getId(e);
	return n === 1 ? void 0 : n;
}
function gn(e, t) {
	let { needsMask: n, maskTextFn: r, rootId: i, cssCaptured: a } = t, o = I.parentNode(e), s = o && o.tagName, c = "", l = s === "STYLE" || void 0, u = s === "SCRIPT" || void 0;
	return u ? c = "SCRIPT_PLACEHOLDER" : a || (c = I.textContent(e), l && c && (c = Ht(c, on(t.doc)))), !l && !u && c && n && (c = r ? r(c, I.parentElement(e)) : c.replace(/[\S]/g, "*")), {
		type: P.Text,
		textContent: c || "",
		rootId: i
	};
}
function _n(e, t) {
	let { doc: n, blockClass: r, blockSelector: i, inlineStylesheet: a, maskInputOptions: o = {}, maskInputFn: s, dataURLOptions: c = {}, inlineImages: l, recordCanvas: u, keepIframeSrcFn: d, newlyAddedElement: f = !1, rootId: p } = t, m = ln(e, r, i), h = Xt(e), g = {}, _ = e.attributes.length;
	for (let t = 0; t < _; t++) {
		let r = e.attributes[t];
		cn(h, r.name, r.value) || (g[r.name] = sn(n, h, jt(r.name), r.value));
	}
	if (h === "link" && a) {
		let t = Array.from(n.styleSheets).find((t) => t.href === e.href), r = null;
		t && (r = Ct(t)), r && (delete g.rel, delete g.href, g._cssText = r);
	}
	if (h === "style" && e.sheet) {
		let t = Ct(e.sheet);
		t && (e.childNodes.length > 1 && (t = Gt(t, e)), g._cssText = t);
	}
	if ([
		"input",
		"textarea",
		"select"
	].includes(h)) {
		let t = e.value, n = e.checked;
		g.type !== "radio" && g.type !== "checkbox" && g.type !== "submit" && g.type !== "button" && t ? g.value = At({
			element: e,
			type: Ft(e),
			tagName: h,
			value: t,
			maskInputOptions: o,
			maskInputFn: s
		}) : n && (g.checked = n);
	}
	if (h === "option" && (e.selected && !o.select ? g.selected = !0 : delete g.selected), h === "dialog" && e.open && (g.rr_open_mode = e.matches("dialog:modal") ? "modal" : "non-modal"), h === "canvas" && u) {
		if (e.__context === "2d") Nt(e) || (g.rr_dataURL = e.toDataURL(c.type, c.quality));
		else if (!("__context" in e)) {
			let t = e.toDataURL(c.type, c.quality), r = n.createElement("canvas");
			r.width = e.width, r.height = e.height, t !== r.toDataURL(c.type, c.quality) && (g.rr_dataURL = t);
		}
	}
	if (h === "img" && l) {
		Zt || (Zt = n.createElement("canvas"), Qt = Zt.getContext("2d"));
		let t = e, r = t.currentSrc || t.getAttribute("src") || "<unknown-src>", i = t.crossOrigin, a = () => {
			t.removeEventListener("load", a);
			try {
				Zt.width = t.naturalWidth, Zt.height = t.naturalHeight, Qt.drawImage(t, 0, 0), g.rr_dataURL = Zt.toDataURL(c.type, c.quality);
			} catch (e) {
				if (t.crossOrigin !== "anonymous") {
					t.crossOrigin = "anonymous", t.complete && t.naturalWidth !== 0 ? a() : t.addEventListener("load", a);
					return;
				}
				console.warn(`Cannot inline img src=${r}! Error: ${e}`);
			}
			t.crossOrigin === "anonymous" && (i ? g.crossOrigin = i : t.removeAttribute("crossorigin"));
		};
		t.complete && t.naturalWidth !== 0 ? a() : t.addEventListener("load", a);
	}
	if (["audio", "video"].includes(h)) {
		let t = g;
		t.rr_mediaState = e.paused ? "paused" : "played", t.rr_mediaCurrentTime = e.currentTime, t.rr_mediaPlaybackRate = e.playbackRate, t.rr_mediaMuted = e.muted, t.rr_mediaLoop = e.loop, t.rr_mediaVolume = e.volume;
	}
	if (f || (e.scrollLeft && (g.rr_scrollLeft = e.scrollLeft), e.scrollTop && (g.rr_scrollTop = e.scrollTop)), m) {
		let { width: t, height: n } = e.getBoundingClientRect();
		g = {
			class: g.class,
			rr_width: `${t}px`,
			rr_height: `${n}px`
		};
	}
	h === "iframe" && !d(g.src) && (e.contentDocument || (g.rr_src = g.src), delete g.src);
	let v;
	try {
		customElements.get(h) && (v = !0);
	} catch {}
	return {
		type: P.Element,
		tagName: h,
		attributes: g,
		childNodes: [],
		isSVG: an(e) || void 0,
		needBlock: m,
		rootId: p,
		isCustom: v
	};
}
function L(e) {
	return e == null ? "" : e.toLowerCase();
}
function vn(e) {
	return e === !0 || e === "all" ? {
		script: !0,
		comment: !0,
		headFavicon: !0,
		headWhitespace: !0,
		headMetaSocial: !0,
		headMetaRobots: !0,
		headMetaHttpEquiv: !0,
		headMetaVerification: !0,
		headMetaAuthorship: e === "all",
		headMetaDescKeywords: e === "all",
		headTitleMutations: e === "all"
	} : e || {};
}
function yn(e, t) {
	return !!(t.comment && e.type === P.Comment || e.type === P.Element && (t.script && (e.tagName === "script" || e.tagName === "link" && (e.attributes.rel === "preload" && e.attributes.as === "script" || e.attributes.rel === "modulepreload") || e.tagName === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && It(e.attributes.href) === "js") || t.headFavicon && (e.tagName === "link" && e.attributes.rel === "shortcut icon" || e.tagName === "meta" && (L(e.attributes.name).match(/^msapplication-tile(image|color)$/) || L(e.attributes.name) === "application-name" || L(e.attributes.rel) === "icon" || L(e.attributes.rel) === "apple-touch-icon" || L(e.attributes.rel) === "shortcut icon")) || e.tagName === "meta" && (t.headMetaDescKeywords && L(e.attributes.name).match(/^description|keywords$/) || t.headMetaSocial && (L(e.attributes.property).match(/^(og|twitter|fb):/) || L(e.attributes.name).match(/^(og|twitter):/) || L(e.attributes.name) === "pinterest") || t.headMetaRobots && (L(e.attributes.name) === "robots" || L(e.attributes.name) === "googlebot" || L(e.attributes.name) === "bingbot") || t.headMetaHttpEquiv && e.attributes["http-equiv"] !== void 0 || t.headMetaAuthorship && (L(e.attributes.name) === "author" || L(e.attributes.name) === "generator" || L(e.attributes.name) === "framework" || L(e.attributes.name) === "publisher" || L(e.attributes.name) === "progid" || L(e.attributes.property).match(/^article:/) || L(e.attributes.property).match(/^product:/)) || t.headMetaVerification && (L(e.attributes.name) === "google-site-verification" || L(e.attributes.name) === "yandex-verification" || L(e.attributes.name) === "csrf-token" || L(e.attributes.name) === "p:domain_verify" || L(e.attributes.name) === "verify-v1" || L(e.attributes.name) === "verification" || L(e.attributes.name) === "shopify-checkout-api-token"))));
}
function bn(e, t) {
	let { doc: n, mirror: r, blockClass: i, blockSelector: a, maskTextClass: o, maskTextSelector: s, skipChild: c = !1, inlineStylesheet: l = !0, maskInputOptions: u = {}, maskTextFn: d, maskInputFn: f, slimDOMOptions: p, dataURLOptions: m = {}, inlineImages: h = !1, recordCanvas: g = !1, onSerialize: _, onIframeLoad: v, iframeLoadTimeout: y = 5e3, onStylesheetLoad: b, stylesheetLoadTimeout: x = 5e3, keepIframeSrcFn: S = () => !1, newlyAddedElement: C = !1, cssCaptured: ee = !1 } = t, { needsMask: w } = t, { preserveWhiteSpace: T = !0 } = t;
	w ||= dn(e, o, s, w === void 0);
	let E = mn(e, {
		doc: n,
		mirror: r,
		blockClass: i,
		blockSelector: a,
		needsMask: w,
		inlineStylesheet: l,
		maskInputOptions: u,
		maskTextFn: d,
		maskInputFn: f,
		dataURLOptions: m,
		inlineImages: h,
		recordCanvas: g,
		keepIframeSrcFn: S,
		newlyAddedElement: C,
		cssCaptured: ee
	});
	if (!E) return console.warn(e, "not serialized"), null;
	let D;
	D = r.hasNode(e) ? r.getId(e) : yn(E, p) || !T && E.type === P.Text && !E.textContent.replace(/^\s+|\s+$/gm, "").length ? Jt : Yt();
	let O = Object.assign(E, { id: D });
	if (r.add(e, O), D === Jt) return null;
	_ && _(e);
	let te = !c;
	if (O.type === P.Element) {
		te &&= !O.needBlock, delete O.needBlock;
		let t = I.shadowRoot(e);
		t && bt(t) && (O.isShadowHost = !0);
	}
	if ((O.type === P.Document || O.type === P.Element) && te) {
		p.headWhitespace && O.type === P.Element && O.tagName === "head" && (T = !1);
		let t = {
			doc: n,
			mirror: r,
			blockClass: i,
			blockSelector: a,
			needsMask: w,
			maskTextClass: o,
			maskTextSelector: s,
			skipChild: c,
			inlineStylesheet: l,
			maskInputOptions: u,
			maskTextFn: d,
			maskInputFn: f,
			slimDOMOptions: p,
			dataURLOptions: m,
			inlineImages: h,
			recordCanvas: g,
			preserveWhiteSpace: T,
			onSerialize: _,
			onIframeLoad: v,
			iframeLoadTimeout: y,
			onStylesheetLoad: b,
			stylesheetLoadTimeout: x,
			keepIframeSrcFn: S,
			cssCaptured: !1
		};
		if (O.type !== P.Element || O.tagName !== "textarea" || O.attributes.value === void 0) {
			O.type === P.Element && O.attributes._cssText !== void 0 && typeof O.attributes._cssText == "string" && (t.cssCaptured = !0);
			for (let n of Array.from(I.childNodes(e))) {
				let e = bn(n, t);
				e && O.childNodes.push(e);
			}
		}
		let C = null;
		if (vt(e) && (C = I.shadowRoot(e))) for (let e of Array.from(I.childNodes(C))) {
			let n = bn(e, t);
			n && (bt(C) && (n.isShadow = !0), O.childNodes.push(n));
		}
	}
	let ne = I.parentNode(e);
	return ne && yt(ne) && bt(ne) && (O.isShadow = !0), O.type === P.Element && O.tagName === "iframe" && fn(e, () => {
		let t = e.contentDocument;
		if (t && v) {
			let n = bn(t, {
				doc: t,
				mirror: r,
				blockClass: i,
				blockSelector: a,
				needsMask: w,
				maskTextClass: o,
				maskTextSelector: s,
				skipChild: !1,
				inlineStylesheet: l,
				maskInputOptions: u,
				maskTextFn: d,
				maskInputFn: f,
				slimDOMOptions: p,
				dataURLOptions: m,
				inlineImages: h,
				recordCanvas: g,
				preserveWhiteSpace: T,
				onSerialize: _,
				onIframeLoad: v,
				iframeLoadTimeout: y,
				onStylesheetLoad: b,
				stylesheetLoadTimeout: x,
				keepIframeSrcFn: S
			});
			n && v(e, n);
		}
	}, y), O.type === P.Element && O.tagName === "link" && typeof O.attributes.rel == "string" && (O.attributes.rel === "stylesheet" || O.attributes.rel === "preload" && typeof O.attributes.href == "string" && It(O.attributes.href) === "css") && pn(e, () => {
		if (b) {
			let t = bn(e, {
				doc: n,
				mirror: r,
				blockClass: i,
				blockSelector: a,
				needsMask: w,
				maskTextClass: o,
				maskTextSelector: s,
				skipChild: !1,
				inlineStylesheet: l,
				maskInputOptions: u,
				maskTextFn: d,
				maskInputFn: f,
				slimDOMOptions: p,
				dataURLOptions: m,
				inlineImages: h,
				recordCanvas: g,
				preserveWhiteSpace: T,
				onSerialize: _,
				onIframeLoad: v,
				iframeLoadTimeout: y,
				onStylesheetLoad: b,
				stylesheetLoadTimeout: x,
				keepIframeSrcFn: S
			});
			t && b(e, t);
		}
	}, x), O;
}
function xn(e, t) {
	let { mirror: n = new Ot(), blockClass: r = "rr-block", blockSelector: i = null, maskTextClass: a = "rr-mask", maskTextSelector: o = null, inlineStylesheet: s = !0, inlineImages: c = !1, recordCanvas: l = !1, maskAllInputs: u = !1, maskTextFn: d, maskInputFn: f, slimDOM: p = !1, dataURLOptions: m, preserveWhiteSpace: h, onSerialize: g, onIframeLoad: _, iframeLoadTimeout: v, onStylesheetLoad: y, stylesheetLoadTimeout: b, keepIframeSrcFn: x = () => !1 } = t;
	return bn(e, {
		doc: e,
		mirror: n,
		blockClass: r,
		blockSelector: i,
		maskTextClass: a,
		maskTextSelector: o,
		skipChild: !1,
		inlineStylesheet: s,
		maskInputOptions: u === !0 ? {
			color: !0,
			date: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0,
			textarea: !0,
			select: !0,
			password: !0
		} : u === !1 ? { password: !0 } : u,
		maskTextFn: d,
		maskInputFn: f,
		slimDOMOptions: vn(p),
		dataURLOptions: m,
		inlineImages: c,
		recordCanvas: l,
		preserveWhiteSpace: h,
		onSerialize: g,
		onIframeLoad: _,
		iframeLoadTimeout: v,
		onStylesheetLoad: y,
		stylesheetLoadTimeout: b,
		keepIframeSrcFn: x,
		newlyAddedElement: !1
	});
}
var Sn = /* @__PURE__ */ RegExp("(max|min)-device-(width|height)", "g"), Cn = {
	postcssPlugin: "postcss-custom-selectors",
	prepare() {
		return {
			postcssPlugin: "postcss-custom-selectors",
			AtRule: function(e) {
				e.params.match(Sn) && (e.params = e.params.replace(Sn, "$1-$2"));
			}
		};
	}
}, wn = {
	postcssPlugin: "postcss-hover-classes",
	prepare: function() {
		let e = [];
		return { Rule: function(t) {
			e.indexOf(t) === -1 && (e.push(t), t.selectors.forEach(function(e) {
				e.includes(":hover") && (t.selector += ",\n" + e.replace(/:hover/g, ".\\:hover"));
			}));
		} };
	}
};
function Tn(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function En(e) {
	if (e.__esModule) return e;
	var t = e.default;
	if (typeof t == "function") {
		var n = function e() {
			return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
		};
		n.prototype = t.prototype;
	} else n = {};
	return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(t) {
		var r = Object.getOwnPropertyDescriptor(e, t);
		Object.defineProperty(n, t, r.get ? r : {
			enumerable: !0,
			get: function() {
				return e[t];
			}
		});
	}), n;
}
var Dn = { exports: {} }, On;
function kn() {
	if (On) return Dn.exports;
	On = 1;
	var e = String, t = function() {
		return {
			isColorSupported: !1,
			reset: e,
			bold: e,
			dim: e,
			italic: e,
			underline: e,
			inverse: e,
			hidden: e,
			strikethrough: e,
			black: e,
			red: e,
			green: e,
			yellow: e,
			blue: e,
			magenta: e,
			cyan: e,
			white: e,
			gray: e,
			bgBlack: e,
			bgRed: e,
			bgGreen: e,
			bgYellow: e,
			bgBlue: e,
			bgMagenta: e,
			bgCyan: e,
			bgWhite: e
		};
	};
	return Dn.exports = t(), Dn.exports.createColors = t, Dn.exports;
}
var An = /* @__PURE__ */ En(/* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: {}
}, Symbol.toStringTag, { value: "Module" }))), jn, Mn;
function Nn() {
	if (Mn) return jn;
	Mn = 1;
	let e = /* @__PURE__ */ kn(), t = An;
	class n extends Error {
		constructor(e, t, r, i, a, o) {
			super(e), this.name = "CssSyntaxError", this.reason = e, a && (this.file = a), i && (this.source = i), o && (this.plugin = o), t !== void 0 && r !== void 0 && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, n);
		}
		setMessage() {
			this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", this.line !== void 0 && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
		}
		showSourceCode(n) {
			if (!this.source) return "";
			let r = this.source;
			n ??= e.isColorSupported, t && n && (r = t(r));
			let i = r.split(/\r?\n/), a = Math.max(this.line - 3, 0), o = Math.min(this.line + 2, i.length), s = String(o).length, c, l;
			if (n) {
				let { bold: t, gray: n, red: r } = e.createColors(!0);
				c = (e) => t(r(e)), l = (e) => n(e);
			} else c = l = (e) => e;
			return i.slice(a, o).map((e, t) => {
				let n = a + 1 + t, r = " " + (" " + n).slice(-s) + " | ";
				if (n === this.line) {
					let t = l(r.replace(/\d/g, " ")) + e.slice(0, this.column - 1).replace(/[^\t]/g, " ");
					return c(">") + l(r) + e + "\n " + t + c("^");
				}
				return " " + l(r) + e;
			}).join("\n");
		}
		toString() {
			let e = this.showSourceCode();
			return e &&= "\n\n" + e + "\n", this.name + ": " + this.message + e;
		}
	}
	return jn = n, n.default = n, jn;
}
var Pn = {}, Fn;
function In() {
	return Fn ? Pn : (Fn = 1, Pn.isClean = Symbol("isClean"), Pn.my = Symbol("my"), Pn);
}
var Ln, Rn;
function zn() {
	if (Rn) return Ln;
	Rn = 1;
	let e = {
		after: "\n",
		beforeClose: "\n",
		beforeComment: "\n",
		beforeDecl: "\n",
		beforeOpen: " ",
		beforeRule: "\n",
		colon: ": ",
		commentLeft: " ",
		commentRight: " ",
		emptyBody: "",
		indent: "    ",
		semicolon: !1
	};
	function t(e) {
		return e[0].toUpperCase() + e.slice(1);
	}
	class n {
		constructor(e) {
			this.builder = e;
		}
		atrule(e, t) {
			let n = "@" + e.name, r = e.params ? this.rawValue(e, "params") : "";
			if (e.raws.afterName === void 0 ? r && (n += " ") : n += e.raws.afterName, e.nodes) this.block(e, n + r);
			else {
				let i = (e.raws.between || "") + (t ? ";" : "");
				this.builder(n + r + i, e);
			}
		}
		beforeAfter(e, t) {
			let n;
			n = e.type === "decl" ? this.raw(e, null, "beforeDecl") : e.type === "comment" ? this.raw(e, null, "beforeComment") : t === "before" ? this.raw(e, null, "beforeRule") : this.raw(e, null, "beforeClose");
			let r = e.parent, i = 0;
			for (; r && r.type !== "root";) i += 1, r = r.parent;
			if (n.includes("\n")) {
				let t = this.raw(e, null, "indent");
				if (t.length) for (let e = 0; e < i; e++) n += t;
			}
			return n;
		}
		block(e, t) {
			let n = this.raw(e, "between", "beforeOpen");
			this.builder(t + n + "{", e, "start");
			let r;
			e.nodes && e.nodes.length ? (this.body(e), r = this.raw(e, "after")) : r = this.raw(e, "after", "emptyBody"), r && this.builder(r), this.builder("}", e, "end");
		}
		body(e) {
			let t = e.nodes.length - 1;
			for (; t > 0 && e.nodes[t].type === "comment";) --t;
			let n = this.raw(e, "semicolon");
			for (let r = 0; r < e.nodes.length; r++) {
				let i = e.nodes[r], a = this.raw(i, "before");
				a && this.builder(a), this.stringify(i, t !== r || n);
			}
		}
		comment(e) {
			let t = this.raw(e, "left", "commentLeft"), n = this.raw(e, "right", "commentRight");
			this.builder("/*" + t + e.text + n + "*/", e);
		}
		decl(e, t) {
			let n = this.raw(e, "between", "colon"), r = e.prop + n + this.rawValue(e, "value");
			e.important && (r += e.raws.important || " !important"), t && (r += ";"), this.builder(r, e);
		}
		document(e) {
			this.body(e);
		}
		raw(n, r, i) {
			let a;
			if (i ||= r, r && (a = n.raws[r], a !== void 0)) return a;
			let o = n.parent;
			if (i === "before" && (!o || o.type === "root" && o.first === n || o && o.type === "document")) return "";
			if (!o) return e[i];
			let s = n.root();
			if (s.rawCache ||= {}, s.rawCache[i] !== void 0) return s.rawCache[i];
			if (i === "before" || i === "after") return this.beforeAfter(n, i);
			{
				let e = "raw" + t(i);
				this[e] ? a = this[e](s, n) : s.walk((e) => {
					if (a = e.raws[r], a !== void 0) return !1;
				});
			}
			return a === void 0 && (a = e[i]), s.rawCache[i] = a, a;
		}
		rawBeforeClose(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length > 0 && e.raws.after !== void 0) return t = e.raws.after, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawBeforeComment(e, t) {
			let n;
			return e.walkComments((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeDecl") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeDecl(e, t) {
			let n;
			return e.walkDecls((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeRule") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeOpen(e) {
			let t;
			return e.walk((e) => {
				if (e.type !== "decl" && (t = e.raws.between, t !== void 0)) return !1;
			}), t;
		}
		rawBeforeRule(e) {
			let t;
			return e.walk((n) => {
				if (n.nodes && (n.parent !== e || e.first !== n) && n.raws.before !== void 0) return t = n.raws.before, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawColon(e) {
			let t;
			return e.walkDecls((e) => {
				if (e.raws.between !== void 0) return t = e.raws.between.replace(/[^\s:]/g, ""), !1;
			}), t;
		}
		rawEmptyBody(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length === 0 && (t = e.raws.after, t !== void 0)) return !1;
			}), t;
		}
		rawIndent(e) {
			if (e.raws.indent) return e.raws.indent;
			let t;
			return e.walk((n) => {
				let r = n.parent;
				if (r && r !== e && r.parent && r.parent === e && n.raws.before !== void 0) {
					let e = n.raws.before.split("\n");
					return t = e[e.length - 1], t = t.replace(/\S/g, ""), !1;
				}
			}), t;
		}
		rawSemicolon(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length && e.last.type === "decl" && (t = e.raws.semicolon, t !== void 0)) return !1;
			}), t;
		}
		rawValue(e, t) {
			let n = e[t], r = e.raws[t];
			return r && r.value === n ? r.raw : n;
		}
		root(e) {
			this.body(e), e.raws.after && this.builder(e.raws.after);
		}
		rule(e) {
			this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
		}
		stringify(e, t) {
			if (!this[e.type]) throw Error("Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier.");
			this[e.type](e, t);
		}
	}
	return Ln = n, n.default = n, Ln;
}
var Bn, Vn;
function Hn() {
	if (Vn) return Bn;
	Vn = 1;
	let e = zn();
	function t(t, n) {
		new e(n).stringify(t);
	}
	return Bn = t, t.default = t, Bn;
}
var Un, Wn;
function Gn() {
	if (Wn) return Un;
	Wn = 1;
	let { isClean: e, my: t } = In(), n = Nn(), r = zn(), i = Hn();
	function a(e, t) {
		let n = new e.constructor();
		for (let r in e) {
			if (!Object.prototype.hasOwnProperty.call(e, r) || r === "proxyCache") continue;
			let i = e[r], o = typeof i;
			r === "parent" && o === "object" ? t && (n[r] = t) : r === "source" ? n[r] = i : Array.isArray(i) ? n[r] = i.map((e) => a(e, n)) : (o === "object" && i !== null && (i = a(i)), n[r] = i);
		}
		return n;
	}
	class o {
		constructor(n = {}) {
			this.raws = {}, this[e] = !1, this[t] = !0;
			for (let e in n) if (e === "nodes") {
				this.nodes = [];
				for (let t of n[e]) typeof t.clone == "function" ? this.append(t.clone()) : this.append(t);
			} else this[e] = n[e];
		}
		addToError(e) {
			if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
				let t = this.source;
				e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`);
			}
			return e;
		}
		after(e) {
			return this.parent.insertAfter(this, e), this;
		}
		assign(e = {}) {
			for (let t in e) this[t] = e[t];
			return this;
		}
		before(e) {
			return this.parent.insertBefore(this, e), this;
		}
		cleanRaws(e) {
			delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
		}
		clone(e = {}) {
			let t = a(this);
			for (let n in e) t[n] = e[n];
			return t;
		}
		cloneAfter(e = {}) {
			let t = this.clone(e);
			return this.parent.insertAfter(this, t), t;
		}
		cloneBefore(e = {}) {
			let t = this.clone(e);
			return this.parent.insertBefore(this, t), t;
		}
		error(e, t = {}) {
			if (this.source) {
				let { end: n, start: r } = this.rangeBy(t);
				return this.source.input.error(e, {
					column: r.column,
					line: r.line
				}, {
					column: n.column,
					line: n.line
				}, t);
			}
			return new n(e);
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || t === "text") && e.markDirty(), !0);
				}
			};
		}
		markDirty() {
			if (this[e]) {
				this[e] = !1;
				let t = this;
				for (; t = t.parent;) t[e] = !1;
			}
		}
		next() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e + 1];
		}
		positionBy(e, t) {
			let n = this.source.start;
			if (e.index) n = this.positionInside(e.index, t);
			else if (e.word) {
				t = this.toString();
				let r = t.indexOf(e.word);
				r !== -1 && (n = this.positionInside(r, t));
			}
			return n;
		}
		positionInside(e, t) {
			let n = t || this.toString(), r = this.source.start.column, i = this.source.start.line;
			for (let t = 0; t < e; t++) n[t] === "\n" ? (r = 1, i += 1) : r += 1;
			return {
				column: r,
				line: i
			};
		}
		prev() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e - 1];
		}
		rangeBy(e) {
			let t = {
				column: this.source.start.column,
				line: this.source.start.line
			}, n = this.source.end ? {
				column: this.source.end.column + 1,
				line: this.source.end.line
			} : {
				column: t.column + 1,
				line: t.line
			};
			if (e.word) {
				let r = this.toString(), i = r.indexOf(e.word);
				i !== -1 && (t = this.positionInside(i, r), n = this.positionInside(i + e.word.length, r));
			} else e.start ? t = {
				column: e.start.column,
				line: e.start.line
			} : e.index && (t = this.positionInside(e.index)), e.end ? n = {
				column: e.end.column,
				line: e.end.line
			} : typeof e.endIndex == "number" ? n = this.positionInside(e.endIndex) : e.index && (n = this.positionInside(e.index + 1));
			return (n.line < t.line || n.line === t.line && n.column <= t.column) && (n = {
				column: t.column + 1,
				line: t.line
			}), {
				end: n,
				start: t
			};
		}
		raw(e, t) {
			return new r().raw(this, e, t);
		}
		remove() {
			return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
		}
		replaceWith(...e) {
			if (this.parent) {
				let t = this, n = !1;
				for (let r of e) r === this ? n = !0 : n ? (this.parent.insertAfter(t, r), t = r) : this.parent.insertBefore(t, r);
				n || this.remove();
			}
			return this;
		}
		root() {
			let e = this;
			for (; e.parent && e.parent.type !== "document";) e = e.parent;
			return e;
		}
		toJSON(e, t) {
			let n = {}, r = t == null;
			t ||= /* @__PURE__ */ new Map();
			let i = 0;
			for (let e in this) {
				if (!Object.prototype.hasOwnProperty.call(this, e) || e === "parent" || e === "proxyCache") continue;
				let r = this[e];
				if (Array.isArray(r)) n[e] = r.map((e) => typeof e == "object" && e.toJSON ? e.toJSON(null, t) : e);
				else if (typeof r == "object" && r.toJSON) n[e] = r.toJSON(null, t);
				else if (e === "source") {
					let a = t.get(r.input);
					a ?? (a = i, t.set(r.input, i), i++), n[e] = {
						end: r.end,
						inputId: a,
						start: r.start
					};
				} else n[e] = r;
			}
			return r && (n.inputs = [...t.keys()].map((e) => e.toJSON())), n;
		}
		toProxy() {
			return this.proxyCache ||= new Proxy(this, this.getProxyProcessor()), this.proxyCache;
		}
		toString(e = i) {
			e.stringify && (e = e.stringify);
			let t = "";
			return e(this, (e) => {
				t += e;
			}), t;
		}
		warn(e, t, n) {
			let r = { node: this };
			for (let e in n) r[e] = n[e];
			return e.warn(t, r);
		}
		get proxyOf() {
			return this;
		}
	}
	return Un = o, o.default = o, Un;
}
var Kn, qn;
function Jn() {
	if (qn) return Kn;
	qn = 1;
	let e = Gn();
	class t extends e {
		constructor(e) {
			e && e.value !== void 0 && typeof e.value != "string" && (e = {
				...e,
				value: String(e.value)
			}), super(e), this.type = "decl";
		}
		get variable() {
			return this.prop.startsWith("--") || this.prop[0] === "$";
		}
	}
	return Kn = t, t.default = t, Kn;
}
var Yn, Xn;
function Zn() {
	return Xn ? Yn : (Xn = 1, Yn = {
		nanoid: (e = 21) => {
			let t = "", n = e;
			for (; n--;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[Math.random() * 64 | 0];
			return t;
		},
		customAlphabet: (e, t = 21) => (n = t) => {
			let r = "", i = n;
			for (; i--;) r += e[Math.random() * e.length | 0];
			return r;
		}
	}, Yn);
}
var Qn, $n;
function er() {
	if ($n) return Qn;
	$n = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = An, { existsSync: n, readFileSync: r } = An, { dirname: i, join: a } = An;
	function o(e) {
		return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
	}
	class s {
		constructor(e, t) {
			if (t.map === !1) return;
			this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
			let n = t.map ? t.map.prev : void 0, r = this.loadMap(t.from, n);
			!this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = i(this.mapFile)), r && (this.text = r);
		}
		consumer() {
			return this.consumerCache ||= new e(this.text), this.consumerCache;
		}
		decodeInline(e) {
			let t = /^data:application\/json;charset=utf-?8;base64,/, n = /^data:application\/json;base64,/;
			if (/^data:application\/json;charset=utf-?8,/.test(e) || /^data:application\/json,/.test(e)) return decodeURIComponent(e.substr(RegExp.lastMatch.length));
			if (t.test(e) || n.test(e)) return o(e.substr(RegExp.lastMatch.length));
			let r = e.match(/data:application\/json;([^,]+),/)[1];
			throw Error("Unsupported source map encoding " + r);
		}
		getAnnotationURL(e) {
			return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
		}
		isMap(e) {
			return typeof e == "object" ? typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections) : !1;
		}
		loadAnnotation(e) {
			let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
			if (!t) return;
			let n = e.lastIndexOf(t.pop()), r = e.indexOf("*/", n);
			n > -1 && r > -1 && (this.annotation = this.getAnnotationURL(e.substring(n, r)));
		}
		loadFile(e) {
			if (this.root = i(e), n(e)) return this.mapFile = e, r(e, "utf-8").toString().trim();
		}
		loadMap(n, r) {
			if (r === !1) return !1;
			if (r) {
				if (typeof r == "string") return r;
				if (typeof r == "function") {
					let e = r(n);
					if (e) {
						let t = this.loadFile(e);
						if (!t) throw Error("Unable to load previous source map: " + e.toString());
						return t;
					}
				} else if (r instanceof e) return t.fromSourceMap(r).toString();
				else if (r instanceof t) return r.toString();
				else if (this.isMap(r)) return JSON.stringify(r);
				else throw Error("Unsupported previous source map format: " + r.toString());
			} else if (this.inline) return this.decodeInline(this.annotation);
			else if (this.annotation) {
				let e = this.annotation;
				return n && (e = a(i(n), e)), this.loadFile(e);
			}
		}
		startWith(e, t) {
			return e ? e.substr(0, t.length) === t : !1;
		}
		withContent() {
			return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
		}
	}
	return Qn = s, s.default = s, Qn;
}
var tr, nr;
function rr() {
	if (nr) return tr;
	nr = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = An, { fileURLToPath: n, pathToFileURL: r } = An, { isAbsolute: i, resolve: a } = An, { nanoid: o } = /* @__PURE__ */ Zn(), s = An, c = Nn(), l = er(), u = Symbol("fromOffsetCache"), d = !!(e && t), f = !!(a && i);
	class p {
		constructor(e, t = {}) {
			if (e == null || typeof e == "object" && !e.toString) throw Error(`PostCSS received ${e} instead of CSS string`);
			if (this.css = e.toString(), this.css[0] === "﻿" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (this.file = !f || /^\w+:\/\//.test(t.from) || i(t.from) ? t.from : a(t.from)), f && d) {
				let e = new l(this.css, t);
				if (e.text) {
					this.map = e;
					let t = e.consumer().file;
					!this.file && t && (this.file = this.mapResolve(t));
				}
			}
			this.file || (this.id = "<input css " + o(6) + ">"), this.map && (this.map.file = this.from);
		}
		error(e, t, n, i = {}) {
			let a, o, s;
			if (t && typeof t == "object") {
				let e = t, r = n;
				if (typeof e.offset == "number") {
					let r = this.fromOffset(e.offset);
					t = r.line, n = r.col;
				} else t = e.line, n = e.column;
				if (typeof r.offset == "number") {
					let e = this.fromOffset(r.offset);
					o = e.line, s = e.col;
				} else o = r.line, s = r.column;
			} else if (!n) {
				let e = this.fromOffset(t);
				t = e.line, n = e.col;
			}
			let l = this.origin(t, n, o, s);
			return a = l ? new c(e, l.endLine === void 0 ? l.line : {
				column: l.column,
				line: l.line
			}, l.endLine === void 0 ? l.column : {
				column: l.endColumn,
				line: l.endLine
			}, l.source, l.file, i.plugin) : new c(e, o === void 0 ? t : {
				column: n,
				line: t
			}, o === void 0 ? n : {
				column: s,
				line: o
			}, this.css, this.file, i.plugin), a.input = {
				column: n,
				endColumn: s,
				endLine: o,
				line: t,
				source: this.css
			}, this.file && (r && (a.input.url = r(this.file).toString()), a.input.file = this.file), a;
		}
		fromOffset(e) {
			let t, n;
			if (this[u]) n = this[u];
			else {
				let e = this.css.split("\n");
				n = Array(e.length);
				let t = 0;
				for (let r = 0, i = e.length; r < i; r++) n[r] = t, t += e[r].length + 1;
				this[u] = n;
			}
			t = n[n.length - 1];
			let r = 0;
			if (e >= t) r = n.length - 1;
			else {
				let t = n.length - 2, i;
				for (; r < t;) if (i = r + (t - r >> 1), e < n[i]) t = i - 1;
				else if (e >= n[i + 1]) r = i + 1;
				else {
					r = i;
					break;
				}
			}
			return {
				col: e - n[r] + 1,
				line: r + 1
			};
		}
		mapResolve(e) {
			return /^\w+:\/\//.test(e) ? e : a(this.map.consumer().sourceRoot || this.map.root || ".", e);
		}
		origin(e, t, a, o) {
			if (!this.map) return !1;
			let s = this.map.consumer(), c = s.originalPositionFor({
				column: t,
				line: e
			});
			if (!c.source) return !1;
			let l;
			typeof a == "number" && (l = s.originalPositionFor({
				column: o,
				line: a
			}));
			let u;
			u = i(c.source) ? r(c.source) : new URL(c.source, this.map.consumer().sourceRoot || r(this.map.mapFile));
			let d = {
				column: c.column,
				endColumn: l && l.column,
				endLine: l && l.line,
				line: c.line,
				url: u.toString()
			};
			if (u.protocol === "file:") {
				if (n) d.file = n(u);
				else throw Error("file: protocol is not available in this PostCSS build");
			}
			let f = s.sourceContentFor(c.source);
			return f && (d.source = f), d;
		}
		toJSON() {
			let e = {};
			for (let t of [
				"hasBOM",
				"css",
				"file",
				"id"
			]) this[t] != null && (e[t] = this[t]);
			return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
		}
		get from() {
			return this.file || this.id;
		}
	}
	return tr = p, p.default = p, s && s.registerInput && s.registerInput(p), tr;
}
var ir, ar;
function or() {
	if (ar) return ir;
	ar = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = An, { dirname: n, relative: r, resolve: i, sep: a } = An, { pathToFileURL: o } = An, s = rr(), c = !!(e && t), l = !!(n && i && r && a);
	class u {
		constructor(e, t, n, r) {
			this.stringify = e, this.mapOpts = n.map || {}, this.root = t, this.opts = n, this.css = r, this.originalCSS = r, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
		}
		addAnnotation() {
			let e;
			e = this.isInline() ? "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + ".map";
			let t = "\n";
			this.css.includes("\r\n") && (t = "\r\n"), this.css += t + "/*# sourceMappingURL=" + e + " */";
		}
		applyPrevMaps() {
			for (let t of this.previous()) {
				let r = this.toUrl(this.path(t.file)), i = t.root || n(t.file), a;
				this.mapOpts.sourcesContent === !1 ? (a = new e(t.text), a.sourcesContent && (a.sourcesContent = null)) : a = t.consumer(), this.map.applySourceMap(a, r, this.toUrl(this.path(i)));
			}
		}
		clearAnnotation() {
			if (this.mapOpts.annotation !== !1) {
				if (this.root) {
					let e;
					for (let t = this.root.nodes.length - 1; t >= 0; t--) e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
				} else this.css &&= this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, "");
			}
		}
		generate() {
			if (this.clearAnnotation(), l && c && this.isMap()) return this.generateMap();
			{
				let e = "";
				return this.stringify(this.root, (t) => {
					e += t;
				}), [e];
			}
		}
		generateMap() {
			if (this.root) this.generateString();
			else if (this.previous().length === 1) {
				let e = this.previous()[0].consumer();
				e.file = this.outputFile(), this.map = t.fromSourceMap(e, { ignoreInvalidMapping: !0 });
			} else this.map = new t({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			}), this.map.addMapping({
				generated: {
					column: 0,
					line: 1
				},
				original: {
					column: 0,
					line: 1
				},
				source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
			});
			return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
		}
		generateString() {
			this.css = "", this.map = new t({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			});
			let e = 1, n = 1, r = "<no source>", i = {
				generated: {
					column: 0,
					line: 0
				},
				original: {
					column: 0,
					line: 0
				},
				source: ""
			}, a, o;
			this.stringify(this.root, (t, s, c) => {
				if (this.css += t, s && c !== "end" && (i.generated.line = e, i.generated.column = n - 1, s.source && s.source.start ? (i.source = this.sourcePath(s), i.original.line = s.source.start.line, i.original.column = s.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), a = t.match(/\n/g), a ? (e += a.length, o = t.lastIndexOf("\n"), n = t.length - o) : n += t.length, s && c !== "start") {
					let t = s.parent || { raws: {} };
					(!(s.type === "decl" || s.type === "atrule" && !s.nodes) || s !== t.last || t.raws.semicolon) && (s.source && s.source.end ? (i.source = this.sourcePath(s), i.original.line = s.source.end.line, i.original.column = s.source.end.column - 1, i.generated.line = e, i.generated.column = n - 2, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, i.generated.line = e, i.generated.column = n - 1, this.map.addMapping(i)));
				}
			});
		}
		isAnnotation() {
			return this.isInline() ? !0 : this.mapOpts.annotation === void 0 ? !this.previous().length || this.previous().some((e) => e.annotation) : this.mapOpts.annotation;
		}
		isInline() {
			if (this.mapOpts.inline !== void 0) return this.mapOpts.inline;
			let e = this.mapOpts.annotation;
			return e !== void 0 && e !== !0 ? !1 : !this.previous().length || this.previous().some((e) => e.inline);
		}
		isMap() {
			return this.opts.map === void 0 ? this.previous().length > 0 : !!this.opts.map;
		}
		isSourcesContent() {
			return this.mapOpts.sourcesContent === void 0 ? !this.previous().length || this.previous().some((e) => e.withContent()) : this.mapOpts.sourcesContent;
		}
		outputFile() {
			return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
		}
		path(e) {
			if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
			let t = this.memoizedPaths.get(e);
			if (t) return t;
			let a = this.opts.to ? n(this.opts.to) : ".";
			typeof this.mapOpts.annotation == "string" && (a = n(i(a, this.mapOpts.annotation)));
			let o = r(a, e);
			return this.memoizedPaths.set(e, o), o;
		}
		previous() {
			if (!this.previousMaps) {
				if (this.previousMaps = [], this.root) this.root.walk((e) => {
					if (e.source && e.source.input.map) {
						let t = e.source.input.map;
						this.previousMaps.includes(t) || this.previousMaps.push(t);
					}
				});
				else {
					let e = new s(this.originalCSS, this.opts);
					e.map && this.previousMaps.push(e.map);
				}
			}
			return this.previousMaps;
		}
		setSourcesContent() {
			let e = {};
			if (this.root) this.root.walk((t) => {
				if (t.source) {
					let n = t.source.input.from;
					if (n && !e[n]) {
						e[n] = !0;
						let r = this.usesFileUrls ? this.toFileUrl(n) : this.toUrl(this.path(n));
						this.map.setSourceContent(r, t.source.input.css);
					}
				}
			});
			else if (this.css) {
				let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
				this.map.setSourceContent(e, this.css);
			}
		}
		sourcePath(e) {
			return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
		}
		toBase64(e) {
			return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
		}
		toFileUrl(e) {
			let t = this.memoizedFileURLs.get(e);
			if (t) return t;
			if (o) {
				let t = o(e).toString();
				return this.memoizedFileURLs.set(e, t), t;
			}
			throw Error("`map.absolute` option is not available in this PostCSS build");
		}
		toUrl(e) {
			let t = this.memoizedURLs.get(e);
			if (t) return t;
			a === "\\" && (e = e.replace(/\\/g, "/"));
			let n = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
			return this.memoizedURLs.set(e, n), n;
		}
	}
	return ir = u, ir;
}
var sr, cr;
function lr() {
	if (cr) return sr;
	cr = 1;
	let e = Gn();
	class t extends e {
		constructor(e) {
			super(e), this.type = "comment";
		}
	}
	return sr = t, t.default = t, sr;
}
var ur, dr;
function fr() {
	if (dr) return ur;
	dr = 1;
	let { isClean: e, my: t } = In(), n = Jn(), r = lr(), i = Gn(), a, o, s, c;
	function l(e) {
		return e.map((e) => (e.nodes &&= l(e.nodes), delete e.source, e));
	}
	function u(t) {
		if (t[e] = !1, t.proxyOf.nodes) for (let e of t.proxyOf.nodes) u(e);
	}
	class d extends i {
		append(...e) {
			for (let t of e) {
				let e = this.normalize(t, this.last);
				for (let t of e) this.proxyOf.nodes.push(t);
			}
			return this.markDirty(), this;
		}
		cleanRaws(e) {
			if (super.cleanRaws(e), this.nodes) for (let t of this.nodes) t.cleanRaws(e);
		}
		each(e) {
			if (!this.proxyOf.nodes) return;
			let t = this.getIterator(), n, r;
			for (; this.indexes[t] < this.proxyOf.nodes.length && (n = this.indexes[t], r = e(this.proxyOf.nodes[n], n), r !== !1);) this.indexes[t] += 1;
			return delete this.indexes[t], r;
		}
		every(e) {
			return this.nodes.every(e);
		}
		getIterator() {
			this.lastEach ||= 0, this.indexes ||= {}, this.lastEach += 1;
			let e = this.lastEach;
			return this.indexes[e] = 0, e;
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...n) => e[t](...n.map((e) => typeof e == "function" ? (t, n) => e(t.toProxy(), n) : e)) : t === "every" || t === "some" ? (n) => e[t]((e, ...t) => n(e.toProxy(), ...t)) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((e) => e.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "name" || t === "params" || t === "selector") && e.markDirty(), !0);
				}
			};
		}
		index(e) {
			return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
		}
		insertAfter(e, t) {
			let n = this.index(e), r = this.normalize(t, this.proxyOf.nodes[n]).reverse();
			n = this.index(e);
			for (let e of r) this.proxyOf.nodes.splice(n + 1, 0, e);
			let i;
			for (let e in this.indexes) i = this.indexes[e], n < i && (this.indexes[e] = i + r.length);
			return this.markDirty(), this;
		}
		insertBefore(e, t) {
			let n = this.index(e), r = n === 0 && "prepend", i = this.normalize(t, this.proxyOf.nodes[n], r).reverse();
			n = this.index(e);
			for (let e of i) this.proxyOf.nodes.splice(n, 0, e);
			let a;
			for (let e in this.indexes) a = this.indexes[e], n <= a && (this.indexes[e] = a + i.length);
			return this.markDirty(), this;
		}
		normalize(i, c) {
			if (typeof i == "string") i = l(a(i).nodes);
			else if (i === void 0) i = [];
			else if (Array.isArray(i)) {
				i = i.slice(0);
				for (let e of i) e.parent && e.parent.removeChild(e, "ignore");
			} else if (i.type === "root" && this.type !== "document") {
				i = i.nodes.slice(0);
				for (let e of i) e.parent && e.parent.removeChild(e, "ignore");
			} else if (i.type) i = [i];
			else if (i.prop) {
				if (i.value === void 0) throw Error("Value field is missed in node creation");
				typeof i.value != "string" && (i.value = String(i.value)), i = [new n(i)];
			} else if (i.selector) i = [new o(i)];
			else if (i.name) i = [new s(i)];
			else if (i.text) i = [new r(i)];
			else throw Error("Unknown node type in node creation");
			return i.map((n) => (n[t] || d.rebuild(n), n = n.proxyOf, n.parent && n.parent.removeChild(n), n[e] && u(n), n.raws.before === void 0 && c && c.raws.before !== void 0 && (n.raws.before = c.raws.before.replace(/\S/g, "")), n.parent = this.proxyOf, n));
		}
		prepend(...e) {
			e = e.reverse();
			for (let t of e) {
				let e = this.normalize(t, this.first, "prepend").reverse();
				for (let t of e) this.proxyOf.nodes.unshift(t);
				for (let t in this.indexes) this.indexes[t] = this.indexes[t] + e.length;
			}
			return this.markDirty(), this;
		}
		push(e) {
			return e.parent = this, this.proxyOf.nodes.push(e), this;
		}
		removeAll() {
			for (let e of this.proxyOf.nodes) e.parent = void 0;
			return this.proxyOf.nodes = [], this.markDirty(), this;
		}
		removeChild(e) {
			e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
			let t;
			for (let n in this.indexes) t = this.indexes[n], t >= e && (this.indexes[n] = t - 1);
			return this.markDirty(), this;
		}
		replaceValues(e, t, n) {
			return n || (n = t, t = {}), this.walkDecls((r) => {
				(!t.props || t.props.includes(r.prop)) && (!t.fast || r.value.includes(t.fast)) && (r.value = r.value.replace(e, n));
			}), this.markDirty(), this;
		}
		some(e) {
			return this.nodes.some(e);
		}
		walk(e) {
			return this.each((t, n) => {
				let r;
				try {
					r = e(t, n);
				} catch (e) {
					throw t.addToError(e);
				}
				return r !== !1 && t.walk && (r = t.walk(e)), r;
			});
		}
		walkAtRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "atrule" && e.test(n.name)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "atrule" && n.name === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "atrule") return t(e, n);
			}));
		}
		walkComments(e) {
			return this.walk((t, n) => {
				if (t.type === "comment") return e(t, n);
			});
		}
		walkDecls(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "decl" && e.test(n.prop)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "decl" && n.prop === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "decl") return t(e, n);
			}));
		}
		walkRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "rule" && e.test(n.selector)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "rule" && n.selector === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "rule") return t(e, n);
			}));
		}
		get first() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
		}
		get last() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
		}
	}
	return d.registerParse = (e) => {
		a = e;
	}, d.registerRule = (e) => {
		o = e;
	}, d.registerAtRule = (e) => {
		s = e;
	}, d.registerRoot = (e) => {
		c = e;
	}, ur = d, d.default = d, d.rebuild = (e) => {
		e.type === "atrule" ? Object.setPrototypeOf(e, s.prototype) : e.type === "rule" ? Object.setPrototypeOf(e, o.prototype) : e.type === "decl" ? Object.setPrototypeOf(e, n.prototype) : e.type === "comment" ? Object.setPrototypeOf(e, r.prototype) : e.type === "root" && Object.setPrototypeOf(e, c.prototype), e[t] = !0, e.nodes && e.nodes.forEach((e) => {
			d.rebuild(e);
		});
	}, ur;
}
var pr, mr;
function hr() {
	if (mr) return pr;
	mr = 1;
	let e = fr(), t, n;
	class r extends e {
		constructor(e) {
			super({
				type: "document",
				...e
			}), this.nodes ||= [];
		}
		toResult(e = {}) {
			return new t(new n(), this, e).stringify();
		}
	}
	return r.registerLazyResult = (e) => {
		t = e;
	}, r.registerProcessor = (e) => {
		n = e;
	}, pr = r, r.default = r, pr;
}
var gr, _r;
function vr() {
	if (_r) return gr;
	_r = 1;
	let e = {};
	return gr = function(t) {
		e[t] || (e[t] = !0, typeof console < "u" && console.warn && console.warn(t));
	}, gr;
}
var yr, br;
function xr() {
	if (br) return yr;
	br = 1;
	class e {
		constructor(e, t = {}) {
			if (this.type = "warning", this.text = e, t.node && t.node.source) {
				let e = t.node.rangeBy(t);
				this.line = e.start.line, this.column = e.start.column, this.endLine = e.end.line, this.endColumn = e.end.column;
			}
			for (let e in t) this[e] = t[e];
		}
		toString() {
			return this.node ? this.node.error(this.text, {
				index: this.index,
				plugin: this.plugin,
				word: this.word
			}).message : this.plugin ? this.plugin + ": " + this.text : this.text;
		}
	}
	return yr = e, e.default = e, yr;
}
var Sr, Cr;
function wr() {
	if (Cr) return Sr;
	Cr = 1;
	let e = xr();
	class t {
		constructor(e, t, n) {
			this.processor = e, this.messages = [], this.root = t, this.opts = n, this.css = void 0, this.map = void 0;
		}
		toString() {
			return this.css;
		}
		warn(t, n = {}) {
			n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
			let r = new e(t, n);
			return this.messages.push(r), r;
		}
		warnings() {
			return this.messages.filter((e) => e.type === "warning");
		}
		get content() {
			return this.css;
		}
	}
	return Sr = t, t.default = t, Sr;
}
var Tr, Er;
function Dr() {
	if (Er) return Tr;
	Er = 1;
	let e = /[\t\n\f\r "#'()/;[\\\]{}]/g, t = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, n = /.[\r\n"'(/\\]/, r = /[\da-f]/i;
	return Tr = function(i, a = {}) {
		let o = i.css.valueOf(), s = a.ignoreErrors, c, l, u, d, f, p, m, h, g, _, v = o.length, y = 0, b = [], x = [];
		function S() {
			return y;
		}
		function C(e) {
			throw i.error("Unclosed " + e, y);
		}
		function ee() {
			return x.length === 0 && y >= v;
		}
		function w(i) {
			if (x.length) return x.pop();
			if (y >= v) return;
			let a = i ? i.ignoreUnclosed : !1;
			switch (c = o.charCodeAt(y), c) {
				case 10:
				case 32:
				case 9:
				case 13:
				case 12:
					l = y;
					do
						l += 1, c = o.charCodeAt(l);
					while (c === 32 || c === 10 || c === 9 || c === 13 || c === 12);
					_ = ["space", o.slice(y, l)], y = l - 1;
					break;
				case 91:
				case 93:
				case 123:
				case 125:
				case 58:
				case 59:
				case 41: {
					let e = String.fromCharCode(c);
					_ = [
						e,
						e,
						y
					];
					break;
				}
				case 40:
					if (h = b.length ? b.pop()[1] : "", g = o.charCodeAt(y + 1), h === "url" && g !== 39 && g !== 34 && g !== 32 && g !== 10 && g !== 9 && g !== 12 && g !== 13) {
						l = y;
						do {
							if (p = !1, l = o.indexOf(")", l + 1), l === -1) {
								if (s || a) {
									l = y;
									break;
								}
								C("bracket");
							}
							for (m = l; o.charCodeAt(m - 1) === 92;) --m, p = !p;
						} while (p);
						_ = [
							"brackets",
							o.slice(y, l + 1),
							y,
							l
						], y = l;
					} else l = o.indexOf(")", y + 1), d = o.slice(y, l + 1), l === -1 || n.test(d) ? _ = [
						"(",
						"(",
						y
					] : (_ = [
						"brackets",
						d,
						y,
						l
					], y = l);
					break;
				case 39:
				case 34:
					u = c === 39 ? "'" : "\"", l = y;
					do {
						if (p = !1, l = o.indexOf(u, l + 1), l === -1) {
							if (s || a) {
								l = y + 1;
								break;
							}
							C("string");
						}
						for (m = l; o.charCodeAt(m - 1) === 92;) --m, p = !p;
					} while (p);
					_ = [
						"string",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				case 64:
					e.lastIndex = y + 1, e.test(o), l = e.lastIndex === 0 ? o.length - 1 : e.lastIndex - 2, _ = [
						"at-word",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				case 92:
					for (l = y, f = !0; o.charCodeAt(l + 1) === 92;) l += 1, f = !f;
					if (c = o.charCodeAt(l + 1), f && c !== 47 && c !== 32 && c !== 10 && c !== 9 && c !== 13 && c !== 12 && (l += 1, r.test(o.charAt(l)))) {
						for (; r.test(o.charAt(l + 1));) l += 1;
						o.charCodeAt(l + 1) === 32 && (l += 1);
					}
					_ = [
						"word",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				default: c === 47 && o.charCodeAt(y + 1) === 42 ? (l = o.indexOf("*/", y + 2) + 1, l === 0 && (s || a ? l = o.length : C("comment")), _ = [
					"comment",
					o.slice(y, l + 1),
					y,
					l
				], y = l) : (t.lastIndex = y + 1, t.test(o), l = t.lastIndex === 0 ? o.length - 1 : t.lastIndex - 2, _ = [
					"word",
					o.slice(y, l + 1),
					y,
					l
				], b.push(_), y = l);
			}
			return y++, _;
		}
		function T(e) {
			x.push(e);
		}
		return {
			back: T,
			endOfFile: ee,
			nextToken: w,
			position: S
		};
	}, Tr;
}
var Or, kr;
function Ar() {
	if (kr) return Or;
	kr = 1;
	let e = fr();
	class t extends e {
		constructor(e) {
			super(e), this.type = "atrule";
		}
		append(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
		}
		prepend(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
		}
	}
	return Or = t, t.default = t, e.registerAtRule(t), Or;
}
var jr, Mr;
function Nr() {
	if (Mr) return jr;
	Mr = 1;
	let e = fr(), t, n;
	class r extends e {
		constructor(e) {
			super(e), this.type = "root", this.nodes ||= [];
		}
		normalize(e, t, n) {
			let r = super.normalize(e);
			if (t) {
				if (n === "prepend") this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
				else if (this.first !== t) for (let e of r) e.raws.before = t.raws.before;
			}
			return r;
		}
		removeChild(e, t) {
			let n = this.index(e);
			return !t && n === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[n].raws.before), super.removeChild(e);
		}
		toResult(e = {}) {
			return new t(new n(), this, e).stringify();
		}
	}
	return r.registerLazyResult = (e) => {
		t = e;
	}, r.registerProcessor = (e) => {
		n = e;
	}, jr = r, r.default = r, e.registerRoot(r), jr;
}
var Pr, Fr;
function Ir() {
	if (Fr) return Pr;
	Fr = 1;
	let e = {
		comma(t) {
			return e.split(t, [","], !0);
		},
		space(t) {
			return e.split(t, [
				" ",
				"\n",
				"	"
			]);
		},
		split(e, t, n) {
			let r = [], i = "", a = !1, o = 0, s = !1, c = "", l = !1;
			for (let n of e) l ? l = !1 : n === "\\" ? l = !0 : s ? n === c && (s = !1) : n === "\"" || n === "'" ? (s = !0, c = n) : n === "(" ? o += 1 : n === ")" ? o > 0 && --o : o === 0 && t.includes(n) && (a = !0), a ? (i !== "" && r.push(i.trim()), i = "", a = !1) : i += n;
			return (n || i !== "") && r.push(i.trim()), r;
		}
	};
	return Pr = e, e.default = e, Pr;
}
var Lr, Rr;
function zr() {
	if (Rr) return Lr;
	Rr = 1;
	let e = fr(), t = Ir();
	class n extends e {
		constructor(e) {
			super(e), this.type = "rule", this.nodes ||= [];
		}
		get selectors() {
			return t.comma(this.selector);
		}
		set selectors(e) {
			let t = this.selector ? this.selector.match(/,\s*/) : null, n = t ? t[0] : "," + this.raw("between", "beforeOpen");
			this.selector = e.join(n);
		}
	}
	return Lr = n, n.default = n, e.registerRule(n), Lr;
}
var Br, Vr;
function Hr() {
	if (Vr) return Br;
	Vr = 1;
	let e = Jn(), t = Dr(), n = lr(), r = Ar(), i = Nr(), a = zr(), o = {
		empty: !0,
		space: !0
	};
	function s(e) {
		for (let t = e.length - 1; t >= 0; t--) {
			let n = e[t], r = n[3] || n[2];
			if (r) return r;
		}
	}
	class c {
		constructor(e) {
			this.input = e, this.root = new i(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = {
				input: e,
				start: {
					column: 1,
					line: 1,
					offset: 0
				}
			};
		}
		atrule(e) {
			let t = new r();
			t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
			let n, i, a, o = !1, s = !1, c = [], l = [];
			for (; !this.tokenizer.endOfFile();) {
				if (e = this.tokenizer.nextToken(), n = e[0], n === "(" || n === "[" ? l.push(n === "(" ? ")" : "]") : n === "{" && l.length > 0 ? l.push("}") : n === l[l.length - 1] && l.pop(), l.length === 0) {
					if (n === ";") {
						t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
						break;
					}
					if (n === "{") {
						s = !0;
						break;
					}
					if (n === "}") {
						if (c.length > 0) {
							for (a = c.length - 1, i = c[a]; i && i[0] === "space";) i = c[--a];
							i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
						}
						this.end(e);
						break;
					}
					c.push(e);
				} else c.push(e);
				if (this.tokenizer.endOfFile()) {
					o = !0;
					break;
				}
			}
			t.raws.between = this.spacesAndCommentsFromEnd(c), c.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(c), this.raw(t, "params", c), o && (e = c[c.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), s && (t.nodes = [], this.current = t);
		}
		checkMissedSemicolon(e) {
			let t = this.colon(e);
			if (t === !1) return;
			let n = 0, r;
			for (let i = t - 1; i >= 0 && (r = e[i], !(r[0] !== "space" && (n += 1, n === 2))); i--);
			throw this.input.error("Missed semicolon", r[0] === "word" ? r[3] + 1 : r[2]);
		}
		colon(e) {
			let t = 0, n, r, i;
			for (let [a, o] of e.entries()) {
				if (n = o, r = n[0], r === "(" && (t += 1), r === ")" && --t, t === 0 && r === ":") {
					if (!i) this.doubleColon(n);
					else if (i[0] === "word" && i[1] === "progid") continue;
					else return a;
				}
				i = n;
			}
			return !1;
		}
		comment(e) {
			let t = new n();
			this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
			let r = e[1].slice(2, -2);
			if (/^\s*$/.test(r)) t.text = "", t.raws.left = r, t.raws.right = "";
			else {
				let e = r.match(/^(\s*)([^]*\S)(\s*)$/);
				t.text = e[2], t.raws.left = e[1], t.raws.right = e[3];
			}
		}
		createTokenizer() {
			this.tokenizer = t(this.input);
		}
		decl(t, n) {
			let r = new e();
			this.init(r, t[0][2]);
			let i = t[t.length - 1];
			for (i[0] === ";" && (this.semicolon = !0, t.pop()), r.source.end = this.getPosition(i[3] || i[2] || s(t)), r.source.end.offset++; t[0][0] !== "word";) t.length === 1 && this.unknownWord(t), r.raws.before += t.shift()[1];
			for (r.source.start = this.getPosition(t[0][2]), r.prop = ""; t.length;) {
				let e = t[0][0];
				if (e === ":" || e === "space" || e === "comment") break;
				r.prop += t.shift()[1];
			}
			r.raws.between = "";
			let a;
			for (; t.length;) {
				if (a = t.shift(), a[0] === ":") {
					r.raws.between += a[1];
					break;
				}
				a[0] === "word" && /\w/.test(a[1]) && this.unknownWord([a]), r.raws.between += a[1];
			}
			(r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
			let o = [], c;
			for (; t.length && (c = t[0][0], c === "space" || c === "comment");) o.push(t.shift());
			this.precheckMissedSemicolon(t);
			for (let e = t.length - 1; e >= 0; e--) {
				if (a = t[e], a[1].toLowerCase() === "!important") {
					r.important = !0;
					let n = this.stringFrom(t, e);
					n = this.spacesFromEnd(t) + n, n !== " !important" && (r.raws.important = n);
					break;
				}
				if (a[1].toLowerCase() === "important") {
					let n = t.slice(0), i = "";
					for (let t = e; t > 0; t--) {
						let e = n[t][0];
						if (i.trim().indexOf("!") === 0 && e !== "space") break;
						i = n.pop()[1] + i;
					}
					i.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = i, t = n);
				}
				if (a[0] !== "space" && a[0] !== "comment") break;
			}
			t.some((e) => e[0] !== "space" && e[0] !== "comment") && (r.raws.between += o.map((e) => e[1]).join(""), o = []), this.raw(r, "value", o.concat(t), n), r.value.includes(":") && !n && this.checkMissedSemicolon(t);
		}
		doubleColon(e) {
			throw this.input.error("Double colon", { offset: e[2] }, { offset: e[2] + e[1].length });
		}
		emptyRule(e) {
			let t = new a();
			this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
		}
		end(e) {
			this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
		}
		endFile() {
			this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		freeSemicolon(e) {
			if (this.spaces += e[1], this.current.nodes) {
				let e = this.current.nodes[this.current.nodes.length - 1];
				e && e.type === "rule" && !e.raws.ownSemicolon && (e.raws.ownSemicolon = this.spaces, this.spaces = "");
			}
		}
		getPosition(e) {
			let t = this.input.fromOffset(e);
			return {
				column: t.col,
				line: t.line,
				offset: e
			};
		}
		init(e, t) {
			this.current.push(e), e.source = {
				input: this.input,
				start: this.getPosition(t)
			}, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
		}
		other(e) {
			let t = !1, n = null, r = !1, i = null, a = [], o = e[1].startsWith("--"), s = [], c = e;
			for (; c;) {
				if (n = c[0], s.push(c), n === "(" || n === "[") i ||= c, a.push(n === "(" ? ")" : "]");
				else if (o && r && n === "{") i ||= c, a.push("}");
				else if (a.length === 0) {
					if (n === ";") {
						if (r) {
							this.decl(s, o);
							return;
						}
						break;
					}
					if (n === "{") {
						this.rule(s);
						return;
					}
					if (n === "}") {
						this.tokenizer.back(s.pop()), t = !0;
						break;
					}
					n === ":" && (r = !0);
				} else n === a[a.length - 1] && (a.pop(), a.length === 0 && (i = null));
				c = this.tokenizer.nextToken();
			}
			if (this.tokenizer.endOfFile() && (t = !0), a.length > 0 && this.unclosedBracket(i), t && r) {
				if (!o) for (; s.length && (c = s[s.length - 1][0], c === "space" || c === "comment");) this.tokenizer.back(s.pop());
				this.decl(s, o);
			} else this.unknownWord(s);
		}
		parse() {
			let e;
			for (; !this.tokenizer.endOfFile();) switch (e = this.tokenizer.nextToken(), e[0]) {
				case "space":
					this.spaces += e[1];
					break;
				case ";":
					this.freeSemicolon(e);
					break;
				case "}":
					this.end(e);
					break;
				case "comment":
					this.comment(e);
					break;
				case "at-word":
					this.atrule(e);
					break;
				case "{":
					this.emptyRule(e);
					break;
				default: this.other(e);
			}
			this.endFile();
		}
		precheckMissedSemicolon() {}
		raw(e, t, n, r) {
			let i, a, s = n.length, c = "", l = !0, u, d;
			for (let e = 0; e < s; e += 1) i = n[e], a = i[0], a === "space" && e === s - 1 && !r ? l = !1 : a === "comment" ? (d = n[e - 1] ? n[e - 1][0] : "empty", u = n[e + 1] ? n[e + 1][0] : "empty", !o[d] && !o[u] ? c.slice(-1) === "," ? l = !1 : c += i[1] : l = !1) : c += i[1];
			if (!l) {
				let r = n.reduce((e, t) => e + t[1], "");
				e.raws[t] = {
					raw: r,
					value: c
				};
			}
			e[t] = c;
		}
		rule(e) {
			e.pop();
			let t = new a();
			this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
		}
		spacesAndCommentsFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space" || t === "comment");) n = e.pop()[1] + n;
			return n;
		}
		spacesAndCommentsFromStart(e) {
			let t, n = "";
			for (; e.length && (t = e[0][0], t === "space" || t === "comment");) n += e.shift()[1];
			return n;
		}
		spacesFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space");) n = e.pop()[1] + n;
			return n;
		}
		stringFrom(e, t) {
			let n = "";
			for (let r = t; r < e.length; r++) n += e[r][1];
			return e.splice(t, e.length - t), n;
		}
		unclosedBlock() {
			let e = this.current.source.start;
			throw this.input.error("Unclosed block", e.line, e.column);
		}
		unclosedBracket(e) {
			throw this.input.error("Unclosed bracket", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unexpectedClose(e) {
			throw this.input.error("Unexpected }", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unknownWord(e) {
			throw this.input.error("Unknown word", { offset: e[0][2] }, { offset: e[0][2] + e[0][1].length });
		}
		unnamedAtrule(e, t) {
			throw this.input.error("At-rule without name", { offset: t[2] }, { offset: t[2] + t[1].length });
		}
	}
	return Br = c, Br;
}
var Ur, Wr;
function Gr() {
	if (Wr) return Ur;
	Wr = 1;
	let e = fr(), t = Hr(), n = rr();
	function r(e, r) {
		let i = new n(e, r), a = new t(i);
		try {
			a.parse();
		} catch (e) {
			throw process.env.NODE_ENV !== "production" && e.name === "CssSyntaxError" && r && r.from && (/\.scss$/i.test(r.from) ? e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser" : /\.sass/i.test(r.from) ? e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser" : /\.less$/i.test(r.from) && (e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")), e;
		}
		return a.root;
	}
	return Ur = r, r.default = r, e.registerParse(r), Ur;
}
var Kr, qr;
function Jr() {
	if (qr) return Kr;
	qr = 1;
	let { isClean: e, my: t } = In(), n = or(), r = Hn(), i = fr(), a = hr(), o = vr(), s = wr(), c = Gr(), l = Nr(), u = {
		atrule: "AtRule",
		comment: "Comment",
		decl: "Declaration",
		document: "Document",
		root: "Root",
		rule: "Rule"
	}, d = {
		AtRule: !0,
		AtRuleExit: !0,
		Comment: !0,
		CommentExit: !0,
		Declaration: !0,
		DeclarationExit: !0,
		Document: !0,
		DocumentExit: !0,
		Once: !0,
		OnceExit: !0,
		postcssPlugin: !0,
		prepare: !0,
		Root: !0,
		RootExit: !0,
		Rule: !0,
		RuleExit: !0
	}, f = {
		Once: !0,
		postcssPlugin: !0,
		prepare: !0
	};
	function p(e) {
		return typeof e == "object" && typeof e.then == "function";
	}
	function m(e) {
		let t = !1, n = u[e.type];
		return e.type === "decl" ? t = e.prop.toLowerCase() : e.type === "atrule" && (t = e.name.toLowerCase()), t && e.append ? [
			n,
			n + "-" + t,
			0,
			n + "Exit",
			n + "Exit-" + t
		] : t ? [
			n,
			n + "-" + t,
			n + "Exit",
			n + "Exit-" + t
		] : e.append ? [
			n,
			0,
			n + "Exit"
		] : [n, n + "Exit"];
	}
	function h(e) {
		let t;
		return t = e.type === "document" ? [
			"Document",
			0,
			"DocumentExit"
		] : e.type === "root" ? [
			"Root",
			0,
			"RootExit"
		] : m(e), {
			eventIndex: 0,
			events: t,
			iterator: 0,
			node: e,
			visitorIndex: 0,
			visitors: []
		};
	}
	function g(t) {
		return t[e] = !1, t.nodes && t.nodes.forEach((e) => g(e)), t;
	}
	let _ = {};
	class v {
		constructor(e, n, r) {
			this.stringified = !1, this.processed = !1;
			let a;
			if (typeof n == "object" && n && (n.type === "root" || n.type === "document")) a = g(n);
			else if (n instanceof v || n instanceof s) a = g(n.root), n.map && (r.map === void 0 && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = n.map);
			else {
				let e = c;
				r.syntax && (e = r.syntax.parse), r.parser && (e = r.parser), e.parse && (e = e.parse);
				try {
					a = e(n, r);
				} catch (e) {
					this.processed = !0, this.error = e;
				}
				a && !a[t] && i.rebuild(a);
			}
			this.result = new s(e, a, r), this.helpers = {
				..._,
				postcss: _,
				result: this.result
			}, this.plugins = this.processor.plugins.map((e) => typeof e == "object" && e.prepare ? {
				...e,
				...e.prepare(this.result)
			} : e);
		}
		async() {
			return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing ||= this.runAsync(), this.processing);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		getAsyncError() {
			throw Error("Use process(css).then(cb) to work with async plugins");
		}
		handleError(e, t) {
			let n = this.result.lastPlugin;
			try {
				if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin) e.plugin = n.postcssPlugin, e.setMessage();
				else if (n.postcssVersion && process.env.NODE_ENV !== "production") {
					let e = n.postcssPlugin, t = n.postcssVersion, r = this.result.processor.version, i = t.split("."), a = r.split(".");
					(i[0] !== a[0] || parseInt(i[1]) > parseInt(a[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + r + ", but " + e + " uses " + t + ". Perhaps this is the source of the error below.");
				}
			} catch (e) {
				console && console.error && console.error(e);
			}
			return e;
		}
		prepareVisitors() {
			this.listeners = {};
			let e = (e, t, n) => {
				this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push([e, n]);
			};
			for (let t of this.plugins) if (typeof t == "object") for (let n in t) {
				if (!d[n] && /^[A-Z]/.test(n)) throw Error(`Unknown event ${n} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
				if (!f[n]) {
					if (typeof t[n] == "object") for (let r in t[n]) r === "*" ? e(t, n, t[n][r]) : e(t, n + "-" + r.toLowerCase(), t[n][r]);
					else typeof t[n] == "function" && e(t, n, t[n]);
				}
			}
			this.hasListener = Object.keys(this.listeners).length > 0;
		}
		async runAsync() {
			this.plugin = 0;
			for (let e = 0; e < this.plugins.length; e++) {
				let t = this.plugins[e], n = this.runOnRoot(t);
				if (p(n)) try {
					await n;
				} catch (e) {
					throw this.handleError(e);
				}
			}
			if (this.prepareVisitors(), this.hasListener) {
				let t = this.result.root;
				for (; !t[e];) {
					t[e] = !0;
					let n = [h(t)];
					for (; n.length > 0;) {
						let e = this.visitTick(n);
						if (p(e)) try {
							await e;
						} catch (e) {
							let t = n[n.length - 1].node;
							throw this.handleError(e, t);
						}
					}
				}
				if (this.listeners.OnceExit) for (let [e, n] of this.listeners.OnceExit) {
					this.result.lastPlugin = e;
					try {
						if (t.type === "document") {
							let e = t.nodes.map((e) => n(e, this.helpers));
							await Promise.all(e);
						} else await n(t, this.helpers);
					} catch (e) {
						throw this.handleError(e);
					}
				}
			}
			return this.processed = !0, this.stringify();
		}
		runOnRoot(e) {
			this.result.lastPlugin = e;
			try {
				if (typeof e == "object" && e.Once) {
					if (this.result.root.type === "document") {
						let t = this.result.root.nodes.map((t) => e.Once(t, this.helpers));
						return p(t[0]) ? Promise.all(t) : t;
					}
					return e.Once(this.result.root, this.helpers);
				}
				if (typeof e == "function") return e(this.result.root, this.result);
			} catch (e) {
				throw this.handleError(e);
			}
		}
		stringify() {
			if (this.error) throw this.error;
			if (this.stringified) return this.result;
			this.stringified = !0, this.sync();
			let e = this.result.opts, t = r;
			e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
			let i = new n(t, this.result.root, this.result.opts).generate();
			return this.result.css = i[0], this.result.map = i[1], this.result;
		}
		sync() {
			if (this.error) throw this.error;
			if (this.processed) return this.result;
			if (this.processed = !0, this.processing) throw this.getAsyncError();
			for (let e of this.plugins) if (p(this.runOnRoot(e))) throw this.getAsyncError();
			if (this.prepareVisitors(), this.hasListener) {
				let t = this.result.root;
				for (; !t[e];) t[e] = !0, this.walkSync(t);
				if (this.listeners.OnceExit) {
					if (t.type === "document") for (let e of t.nodes) this.visitSync(this.listeners.OnceExit, e);
					else this.visitSync(this.listeners.OnceExit, t);
				}
			}
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this.opts || o("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this.css;
		}
		visitSync(e, t) {
			for (let [n, r] of e) {
				this.result.lastPlugin = n;
				let e;
				try {
					e = r(t, this.helpers);
				} catch (e) {
					throw this.handleError(e, t.proxyOf);
				}
				if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
				if (p(e)) throw this.getAsyncError();
			}
		}
		visitTick(t) {
			let n = t[t.length - 1], { node: r, visitors: i } = n;
			if (r.type !== "root" && r.type !== "document" && !r.parent) {
				t.pop();
				return;
			}
			if (i.length > 0 && n.visitorIndex < i.length) {
				let [e, t] = i[n.visitorIndex];
				n.visitorIndex += 1, n.visitorIndex === i.length && (n.visitors = [], n.visitorIndex = 0), this.result.lastPlugin = e;
				try {
					return t(r.toProxy(), this.helpers);
				} catch (e) {
					throw this.handleError(e, r);
				}
			}
			if (n.iterator !== 0) {
				let i = n.iterator, a;
				for (; a = r.nodes[r.indexes[i]];) if (r.indexes[i] += 1, !a[e]) {
					a[e] = !0, t.push(h(a));
					return;
				}
				n.iterator = 0, delete r.indexes[i];
			}
			let a = n.events;
			for (; n.eventIndex < a.length;) {
				let t = a[n.eventIndex];
				if (n.eventIndex += 1, t === 0) {
					r.nodes && r.nodes.length && (r[e] = !0, n.iterator = r.getIterator());
					return;
				}
				if (this.listeners[t]) {
					n.visitors = this.listeners[t];
					return;
				}
			}
			t.pop();
		}
		walkSync(t) {
			t[e] = !0;
			let n = m(t);
			for (let r of n) if (r === 0) t.nodes && t.each((t) => {
				t[e] || this.walkSync(t);
			});
			else {
				let e = this.listeners[r];
				if (e && this.visitSync(e, t.toProxy())) return;
			}
		}
		warnings() {
			return this.sync().warnings();
		}
		get content() {
			return this.stringify().content;
		}
		get css() {
			return this.stringify().css;
		}
		get map() {
			return this.stringify().map;
		}
		get messages() {
			return this.sync().messages;
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			return this.sync().root;
		}
		get [Symbol.toStringTag]() {
			return "LazyResult";
		}
	}
	return v.registerPostcss = (e) => {
		_ = e;
	}, Kr = v, v.default = v, l.registerLazyResult(v), a.registerLazyResult(v), Kr;
}
var Yr, Xr;
function Zr() {
	if (Xr) return Yr;
	Xr = 1;
	let e = or(), t = Hn(), n = vr(), r = Gr(), i = wr();
	class a {
		constructor(n, r, a) {
			r = r.toString(), this.stringified = !1, this._processor = n, this._css = r, this._opts = a, this._map = void 0;
			let o, s = t;
			this.result = new i(this._processor, o, this._opts), this.result.css = r;
			let c = this;
			Object.defineProperty(this.result, "root", { get() {
				return c.root;
			} });
			let l = new e(s, o, this._opts, r);
			if (l.isMap()) {
				let [e, t] = l.generate();
				e && (this.result.css = e), t && (this.result.map = t);
			} else l.clearAnnotation(), this.result.css = l.css;
		}
		async() {
			return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		sync() {
			if (this.error) throw this.error;
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this._opts || n("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this._css;
		}
		warnings() {
			return [];
		}
		get content() {
			return this.result.css;
		}
		get css() {
			return this.result.css;
		}
		get map() {
			return this.result.map;
		}
		get messages() {
			return [];
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			if (this._root) return this._root;
			let e, t = r;
			try {
				e = t(this._css, this._opts);
			} catch (e) {
				this.error = e;
			}
			if (this.error) throw this.error;
			return this._root = e, e;
		}
		get [Symbol.toStringTag]() {
			return "NoWorkResult";
		}
	}
	return Yr = a, a.default = a, Yr;
}
var Qr, $r;
function ei() {
	if ($r) return Qr;
	$r = 1;
	let e = Zr(), t = Jr(), n = hr(), r = Nr();
	class i {
		constructor(e = []) {
			this.version = "8.4.38", this.plugins = this.normalize(e);
		}
		normalize(e) {
			let t = [];
			for (let n of e) if (n.postcss === !0 ? n = n() : n.postcss && (n = n.postcss), typeof n == "object" && Array.isArray(n.plugins)) t = t.concat(n.plugins);
			else if (typeof n == "object" && n.postcssPlugin) t.push(n);
			else if (typeof n == "function") t.push(n);
			else if (typeof n == "object" && (n.parse || n.stringify)) {
				if (process.env.NODE_ENV !== "production") throw Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
			} else throw Error(n + " is not a PostCSS plugin");
			return t;
		}
		process(n, r = {}) {
			return !this.plugins.length && !r.parser && !r.stringifier && !r.syntax ? new e(this, n, r) : new t(this, n, r);
		}
		use(e) {
			return this.plugins = this.plugins.concat(this.normalize([e])), this;
		}
	}
	return Qr = i, i.default = i, r.registerProcessor(i), n.registerProcessor(i), Qr;
}
var ti, ni;
function ri() {
	if (ni) return ti;
	ni = 1;
	let e = Jn(), t = er(), n = lr(), r = Ar(), i = rr(), a = Nr(), o = zr();
	function s(c, l) {
		if (Array.isArray(c)) return c.map((e) => s(e));
		let { inputs: u, ...d } = c;
		if (u) {
			l = [];
			for (let e of u) {
				let n = {
					...e,
					__proto__: i.prototype
				};
				n.map &&= {
					...n.map,
					__proto__: t.prototype
				}, l.push(n);
			}
		}
		if (d.nodes &&= c.nodes.map((e) => s(e, l)), d.source) {
			let { inputId: e, ...t } = d.source;
			d.source = t, e != null && (d.source.input = l[e]);
		}
		if (d.type === "root") return new a(d);
		if (d.type === "decl") return new e(d);
		if (d.type === "rule") return new o(d);
		if (d.type === "comment") return new n(d);
		if (d.type === "atrule") return new r(d);
		throw Error("Unknown node type: " + c.type);
	}
	return ti = s, s.default = s, ti;
}
var ii, ai;
function oi() {
	if (ai) return ii;
	ai = 1;
	let e = Nn(), t = Jn(), n = Jr(), r = fr(), i = ei(), a = Hn(), o = ri(), s = hr(), c = xr(), l = lr(), u = Ar(), d = wr(), f = rr(), p = Gr(), m = Ir(), h = zr(), g = Nr(), _ = Gn();
	function v(...e) {
		return e.length === 1 && Array.isArray(e[0]) && (e = e[0]), new i(e);
	}
	return v.plugin = function(e, t) {
		let n = !1;
		function r(...r) {
			console && console.warn && !n && (n = !0, console.warn(e + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(e + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"));
			let a = t(...r);
			return a.postcssPlugin = e, a.postcssVersion = new i().version, a;
		}
		let a;
		return Object.defineProperty(r, "postcss", { get() {
			return a ||= r(), a;
		} }), r.process = function(e, t, n) {
			return v([r(n)]).process(e, t);
		}, r;
	}, v.stringify = a, v.parse = p, v.fromJSON = o, v.list = m, v.comment = (e) => new l(e), v.atRule = (e) => new u(e), v.decl = (e) => new t(e), v.rule = (e) => new h(e), v.root = (e) => new g(e), v.document = (e) => new s(e), v.CssSyntaxError = e, v.Declaration = t, v.Container = r, v.Processor = i, v.Document = s, v.Comment = l, v.Warning = c, v.AtRule = u, v.Result = d, v.Input = f, v.Rule = h, v.Root = g, v.Node = _, n.registerPostcss(v), ii = v, v.default = v, ii;
}
var R = /* @__PURE__ */ Tn(oi());
R.stringify, R.fromJSON, R.plugin, R.parse, R.list, R.document, R.comment, R.atRule, R.rule, R.decl, R.root, R.CssSyntaxError, R.Declaration, R.Container, R.Processor, R.Document, R.Comment, R.Warning, R.AtRule, R.Result, R.Input, R.Rule, R.Root, R.Node;
var si = {
	script: "noscript",
	altglyph: "altGlyph",
	altglyphdef: "altGlyphDef",
	altglyphitem: "altGlyphItem",
	animatecolor: "animateColor",
	animatemotion: "animateMotion",
	animatetransform: "animateTransform",
	clippath: "clipPath",
	feblend: "feBlend",
	fecolormatrix: "feColorMatrix",
	fecomponenttransfer: "feComponentTransfer",
	fecomposite: "feComposite",
	feconvolvematrix: "feConvolveMatrix",
	fediffuselighting: "feDiffuseLighting",
	fedisplacementmap: "feDisplacementMap",
	fedistantlight: "feDistantLight",
	fedropshadow: "feDropShadow",
	feflood: "feFlood",
	fefunca: "feFuncA",
	fefuncb: "feFuncB",
	fefuncg: "feFuncG",
	fefuncr: "feFuncR",
	fegaussianblur: "feGaussianBlur",
	feimage: "feImage",
	femerge: "feMerge",
	femergenode: "feMergeNode",
	femorphology: "feMorphology",
	feoffset: "feOffset",
	fepointlight: "fePointLight",
	fespecularlighting: "feSpecularLighting",
	fespotlight: "feSpotLight",
	fetile: "feTile",
	feturbulence: "feTurbulence",
	foreignobject: "foreignObject",
	glyphref: "glyphRef",
	lineargradient: "linearGradient",
	radialgradient: "radialGradient"
};
function ci(e) {
	let t = si[e.tagName] ? si[e.tagName] : e.tagName;
	return t === "link" && e.attributes._cssText && (t = "style"), t;
}
function li(e, t) {
	let n = t?.stylesWithHoverClass.get(e);
	if (n) return n;
	let r = e;
	try {
		r = R([Cn, wn]).process(e).css;
	} catch (e) {
		console.warn("Failed to adapt css for replay", e);
	}
	return t?.stylesWithHoverClass.set(e, r), r;
}
function ui() {
	return { stylesWithHoverClass: /* @__PURE__ */ new Map() };
}
var di = "rrweb-snapshot.rebuild() cannot rebuild into an unprotected browser document. Use rebuildIntoSandboxedIframe() or set UNSAFE_allowUnprotectedRebuild: true only when you accept the script-execution risk.", fi = "rrweb-snapshot.createSandboxedIframe() requires root to be connected to a document before creating a sandboxed iframe.", pi = /* @__PURE__ */ new WeakSet();
function mi(e) {
	if (!e || e.tagName !== "IFRAME" || !("sandbox" in e)) return !1;
	let t = Array.from(e.sandbox);
	return t.length === 1 && t[0] === "allow-same-origin";
}
function hi(e) {
	if (e.UNSAFE_allowUnprotectedRebuild) return;
	let t = e.doc.defaultView;
	if (t && !(pi.has(e.doc) && mi(t.frameElement))) throw Error(di);
}
function gi(e, t, n, r) {
	let i = [];
	for (let t of e.childNodes) t.type === P.Text && i.push(t);
	let a = t.split("/* rr_split */");
	for (; a.length > 1 && a.length > i.length;) a.splice(-2, 2, a.slice(-2).join(""));
	let o = "";
	n && (o = li(a.join(""), r));
	let s = 0;
	for (let e = 0; e < i.length && e !== a.length; e++) {
		let t = i[e];
		if (!n) t.textContent = a[e];
		else if (e < a.length - 1) {
			let n = s, r = a[e + 1].length;
			r = Math.min(r, 30);
			let i = !1;
			for (; r > 2; r--) {
				let t = a[e + 1].substring(0, r), c = o.substring(s).indexOf(t);
				if (i = c !== -1, i) {
					n += c;
					break;
				}
			}
			i || (n += a[e].length), t.textContent = o.substring(s, n), s = n;
		} else t.textContent = o.substring(s);
	}
}
function _i(e, t, n, r) {
	let { doc: i, hackCss: a, cache: o } = r;
	e.childNodes.length ? gi(e, n, a, o) : (a && (n = li(n, o)), t.appendChild(i.createTextNode(n)));
}
function vi(e, t) {
	let { doc: n, hackCss: r, cache: i } = t;
	switch (e.type) {
		case P.Document: return n.implementation.createDocument(null, "", null);
		case P.DocumentType: return n.implementation.createDocumentType(e.name || "html", e.publicId, e.systemId);
		case P.Element: {
			let r = ci(e), i;
			e.isSVG ? i = n.createElementNS("http://www.w3.org/2000/svg", r) : (e.isCustom && n.defaultView?.customElements && !n.defaultView.customElements.get(e.tagName) && n.defaultView.customElements.define(e.tagName, class extends n.defaultView.HTMLElement {}), i = n.createElement(r));
			let a = {};
			for (let o in e.attributes) {
				if (!Object.prototype.hasOwnProperty.call(e.attributes, o)) continue;
				let s = e.attributes[o];
				if ((r !== "option" || o !== "selected" || s !== !1) && s !== null) {
					if (s === !0 && (s = ""), o.startsWith("rr_")) {
						a[o] = s;
						continue;
					}
					if (typeof s == "string") {
						if (r === "style" && o === "_cssText") {
							_i(e, i, s, t);
							continue;
						}
						if (r === "textarea" && o === "value") {
							i.appendChild(n.createTextNode(s)), e.childNodes = [];
							continue;
						}
					}
					try {
						if (e.isSVG && o === "xlink:href") i.setAttributeNS("http://www.w3.org/1999/xlink", o, s.toString());
						else if (o === "onload" || o === "onclick" || o.substring(0, 7) === "onmouse") i.setAttribute("_" + o, s.toString());
						else if (r === "meta" && e.attributes["http-equiv"] === "Content-Security-Policy" && o === "content") {
							i.setAttribute("csp-content", s.toString());
							continue;
						} else r === "link" && (e.attributes.rel === "preload" && e.attributes.as === "script" || e.attributes.rel === "modulepreload") || r === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && It(e.attributes.href) === "js" || (r === "img" && e.attributes.srcset && e.attributes.rr_dataURL ? i.setAttribute("rrweb-original-srcset", e.attributes.srcset) : i.setAttribute(o, s.toString()));
					} catch {}
				}
			}
			for (let t in a) {
				let o = a[t];
				if (r === "canvas" && t === "rr_dataURL") {
					let e = n.createElement("img");
					e.onload = () => {
						let t = i.getContext("2d");
						t && t.drawImage(e, 0, 0, e.width, e.height);
					}, e.src = o.toString(), i.RRNodeType && (i.rr_dataURL = o.toString());
				} else if (r === "img" && t === "rr_dataURL") {
					let t = i;
					t.currentSrc.startsWith("data:") || (t.setAttribute("rrweb-original-src", e.attributes.src), t.src = o.toString());
				}
				if (t === "rr_width") i.style.setProperty("width", o.toString());
				else if (t === "rr_height") i.style.setProperty("height", o.toString());
				else if (t === "rr_mediaCurrentTime" && typeof o == "number") i.currentTime = o;
				else if (t === "rr_mediaState") switch (o) {
					case "played":
						i.play().catch((e) => console.warn("media playback error", e));
						break;
					case "paused": i.pause();
				}
				else t === "rr_mediaPlaybackRate" && typeof o == "number" ? i.playbackRate = o : t === "rr_mediaMuted" && typeof o == "boolean" ? i.muted = o : t === "rr_mediaLoop" && typeof o == "boolean" ? i.loop = o : t === "rr_mediaVolume" && typeof o == "number" ? i.volume = o : t === "rr_open_mode" && i.setAttribute("rr_open_mode", o);
			}
			if (e.isShadowHost) {
				if (!i.shadowRoot) i.attachShadow({ mode: "open" });
				else for (; i.shadowRoot.firstChild;) i.shadowRoot.removeChild(i.shadowRoot.firstChild);
			}
			return (r === "input" || r === "textarea") && i.setAttribute("autocomplete", "off"), i;
		}
		case P.Text: return e.isStyle && r ? n.createTextNode(li(e.textContent, i)) : n.createTextNode(e.textContent);
		case P.CDATA: return n.createCDATASection(e.textContent);
		case P.Comment: return n.createComment(e.textContent);
		default: return null;
	}
}
function yi(e, t) {
	let { doc: n, mirror: r, skipChild: i = !1, hackCss: a = !0, afterAppend: o, cache: s } = t;
	if (r.has(e.id)) {
		let t = r.getNode(e.id);
		if (Pt(r.getMeta(t), e)) return r.getNode(e.id);
	}
	let c = vi(e, {
		doc: n,
		hackCss: a,
		cache: s
	});
	if (!c) return null;
	if (e.rootId && r.getNode(e.rootId) !== n && r.replace(e.rootId, n), e.type === P.Document && (n.close(), n.open(), e.compatMode === "BackCompat" && e.childNodes && e.childNodes[0].type !== P.DocumentType && (e.childNodes[0].type === P.Element && "xmlns" in e.childNodes[0].attributes && e.childNodes[0].attributes.xmlns === "http://www.w3.org/1999/xhtml" ? n.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"\">") : n.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"\">")), c = n), r.add(c, e), (e.type === P.Document || e.type === P.Element) && !i) for (let t of e.childNodes) {
		let i = yi(t, {
			doc: n,
			mirror: r,
			skipChild: !1,
			hackCss: a,
			afterAppend: o,
			cache: s
		});
		if (!i) {
			console.warn("Failed to rebuild", t);
			continue;
		}
		if (t.isShadow && vt(c) && c.shadowRoot) c.shadowRoot.appendChild(i);
		else if (e.type === P.Document && t.type == P.Element) {
			let e = i, t = null;
			e.childNodes.forEach((e) => {
				e.nodeName === "BODY" && (t = e);
			}), t ? (e.removeChild(t), c.appendChild(i), e.appendChild(t)) : c.appendChild(i);
		} else c.appendChild(i);
		o && o(i, t.id);
	}
	return c;
}
function bi(e, t) {
	function n(e) {
		t(e);
	}
	for (let t of e.getIds()) e.has(t) && n(e.getNode(t));
}
function xi(e, t) {
	let n = t.getMeta(e);
	if (n?.type !== P.Element) return;
	let r = e;
	for (let e in n.attributes) {
		if (!(Object.prototype.hasOwnProperty.call(n.attributes, e) && e.startsWith("rr_"))) continue;
		let t = n.attributes[e];
		e === "rr_scrollLeft" && (r.scrollLeft = t), e === "rr_scrollTop" && (r.scrollTop = t);
	}
}
function Si(e, t) {
	hi(t);
	let { doc: n, onVisit: r, hackCss: i = !0, afterAppend: a, cache: o, mirror: s = new Ot() } = t, c = yi(e, {
		doc: n,
		mirror: s,
		skipChild: !1,
		hackCss: i,
		afterAppend: a,
		cache: o
	});
	return bi(s, (e) => {
		r && r(e), xi(e, s);
	}), c;
}
function Ci(e) {
	var t;
	if (!e.root.isConnected) throw Error(fi);
	let n = e.root.ownerDocument.createElement("iframe");
	for (let [t, r] of Object.entries(e.iframeAttributes || {})) t !== "sandbox" && n.setAttribute(t, r);
	n.setAttribute("sandbox", "allow-same-origin"), e.root.appendChild(n);
	let r = n.contentDocument;
	if (!r || !n.contentWindow) throw (t = n.parentNode) == null || t.removeChild(n), Error(fi);
	return pi.add(r), n;
}
var wi = Object.defineProperty, Ti = (e, t, n) => t in e ? wi(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, z = (e, t, n) => Ti(e, typeof t == "symbol" ? t : t + "", n), Ei = Object.defineProperty, Di = (e, t, n) => t in e ? Ei(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Oi = (e, t, n) => Di(e, typeof t == "symbol" ? t : t + "", n);
Date.now().toString();
var ki = class {
	constructor() {
		Oi(this, "idNodeMap", /* @__PURE__ */ new Map()), Oi(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
	}
	getId(e) {
		return e ? this.getMeta(e)?.id ?? -1 : -1;
	}
	getNode(e) {
		return this.idNodeMap.get(e) || null;
	}
	getIds() {
		return Array.from(this.idNodeMap.keys());
	}
	getMeta(e) {
		return this.nodeMetaMap.get(e) || null;
	}
	removeNodeFromMap(e) {
		let t = this.getId(e);
		this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e) => this.removeNodeFromMap(e));
	}
	has(e) {
		return this.idNodeMap.has(e);
	}
	hasNode(e) {
		return this.nodeMetaMap.has(e);
	}
	add(e, t) {
		let n = t.id;
		this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t);
	}
	replace(e, t) {
		let n = this.getNode(e);
		if (n) {
			let e = this.nodeMetaMap.get(n);
			e && this.nodeMetaMap.set(t, e);
		}
		this.idNodeMap.set(e, t);
	}
	reset() {
		this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
	}
};
function Ai() {
	return new ki();
}
function ji(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Mi(e) {
	if (e.__esModule) return e;
	var t = e.default;
	if (typeof t == "function") {
		var n = function e() {
			return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
		};
		n.prototype = t.prototype;
	} else n = {};
	return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(t) {
		var r = Object.getOwnPropertyDescriptor(e, t);
		Object.defineProperty(n, t, r.get ? r : {
			enumerable: !0,
			get: function() {
				return e[t];
			}
		});
	}), n;
}
var Ni = { exports: {} }, Pi;
function Fi() {
	if (Pi) return Ni.exports;
	Pi = 1;
	var e = String, t = function() {
		return {
			isColorSupported: !1,
			reset: e,
			bold: e,
			dim: e,
			italic: e,
			underline: e,
			inverse: e,
			hidden: e,
			strikethrough: e,
			black: e,
			red: e,
			green: e,
			yellow: e,
			blue: e,
			magenta: e,
			cyan: e,
			white: e,
			gray: e,
			bgBlack: e,
			bgRed: e,
			bgGreen: e,
			bgYellow: e,
			bgBlue: e,
			bgMagenta: e,
			bgCyan: e,
			bgWhite: e
		};
	};
	return Ni.exports = t(), Ni.exports.createColors = t, Ni.exports;
}
var Ii = /* @__PURE__ */ Mi(/* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: {}
}, Symbol.toStringTag, { value: "Module" }))), Li, Ri;
function zi() {
	if (Ri) return Li;
	Ri = 1;
	let e = /* @__PURE__ */ Fi(), t = Ii;
	class n extends Error {
		constructor(e, t, r, i, a, o) {
			super(e), this.name = "CssSyntaxError", this.reason = e, a && (this.file = a), i && (this.source = i), o && (this.plugin = o), t !== void 0 && r !== void 0 && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, n);
		}
		setMessage() {
			this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", this.line !== void 0 && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
		}
		showSourceCode(n) {
			if (!this.source) return "";
			let r = this.source;
			n ??= e.isColorSupported, t && n && (r = t(r));
			let i = r.split(/\r?\n/), a = Math.max(this.line - 3, 0), o = Math.min(this.line + 2, i.length), s = String(o).length, c, l;
			if (n) {
				let { bold: t, gray: n, red: r } = e.createColors(!0);
				c = (e) => t(r(e)), l = (e) => n(e);
			} else c = l = (e) => e;
			return i.slice(a, o).map((e, t) => {
				let n = a + 1 + t, r = " " + (" " + n).slice(-s) + " | ";
				if (n === this.line) {
					let t = l(r.replace(/\d/g, " ")) + e.slice(0, this.column - 1).replace(/[^\t]/g, " ");
					return c(">") + l(r) + e + "\n " + t + c("^");
				}
				return " " + l(r) + e;
			}).join("\n");
		}
		toString() {
			let e = this.showSourceCode();
			return e &&= "\n\n" + e + "\n", this.name + ": " + this.message + e;
		}
	}
	return Li = n, n.default = n, Li;
}
var Bi = {}, Vi;
function Hi() {
	return Vi ? Bi : (Vi = 1, Bi.isClean = Symbol("isClean"), Bi.my = Symbol("my"), Bi);
}
var Ui, Wi;
function Gi() {
	if (Wi) return Ui;
	Wi = 1;
	let e = {
		after: "\n",
		beforeClose: "\n",
		beforeComment: "\n",
		beforeDecl: "\n",
		beforeOpen: " ",
		beforeRule: "\n",
		colon: ": ",
		commentLeft: " ",
		commentRight: " ",
		emptyBody: "",
		indent: "    ",
		semicolon: !1
	};
	function t(e) {
		return e[0].toUpperCase() + e.slice(1);
	}
	class n {
		constructor(e) {
			this.builder = e;
		}
		atrule(e, t) {
			let n = "@" + e.name, r = e.params ? this.rawValue(e, "params") : "";
			if (e.raws.afterName === void 0 ? r && (n += " ") : n += e.raws.afterName, e.nodes) this.block(e, n + r);
			else {
				let i = (e.raws.between || "") + (t ? ";" : "");
				this.builder(n + r + i, e);
			}
		}
		beforeAfter(e, t) {
			let n;
			n = e.type === "decl" ? this.raw(e, null, "beforeDecl") : e.type === "comment" ? this.raw(e, null, "beforeComment") : t === "before" ? this.raw(e, null, "beforeRule") : this.raw(e, null, "beforeClose");
			let r = e.parent, i = 0;
			for (; r && r.type !== "root";) i += 1, r = r.parent;
			if (n.includes("\n")) {
				let t = this.raw(e, null, "indent");
				if (t.length) for (let e = 0; e < i; e++) n += t;
			}
			return n;
		}
		block(e, t) {
			let n = this.raw(e, "between", "beforeOpen");
			this.builder(t + n + "{", e, "start");
			let r;
			e.nodes && e.nodes.length ? (this.body(e), r = this.raw(e, "after")) : r = this.raw(e, "after", "emptyBody"), r && this.builder(r), this.builder("}", e, "end");
		}
		body(e) {
			let t = e.nodes.length - 1;
			for (; t > 0 && e.nodes[t].type === "comment";) --t;
			let n = this.raw(e, "semicolon");
			for (let r = 0; r < e.nodes.length; r++) {
				let i = e.nodes[r], a = this.raw(i, "before");
				a && this.builder(a), this.stringify(i, t !== r || n);
			}
		}
		comment(e) {
			let t = this.raw(e, "left", "commentLeft"), n = this.raw(e, "right", "commentRight");
			this.builder("/*" + t + e.text + n + "*/", e);
		}
		decl(e, t) {
			let n = this.raw(e, "between", "colon"), r = e.prop + n + this.rawValue(e, "value");
			e.important && (r += e.raws.important || " !important"), t && (r += ";"), this.builder(r, e);
		}
		document(e) {
			this.body(e);
		}
		raw(n, r, i) {
			let a;
			if (i ||= r, r && (a = n.raws[r], a !== void 0)) return a;
			let o = n.parent;
			if (i === "before" && (!o || o.type === "root" && o.first === n || o && o.type === "document")) return "";
			if (!o) return e[i];
			let s = n.root();
			if (s.rawCache ||= {}, s.rawCache[i] !== void 0) return s.rawCache[i];
			if (i === "before" || i === "after") return this.beforeAfter(n, i);
			{
				let e = "raw" + t(i);
				this[e] ? a = this[e](s, n) : s.walk((e) => {
					if (a = e.raws[r], a !== void 0) return !1;
				});
			}
			return a === void 0 && (a = e[i]), s.rawCache[i] = a, a;
		}
		rawBeforeClose(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length > 0 && e.raws.after !== void 0) return t = e.raws.after, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawBeforeComment(e, t) {
			let n;
			return e.walkComments((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeDecl") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeDecl(e, t) {
			let n;
			return e.walkDecls((e) => {
				if (e.raws.before !== void 0) return n = e.raws.before, n.includes("\n") && (n = n.replace(/[^\n]+$/, "")), !1;
			}), n === void 0 ? n = this.raw(t, null, "beforeRule") : n &&= n.replace(/\S/g, ""), n;
		}
		rawBeforeOpen(e) {
			let t;
			return e.walk((e) => {
				if (e.type !== "decl" && (t = e.raws.between, t !== void 0)) return !1;
			}), t;
		}
		rawBeforeRule(e) {
			let t;
			return e.walk((n) => {
				if (n.nodes && (n.parent !== e || e.first !== n) && n.raws.before !== void 0) return t = n.raws.before, t.includes("\n") && (t = t.replace(/[^\n]+$/, "")), !1;
			}), t &&= t.replace(/\S/g, ""), t;
		}
		rawColon(e) {
			let t;
			return e.walkDecls((e) => {
				if (e.raws.between !== void 0) return t = e.raws.between.replace(/[^\s:]/g, ""), !1;
			}), t;
		}
		rawEmptyBody(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length === 0 && (t = e.raws.after, t !== void 0)) return !1;
			}), t;
		}
		rawIndent(e) {
			if (e.raws.indent) return e.raws.indent;
			let t;
			return e.walk((n) => {
				let r = n.parent;
				if (r && r !== e && r.parent && r.parent === e && n.raws.before !== void 0) {
					let e = n.raws.before.split("\n");
					return t = e[e.length - 1], t = t.replace(/\S/g, ""), !1;
				}
			}), t;
		}
		rawSemicolon(e) {
			let t;
			return e.walk((e) => {
				if (e.nodes && e.nodes.length && e.last.type === "decl" && (t = e.raws.semicolon, t !== void 0)) return !1;
			}), t;
		}
		rawValue(e, t) {
			let n = e[t], r = e.raws[t];
			return r && r.value === n ? r.raw : n;
		}
		root(e) {
			this.body(e), e.raws.after && this.builder(e.raws.after);
		}
		rule(e) {
			this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
		}
		stringify(e, t) {
			if (!this[e.type]) throw Error("Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier.");
			this[e.type](e, t);
		}
	}
	return Ui = n, n.default = n, Ui;
}
var Ki, qi;
function Ji() {
	if (qi) return Ki;
	qi = 1;
	let e = Gi();
	function t(t, n) {
		new e(n).stringify(t);
	}
	return Ki = t, t.default = t, Ki;
}
var Yi, Xi;
function Zi() {
	if (Xi) return Yi;
	Xi = 1;
	let { isClean: e, my: t } = Hi(), n = zi(), r = Gi(), i = Ji();
	function a(e, t) {
		let n = new e.constructor();
		for (let r in e) {
			if (!Object.prototype.hasOwnProperty.call(e, r) || r === "proxyCache") continue;
			let i = e[r], o = typeof i;
			r === "parent" && o === "object" ? t && (n[r] = t) : r === "source" ? n[r] = i : Array.isArray(i) ? n[r] = i.map((e) => a(e, n)) : (o === "object" && i !== null && (i = a(i)), n[r] = i);
		}
		return n;
	}
	class o {
		constructor(n = {}) {
			this.raws = {}, this[e] = !1, this[t] = !0;
			for (let e in n) if (e === "nodes") {
				this.nodes = [];
				for (let t of n[e]) typeof t.clone == "function" ? this.append(t.clone()) : this.append(t);
			} else this[e] = n[e];
		}
		addToError(e) {
			if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
				let t = this.source;
				e.stack = e.stack.replace(/\n\s{4}at /, `$&${t.input.from}:${t.start.line}:${t.start.column}$&`);
			}
			return e;
		}
		after(e) {
			return this.parent.insertAfter(this, e), this;
		}
		assign(e = {}) {
			for (let t in e) this[t] = e[t];
			return this;
		}
		before(e) {
			return this.parent.insertBefore(this, e), this;
		}
		cleanRaws(e) {
			delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
		}
		clone(e = {}) {
			let t = a(this);
			for (let n in e) t[n] = e[n];
			return t;
		}
		cloneAfter(e = {}) {
			let t = this.clone(e);
			return this.parent.insertAfter(this, t), t;
		}
		cloneBefore(e = {}) {
			let t = this.clone(e);
			return this.parent.insertBefore(this, t), t;
		}
		error(e, t = {}) {
			if (this.source) {
				let { end: n, start: r } = this.rangeBy(t);
				return this.source.input.error(e, {
					column: r.column,
					line: r.line
				}, {
					column: n.column,
					line: n.line
				}, t);
			}
			return new n(e);
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || t === "text") && e.markDirty(), !0);
				}
			};
		}
		markDirty() {
			if (this[e]) {
				this[e] = !1;
				let t = this;
				for (; t = t.parent;) t[e] = !1;
			}
		}
		next() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e + 1];
		}
		positionBy(e, t) {
			let n = this.source.start;
			if (e.index) n = this.positionInside(e.index, t);
			else if (e.word) {
				t = this.toString();
				let r = t.indexOf(e.word);
				r !== -1 && (n = this.positionInside(r, t));
			}
			return n;
		}
		positionInside(e, t) {
			let n = t || this.toString(), r = this.source.start.column, i = this.source.start.line;
			for (let t = 0; t < e; t++) n[t] === "\n" ? (r = 1, i += 1) : r += 1;
			return {
				column: r,
				line: i
			};
		}
		prev() {
			if (!this.parent) return;
			let e = this.parent.index(this);
			return this.parent.nodes[e - 1];
		}
		rangeBy(e) {
			let t = {
				column: this.source.start.column,
				line: this.source.start.line
			}, n = this.source.end ? {
				column: this.source.end.column + 1,
				line: this.source.end.line
			} : {
				column: t.column + 1,
				line: t.line
			};
			if (e.word) {
				let r = this.toString(), i = r.indexOf(e.word);
				i !== -1 && (t = this.positionInside(i, r), n = this.positionInside(i + e.word.length, r));
			} else e.start ? t = {
				column: e.start.column,
				line: e.start.line
			} : e.index && (t = this.positionInside(e.index)), e.end ? n = {
				column: e.end.column,
				line: e.end.line
			} : typeof e.endIndex == "number" ? n = this.positionInside(e.endIndex) : e.index && (n = this.positionInside(e.index + 1));
			return (n.line < t.line || n.line === t.line && n.column <= t.column) && (n = {
				column: t.column + 1,
				line: t.line
			}), {
				end: n,
				start: t
			};
		}
		raw(e, t) {
			return new r().raw(this, e, t);
		}
		remove() {
			return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
		}
		replaceWith(...e) {
			if (this.parent) {
				let t = this, n = !1;
				for (let r of e) r === this ? n = !0 : n ? (this.parent.insertAfter(t, r), t = r) : this.parent.insertBefore(t, r);
				n || this.remove();
			}
			return this;
		}
		root() {
			let e = this;
			for (; e.parent && e.parent.type !== "document";) e = e.parent;
			return e;
		}
		toJSON(e, t) {
			let n = {}, r = t == null;
			t ||= /* @__PURE__ */ new Map();
			let i = 0;
			for (let e in this) {
				if (!Object.prototype.hasOwnProperty.call(this, e) || e === "parent" || e === "proxyCache") continue;
				let r = this[e];
				if (Array.isArray(r)) n[e] = r.map((e) => typeof e == "object" && e.toJSON ? e.toJSON(null, t) : e);
				else if (typeof r == "object" && r.toJSON) n[e] = r.toJSON(null, t);
				else if (e === "source") {
					let a = t.get(r.input);
					a ?? (a = i, t.set(r.input, i), i++), n[e] = {
						end: r.end,
						inputId: a,
						start: r.start
					};
				} else n[e] = r;
			}
			return r && (n.inputs = [...t.keys()].map((e) => e.toJSON())), n;
		}
		toProxy() {
			return this.proxyCache ||= new Proxy(this, this.getProxyProcessor()), this.proxyCache;
		}
		toString(e = i) {
			e.stringify && (e = e.stringify);
			let t = "";
			return e(this, (e) => {
				t += e;
			}), t;
		}
		warn(e, t, n) {
			let r = { node: this };
			for (let e in n) r[e] = n[e];
			return e.warn(t, r);
		}
		get proxyOf() {
			return this;
		}
	}
	return Yi = o, o.default = o, Yi;
}
var Qi, $i;
function ea() {
	if ($i) return Qi;
	$i = 1;
	let e = Zi();
	class t extends e {
		constructor(e) {
			e && e.value !== void 0 && typeof e.value != "string" && (e = {
				...e,
				value: String(e.value)
			}), super(e), this.type = "decl";
		}
		get variable() {
			return this.prop.startsWith("--") || this.prop[0] === "$";
		}
	}
	return Qi = t, t.default = t, Qi;
}
var ta, na;
function ra() {
	return na ? ta : (na = 1, ta = {
		nanoid: (e = 21) => {
			let t = "", n = e;
			for (; n--;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[Math.random() * 64 | 0];
			return t;
		},
		customAlphabet: (e, t = 21) => (n = t) => {
			let r = "", i = n;
			for (; i--;) r += e[Math.random() * e.length | 0];
			return r;
		}
	}, ta);
}
var ia, aa;
function oa() {
	if (aa) return ia;
	aa = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = Ii, { existsSync: n, readFileSync: r } = Ii, { dirname: i, join: a } = Ii;
	function o(e) {
		return Buffer ? Buffer.from(e, "base64").toString() : window.atob(e);
	}
	class s {
		constructor(e, t) {
			if (t.map === !1) return;
			this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
			let n = t.map ? t.map.prev : void 0, r = this.loadMap(t.from, n);
			!this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = i(this.mapFile)), r && (this.text = r);
		}
		consumer() {
			return this.consumerCache ||= new e(this.text), this.consumerCache;
		}
		decodeInline(e) {
			let t = /^data:application\/json;charset=utf-?8;base64,/, n = /^data:application\/json;base64,/;
			if (/^data:application\/json;charset=utf-?8,/.test(e) || /^data:application\/json,/.test(e)) return decodeURIComponent(e.substr(RegExp.lastMatch.length));
			if (t.test(e) || n.test(e)) return o(e.substr(RegExp.lastMatch.length));
			let r = e.match(/data:application\/json;([^,]+),/)[1];
			throw Error("Unsupported source map encoding " + r);
		}
		getAnnotationURL(e) {
			return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
		}
		isMap(e) {
			return typeof e == "object" ? typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections) : !1;
		}
		loadAnnotation(e) {
			let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
			if (!t) return;
			let n = e.lastIndexOf(t.pop()), r = e.indexOf("*/", n);
			n > -1 && r > -1 && (this.annotation = this.getAnnotationURL(e.substring(n, r)));
		}
		loadFile(e) {
			if (this.root = i(e), n(e)) return this.mapFile = e, r(e, "utf-8").toString().trim();
		}
		loadMap(n, r) {
			if (r === !1) return !1;
			if (r) {
				if (typeof r == "string") return r;
				if (typeof r == "function") {
					let e = r(n);
					if (e) {
						let t = this.loadFile(e);
						if (!t) throw Error("Unable to load previous source map: " + e.toString());
						return t;
					}
				} else if (r instanceof e) return t.fromSourceMap(r).toString();
				else if (r instanceof t) return r.toString();
				else if (this.isMap(r)) return JSON.stringify(r);
				else throw Error("Unsupported previous source map format: " + r.toString());
			} else if (this.inline) return this.decodeInline(this.annotation);
			else if (this.annotation) {
				let e = this.annotation;
				return n && (e = a(i(n), e)), this.loadFile(e);
			}
		}
		startWith(e, t) {
			return e ? e.substr(0, t.length) === t : !1;
		}
		withContent() {
			return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
		}
	}
	return ia = s, s.default = s, ia;
}
var sa, ca;
function la() {
	if (ca) return sa;
	ca = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = Ii, { fileURLToPath: n, pathToFileURL: r } = Ii, { isAbsolute: i, resolve: a } = Ii, { nanoid: o } = /* @__PURE__ */ ra(), s = Ii, c = zi(), l = oa(), u = Symbol("fromOffsetCache"), d = !!(e && t), f = !!(a && i);
	class p {
		constructor(e, t = {}) {
			if (e == null || typeof e == "object" && !e.toString) throw Error(`PostCSS received ${e} instead of CSS string`);
			if (this.css = e.toString(), this.css[0] === "﻿" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (this.file = !f || /^\w+:\/\//.test(t.from) || i(t.from) ? t.from : a(t.from)), f && d) {
				let e = new l(this.css, t);
				if (e.text) {
					this.map = e;
					let t = e.consumer().file;
					!this.file && t && (this.file = this.mapResolve(t));
				}
			}
			this.file || (this.id = "<input css " + o(6) + ">"), this.map && (this.map.file = this.from);
		}
		error(e, t, n, i = {}) {
			let a, o, s;
			if (t && typeof t == "object") {
				let e = t, r = n;
				if (typeof e.offset == "number") {
					let r = this.fromOffset(e.offset);
					t = r.line, n = r.col;
				} else t = e.line, n = e.column;
				if (typeof r.offset == "number") {
					let e = this.fromOffset(r.offset);
					o = e.line, s = e.col;
				} else o = r.line, s = r.column;
			} else if (!n) {
				let e = this.fromOffset(t);
				t = e.line, n = e.col;
			}
			let l = this.origin(t, n, o, s);
			return a = l ? new c(e, l.endLine === void 0 ? l.line : {
				column: l.column,
				line: l.line
			}, l.endLine === void 0 ? l.column : {
				column: l.endColumn,
				line: l.endLine
			}, l.source, l.file, i.plugin) : new c(e, o === void 0 ? t : {
				column: n,
				line: t
			}, o === void 0 ? n : {
				column: s,
				line: o
			}, this.css, this.file, i.plugin), a.input = {
				column: n,
				endColumn: s,
				endLine: o,
				line: t,
				source: this.css
			}, this.file && (r && (a.input.url = r(this.file).toString()), a.input.file = this.file), a;
		}
		fromOffset(e) {
			let t, n;
			if (this[u]) n = this[u];
			else {
				let e = this.css.split("\n");
				n = Array(e.length);
				let t = 0;
				for (let r = 0, i = e.length; r < i; r++) n[r] = t, t += e[r].length + 1;
				this[u] = n;
			}
			t = n[n.length - 1];
			let r = 0;
			if (e >= t) r = n.length - 1;
			else {
				let t = n.length - 2, i;
				for (; r < t;) if (i = r + (t - r >> 1), e < n[i]) t = i - 1;
				else if (e >= n[i + 1]) r = i + 1;
				else {
					r = i;
					break;
				}
			}
			return {
				col: e - n[r] + 1,
				line: r + 1
			};
		}
		mapResolve(e) {
			return /^\w+:\/\//.test(e) ? e : a(this.map.consumer().sourceRoot || this.map.root || ".", e);
		}
		origin(e, t, a, o) {
			if (!this.map) return !1;
			let s = this.map.consumer(), c = s.originalPositionFor({
				column: t,
				line: e
			});
			if (!c.source) return !1;
			let l;
			typeof a == "number" && (l = s.originalPositionFor({
				column: o,
				line: a
			}));
			let u;
			u = i(c.source) ? r(c.source) : new URL(c.source, this.map.consumer().sourceRoot || r(this.map.mapFile));
			let d = {
				column: c.column,
				endColumn: l && l.column,
				endLine: l && l.line,
				line: c.line,
				url: u.toString()
			};
			if (u.protocol === "file:") {
				if (n) d.file = n(u);
				else throw Error("file: protocol is not available in this PostCSS build");
			}
			let f = s.sourceContentFor(c.source);
			return f && (d.source = f), d;
		}
		toJSON() {
			let e = {};
			for (let t of [
				"hasBOM",
				"css",
				"file",
				"id"
			]) this[t] != null && (e[t] = this[t]);
			return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
		}
		get from() {
			return this.file || this.id;
		}
	}
	return sa = p, p.default = p, s && s.registerInput && s.registerInput(p), sa;
}
var ua, da;
function fa() {
	if (da) return ua;
	da = 1;
	let { SourceMapConsumer: e, SourceMapGenerator: t } = Ii, { dirname: n, relative: r, resolve: i, sep: a } = Ii, { pathToFileURL: o } = Ii, s = la(), c = !!(e && t), l = !!(n && i && r && a);
	class u {
		constructor(e, t, n, r) {
			this.stringify = e, this.mapOpts = n.map || {}, this.root = t, this.opts = n, this.css = r, this.originalCSS = r, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
		}
		addAnnotation() {
			let e;
			e = this.isInline() ? "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? this.mapOpts.annotation(this.opts.to, this.root) : this.outputFile() + ".map";
			let t = "\n";
			this.css.includes("\r\n") && (t = "\r\n"), this.css += t + "/*# sourceMappingURL=" + e + " */";
		}
		applyPrevMaps() {
			for (let t of this.previous()) {
				let r = this.toUrl(this.path(t.file)), i = t.root || n(t.file), a;
				this.mapOpts.sourcesContent === !1 ? (a = new e(t.text), a.sourcesContent && (a.sourcesContent = null)) : a = t.consumer(), this.map.applySourceMap(a, r, this.toUrl(this.path(i)));
			}
		}
		clearAnnotation() {
			if (this.mapOpts.annotation !== !1) {
				if (this.root) {
					let e;
					for (let t = this.root.nodes.length - 1; t >= 0; t--) e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
				} else this.css &&= this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, "");
			}
		}
		generate() {
			if (this.clearAnnotation(), l && c && this.isMap()) return this.generateMap();
			{
				let e = "";
				return this.stringify(this.root, (t) => {
					e += t;
				}), [e];
			}
		}
		generateMap() {
			if (this.root) this.generateString();
			else if (this.previous().length === 1) {
				let e = this.previous()[0].consumer();
				e.file = this.outputFile(), this.map = t.fromSourceMap(e, { ignoreInvalidMapping: !0 });
			} else this.map = new t({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			}), this.map.addMapping({
				generated: {
					column: 0,
					line: 1
				},
				original: {
					column: 0,
					line: 1
				},
				source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
			});
			return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
		}
		generateString() {
			this.css = "", this.map = new t({
				file: this.outputFile(),
				ignoreInvalidMapping: !0
			});
			let e = 1, n = 1, r = "<no source>", i = {
				generated: {
					column: 0,
					line: 0
				},
				original: {
					column: 0,
					line: 0
				},
				source: ""
			}, a, o;
			this.stringify(this.root, (t, s, c) => {
				if (this.css += t, s && c !== "end" && (i.generated.line = e, i.generated.column = n - 1, s.source && s.source.start ? (i.source = this.sourcePath(s), i.original.line = s.source.start.line, i.original.column = s.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), a = t.match(/\n/g), a ? (e += a.length, o = t.lastIndexOf("\n"), n = t.length - o) : n += t.length, s && c !== "start") {
					let t = s.parent || { raws: {} };
					(!(s.type === "decl" || s.type === "atrule" && !s.nodes) || s !== t.last || t.raws.semicolon) && (s.source && s.source.end ? (i.source = this.sourcePath(s), i.original.line = s.source.end.line, i.original.column = s.source.end.column - 1, i.generated.line = e, i.generated.column = n - 2, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, i.generated.line = e, i.generated.column = n - 1, this.map.addMapping(i)));
				}
			});
		}
		isAnnotation() {
			return this.isInline() ? !0 : this.mapOpts.annotation === void 0 ? !this.previous().length || this.previous().some((e) => e.annotation) : this.mapOpts.annotation;
		}
		isInline() {
			if (this.mapOpts.inline !== void 0) return this.mapOpts.inline;
			let e = this.mapOpts.annotation;
			return e !== void 0 && e !== !0 ? !1 : !this.previous().length || this.previous().some((e) => e.inline);
		}
		isMap() {
			return this.opts.map === void 0 ? this.previous().length > 0 : !!this.opts.map;
		}
		isSourcesContent() {
			return this.mapOpts.sourcesContent === void 0 ? !this.previous().length || this.previous().some((e) => e.withContent()) : this.mapOpts.sourcesContent;
		}
		outputFile() {
			return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
		}
		path(e) {
			if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
			let t = this.memoizedPaths.get(e);
			if (t) return t;
			let a = this.opts.to ? n(this.opts.to) : ".";
			typeof this.mapOpts.annotation == "string" && (a = n(i(a, this.mapOpts.annotation)));
			let o = r(a, e);
			return this.memoizedPaths.set(e, o), o;
		}
		previous() {
			if (!this.previousMaps) {
				if (this.previousMaps = [], this.root) this.root.walk((e) => {
					if (e.source && e.source.input.map) {
						let t = e.source.input.map;
						this.previousMaps.includes(t) || this.previousMaps.push(t);
					}
				});
				else {
					let e = new s(this.originalCSS, this.opts);
					e.map && this.previousMaps.push(e.map);
				}
			}
			return this.previousMaps;
		}
		setSourcesContent() {
			let e = {};
			if (this.root) this.root.walk((t) => {
				if (t.source) {
					let n = t.source.input.from;
					if (n && !e[n]) {
						e[n] = !0;
						let r = this.usesFileUrls ? this.toFileUrl(n) : this.toUrl(this.path(n));
						this.map.setSourceContent(r, t.source.input.css);
					}
				}
			});
			else if (this.css) {
				let e = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
				this.map.setSourceContent(e, this.css);
			}
		}
		sourcePath(e) {
			return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
		}
		toBase64(e) {
			return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
		}
		toFileUrl(e) {
			let t = this.memoizedFileURLs.get(e);
			if (t) return t;
			if (o) {
				let t = o(e).toString();
				return this.memoizedFileURLs.set(e, t), t;
			}
			throw Error("`map.absolute` option is not available in this PostCSS build");
		}
		toUrl(e) {
			let t = this.memoizedURLs.get(e);
			if (t) return t;
			a === "\\" && (e = e.replace(/\\/g, "/"));
			let n = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
			return this.memoizedURLs.set(e, n), n;
		}
	}
	return ua = u, ua;
}
var pa, ma;
function ha() {
	if (ma) return pa;
	ma = 1;
	let e = Zi();
	class t extends e {
		constructor(e) {
			super(e), this.type = "comment";
		}
	}
	return pa = t, t.default = t, pa;
}
var ga, _a;
function va() {
	if (_a) return ga;
	_a = 1;
	let { isClean: e, my: t } = Hi(), n = ea(), r = ha(), i = Zi(), a, o, s, c;
	function l(e) {
		return e.map((e) => (e.nodes &&= l(e.nodes), delete e.source, e));
	}
	function u(t) {
		if (t[e] = !1, t.proxyOf.nodes) for (let e of t.proxyOf.nodes) u(e);
	}
	class d extends i {
		append(...e) {
			for (let t of e) {
				let e = this.normalize(t, this.last);
				for (let t of e) this.proxyOf.nodes.push(t);
			}
			return this.markDirty(), this;
		}
		cleanRaws(e) {
			if (super.cleanRaws(e), this.nodes) for (let t of this.nodes) t.cleanRaws(e);
		}
		each(e) {
			if (!this.proxyOf.nodes) return;
			let t = this.getIterator(), n, r;
			for (; this.indexes[t] < this.proxyOf.nodes.length && (n = this.indexes[t], r = e(this.proxyOf.nodes[n], n), r !== !1);) this.indexes[t] += 1;
			return delete this.indexes[t], r;
		}
		every(e) {
			return this.nodes.every(e);
		}
		getIterator() {
			this.lastEach ||= 0, this.indexes ||= {}, this.lastEach += 1;
			let e = this.lastEach;
			return this.indexes[e] = 0, e;
		}
		getProxyProcessor() {
			return {
				get(e, t) {
					return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...n) => e[t](...n.map((e) => typeof e == "function" ? (t, n) => e(t.toProxy(), n) : e)) : t === "every" || t === "some" ? (n) => e[t]((e, ...t) => n(e.toProxy(), ...t)) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((e) => e.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
				},
				set(e, t, n) {
					return e[t] === n || (e[t] = n, (t === "name" || t === "params" || t === "selector") && e.markDirty(), !0);
				}
			};
		}
		index(e) {
			return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
		}
		insertAfter(e, t) {
			let n = this.index(e), r = this.normalize(t, this.proxyOf.nodes[n]).reverse();
			n = this.index(e);
			for (let e of r) this.proxyOf.nodes.splice(n + 1, 0, e);
			let i;
			for (let e in this.indexes) i = this.indexes[e], n < i && (this.indexes[e] = i + r.length);
			return this.markDirty(), this;
		}
		insertBefore(e, t) {
			let n = this.index(e), r = n === 0 && "prepend", i = this.normalize(t, this.proxyOf.nodes[n], r).reverse();
			n = this.index(e);
			for (let e of i) this.proxyOf.nodes.splice(n, 0, e);
			let a;
			for (let e in this.indexes) a = this.indexes[e], n <= a && (this.indexes[e] = a + i.length);
			return this.markDirty(), this;
		}
		normalize(i, c) {
			if (typeof i == "string") i = l(a(i).nodes);
			else if (i === void 0) i = [];
			else if (Array.isArray(i)) {
				i = i.slice(0);
				for (let e of i) e.parent && e.parent.removeChild(e, "ignore");
			} else if (i.type === "root" && this.type !== "document") {
				i = i.nodes.slice(0);
				for (let e of i) e.parent && e.parent.removeChild(e, "ignore");
			} else if (i.type) i = [i];
			else if (i.prop) {
				if (i.value === void 0) throw Error("Value field is missed in node creation");
				typeof i.value != "string" && (i.value = String(i.value)), i = [new n(i)];
			} else if (i.selector) i = [new o(i)];
			else if (i.name) i = [new s(i)];
			else if (i.text) i = [new r(i)];
			else throw Error("Unknown node type in node creation");
			return i.map((n) => (n[t] || d.rebuild(n), n = n.proxyOf, n.parent && n.parent.removeChild(n), n[e] && u(n), n.raws.before === void 0 && c && c.raws.before !== void 0 && (n.raws.before = c.raws.before.replace(/\S/g, "")), n.parent = this.proxyOf, n));
		}
		prepend(...e) {
			e = e.reverse();
			for (let t of e) {
				let e = this.normalize(t, this.first, "prepend").reverse();
				for (let t of e) this.proxyOf.nodes.unshift(t);
				for (let t in this.indexes) this.indexes[t] = this.indexes[t] + e.length;
			}
			return this.markDirty(), this;
		}
		push(e) {
			return e.parent = this, this.proxyOf.nodes.push(e), this;
		}
		removeAll() {
			for (let e of this.proxyOf.nodes) e.parent = void 0;
			return this.proxyOf.nodes = [], this.markDirty(), this;
		}
		removeChild(e) {
			e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
			let t;
			for (let n in this.indexes) t = this.indexes[n], t >= e && (this.indexes[n] = t - 1);
			return this.markDirty(), this;
		}
		replaceValues(e, t, n) {
			return n || (n = t, t = {}), this.walkDecls((r) => {
				(!t.props || t.props.includes(r.prop)) && (!t.fast || r.value.includes(t.fast)) && (r.value = r.value.replace(e, n));
			}), this.markDirty(), this;
		}
		some(e) {
			return this.nodes.some(e);
		}
		walk(e) {
			return this.each((t, n) => {
				let r;
				try {
					r = e(t, n);
				} catch (e) {
					throw t.addToError(e);
				}
				return r !== !1 && t.walk && (r = t.walk(e)), r;
			});
		}
		walkAtRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "atrule" && e.test(n.name)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "atrule" && n.name === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "atrule") return t(e, n);
			}));
		}
		walkComments(e) {
			return this.walk((t, n) => {
				if (t.type === "comment") return e(t, n);
			});
		}
		walkDecls(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "decl" && e.test(n.prop)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "decl" && n.prop === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "decl") return t(e, n);
			}));
		}
		walkRules(e, t) {
			return t ? e instanceof RegExp ? this.walk((n, r) => {
				if (n.type === "rule" && e.test(n.selector)) return t(n, r);
			}) : this.walk((n, r) => {
				if (n.type === "rule" && n.selector === e) return t(n, r);
			}) : (t = e, this.walk((e, n) => {
				if (e.type === "rule") return t(e, n);
			}));
		}
		get first() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
		}
		get last() {
			if (this.proxyOf.nodes) return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
		}
	}
	return d.registerParse = (e) => {
		a = e;
	}, d.registerRule = (e) => {
		o = e;
	}, d.registerAtRule = (e) => {
		s = e;
	}, d.registerRoot = (e) => {
		c = e;
	}, ga = d, d.default = d, d.rebuild = (e) => {
		e.type === "atrule" ? Object.setPrototypeOf(e, s.prototype) : e.type === "rule" ? Object.setPrototypeOf(e, o.prototype) : e.type === "decl" ? Object.setPrototypeOf(e, n.prototype) : e.type === "comment" ? Object.setPrototypeOf(e, r.prototype) : e.type === "root" && Object.setPrototypeOf(e, c.prototype), e[t] = !0, e.nodes && e.nodes.forEach((e) => {
			d.rebuild(e);
		});
	}, ga;
}
var ya, ba;
function xa() {
	if (ba) return ya;
	ba = 1;
	let e = va(), t, n;
	class r extends e {
		constructor(e) {
			super({
				type: "document",
				...e
			}), this.nodes ||= [];
		}
		toResult(e = {}) {
			return new t(new n(), this, e).stringify();
		}
	}
	return r.registerLazyResult = (e) => {
		t = e;
	}, r.registerProcessor = (e) => {
		n = e;
	}, ya = r, r.default = r, ya;
}
var Sa, Ca;
function wa() {
	if (Ca) return Sa;
	Ca = 1;
	let e = {};
	return Sa = function(t) {
		e[t] || (e[t] = !0, typeof console < "u" && console.warn && console.warn(t));
	}, Sa;
}
var Ta, Ea;
function Da() {
	if (Ea) return Ta;
	Ea = 1;
	class e {
		constructor(e, t = {}) {
			if (this.type = "warning", this.text = e, t.node && t.node.source) {
				let e = t.node.rangeBy(t);
				this.line = e.start.line, this.column = e.start.column, this.endLine = e.end.line, this.endColumn = e.end.column;
			}
			for (let e in t) this[e] = t[e];
		}
		toString() {
			return this.node ? this.node.error(this.text, {
				index: this.index,
				plugin: this.plugin,
				word: this.word
			}).message : this.plugin ? this.plugin + ": " + this.text : this.text;
		}
	}
	return Ta = e, e.default = e, Ta;
}
var Oa, ka;
function Aa() {
	if (ka) return Oa;
	ka = 1;
	let e = Da();
	class t {
		constructor(e, t, n) {
			this.processor = e, this.messages = [], this.root = t, this.opts = n, this.css = void 0, this.map = void 0;
		}
		toString() {
			return this.css;
		}
		warn(t, n = {}) {
			n.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (n.plugin = this.lastPlugin.postcssPlugin);
			let r = new e(t, n);
			return this.messages.push(r), r;
		}
		warnings() {
			return this.messages.filter((e) => e.type === "warning");
		}
		get content() {
			return this.css;
		}
	}
	return Oa = t, t.default = t, Oa;
}
var ja, Ma;
function Na() {
	if (Ma) return ja;
	Ma = 1;
	let e = /[\t\n\f\r "#'()/;[\\\]{}]/g, t = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, n = /.[\r\n"'(/\\]/, r = /[\da-f]/i;
	return ja = function(i, a = {}) {
		let o = i.css.valueOf(), s = a.ignoreErrors, c, l, u, d, f, p, m, h, g, _, v = o.length, y = 0, b = [], x = [];
		function S() {
			return y;
		}
		function C(e) {
			throw i.error("Unclosed " + e, y);
		}
		function ee() {
			return x.length === 0 && y >= v;
		}
		function w(i) {
			if (x.length) return x.pop();
			if (y >= v) return;
			let a = i ? i.ignoreUnclosed : !1;
			switch (c = o.charCodeAt(y), c) {
				case 10:
				case 32:
				case 9:
				case 13:
				case 12:
					l = y;
					do
						l += 1, c = o.charCodeAt(l);
					while (c === 32 || c === 10 || c === 9 || c === 13 || c === 12);
					_ = ["space", o.slice(y, l)], y = l - 1;
					break;
				case 91:
				case 93:
				case 123:
				case 125:
				case 58:
				case 59:
				case 41: {
					let e = String.fromCharCode(c);
					_ = [
						e,
						e,
						y
					];
					break;
				}
				case 40:
					if (h = b.length ? b.pop()[1] : "", g = o.charCodeAt(y + 1), h === "url" && g !== 39 && g !== 34 && g !== 32 && g !== 10 && g !== 9 && g !== 12 && g !== 13) {
						l = y;
						do {
							if (p = !1, l = o.indexOf(")", l + 1), l === -1) {
								if (s || a) {
									l = y;
									break;
								}
								C("bracket");
							}
							for (m = l; o.charCodeAt(m - 1) === 92;) --m, p = !p;
						} while (p);
						_ = [
							"brackets",
							o.slice(y, l + 1),
							y,
							l
						], y = l;
					} else l = o.indexOf(")", y + 1), d = o.slice(y, l + 1), l === -1 || n.test(d) ? _ = [
						"(",
						"(",
						y
					] : (_ = [
						"brackets",
						d,
						y,
						l
					], y = l);
					break;
				case 39:
				case 34:
					u = c === 39 ? "'" : "\"", l = y;
					do {
						if (p = !1, l = o.indexOf(u, l + 1), l === -1) {
							if (s || a) {
								l = y + 1;
								break;
							}
							C("string");
						}
						for (m = l; o.charCodeAt(m - 1) === 92;) --m, p = !p;
					} while (p);
					_ = [
						"string",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				case 64:
					e.lastIndex = y + 1, e.test(o), l = e.lastIndex === 0 ? o.length - 1 : e.lastIndex - 2, _ = [
						"at-word",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				case 92:
					for (l = y, f = !0; o.charCodeAt(l + 1) === 92;) l += 1, f = !f;
					if (c = o.charCodeAt(l + 1), f && c !== 47 && c !== 32 && c !== 10 && c !== 9 && c !== 13 && c !== 12 && (l += 1, r.test(o.charAt(l)))) {
						for (; r.test(o.charAt(l + 1));) l += 1;
						o.charCodeAt(l + 1) === 32 && (l += 1);
					}
					_ = [
						"word",
						o.slice(y, l + 1),
						y,
						l
					], y = l;
					break;
				default: c === 47 && o.charCodeAt(y + 1) === 42 ? (l = o.indexOf("*/", y + 2) + 1, l === 0 && (s || a ? l = o.length : C("comment")), _ = [
					"comment",
					o.slice(y, l + 1),
					y,
					l
				], y = l) : (t.lastIndex = y + 1, t.test(o), l = t.lastIndex === 0 ? o.length - 1 : t.lastIndex - 2, _ = [
					"word",
					o.slice(y, l + 1),
					y,
					l
				], b.push(_), y = l);
			}
			return y++, _;
		}
		function T(e) {
			x.push(e);
		}
		return {
			back: T,
			endOfFile: ee,
			nextToken: w,
			position: S
		};
	}, ja;
}
var Pa, Fa;
function Ia() {
	if (Fa) return Pa;
	Fa = 1;
	let e = va();
	class t extends e {
		constructor(e) {
			super(e), this.type = "atrule";
		}
		append(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
		}
		prepend(...e) {
			return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
		}
	}
	return Pa = t, t.default = t, e.registerAtRule(t), Pa;
}
var La, Ra;
function za() {
	if (Ra) return La;
	Ra = 1;
	let e = va(), t, n;
	class r extends e {
		constructor(e) {
			super(e), this.type = "root", this.nodes ||= [];
		}
		normalize(e, t, n) {
			let r = super.normalize(e);
			if (t) {
				if (n === "prepend") this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
				else if (this.first !== t) for (let e of r) e.raws.before = t.raws.before;
			}
			return r;
		}
		removeChild(e, t) {
			let n = this.index(e);
			return !t && n === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[n].raws.before), super.removeChild(e);
		}
		toResult(e = {}) {
			return new t(new n(), this, e).stringify();
		}
	}
	return r.registerLazyResult = (e) => {
		t = e;
	}, r.registerProcessor = (e) => {
		n = e;
	}, La = r, r.default = r, e.registerRoot(r), La;
}
var Ba, Va;
function Ha() {
	if (Va) return Ba;
	Va = 1;
	let e = {
		comma(t) {
			return e.split(t, [","], !0);
		},
		space(t) {
			return e.split(t, [
				" ",
				"\n",
				"	"
			]);
		},
		split(e, t, n) {
			let r = [], i = "", a = !1, o = 0, s = !1, c = "", l = !1;
			for (let n of e) l ? l = !1 : n === "\\" ? l = !0 : s ? n === c && (s = !1) : n === "\"" || n === "'" ? (s = !0, c = n) : n === "(" ? o += 1 : n === ")" ? o > 0 && --o : o === 0 && t.includes(n) && (a = !0), a ? (i !== "" && r.push(i.trim()), i = "", a = !1) : i += n;
			return (n || i !== "") && r.push(i.trim()), r;
		}
	};
	return Ba = e, e.default = e, Ba;
}
var Ua, Wa;
function Ga() {
	if (Wa) return Ua;
	Wa = 1;
	let e = va(), t = Ha();
	class n extends e {
		constructor(e) {
			super(e), this.type = "rule", this.nodes ||= [];
		}
		get selectors() {
			return t.comma(this.selector);
		}
		set selectors(e) {
			let t = this.selector ? this.selector.match(/,\s*/) : null, n = t ? t[0] : "," + this.raw("between", "beforeOpen");
			this.selector = e.join(n);
		}
	}
	return Ua = n, n.default = n, e.registerRule(n), Ua;
}
var Ka, qa;
function Ja() {
	if (qa) return Ka;
	qa = 1;
	let e = ea(), t = Na(), n = ha(), r = Ia(), i = za(), a = Ga(), o = {
		empty: !0,
		space: !0
	};
	function s(e) {
		for (let t = e.length - 1; t >= 0; t--) {
			let n = e[t], r = n[3] || n[2];
			if (r) return r;
		}
	}
	class c {
		constructor(e) {
			this.input = e, this.root = new i(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = {
				input: e,
				start: {
					column: 1,
					line: 1,
					offset: 0
				}
			};
		}
		atrule(e) {
			let t = new r();
			t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
			let n, i, a, o = !1, s = !1, c = [], l = [];
			for (; !this.tokenizer.endOfFile();) {
				if (e = this.tokenizer.nextToken(), n = e[0], n === "(" || n === "[" ? l.push(n === "(" ? ")" : "]") : n === "{" && l.length > 0 ? l.push("}") : n === l[l.length - 1] && l.pop(), l.length === 0) {
					if (n === ";") {
						t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
						break;
					}
					if (n === "{") {
						s = !0;
						break;
					}
					if (n === "}") {
						if (c.length > 0) {
							for (a = c.length - 1, i = c[a]; i && i[0] === "space";) i = c[--a];
							i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
						}
						this.end(e);
						break;
					}
					c.push(e);
				} else c.push(e);
				if (this.tokenizer.endOfFile()) {
					o = !0;
					break;
				}
			}
			t.raws.between = this.spacesAndCommentsFromEnd(c), c.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(c), this.raw(t, "params", c), o && (e = c[c.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), s && (t.nodes = [], this.current = t);
		}
		checkMissedSemicolon(e) {
			let t = this.colon(e);
			if (t === !1) return;
			let n = 0, r;
			for (let i = t - 1; i >= 0 && (r = e[i], !(r[0] !== "space" && (n += 1, n === 2))); i--);
			throw this.input.error("Missed semicolon", r[0] === "word" ? r[3] + 1 : r[2]);
		}
		colon(e) {
			let t = 0, n, r, i;
			for (let [a, o] of e.entries()) {
				if (n = o, r = n[0], r === "(" && (t += 1), r === ")" && --t, t === 0 && r === ":") {
					if (!i) this.doubleColon(n);
					else if (i[0] === "word" && i[1] === "progid") continue;
					else return a;
				}
				i = n;
			}
			return !1;
		}
		comment(e) {
			let t = new n();
			this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
			let r = e[1].slice(2, -2);
			if (/^\s*$/.test(r)) t.text = "", t.raws.left = r, t.raws.right = "";
			else {
				let e = r.match(/^(\s*)([^]*\S)(\s*)$/);
				t.text = e[2], t.raws.left = e[1], t.raws.right = e[3];
			}
		}
		createTokenizer() {
			this.tokenizer = t(this.input);
		}
		decl(t, n) {
			let r = new e();
			this.init(r, t[0][2]);
			let i = t[t.length - 1];
			for (i[0] === ";" && (this.semicolon = !0, t.pop()), r.source.end = this.getPosition(i[3] || i[2] || s(t)), r.source.end.offset++; t[0][0] !== "word";) t.length === 1 && this.unknownWord(t), r.raws.before += t.shift()[1];
			for (r.source.start = this.getPosition(t[0][2]), r.prop = ""; t.length;) {
				let e = t[0][0];
				if (e === ":" || e === "space" || e === "comment") break;
				r.prop += t.shift()[1];
			}
			r.raws.between = "";
			let a;
			for (; t.length;) {
				if (a = t.shift(), a[0] === ":") {
					r.raws.between += a[1];
					break;
				}
				a[0] === "word" && /\w/.test(a[1]) && this.unknownWord([a]), r.raws.between += a[1];
			}
			(r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
			let o = [], c;
			for (; t.length && (c = t[0][0], c === "space" || c === "comment");) o.push(t.shift());
			this.precheckMissedSemicolon(t);
			for (let e = t.length - 1; e >= 0; e--) {
				if (a = t[e], a[1].toLowerCase() === "!important") {
					r.important = !0;
					let n = this.stringFrom(t, e);
					n = this.spacesFromEnd(t) + n, n !== " !important" && (r.raws.important = n);
					break;
				}
				if (a[1].toLowerCase() === "important") {
					let n = t.slice(0), i = "";
					for (let t = e; t > 0; t--) {
						let e = n[t][0];
						if (i.trim().indexOf("!") === 0 && e !== "space") break;
						i = n.pop()[1] + i;
					}
					i.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = i, t = n);
				}
				if (a[0] !== "space" && a[0] !== "comment") break;
			}
			t.some((e) => e[0] !== "space" && e[0] !== "comment") && (r.raws.between += o.map((e) => e[1]).join(""), o = []), this.raw(r, "value", o.concat(t), n), r.value.includes(":") && !n && this.checkMissedSemicolon(t);
		}
		doubleColon(e) {
			throw this.input.error("Double colon", { offset: e[2] }, { offset: e[2] + e[1].length });
		}
		emptyRule(e) {
			let t = new a();
			this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
		}
		end(e) {
			this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
		}
		endFile() {
			this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
		}
		freeSemicolon(e) {
			if (this.spaces += e[1], this.current.nodes) {
				let e = this.current.nodes[this.current.nodes.length - 1];
				e && e.type === "rule" && !e.raws.ownSemicolon && (e.raws.ownSemicolon = this.spaces, this.spaces = "");
			}
		}
		getPosition(e) {
			let t = this.input.fromOffset(e);
			return {
				column: t.col,
				line: t.line,
				offset: e
			};
		}
		init(e, t) {
			this.current.push(e), e.source = {
				input: this.input,
				start: this.getPosition(t)
			}, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
		}
		other(e) {
			let t = !1, n = null, r = !1, i = null, a = [], o = e[1].startsWith("--"), s = [], c = e;
			for (; c;) {
				if (n = c[0], s.push(c), n === "(" || n === "[") i ||= c, a.push(n === "(" ? ")" : "]");
				else if (o && r && n === "{") i ||= c, a.push("}");
				else if (a.length === 0) {
					if (n === ";") {
						if (r) {
							this.decl(s, o);
							return;
						}
						break;
					}
					if (n === "{") {
						this.rule(s);
						return;
					}
					if (n === "}") {
						this.tokenizer.back(s.pop()), t = !0;
						break;
					}
					n === ":" && (r = !0);
				} else n === a[a.length - 1] && (a.pop(), a.length === 0 && (i = null));
				c = this.tokenizer.nextToken();
			}
			if (this.tokenizer.endOfFile() && (t = !0), a.length > 0 && this.unclosedBracket(i), t && r) {
				if (!o) for (; s.length && (c = s[s.length - 1][0], c === "space" || c === "comment");) this.tokenizer.back(s.pop());
				this.decl(s, o);
			} else this.unknownWord(s);
		}
		parse() {
			let e;
			for (; !this.tokenizer.endOfFile();) switch (e = this.tokenizer.nextToken(), e[0]) {
				case "space":
					this.spaces += e[1];
					break;
				case ";":
					this.freeSemicolon(e);
					break;
				case "}":
					this.end(e);
					break;
				case "comment":
					this.comment(e);
					break;
				case "at-word":
					this.atrule(e);
					break;
				case "{":
					this.emptyRule(e);
					break;
				default: this.other(e);
			}
			this.endFile();
		}
		precheckMissedSemicolon() {}
		raw(e, t, n, r) {
			let i, a, s = n.length, c = "", l = !0, u, d;
			for (let e = 0; e < s; e += 1) i = n[e], a = i[0], a === "space" && e === s - 1 && !r ? l = !1 : a === "comment" ? (d = n[e - 1] ? n[e - 1][0] : "empty", u = n[e + 1] ? n[e + 1][0] : "empty", !o[d] && !o[u] ? c.slice(-1) === "," ? l = !1 : c += i[1] : l = !1) : c += i[1];
			if (!l) {
				let r = n.reduce((e, t) => e + t[1], "");
				e.raws[t] = {
					raw: r,
					value: c
				};
			}
			e[t] = c;
		}
		rule(e) {
			e.pop();
			let t = new a();
			this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
		}
		spacesAndCommentsFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space" || t === "comment");) n = e.pop()[1] + n;
			return n;
		}
		spacesAndCommentsFromStart(e) {
			let t, n = "";
			for (; e.length && (t = e[0][0], t === "space" || t === "comment");) n += e.shift()[1];
			return n;
		}
		spacesFromEnd(e) {
			let t, n = "";
			for (; e.length && (t = e[e.length - 1][0], t === "space");) n = e.pop()[1] + n;
			return n;
		}
		stringFrom(e, t) {
			let n = "";
			for (let r = t; r < e.length; r++) n += e[r][1];
			return e.splice(t, e.length - t), n;
		}
		unclosedBlock() {
			let e = this.current.source.start;
			throw this.input.error("Unclosed block", e.line, e.column);
		}
		unclosedBracket(e) {
			throw this.input.error("Unclosed bracket", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unexpectedClose(e) {
			throw this.input.error("Unexpected }", { offset: e[2] }, { offset: e[2] + 1 });
		}
		unknownWord(e) {
			throw this.input.error("Unknown word", { offset: e[0][2] }, { offset: e[0][2] + e[0][1].length });
		}
		unnamedAtrule(e, t) {
			throw this.input.error("At-rule without name", { offset: t[2] }, { offset: t[2] + t[1].length });
		}
	}
	return Ka = c, Ka;
}
var Ya, Xa;
function Za() {
	if (Xa) return Ya;
	Xa = 1;
	let e = va(), t = Ja(), n = la();
	function r(e, r) {
		let i = new n(e, r), a = new t(i);
		try {
			a.parse();
		} catch (e) {
			throw process.env.NODE_ENV !== "production" && e.name === "CssSyntaxError" && r && r.from && (/\.scss$/i.test(r.from) ? e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser" : /\.sass/i.test(r.from) ? e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser" : /\.less$/i.test(r.from) && (e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")), e;
		}
		return a.root;
	}
	return Ya = r, r.default = r, e.registerParse(r), Ya;
}
var Qa, $a;
function eo() {
	if ($a) return Qa;
	$a = 1;
	let { isClean: e, my: t } = Hi(), n = fa(), r = Ji(), i = va(), a = xa(), o = wa(), s = Aa(), c = Za(), l = za(), u = {
		atrule: "AtRule",
		comment: "Comment",
		decl: "Declaration",
		document: "Document",
		root: "Root",
		rule: "Rule"
	}, d = {
		AtRule: !0,
		AtRuleExit: !0,
		Comment: !0,
		CommentExit: !0,
		Declaration: !0,
		DeclarationExit: !0,
		Document: !0,
		DocumentExit: !0,
		Once: !0,
		OnceExit: !0,
		postcssPlugin: !0,
		prepare: !0,
		Root: !0,
		RootExit: !0,
		Rule: !0,
		RuleExit: !0
	}, f = {
		Once: !0,
		postcssPlugin: !0,
		prepare: !0
	};
	function p(e) {
		return typeof e == "object" && typeof e.then == "function";
	}
	function m(e) {
		let t = !1, n = u[e.type];
		return e.type === "decl" ? t = e.prop.toLowerCase() : e.type === "atrule" && (t = e.name.toLowerCase()), t && e.append ? [
			n,
			n + "-" + t,
			0,
			n + "Exit",
			n + "Exit-" + t
		] : t ? [
			n,
			n + "-" + t,
			n + "Exit",
			n + "Exit-" + t
		] : e.append ? [
			n,
			0,
			n + "Exit"
		] : [n, n + "Exit"];
	}
	function h(e) {
		let t;
		return t = e.type === "document" ? [
			"Document",
			0,
			"DocumentExit"
		] : e.type === "root" ? [
			"Root",
			0,
			"RootExit"
		] : m(e), {
			eventIndex: 0,
			events: t,
			iterator: 0,
			node: e,
			visitorIndex: 0,
			visitors: []
		};
	}
	function g(t) {
		return t[e] = !1, t.nodes && t.nodes.forEach((e) => g(e)), t;
	}
	let _ = {};
	class v {
		constructor(e, n, r) {
			this.stringified = !1, this.processed = !1;
			let a;
			if (typeof n == "object" && n && (n.type === "root" || n.type === "document")) a = g(n);
			else if (n instanceof v || n instanceof s) a = g(n.root), n.map && (r.map === void 0 && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = n.map);
			else {
				let e = c;
				r.syntax && (e = r.syntax.parse), r.parser && (e = r.parser), e.parse && (e = e.parse);
				try {
					a = e(n, r);
				} catch (e) {
					this.processed = !0, this.error = e;
				}
				a && !a[t] && i.rebuild(a);
			}
			this.result = new s(e, a, r), this.helpers = {
				..._,
				postcss: _,
				result: this.result
			}, this.plugins = this.processor.plugins.map((e) => typeof e == "object" && e.prepare ? {
				...e,
				...e.prepare(this.result)
			} : e);
		}
		async() {
			return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing ||= this.runAsync(), this.processing);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		getAsyncError() {
			throw Error("Use process(css).then(cb) to work with async plugins");
		}
		handleError(e, t) {
			let n = this.result.lastPlugin;
			try {
				if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin) e.plugin = n.postcssPlugin, e.setMessage();
				else if (n.postcssVersion && process.env.NODE_ENV !== "production") {
					let e = n.postcssPlugin, t = n.postcssVersion, r = this.result.processor.version, i = t.split("."), a = r.split(".");
					(i[0] !== a[0] || parseInt(i[1]) > parseInt(a[1])) && console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + r + ", but " + e + " uses " + t + ". Perhaps this is the source of the error below.");
				}
			} catch (e) {
				console && console.error && console.error(e);
			}
			return e;
		}
		prepareVisitors() {
			this.listeners = {};
			let e = (e, t, n) => {
				this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push([e, n]);
			};
			for (let t of this.plugins) if (typeof t == "object") for (let n in t) {
				if (!d[n] && /^[A-Z]/.test(n)) throw Error(`Unknown event ${n} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);
				if (!f[n]) {
					if (typeof t[n] == "object") for (let r in t[n]) r === "*" ? e(t, n, t[n][r]) : e(t, n + "-" + r.toLowerCase(), t[n][r]);
					else typeof t[n] == "function" && e(t, n, t[n]);
				}
			}
			this.hasListener = Object.keys(this.listeners).length > 0;
		}
		async runAsync() {
			this.plugin = 0;
			for (let e = 0; e < this.plugins.length; e++) {
				let t = this.plugins[e], n = this.runOnRoot(t);
				if (p(n)) try {
					await n;
				} catch (e) {
					throw this.handleError(e);
				}
			}
			if (this.prepareVisitors(), this.hasListener) {
				let t = this.result.root;
				for (; !t[e];) {
					t[e] = !0;
					let n = [h(t)];
					for (; n.length > 0;) {
						let e = this.visitTick(n);
						if (p(e)) try {
							await e;
						} catch (e) {
							let t = n[n.length - 1].node;
							throw this.handleError(e, t);
						}
					}
				}
				if (this.listeners.OnceExit) for (let [e, n] of this.listeners.OnceExit) {
					this.result.lastPlugin = e;
					try {
						if (t.type === "document") {
							let e = t.nodes.map((e) => n(e, this.helpers));
							await Promise.all(e);
						} else await n(t, this.helpers);
					} catch (e) {
						throw this.handleError(e);
					}
				}
			}
			return this.processed = !0, this.stringify();
		}
		runOnRoot(e) {
			this.result.lastPlugin = e;
			try {
				if (typeof e == "object" && e.Once) {
					if (this.result.root.type === "document") {
						let t = this.result.root.nodes.map((t) => e.Once(t, this.helpers));
						return p(t[0]) ? Promise.all(t) : t;
					}
					return e.Once(this.result.root, this.helpers);
				}
				if (typeof e == "function") return e(this.result.root, this.result);
			} catch (e) {
				throw this.handleError(e);
			}
		}
		stringify() {
			if (this.error) throw this.error;
			if (this.stringified) return this.result;
			this.stringified = !0, this.sync();
			let e = this.result.opts, t = r;
			e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
			let i = new n(t, this.result.root, this.result.opts).generate();
			return this.result.css = i[0], this.result.map = i[1], this.result;
		}
		sync() {
			if (this.error) throw this.error;
			if (this.processed) return this.result;
			if (this.processed = !0, this.processing) throw this.getAsyncError();
			for (let e of this.plugins) if (p(this.runOnRoot(e))) throw this.getAsyncError();
			if (this.prepareVisitors(), this.hasListener) {
				let t = this.result.root;
				for (; !t[e];) t[e] = !0, this.walkSync(t);
				if (this.listeners.OnceExit) {
					if (t.type === "document") for (let e of t.nodes) this.visitSync(this.listeners.OnceExit, e);
					else this.visitSync(this.listeners.OnceExit, t);
				}
			}
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this.opts || o("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this.css;
		}
		visitSync(e, t) {
			for (let [n, r] of e) {
				this.result.lastPlugin = n;
				let e;
				try {
					e = r(t, this.helpers);
				} catch (e) {
					throw this.handleError(e, t.proxyOf);
				}
				if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
				if (p(e)) throw this.getAsyncError();
			}
		}
		visitTick(t) {
			let n = t[t.length - 1], { node: r, visitors: i } = n;
			if (r.type !== "root" && r.type !== "document" && !r.parent) {
				t.pop();
				return;
			}
			if (i.length > 0 && n.visitorIndex < i.length) {
				let [e, t] = i[n.visitorIndex];
				n.visitorIndex += 1, n.visitorIndex === i.length && (n.visitors = [], n.visitorIndex = 0), this.result.lastPlugin = e;
				try {
					return t(r.toProxy(), this.helpers);
				} catch (e) {
					throw this.handleError(e, r);
				}
			}
			if (n.iterator !== 0) {
				let i = n.iterator, a;
				for (; a = r.nodes[r.indexes[i]];) if (r.indexes[i] += 1, !a[e]) {
					a[e] = !0, t.push(h(a));
					return;
				}
				n.iterator = 0, delete r.indexes[i];
			}
			let a = n.events;
			for (; n.eventIndex < a.length;) {
				let t = a[n.eventIndex];
				if (n.eventIndex += 1, t === 0) {
					r.nodes && r.nodes.length && (r[e] = !0, n.iterator = r.getIterator());
					return;
				}
				if (this.listeners[t]) {
					n.visitors = this.listeners[t];
					return;
				}
			}
			t.pop();
		}
		walkSync(t) {
			t[e] = !0;
			let n = m(t);
			for (let r of n) if (r === 0) t.nodes && t.each((t) => {
				t[e] || this.walkSync(t);
			});
			else {
				let e = this.listeners[r];
				if (e && this.visitSync(e, t.toProxy())) return;
			}
		}
		warnings() {
			return this.sync().warnings();
		}
		get content() {
			return this.stringify().content;
		}
		get css() {
			return this.stringify().css;
		}
		get map() {
			return this.stringify().map;
		}
		get messages() {
			return this.sync().messages;
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			return this.sync().root;
		}
		get [Symbol.toStringTag]() {
			return "LazyResult";
		}
	}
	return v.registerPostcss = (e) => {
		_ = e;
	}, Qa = v, v.default = v, l.registerLazyResult(v), a.registerLazyResult(v), Qa;
}
var to, no;
function ro() {
	if (no) return to;
	no = 1;
	let e = fa(), t = Ji(), n = wa(), r = Za(), i = Aa();
	class a {
		constructor(n, r, a) {
			r = r.toString(), this.stringified = !1, this._processor = n, this._css = r, this._opts = a, this._map = void 0;
			let o, s = t;
			this.result = new i(this._processor, o, this._opts), this.result.css = r;
			let c = this;
			Object.defineProperty(this.result, "root", { get() {
				return c.root;
			} });
			let l = new e(s, o, this._opts, r);
			if (l.isMap()) {
				let [e, t] = l.generate();
				e && (this.result.css = e), t && (this.result.map = t);
			} else l.clearAnnotation(), this.result.css = l.css;
		}
		async() {
			return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
		}
		catch(e) {
			return this.async().catch(e);
		}
		finally(e) {
			return this.async().then(e, e);
		}
		sync() {
			if (this.error) throw this.error;
			return this.result;
		}
		then(e, t) {
			return process.env.NODE_ENV !== "production" && ("from" in this._opts || n("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")), this.async().then(e, t);
		}
		toString() {
			return this._css;
		}
		warnings() {
			return [];
		}
		get content() {
			return this.result.css;
		}
		get css() {
			return this.result.css;
		}
		get map() {
			return this.result.map;
		}
		get messages() {
			return [];
		}
		get opts() {
			return this.result.opts;
		}
		get processor() {
			return this.result.processor;
		}
		get root() {
			if (this._root) return this._root;
			let e, t = r;
			try {
				e = t(this._css, this._opts);
			} catch (e) {
				this.error = e;
			}
			if (this.error) throw this.error;
			return this._root = e, e;
		}
		get [Symbol.toStringTag]() {
			return "NoWorkResult";
		}
	}
	return to = a, a.default = a, to;
}
var io, ao;
function oo() {
	if (ao) return io;
	ao = 1;
	let e = ro(), t = eo(), n = xa(), r = za();
	class i {
		constructor(e = []) {
			this.version = "8.4.38", this.plugins = this.normalize(e);
		}
		normalize(e) {
			let t = [];
			for (let n of e) if (n.postcss === !0 ? n = n() : n.postcss && (n = n.postcss), typeof n == "object" && Array.isArray(n.plugins)) t = t.concat(n.plugins);
			else if (typeof n == "object" && n.postcssPlugin) t.push(n);
			else if (typeof n == "function") t.push(n);
			else if (typeof n == "object" && (n.parse || n.stringify)) {
				if (process.env.NODE_ENV !== "production") throw Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
			} else throw Error(n + " is not a PostCSS plugin");
			return t;
		}
		process(n, r = {}) {
			return !this.plugins.length && !r.parser && !r.stringifier && !r.syntax ? new e(this, n, r) : new t(this, n, r);
		}
		use(e) {
			return this.plugins = this.plugins.concat(this.normalize([e])), this;
		}
	}
	return io = i, i.default = i, r.registerProcessor(i), n.registerProcessor(i), io;
}
var so, co;
function lo() {
	if (co) return so;
	co = 1;
	let e = ea(), t = oa(), n = ha(), r = Ia(), i = la(), a = za(), o = Ga();
	function s(c, l) {
		if (Array.isArray(c)) return c.map((e) => s(e));
		let { inputs: u, ...d } = c;
		if (u) {
			l = [];
			for (let e of u) {
				let n = {
					...e,
					__proto__: i.prototype
				};
				n.map &&= {
					...n.map,
					__proto__: t.prototype
				}, l.push(n);
			}
		}
		if (d.nodes &&= c.nodes.map((e) => s(e, l)), d.source) {
			let { inputId: e, ...t } = d.source;
			d.source = t, e != null && (d.source.input = l[e]);
		}
		if (d.type === "root") return new a(d);
		if (d.type === "decl") return new e(d);
		if (d.type === "rule") return new o(d);
		if (d.type === "comment") return new n(d);
		if (d.type === "atrule") return new r(d);
		throw Error("Unknown node type: " + c.type);
	}
	return so = s, s.default = s, so;
}
var uo, fo;
function po() {
	if (fo) return uo;
	fo = 1;
	let e = zi(), t = ea(), n = eo(), r = va(), i = oo(), a = Ji(), o = lo(), s = xa(), c = Da(), l = ha(), u = Ia(), d = Aa(), f = la(), p = Za(), m = Ha(), h = Ga(), g = za(), _ = Zi();
	function v(...e) {
		return e.length === 1 && Array.isArray(e[0]) && (e = e[0]), new i(e);
	}
	return v.plugin = function(e, t) {
		let n = !1;
		function r(...r) {
			console && console.warn && !n && (n = !0, console.warn(e + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(e + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"));
			let a = t(...r);
			return a.postcssPlugin = e, a.postcssVersion = new i().version, a;
		}
		let a;
		return Object.defineProperty(r, "postcss", { get() {
			return a ||= r(), a;
		} }), r.process = function(e, t, n) {
			return v([r(n)]).process(e, t);
		}, r;
	}, v.stringify = a, v.parse = p, v.fromJSON = o, v.list = m, v.comment = (e) => new l(e), v.atRule = (e) => new u(e), v.decl = (e) => new t(e), v.rule = (e) => new h(e), v.root = (e) => new g(e), v.document = (e) => new s(e), v.CssSyntaxError = e, v.Declaration = t, v.Container = r, v.Processor = i, v.Document = s, v.Comment = l, v.Warning = c, v.AtRule = u, v.Result = d, v.Input = f, v.Rule = h, v.Root = g, v.Node = _, n.registerPostcss(v), uo = v, v.default = v, uo;
}
var B = /* @__PURE__ */ ji(po());
B.stringify, B.fromJSON, B.plugin, B.parse, B.list, B.document, B.comment, B.atRule, B.rule, B.decl, B.root, B.CssSyntaxError, B.Declaration, B.Container, B.Processor, B.Document, B.Comment, B.Warning, B.AtRule, B.Result, B.Input, B.Rule, B.Root, B.Node;
var V = /* @__PURE__ */ ((e) => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(V || {});
function mo(e) {
	let t = {}, n = /;(?![^(]*\))/g, r = /:(.+)/;
	return e.replace(/\/\*.*?\*\//g, "").split(n).forEach(function(e) {
		if (e) {
			let n = e.split(r);
			n.length > 1 && (t[vo(n[0].trim())] = n[1].trim());
		}
	}), t;
}
function ho(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		if (typeof r != "string") continue;
		let i = bo(n);
		t.push(`${i}: ${r};`);
	}
	return t.join(" ");
}
var go = /-([a-z])/g, _o = /^--[a-zA-Z0-9-]+$/, vo = (e) => _o.test(e) ? e : e.replace(go, (e, t) => t ? t.toUpperCase() : ""), yo = /\B([A-Z])/g, bo = (e) => e.replace(yo, "-$1").toLowerCase(), xo = class e {
	constructor(...e) {
		z(this, "parentElement", null), z(this, "parentNode", null), z(this, "ownerDocument"), z(this, "firstChild", null), z(this, "lastChild", null), z(this, "previousSibling", null), z(this, "nextSibling", null), z(this, "ELEMENT_NODE", 1), z(this, "TEXT_NODE", 3), z(this, "nodeType"), z(this, "nodeName"), z(this, "RRNodeType");
	}
	get childNodes() {
		let e = [], t = this.firstChild;
		for (; t;) e.push(t), t = t.nextSibling;
		return e;
	}
	contains(t) {
		if (!(t instanceof e) || t.ownerDocument !== this.ownerDocument) return !1;
		if (t === this) return !0;
		for (; t.parentNode;) {
			if (t.parentNode === this) return !0;
			t = t.parentNode;
		}
		return !1;
	}
	appendChild(e) {
		throw Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.");
	}
	insertBefore(e, t) {
		throw Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.");
	}
	removeChild(e) {
		throw Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.");
	}
	toString() {
		return "RRNode";
	}
}, So = class e extends xo {
	constructor(...e) {
		super(e), z(this, "nodeType", 9), z(this, "nodeName", "#document"), z(this, "compatMode", "CSS1Compat"), z(this, "RRNodeType", V.Document), z(this, "textContent", null), this.ownerDocument = this;
	}
	get documentElement() {
		return this.childNodes.find((e) => e.RRNodeType === V.Element && e.tagName === "HTML") || null;
	}
	get body() {
		return this.documentElement?.childNodes.find((e) => e.RRNodeType === V.Element && e.tagName === "BODY") || null;
	}
	get head() {
		return this.documentElement?.childNodes.find((e) => e.RRNodeType === V.Element && e.tagName === "HEAD") || null;
	}
	get implementation() {
		return this;
	}
	get firstElementChild() {
		return this.documentElement;
	}
	appendChild(e) {
		let t = e.RRNodeType;
		if ((t === V.Element || t === V.DocumentType) && this.childNodes.some((e) => e.RRNodeType === t)) throw Error(`RRDomException: Failed to execute 'appendChild' on 'RRNode': Only one ${t === V.Element ? "RRElement" : "RRDoctype"} on RRDocument allowed.`);
		let n = jo(this, e);
		return n.parentElement = null, n;
	}
	insertBefore(e, t) {
		let n = e.RRNodeType;
		if ((n === V.Element || n === V.DocumentType) && this.childNodes.some((e) => e.RRNodeType === n)) throw Error(`RRDomException: Failed to execute 'insertBefore' on 'RRNode': Only one ${n === V.Element ? "RRElement" : "RRDoctype"} on RRDocument allowed.`);
		let r = Mo(this, e, t);
		return r.parentElement = null, r;
	}
	removeChild(e) {
		return No(this, e);
	}
	open() {
		this.firstChild = null, this.lastChild = null;
	}
	close() {}
	write(e) {
		let t;
		if (e === "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"\">" ? t = "-//W3C//DTD XHTML 1.0 Transitional//EN" : e === "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"\">" && (t = "-//W3C//DTD HTML 4.0 Transitional//EN"), t) {
			let e = this.createDocumentType("html", t, "");
			this.open(), this.appendChild(e);
		}
	}
	createDocument(t, n, r) {
		return new e();
	}
	createDocumentType(e, t, n) {
		let r = new Co(e, t, n);
		return r.ownerDocument = this, r;
	}
	createElement(e) {
		let t = new wo(e);
		return t.ownerDocument = this, t;
	}
	createElementNS(e, t) {
		return this.createElement(t);
	}
	createTextNode(e) {
		let t = new Do(e);
		return t.ownerDocument = this, t;
	}
	createComment(e) {
		let t = new Oo(e);
		return t.ownerDocument = this, t;
	}
	createCDATASection(e) {
		let t = new ko(e);
		return t.ownerDocument = this, t;
	}
	toString() {
		return "RRDocument";
	}
}, Co = class extends xo {
	constructor(e, t, n) {
		super(), z(this, "nodeType", 10), z(this, "RRNodeType", V.DocumentType), z(this, "name"), z(this, "publicId"), z(this, "systemId"), z(this, "textContent", null), this.name = e, this.publicId = t, this.systemId = n, this.nodeName = e;
	}
	toString() {
		return "RRDocumentType";
	}
}, wo = class extends xo {
	constructor(e) {
		super(), z(this, "nodeType", 1), z(this, "RRNodeType", V.Element), z(this, "tagName"), z(this, "attributes", {}), z(this, "shadowRoot", null), z(this, "scrollLeft"), z(this, "scrollTop"), this.tagName = e.toUpperCase(), this.nodeName = e.toUpperCase();
	}
	get textContent() {
		let e = "";
		return this.childNodes.forEach((t) => e += t.textContent), e;
	}
	set textContent(e) {
		this.firstChild = null, this.lastChild = null, this.appendChild(this.ownerDocument.createTextNode(e));
	}
	get classList() {
		return new Ao(this.attributes.class, (e) => {
			this.attributes.class = e;
		});
	}
	get id() {
		return this.attributes.id || "";
	}
	get className() {
		return this.attributes.class || "";
	}
	get style() {
		let e = this.attributes.style ? mo(this.attributes.style) : {}, t = /\B([A-Z])/g;
		return e.setProperty = (n, r, i) => {
			if (t.test(n)) return;
			let a = vo(n);
			r ? e[a] = r : delete e[a], i === "important" && (e[a] += " !important"), this.attributes.style = ho(e);
		}, e.removeProperty = (n) => {
			if (t.test(n)) return "";
			let r = vo(n), i = e[r] || "";
			return delete e[r], this.attributes.style = ho(e), i;
		}, e;
	}
	getAttribute(e) {
		return this.attributes[e] === void 0 ? null : this.attributes[e];
	}
	setAttribute(e, t) {
		this.attributes[e] = t;
	}
	setAttributeNS(e, t, n) {
		this.setAttribute(t, n);
	}
	removeAttribute(e) {
		delete this.attributes[e];
	}
	appendChild(e) {
		return jo(this, e);
	}
	insertBefore(e, t) {
		return Mo(this, e, t);
	}
	removeChild(e) {
		return No(this, e);
	}
	attachShadow(e) {
		let t = this.ownerDocument.createElement("SHADOWROOT");
		return this.shadowRoot = t, t;
	}
	dispatchEvent(e) {
		return !0;
	}
	toString() {
		let e = "";
		for (let t in this.attributes) e += `${t}="${this.attributes[t]}" `;
		return `${this.tagName} ${e}`;
	}
}, To = class extends wo {
	constructor() {
		super(...arguments), z(this, "currentTime"), z(this, "volume"), z(this, "paused"), z(this, "muted"), z(this, "playbackRate"), z(this, "loop");
	}
	attachShadow(e) {
		throw Error("RRDomException: Failed to execute 'attachShadow' on 'RRElement': This RRElement does not support attachShadow");
	}
	play() {
		this.paused = !1;
	}
	pause() {
		this.paused = !0;
	}
}, Eo = class extends wo {
	constructor() {
		super(...arguments), z(this, "tagName", "DIALOG"), z(this, "nodeName", "DIALOG");
	}
	get isModal() {
		return this.getAttribute("rr_open_mode") === "modal";
	}
	get open() {
		return this.getAttribute("open") !== null;
	}
	close() {
		this.removeAttribute("open"), this.removeAttribute("rr_open_mode");
	}
	show() {
		this.setAttribute("open", ""), this.setAttribute("rr_open_mode", "non-modal");
	}
	showModal() {
		this.setAttribute("open", ""), this.setAttribute("rr_open_mode", "modal");
	}
}, Do = class extends xo {
	constructor(e) {
		super(), z(this, "nodeType", 3), z(this, "nodeName", "#text"), z(this, "RRNodeType", V.Text), z(this, "data"), this.data = e;
	}
	get textContent() {
		return this.data;
	}
	set textContent(e) {
		this.data = e;
	}
	toString() {
		return `RRText text=${JSON.stringify(this.data)}`;
	}
}, Oo = class extends xo {
	constructor(e) {
		super(), z(this, "nodeType", 8), z(this, "nodeName", "#comment"), z(this, "RRNodeType", V.Comment), z(this, "data"), this.data = e;
	}
	get textContent() {
		return this.data;
	}
	set textContent(e) {
		this.data = e;
	}
	toString() {
		return `RRComment text=${JSON.stringify(this.data)}`;
	}
}, ko = class extends xo {
	constructor(e) {
		super(), z(this, "nodeName", "#cdata-section"), z(this, "nodeType", 4), z(this, "RRNodeType", V.CDATA), z(this, "data"), this.data = e;
	}
	get textContent() {
		return this.data;
	}
	set textContent(e) {
		this.data = e;
	}
	toString() {
		return `RRCDATASection data=${JSON.stringify(this.data)}`;
	}
}, Ao = class {
	constructor(e, t) {
		if (z(this, "onChange"), z(this, "classes", []), z(this, "add", (...e) => {
			for (let t of e) {
				let e = String(t);
				this.classes.indexOf(e) >= 0 || this.classes.push(e);
			}
			this.onChange && this.onChange(this.classes.join(" "));
		}), z(this, "remove", (...e) => {
			this.classes = this.classes.filter((t) => e.indexOf(t) === -1), this.onChange && this.onChange(this.classes.join(" "));
		}), e) {
			let t = e.trim().split(/\s+/);
			this.classes.push(...t);
		}
		this.onChange = t;
	}
};
function jo(e, t) {
	return t.parentNode && t.parentNode.removeChild(t), e.lastChild ? (e.lastChild.nextSibling = t, t.previousSibling = e.lastChild) : (e.firstChild = t, t.previousSibling = null), e.lastChild = t, t.nextSibling = null, t.parentNode = e, t.parentElement = e, t.ownerDocument = e.ownerDocument, t;
}
function Mo(e, t, n) {
	if (!n) return jo(e, t);
	if (n.parentNode !== e) throw Error("Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.");
	return t === n ? t : (t.parentNode && t.parentNode.removeChild(t), t.previousSibling = n.previousSibling, n.previousSibling = t, t.nextSibling = n, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, t.parentElement = e, t.parentNode = e, t.ownerDocument = e.ownerDocument, t);
}
function No(e, t) {
	if (t.parentNode !== e) throw Error("Failed to execute 'removeChild' on 'RRNode': The RRNode to be removed is not a child of this RRNode.");
	return t.previousSibling ? t.previousSibling.nextSibling = t.nextSibling : e.firstChild = t.nextSibling, t.nextSibling ? t.nextSibling.previousSibling = t.previousSibling : e.lastChild = t.previousSibling, t.previousSibling = null, t.nextSibling = null, t.parentElement = null, t.parentNode = null, t;
}
var H = /* @__PURE__ */ ((e) => (e[e.PLACEHOLDER = 0] = "PLACEHOLDER", e[e.ELEMENT_NODE = 1] = "ELEMENT_NODE", e[e.ATTRIBUTE_NODE = 2] = "ATTRIBUTE_NODE", e[e.TEXT_NODE = 3] = "TEXT_NODE", e[e.CDATA_SECTION_NODE = 4] = "CDATA_SECTION_NODE", e[e.ENTITY_REFERENCE_NODE = 5] = "ENTITY_REFERENCE_NODE", e[e.ENTITY_NODE = 6] = "ENTITY_NODE", e[e.PROCESSING_INSTRUCTION_NODE = 7] = "PROCESSING_INSTRUCTION_NODE", e[e.COMMENT_NODE = 8] = "COMMENT_NODE", e[e.DOCUMENT_NODE = 9] = "DOCUMENT_NODE", e[e.DOCUMENT_TYPE_NODE = 10] = "DOCUMENT_TYPE_NODE", e[e.DOCUMENT_FRAGMENT_NODE = 11] = "DOCUMENT_FRAGMENT_NODE", e))(H || {}), Po = {
	svg: "http://www.w3.org/2000/svg",
	"xlink:href": "http://www.w3.org/1999/xlink",
	xmlns: "http://www.w3.org/2000/xmlns/"
}, Fo = {
	altglyph: "altGlyph",
	altglyphdef: "altGlyphDef",
	altglyphitem: "altGlyphItem",
	animatecolor: "animateColor",
	animatemotion: "animateMotion",
	animatetransform: "animateTransform",
	clippath: "clipPath",
	feblend: "feBlend",
	fecolormatrix: "feColorMatrix",
	fecomponenttransfer: "feComponentTransfer",
	fecomposite: "feComposite",
	feconvolvematrix: "feConvolveMatrix",
	fediffuselighting: "feDiffuseLighting",
	fedisplacementmap: "feDisplacementMap",
	fedistantlight: "feDistantLight",
	fedropshadow: "feDropShadow",
	feflood: "feFlood",
	fefunca: "feFuncA",
	fefuncb: "feFuncB",
	fefuncg: "feFuncG",
	fefuncr: "feFuncR",
	fegaussianblur: "feGaussianBlur",
	feimage: "feImage",
	femerge: "feMerge",
	femergenode: "feMergeNode",
	femorphology: "feMorphology",
	feoffset: "feOffset",
	fepointlight: "fePointLight",
	fespecularlighting: "feSpecularLighting",
	fespotlight: "feSpotLight",
	fetile: "feTile",
	feturbulence: "feTurbulence",
	foreignobject: "foreignObject",
	glyphref: "glyphRef",
	lineargradient: "linearGradient",
	radialgradient: "radialGradient"
}, Io = null;
function Lo(e, t, n, r = t.mirror || t.ownerDocument.mirror) {
	e = Ro(e, t, n, r), Vo(e, t, n, r), zo(e, t, n);
}
function Ro(e, t, n, r) {
	var i;
	if (n.afterAppend && !Io && (Io = /* @__PURE__ */ new WeakSet(), setTimeout(() => {
		Io = null;
	}, 0)), !Uo(e, t)) {
		let a = Ho(t, n.mirror, r);
		(i = e.parentNode) == null || i.replaceChild(a, e), e = a;
	}
	switch (t.RRNodeType) {
		case V.Document:
			if (!Wo(e, t, n.mirror, r)) {
				let i = r.getMeta(t);
				i && (n.mirror.removeNodeFromMap(e), e.close(), e.open(), n.mirror.add(e, i), Io?.add(e));
			}
			break;
		case V.Element: {
			let i = e, a = t;
			switch (a.tagName) {
				case "IFRAME": {
					let i = e.contentDocument;
					if (!i) break;
					Lo(i, t.contentDocument, n, r);
					break;
				}
			}
			a.shadowRoot && (i.shadowRoot || i.attachShadow({ mode: "open" }), Vo(i.shadowRoot, a.shadowRoot, n, r)), Bo(i, a, r);
			break;
		}
	}
	return e;
}
function zo(e, t, n) {
	var r;
	switch (t.RRNodeType) {
		case V.Document: {
			let e = t.scrollData;
			e && n.applyScroll(e, !0);
			break;
		}
		case V.Element: {
			let r = e, i = t;
			switch (i.scrollData && n.applyScroll(i.scrollData, !0), i.inputData && n.applyInput(i.inputData), i.tagName) {
				case "AUDIO":
				case "VIDEO": {
					let t = e, n = i;
					n.paused !== void 0 && (n.paused ? t.pause() : t.play()), n.muted !== void 0 && (t.muted = n.muted), n.volume !== void 0 && (t.volume = n.volume), n.currentTime !== void 0 && (t.currentTime = n.currentTime), n.playbackRate !== void 0 && (t.playbackRate = n.playbackRate), n.loop !== void 0 && (t.loop = n.loop);
					break;
				}
				case "CANVAS": {
					let i = t;
					if (i.rr_dataURL !== null) {
						let e = document.createElement("img");
						e.onload = () => {
							let t = r.getContext("2d");
							t && t.drawImage(e, 0, 0, e.width, e.height);
						}, e.src = i.rr_dataURL;
					}
					i.canvasMutations.forEach((t) => n.applyCanvas(t.event, t.mutation, e));
					break;
				}
				case "STYLE": {
					let e = r.sheet;
					e && t.rules.forEach((t) => n.applyStyleSheetMutation(t, e));
					break;
				}
				case "DIALOG": {
					let e = r, t = i, n = e.open, a = e.matches("dialog:modal"), o = t.open, s = t.isModal, c = a !== s, l = n !== o;
					if ((c || n && l) && e.close(), o && (l || c)) try {
						s ? e.showModal() : e.show();
					} catch (e) {
						console.warn(e);
					}
					break;
				}
			}
			break;
		}
		case V.Text:
		case V.Comment:
		case V.CDATA: e.textContent !== t.data && (e.textContent = t.data);
	}
	Io?.has(e) && (Io.delete(e), (r = n.afterAppend) == null || r.call(n, e, n.mirror.getId(e)));
}
function Bo(e, t, n) {
	let r = e.attributes, i = t.attributes;
	for (let r in i) {
		let a = i[r];
		if (n.getMeta(t)?.isSVG && Po[r]) e.setAttributeNS(Po[r], r, a);
		else if (t.tagName === "CANVAS" && r === "rr_dataURL") {
			let t = document.createElement("img");
			t.src = a, t.onload = () => {
				let n = e.getContext("2d");
				n && n.drawImage(t, 0, 0, t.width, t.height);
			};
		} else if (t.tagName === "IFRAME" && r === "srcdoc") continue;
		else try {
			e.setAttribute(r, a);
		} catch (e) {
			console.warn(e);
		}
	}
	for (let { name: t } of Array.from(r)) t in i || e.removeAttribute(t);
	t.scrollLeft && (e.scrollLeft = t.scrollLeft), t.scrollTop && (e.scrollTop = t.scrollTop);
}
function Vo(e, t, n, r) {
	let i = Array.from(e.childNodes), a = t.childNodes;
	if (i.length === 0 && a.length === 0) return;
	let o = 0, s = i.length - 1, c = 0, l = a.length - 1, u = i[o], d = i[s], f = a[c], p = a[l], m, h;
	for (; o <= s && c <= l;) if (u === void 0) u = i[++o];
	else if (d === void 0) d = i[--s];
	else if (Wo(u, f, n.mirror, r)) u = i[++o], f = a[++c];
	else if (Wo(d, p, n.mirror, r)) d = i[--s], p = a[--l];
	else if (Wo(u, p, n.mirror, r)) {
		try {
			e.insertBefore(u, d.nextSibling);
		} catch (e) {
			console.warn(e);
		}
		u = i[++o], p = a[--l];
	} else if (Wo(d, f, n.mirror, r)) {
		try {
			e.insertBefore(d, u);
		} catch (e) {
			console.warn(e);
		}
		d = i[--s], f = a[++c];
	} else {
		if (!m) {
			m = {};
			for (let e = o; e <= s; e++) {
				let t = i[e];
				t && n.mirror.hasNode(t) && (m[n.mirror.getId(t)] = e);
			}
		}
		h = m[r.getId(f)];
		let t = i[h];
		if (h !== void 0 && t && Wo(t, f, n.mirror, r)) {
			try {
				e.insertBefore(t, u);
			} catch (e) {
				console.warn(e);
			}
			i[h] = void 0;
		} else {
			let t = Ho(f, n.mirror, r);
			e.nodeName === "#document" && u && (t.nodeType === t.DOCUMENT_TYPE_NODE && u.nodeType === u.DOCUMENT_TYPE_NODE || t.nodeType === t.ELEMENT_NODE && u.nodeType === u.ELEMENT_NODE) && (e.removeChild(u), n.mirror.removeNodeFromMap(u), u = i[++o]);
			try {
				e.insertBefore(t, u || null);
			} catch (e) {
				console.warn(e);
			}
		}
		f = a[++c];
	}
	if (o > s) {
		let t = a[l + 1], i = null;
		for (t && (i = n.mirror.getNode(r.getId(t))); c <= l; ++c) {
			let t = Ho(a[c], n.mirror, r);
			try {
				e.insertBefore(t, i);
			} catch (e) {
				console.warn(e);
			}
		}
	} else if (c > l) for (; o <= s; o++) {
		let t = i[o];
		if (t && t.parentNode === e) try {
			e.removeChild(t), n.mirror.removeNodeFromMap(t);
		} catch (e) {
			console.warn(e);
		}
	}
	let g = e.firstChild, _ = t.firstChild;
	for (; g !== null && _ !== null;) Lo(g, _, n, r), g = g.nextSibling, _ = _.nextSibling;
}
function Ho(e, t, n) {
	let r = n.getId(e), i = n.getMeta(e), a = null;
	if (r > -1 && (a = t.getNode(r)), a !== null && Uo(a, e)) return a;
	switch (e.RRNodeType) {
		case V.Document:
			a = new Document();
			break;
		case V.DocumentType:
			a = document.implementation.createDocumentType(e.name, e.publicId, e.systemId);
			break;
		case V.Element: {
			let t = e.tagName.toLowerCase();
			t = Fo[t] || t, a = i && "isSVG" in i && i?.isSVG ? document.createElementNS(Po.svg, t) : document.createElement(e.tagName);
			break;
		}
		case V.Text:
			a = document.createTextNode(e.data);
			break;
		case V.Comment:
			a = document.createComment(e.data);
			break;
		case V.CDATA: a = document.createCDATASection(e.data);
	}
	i && t.add(a, { ...i });
	try {
		Io?.add(a);
	} catch {}
	return a;
}
function Uo(e, t) {
	return e.nodeType === t.nodeType ? e.nodeType !== e.ELEMENT_NODE || e.tagName.toUpperCase() === t.tagName : !1;
}
function Wo(e, t, n, r) {
	let i = n.getId(e), a = r.getId(t);
	return i === -1 || i !== a ? !1 : Uo(e, t);
}
var Go = class e extends So {
	constructor(e) {
		super(), z(this, "UNSERIALIZED_STARTING_ID", -2), z(this, "_unserializedId", this.UNSERIALIZED_STARTING_ID), z(this, "mirror", as()), z(this, "scrollData", null), e && (this.mirror = e);
	}
	get unserializedId() {
		return this._unserializedId--;
	}
	createDocument(t, n, r) {
		return new e();
	}
	createDocumentType(e, t, n) {
		let r = new Ko(e, t, n);
		return r.ownerDocument = this, r;
	}
	createElement(e) {
		let t = e.toUpperCase(), n;
		switch (t) {
			case "AUDIO":
			case "VIDEO":
				n = new Jo(t);
				break;
			case "IFRAME":
				n = new Qo(t, this.mirror);
				break;
			case "CANVAS":
				n = new Xo(t);
				break;
			case "STYLE":
				n = new Zo(t);
				break;
			case "DIALOG":
				n = new Yo(t);
				break;
			default: n = new qo(t);
		}
		return n.ownerDocument = this, n;
	}
	createComment(e) {
		let t = new es(e);
		return t.ownerDocument = this, t;
	}
	createCDATASection(e) {
		let t = new ts(e);
		return t.ownerDocument = this, t;
	}
	createTextNode(e) {
		let t = new $o(e);
		return t.ownerDocument = this, t;
	}
	destroyTree() {
		this.firstChild = null, this.lastChild = null, this.mirror.reset();
	}
	open() {
		super.open(), this._unserializedId = this.UNSERIALIZED_STARTING_ID;
	}
}, Ko = Co, qo = class extends wo {
	constructor() {
		super(...arguments), z(this, "inputData", null), z(this, "scrollData", null);
	}
}, Jo = class extends To {}, Yo = class extends Eo {}, Xo = class extends qo {
	constructor() {
		super(...arguments), z(this, "rr_dataURL", null), z(this, "canvasMutations", []);
	}
	getContext() {
		return null;
	}
}, Zo = class extends qo {
	constructor() {
		super(...arguments), z(this, "rules", []);
	}
}, Qo = class extends qo {
	constructor(e, t) {
		super(e), z(this, "contentDocument", new Go()), this.contentDocument.mirror = t;
	}
}, $o = Do, es = Oo, ts = ko;
function ns(e) {
	return e instanceof HTMLFormElement ? "FORM" : e.tagName.toUpperCase();
}
function rs(e, t, n, r) {
	let i;
	switch (e.nodeType) {
		case H.DOCUMENT_NODE:
			r && r.nodeName === "IFRAME" ? i = r.contentDocument : (i = t, i.compatMode = e.compatMode);
			break;
		case H.DOCUMENT_TYPE_NODE: {
			let n = e;
			i = t.createDocumentType(n.name, n.publicId, n.systemId);
			break;
		}
		case H.ELEMENT_NODE: {
			let n = e, r = ns(n);
			i = t.createElement(r);
			let a = i;
			for (let { name: e, value: t } of Array.from(n.attributes)) a.attributes[e] = t;
			n.scrollLeft && (a.scrollLeft = n.scrollLeft), n.scrollTop && (a.scrollTop = n.scrollTop);
			break;
		}
		case H.TEXT_NODE:
			i = t.createTextNode(e.textContent || "");
			break;
		case H.CDATA_SECTION_NODE:
			i = t.createCDATASection(e.data);
			break;
		case H.COMMENT_NODE:
			i = t.createComment(e.textContent || "");
			break;
		case H.DOCUMENT_FRAGMENT_NODE:
			i = r.attachShadow({ mode: "open" });
			break;
		default: return null;
	}
	let a = n.getMeta(e);
	return t instanceof Go && (a || (a = ss(i, t.unserializedId), n.add(e, a)), t.mirror.add(i, { ...a })), i;
}
function is(e, t = Ai(), n = new Go()) {
	function r(e, i) {
		let a = rs(e, n, t, i);
		if (a !== null) {
			if (i?.nodeName !== "IFRAME" && e.nodeType !== H.DOCUMENT_FRAGMENT_NODE && (i?.appendChild(a), a.parentNode = i, a.parentElement = i), e.nodeName === "IFRAME") {
				let t = e.contentDocument;
				t && r(t, a);
			} else (e.nodeType === H.DOCUMENT_NODE || e.nodeType === H.ELEMENT_NODE || e.nodeType === H.DOCUMENT_FRAGMENT_NODE) && (e.nodeType === H.ELEMENT_NODE && e.shadowRoot && r(e.shadowRoot, a), e.childNodes.forEach((e) => r(e, a)));
		}
	}
	return r(e, null), n;
}
function as() {
	return new os();
}
var os = class {
	constructor() {
		z(this, "idNodeMap", /* @__PURE__ */ new Map()), z(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
	}
	getId(e) {
		return e ? this.getMeta(e)?.id ?? -1 : -1;
	}
	getNode(e) {
		return this.idNodeMap.get(e) || null;
	}
	getIds() {
		return Array.from(this.idNodeMap.keys());
	}
	getMeta(e) {
		return this.nodeMetaMap.get(e) || null;
	}
	removeNodeFromMap(e) {
		let t = this.getId(e);
		this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e) => this.removeNodeFromMap(e));
	}
	has(e) {
		return this.idNodeMap.has(e);
	}
	hasNode(e) {
		return this.nodeMetaMap.has(e);
	}
	add(e, t) {
		let n = t.id;
		this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t);
	}
	replace(e, t) {
		let n = this.getNode(e);
		if (n) {
			let e = this.nodeMetaMap.get(n);
			e && this.nodeMetaMap.set(t, e);
		}
		this.idNodeMap.set(e, t);
	}
	reset() {
		this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
	}
};
function ss(e, t) {
	switch (e.RRNodeType) {
		case V.Document: return {
			id: t,
			type: e.RRNodeType,
			childNodes: []
		};
		case V.DocumentType: {
			let n = e;
			return {
				id: t,
				type: e.RRNodeType,
				name: n.name,
				publicId: n.publicId,
				systemId: n.systemId
			};
		}
		case V.Element: return {
			id: t,
			type: e.RRNodeType,
			tagName: e.tagName.toLowerCase(),
			attributes: {},
			childNodes: []
		};
		case V.Text: return {
			id: t,
			type: e.RRNodeType,
			textContent: e.textContent || ""
		};
		case V.Comment: return {
			id: t,
			type: e.RRNodeType,
			textContent: e.textContent || ""
		};
		case V.CDATA: return {
			id: t,
			type: e.RRNodeType,
			textContent: ""
		};
	}
}
var cs = {
	Node: [
		"childNodes",
		"parentNode",
		"parentElement",
		"textContent",
		"ownerDocument",
		"firstChild",
		"lastChild",
		"nextSibling",
		"previousSibling"
	],
	ShadowRoot: ["host", "styleSheets"],
	Element: [
		"shadowRoot",
		"querySelector",
		"querySelectorAll"
	],
	MutationObserver: []
}, ls = {
	Node: ["contains", "getRootNode"],
	ShadowRoot: ["getSelection"],
	Element: [],
	MutationObserver: ["constructor"]
}, us = {}, ds = {}, fs = () => !!globalThis.Zone;
function ps(e) {
	if (us[e]) return us[e];
	let t = globalThis[e], n = t.prototype, r = e in cs ? cs[e] : void 0, i = !!(r && r.every((e) => !!(Object.getOwnPropertyDescriptor(n, e)?.get)?.toString().includes("[native code]"))), a = e in ls ? ls[e] : void 0, o = !!(a && a.every((e) => typeof n[e] == "function" && n[e]?.toString().includes("[native code]")));
	if (i && o && !fs()) return us[e] = t.prototype, t.prototype;
	try {
		let r = document.createElement("iframe");
		r.style.display = "none", document.body.appendChild(r);
		let i = r.contentWindow;
		if (!i) return t.prototype;
		let a = i[e].prototype;
		if (!a) return r.remove(), n;
		let o = navigator.userAgent;
		return o.includes("Safari") && !o.includes("Chrome") ? (r.classList.add("rr-block"), r.setAttribute("__rrwebUntaintedMutationObserver", ""), ds[e] = () => r.remove()) : r.remove(), us[e] = a;
	} catch {
		return n;
	}
}
var ms = {};
function U(e, t, n) {
	let r = ms[e]?.[n];
	if (r) return r.call(t);
	let i = ps(e), a = Object.getOwnPropertyDescriptor(i, n)?.get;
	return a ? ((ms[e] || (ms[e] = {}))[n] = a, a.call(t)) : t[n];
}
var hs = {};
function gs(e, t, n) {
	let r = `${e}.${String(n)}`;
	if (hs[r]) return hs[r].bind(t);
	let i = ps(e)[n];
	return typeof i == "function" ? (hs[r] = i, i.bind(t)) : t[n];
}
function _s(e) {
	return U("Node", e, "ownerDocument");
}
function vs(e) {
	return U("Node", e, "childNodes");
}
function ys(e) {
	return U("Node", e, "parentNode");
}
function bs(e) {
	return U("Node", e, "parentElement");
}
function xs(e) {
	return U("Node", e, "textContent");
}
function Ss(e) {
	return U("Node", e, "firstChild");
}
function Cs(e) {
	return U("Node", e, "lastChild");
}
function ws(e) {
	return U("Node", e, "nextSibling");
}
function Ts(e) {
	return U("Node", e, "previousSibling");
}
function Es(e, t) {
	return gs("Node", e, "contains")(t);
}
function Ds(e) {
	return gs("Node", e, "getRootNode")();
}
function Os(e) {
	return !e || !("host" in e) ? null : U("ShadowRoot", e, "host");
}
function ks(e) {
	return e.styleSheets;
}
function As(e) {
	return !e || !("shadowRoot" in e) ? null : U("Element", e, "shadowRoot");
}
function js(e, t) {
	return U("Element", e, "querySelector")(t);
}
function Ms(e, t) {
	return U("Element", e, "querySelectorAll")(t);
}
function Ns() {
	return [ps("MutationObserver").constructor, ds.MutationObserver ?? (() => {})];
}
var Ps = Date.now;
/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString()) || (Ps = () => (/* @__PURE__ */ new Date()).getTime());
function Fs(e, t, n) {
	try {
		if (!(t in e)) return () => {};
		let r = e[t], i = n(r);
		return typeof i == "function" && (i.prototype = i.prototype || {}, Object.defineProperties(i, { __rrweb_original__: {
			enumerable: !1,
			value: r
		} })), e[t] = i, () => {
			e[t] = r;
		};
	} catch {
		return () => {};
	}
}
var W = {
	ownerDocument: _s,
	childNodes: vs,
	parentNode: ys,
	parentElement: bs,
	textContent: xs,
	firstChild: Ss,
	lastChild: Cs,
	nextSibling: ws,
	previousSibling: Ts,
	contains: Es,
	getRootNode: Ds,
	host: Os,
	styleSheets: ks,
	shadowRoot: As,
	querySelector: js,
	querySelectorAll: Ms,
	nowTimestamp: Ps,
	mutationObserverCtor: Ns,
	patch: Fs
};
function G(e, t, n = document) {
	let r = {
		capture: !0,
		passive: !0
	};
	return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
}
var Is = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.", Ls = {
	map: {},
	getId() {
		return console.error(Is), -1;
	},
	getNode() {
		return console.error(Is), null;
	},
	removeNodeFromMap() {
		console.error(Is);
	},
	has() {
		return console.error(Is), !1;
	},
	reset() {
		console.error(Is);
	}
};
typeof window < "u" && window.Proxy && window.Reflect && (Ls = new Proxy(Ls, { get(e, t, n) {
	return t === "map" && console.error(Is), Reflect.get(e, t, n);
} }));
function Rs(e, t, n = {}) {
	let r = null, i = 0;
	return function(...a) {
		let o = Date.now();
		!i && n.leading === !1 && (i = o);
		let s = t - (o - i), c = this;
		s <= 0 || s > t ? (r &&= (clearTimeout(r), null), i = o, e.apply(c, a)) : !r && n.trailing !== !1 && (r = setTimeout(() => {
			i = n.leading === !1 ? 0 : Date.now(), r = null, e.apply(c, a);
		}, s));
	};
}
function zs(e, t, n, r, i = window) {
	let a = i.Object.getOwnPropertyDescriptor(e, t);
	return i.Object.defineProperty(e, t, r ? n : { set(e) {
		setTimeout(() => {
			n.set.call(this, e);
		}, 0), a && a.set && a.set.call(this, e);
	} }), () => zs(e, t, a || {}, !0);
}
function Bs(e) {
	let t = e.document;
	return {
		left: t.scrollingElement ? t.scrollingElement.scrollLeft : e.pageXOffset === void 0 ? t.documentElement.scrollLeft || t?.body && W.parentElement(t.body)?.scrollLeft || t?.body?.scrollLeft || 0 : e.pageXOffset,
		top: t.scrollingElement ? t.scrollingElement.scrollTop : e.pageYOffset === void 0 ? t?.documentElement.scrollTop || t?.body && W.parentElement(t.body)?.scrollTop || t?.body?.scrollTop || 0 : e.pageYOffset
	};
}
function Vs() {
	return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function Hs() {
	return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function Us(e) {
	return e ? e.nodeType === e.ELEMENT_NODE ? e : W.parentElement(e) : null;
}
function K(e, t, n, r) {
	if (!e) return !1;
	let i = Us(e);
	if (!i) return !1;
	try {
		if (typeof t == "string") {
			if (i.classList.contains(t) || r && i.closest("." + t) !== null) return !0;
		} else if (un(i, t, r)) return !0;
	} catch {}
	return !!(n && (i.matches(n) || r && i.closest(n) !== null));
}
function Ws(e, t) {
	return t.getId(e) !== -1;
}
function Gs(e, t, n) {
	return e.tagName === "TITLE" && n.headTitleMutations ? !0 : t.getId(e) === Jt;
}
function Ks(e, t) {
	if (yt(e)) return !1;
	let n = t.getId(e);
	if (!t.has(n)) return !0;
	let r = W.parentNode(e);
	return r && r.nodeType === e.DOCUMENT_NODE ? !1 : !r || Ks(r, t);
}
function qs(e) {
	return !!e.changedTouches;
}
function Js(e = window) {
	"NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach);
}
function Ys(e) {
	let t = {}, n = (e, n) => {
		let r = {
			value: e,
			parent: n,
			children: []
		};
		return t[e.node.id] = r, r;
	}, r = [];
	for (let i of e) {
		let { nextId: e, parentId: a } = i;
		if (e && e in t) {
			let a = t[e];
			if (a.parent) {
				let e = a.parent.children.indexOf(a);
				a.parent.children.splice(e, 0, n(i, a.parent));
			} else {
				let e = r.indexOf(a);
				r.splice(e, 0, n(i, null));
			}
			continue;
		}
		if (a in t) {
			let e = t[a];
			e.children.push(n(i, e));
			continue;
		}
		r.push(n(i, null));
	}
	return r;
}
function Xs(e, t) {
	t(e.value);
	for (let n = e.children.length - 1; n >= 0; n--) Xs(e.children[n], t);
}
function Zs(e, t) {
	return !!(e.nodeName === "IFRAME" && t.getMeta(e));
}
function Qs(e, t) {
	return !!(e.nodeName === "LINK" && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute("rel") === "stylesheet" && t.getMeta(e));
}
function $s(e, t) {
	let n = e.ownerDocument?.defaultView?.frameElement;
	if (!n || n === t) return {
		x: 0,
		y: 0,
		relativeScale: 1,
		absoluteScale: 1
	};
	let r = n.getBoundingClientRect(), i = $s(n, t), a = r.height / n.clientHeight;
	return {
		x: r.x * i.relativeScale + i.x,
		y: r.y * i.relativeScale + i.y,
		relativeScale: a,
		absoluteScale: i.absoluteScale * a
	};
}
function ec(e) {
	return e ? e instanceof xo && "shadowRoot" in e ? !!e.shadowRoot : !!W.shadowRoot(e) : !1;
}
function tc(e, t) {
	let n = e?.[t[0]];
	return n ? t.length === 1 ? n : tc(n.cssRules, t.slice(1)) : null;
}
function nc(e) {
	let t = [...e];
	return {
		positions: t,
		index: t.pop()
	};
}
function rc(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r = e.length; r--;) {
		let i = e[r];
		t.has(i.id) || (n.push(i), t.add(i.id));
	}
	return n;
}
var ic = class {
	constructor() {
		N(this, "id", 1), N(this, "styleIDMap", /* @__PURE__ */ new WeakMap()), N(this, "idStyleMap", /* @__PURE__ */ new Map());
	}
	getId(e) {
		return this.styleIDMap.get(e) ?? -1;
	}
	has(e) {
		return this.styleIDMap.has(e);
	}
	add(e, t) {
		if (this.has(e)) return this.getId(e);
		let n;
		return n = t === void 0 ? this.id++ : t, this.styleIDMap.set(e, n), this.idStyleMap.set(n, e), n;
	}
	getStyle(e) {
		return this.idStyleMap.get(e) || null;
	}
	reset() {
		this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
	}
	generateId() {
		return this.id++;
	}
};
function ac(e) {
	let t = null;
	return "getRootNode" in e && W.getRootNode(e)?.nodeType === Node.DOCUMENT_FRAGMENT_NODE && W.host(W.getRootNode(e)) && (t = W.host(W.getRootNode(e))), t;
}
function oc(e) {
	let t = e, n;
	for (; n = ac(t);) t = n;
	return t;
}
function sc(e) {
	let t = W.ownerDocument(e);
	if (!t) return !1;
	let n = oc(e);
	return W.contains(t, n);
}
function cc(e) {
	let t = W.ownerDocument(e);
	return t ? W.contains(t, e) || sc(e) : !1;
}
var q = /* @__PURE__ */ ((e) => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e[e.Asset = 7] = "Asset", e))(q || {}), J = /* @__PURE__ */ ((e) => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e))(J || {}), Y = /* @__PURE__ */ ((e) => (e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e))(Y || {}), lc = /* @__PURE__ */ ((e) => (e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e))(lc || {}), uc = /* @__PURE__ */ ((e) => (e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e))(uc || {}), dc = /* @__PURE__ */ ((e) => (e[e.Play = 0] = "Play", e[e.Pause = 1] = "Pause", e[e.Seeked = 2] = "Seeked", e[e.VolumeChange = 3] = "VolumeChange", e[e.RateChange = 4] = "RateChange", e))(dc || {}), X = /* @__PURE__ */ ((e) => (e.Start = "start", e.Pause = "pause", e.Resume = "resume", e.Resize = "resize", e.Finish = "finish", e.FullsnapshotRebuilded = "fullsnapshot-rebuilded", e.LoadStylesheetStart = "load-stylesheet-start", e.LoadStylesheetEnd = "load-stylesheet-end", e.SkipStart = "skip-start", e.SkipEnd = "skip-end", e.MouseInteraction = "mouse-interaction", e.EventCast = "event-cast", e.CustomEvent = "custom-event", e.Flush = "flush", e.StateChange = "state-change", e.PlayBack = "play-back", e.Destroy = "destroy", e))(X || {}), fc = /* @__PURE__ */ ((e) => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(fc || {}), pc = (e, t) => `${e}@${t}`, mc = class {
	constructor() {
		N(this, "frozen", !1), N(this, "locked", !1), N(this, "texts", []), N(this, "attributes", []), N(this, "attributeMap", /* @__PURE__ */ new WeakMap()), N(this, "removes", []), N(this, "mapRemoves", []), N(this, "movedMap", {}), N(this, "addedSet", /* @__PURE__ */ new Set()), N(this, "movedSet", /* @__PURE__ */ new Set()), N(this, "droppedSet", /* @__PURE__ */ new Set()), N(this, "removesSubTreeCache", /* @__PURE__ */ new Set()), N(this, "mutationCb"), N(this, "blockClass"), N(this, "blockSelector"), N(this, "maskTextClass"), N(this, "maskTextSelector"), N(this, "inlineStylesheet"), N(this, "maskInputOptions"), N(this, "maskTextFn"), N(this, "maskInputFn"), N(this, "keepIframeSrcFn"), N(this, "recordCanvas"), N(this, "inlineImages"), N(this, "slimDOMOptions"), N(this, "dataURLOptions"), N(this, "doc"), N(this, "mirror"), N(this, "iframeManager"), N(this, "stylesheetManager"), N(this, "shadowDomManager"), N(this, "canvasManager"), N(this, "processedNodeManager"), N(this, "unattachedDoc"), N(this, "processMutations", (e) => {
			e.forEach(this.processMutation), this.emit();
		}), N(this, "emit", () => {
			if (this.frozen || this.locked) return;
			let e = [], t = /* @__PURE__ */ new Set();
			for (; this.mapRemoves.length;) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
			for (let e of this.movedSet) {
				let t = W.parentNode(e);
				(!this.removesSubTreeCache.has(t) || this.movedSet.has(t)) && this.addedSet.add(e);
			}
			let n = null, r = null, i = -1, a = null, o = !1, s = /* @__PURE__ */ new Set(), c = this.addedSet.values(), l = c.next();
			for (; this.addedSet.size;) {
				if (n !== null && this.addedSet.has(W.previousSibling(n))) a = n, n = W.previousSibling(n);
				else {
					for (this.addedSet.has(l.value) || (l = c.next()), n = l.value;;) {
						if (r = W.parentNode(n), this.addedSet.has(r)) {
							n = r;
							continue;
						}
						break;
					}
					if (s.has(r)) r = null;
					else if (r) {
						if (cc(r) ? (o = _c(this.droppedSet, r) || this.removesSubTreeCache.has(r), o && _c(this.movedSet, n) && (o = !1)) : o = !0, this.addedSet.has(W.lastChild(r))) n = W.lastChild(r), a = null;
						else for (;;) {
							if (a = W.nextSibling(n), this.addedSet.has(a)) {
								n = a;
								continue;
							}
							break;
						}
						if (i = yt(r) ? this.mirror.getId(ac(n)) : this.mirror.getId(r), i === -1 && r.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
							let e = W.host(r);
							i = this.mirror.getId(e);
						}
					}
				}
				if (this.addedSet.delete(n), !r || i === -1) {
					s.add(n);
					continue;
				}
				if (o) {
					this.droppedSet.add(n);
					continue;
				}
				let u = !1;
				if (n.nodeType === Node.TEXT_NODE) {
					let e = r.tagName;
					if (e === "TEXTAREA") continue;
					e === "STYLE" && t.has(i) && (u = !0);
				}
				let d = a ? this.mirror.getId(a) : null;
				for (; d === Jt;) a &&= W.nextSibling(a), d = a && this.mirror.getId(a);
				if (d === -1) {
					console.warn("Couldn't record new node. Couldn't find mirror id for nextSibling:", a), n = null;
					continue;
				}
				let f = bn(n, {
					doc: this.doc,
					mirror: this.mirror,
					blockClass: this.blockClass,
					blockSelector: this.blockSelector,
					maskTextClass: this.maskTextClass,
					maskTextSelector: this.maskTextSelector,
					skipChild: !0,
					newlyAddedElement: !0,
					inlineStylesheet: this.inlineStylesheet,
					maskInputOptions: this.maskInputOptions,
					maskTextFn: this.maskTextFn,
					maskInputFn: this.maskInputFn,
					slimDOMOptions: this.slimDOMOptions,
					dataURLOptions: this.dataURLOptions,
					recordCanvas: this.recordCanvas,
					inlineImages: this.inlineImages,
					onSerialize: (e) => {
						Zs(e, this.mirror) && this.iframeManager.addIframe(e), Qs(e, this.mirror) && this.stylesheetManager.trackLinkElement(e), ec(n) && this.shadowDomManager.addShadowRoot(W.shadowRoot(n), this.doc);
					},
					onIframeLoad: (e, t) => {
						this.iframeManager.attachIframe(e, t), this.shadowDomManager.observeAttachShadow(e);
					},
					onStylesheetLoad: (e, t) => {
						this.stylesheetManager.attachLinkElement(e, t);
					},
					cssCaptured: u
				});
				f && (e.push({
					parentId: i,
					nextId: d,
					node: f
				}), t.add(f.id));
			}
			let u = {
				texts: this.texts.map((e) => {
					let t = e.node, n = W.parentNode(t);
					return n && n.tagName === "TEXTAREA" && this.genTextAreaValueMutation(n), {
						id: this.mirror.getId(t),
						value: e.value
					};
				}).filter((e) => !t.has(e.id)).filter((e) => this.mirror.has(e.id)),
				attributes: this.attributes.map((e) => {
					let { attributes: t } = e;
					if (typeof t.style == "string") {
						let n = JSON.stringify(e.styleDiff), r = JSON.stringify(e._unchangedStyles);
						n.length < t.style.length && (n + r).split("var(").length === t.style.split("var(").length && (t.style = e.styleDiff);
					}
					return {
						id: this.mirror.getId(e.node),
						attributes: t
					};
				}).filter((e) => !t.has(e.id)).filter((e) => this.mirror.has(e.id)),
				removes: this.removes,
				adds: e
			};
			(u.texts.length || u.attributes.length || u.removes.length || u.adds.length) && (this.texts = [], this.attributes = [], this.attributeMap = /* @__PURE__ */ new WeakMap(), this.removes = [], this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.removesSubTreeCache = /* @__PURE__ */ new Set(), this.movedMap = {}, this.mutationCb(u));
		}), N(this, "genTextAreaValueMutation", (e) => {
			let t = this.attributeMap.get(e);
			t || (t = {
				node: e,
				attributes: {},
				styleDiff: {},
				_unchangedStyles: {}
			}, this.attributes.push(t), this.attributeMap.set(e, t));
			let n = Array.from(W.childNodes(e), (e) => W.textContent(e) || "").join("");
			t.attributes.value = At({
				element: e,
				maskInputOptions: this.maskInputOptions,
				tagName: e.tagName,
				type: Ft(e),
				value: n,
				maskInputFn: this.maskInputFn
			});
		}), N(this, "processMutation", (e) => {
			if (!Gs(e.target, this.mirror, this.slimDOMOptions)) switch (e.type) {
				case "characterData": {
					let t = W.textContent(e.target);
					!K(e.target, this.blockClass, this.blockSelector, !1) && t !== e.oldValue && this.texts.push({
						value: dn(e.target, this.maskTextClass, this.maskTextSelector, !0) && t ? this.maskTextFn ? this.maskTextFn(t, Us(e.target)) : t.replace(/[\S]/g, "*") : t,
						node: e.target
					});
					break;
				}
				case "attributes": {
					let t = e.target, n = jt(t.tagName), r = e.attributeName, i = e.target.getAttribute(r);
					if (r === "value") {
						let e = Ft(t);
						i = At({
							element: t,
							maskInputOptions: this.maskInputOptions,
							tagName: t.tagName,
							type: e,
							value: i,
							maskInputFn: this.maskInputFn
						});
					}
					if (K(e.target, this.blockClass, this.blockSelector, !1) || i === e.oldValue) return;
					let a = this.attributeMap.get(e.target);
					if (n === "iframe" && r === "src" && !this.keepIframeSrcFn(i)) {
						if (!t.contentDocument) r = "rr_src";
						else return;
					}
					if (a || (a = {
						node: e.target,
						attributes: {},
						styleDiff: {},
						_unchangedStyles: {}
					}, this.attributes.push(a), this.attributeMap.set(e.target, a)), r === "type" && n === "input" && (e.oldValue || "").toLowerCase() === "password" && t.setAttribute("data-rr-is-password", "true"), !cn(n, r)) {
						if (a.attributes[r] = sn(this.doc, n, jt(r), i), r === "style") {
							if (!this.unattachedDoc) try {
								this.unattachedDoc = document.implementation.createHTMLDocument();
							} catch {
								this.unattachedDoc = this.doc;
							}
							let n = this.unattachedDoc.createElement("span");
							e.oldValue && n.setAttribute("style", e.oldValue);
							for (let e of Array.from(t.style)) {
								let r = t.style.getPropertyValue(e), i = t.style.getPropertyPriority(e);
								r !== n.style.getPropertyValue(e) || i !== n.style.getPropertyPriority(e) ? i === "" ? a.styleDiff[e] = r : a.styleDiff[e] = [r, i] : a._unchangedStyles[e] = [r, i];
							}
							for (let e of Array.from(n.style)) t.style.getPropertyValue(e) === "" && (a.styleDiff[e] = !1);
						} else r === "open" && t.tagName === "DIALOG" && (t.matches("dialog:modal") ? a.attributes.rr_open_mode = "modal" : a.attributes.rr_open_mode = "non-modal");
					}
					break;
				}
				case "childList":
					if (K(e.target, this.blockClass, this.blockSelector, !0)) return;
					if (e.target.tagName === "TEXTAREA") {
						this.genTextAreaValueMutation(e.target);
						return;
					}
					e.addedNodes.forEach((t) => this.genAdds(t, e.target)), e.removedNodes.forEach((t) => {
						let n = this.mirror.getId(t), r = yt(e.target) ? this.mirror.getId(W.host(e.target)) : this.mirror.getId(e.target);
						K(e.target, this.blockClass, this.blockSelector, !1) || Gs(t, this.mirror, this.slimDOMOptions) || !Ws(t, this.mirror) || (this.addedSet.has(t) ? (hc(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && n === -1 || Ks(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[pc(n, r)] ? hc(this.movedSet, t) : (this.removes.push({
							parentId: r,
							id: n,
							isShadow: yt(e.target) && bt(e.target) ? !0 : void 0
						}), gc(t, this.removesSubTreeCache))), this.mapRemoves.push(t));
					});
			}
		}), N(this, "genAdds", (e, t) => {
			if (!this.processedNodeManager.inOtherBuffer(e, this) && !(this.addedSet.has(e) || this.movedSet.has(e))) {
				if (this.mirror.hasNode(e)) {
					if (Gs(e, this.mirror, this.slimDOMOptions)) return;
					this.movedSet.add(e);
					let n = null;
					t && this.mirror.hasNode(t) && (n = this.mirror.getId(t)), n && n !== -1 && (this.movedMap[pc(this.mirror.getId(e), n)] = !0);
				} else this.addedSet.add(e), this.droppedSet.delete(e);
				K(e, this.blockClass, this.blockSelector, !1) || (W.childNodes(e).forEach((e) => this.genAdds(e)), ec(e) && W.childNodes(W.shadowRoot(e)).forEach((t) => {
					this.processedNodeManager.add(t, this), this.genAdds(t, e);
				}));
			}
		});
	}
	init(e) {
		[
			"mutationCb",
			"blockClass",
			"blockSelector",
			"maskTextClass",
			"maskTextSelector",
			"inlineStylesheet",
			"maskInputOptions",
			"maskTextFn",
			"maskInputFn",
			"keepIframeSrcFn",
			"recordCanvas",
			"inlineImages",
			"slimDOMOptions",
			"dataURLOptions",
			"doc",
			"mirror",
			"iframeManager",
			"stylesheetManager",
			"shadowDomManager",
			"canvasManager",
			"processedNodeManager"
		].forEach((t) => {
			this[t] = e[t];
		});
	}
	freeze() {
		this.frozen = !0, this.canvasManager.freeze();
	}
	unfreeze() {
		this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
	}
	isFrozen() {
		return this.frozen;
	}
	lock() {
		this.locked = !0, this.canvasManager.lock();
	}
	unlock() {
		this.locked = !1, this.canvasManager.unlock(), this.emit();
	}
	reset() {
		this.shadowDomManager.reset(), this.canvasManager.reset();
	}
};
function hc(e, t) {
	e.delete(t), W.childNodes(t).forEach((t) => hc(e, t));
}
function gc(e, t) {
	let n = [e];
	for (; n.length;) {
		let e = n.pop();
		t.has(e) || (t.add(e), W.childNodes(e).forEach((e) => n.push(e)));
	}
}
function _c(e, t) {
	return e.size !== 0 && vc(e, t);
}
function vc(e, t) {
	if (e.has(t)) return !0;
	let n = W.parentNode(t);
	return n ? vc(e, n) : !1;
}
var yc;
function bc(e) {
	yc = e;
}
function xc() {
	yc = void 0;
}
var Z = (e) => yc ? (...t) => {
	try {
		return e(...t);
	} catch (e) {
		if (yc && yc(e) === !0) return;
		throw e;
	}
} : e, Sc = [];
function Cc(e) {
	try {
		if ("composedPath" in e) {
			let t = e.composedPath();
			if (t.length) return t[0];
		} else if ("path" in e && e.path.length) return e.path[0];
	} catch {}
	return e && e.target;
}
function wc(e, t) {
	let n = new mc();
	Sc.push(n), n.init(e);
	let [r, i] = Ns(), a = new r(Z(n.processMutations.bind(n)));
	return a.observe(t, {
		attributes: !0,
		attributeOldValue: !0,
		characterData: !0,
		characterDataOldValue: !0,
		childList: !0,
		subtree: !0
	}), [a, i];
}
function Tc({ mousemoveCb: e, sampling: t, doc: n, mirror: r }) {
	if (t.mousemove === !1) return () => {};
	let i = typeof t.mousemove == "number" ? t.mousemove : 50, a = typeof t.mousemoveCallback == "number" ? t.mousemoveCallback : 500, o = [], s, c = Rs(Z((t) => {
		let n = Date.now() - s;
		e(o.map((e) => (e.timeOffset -= n, e)), t), o = [], s = null;
	}), a), l = Z(Rs(Z((e) => {
		let t = Cc(e), { clientX: n, clientY: i } = qs(e) ? e.changedTouches[0] : e;
		s ||= Ps(), o.push({
			x: n,
			y: i,
			id: r.getId(t),
			timeOffset: Ps() - s
		}), c(typeof DragEvent < "u" && e instanceof DragEvent ? J.Drag : e instanceof MouseEvent ? J.MouseMove : J.TouchMove);
	}), i, { trailing: !1 })), u = [
		G("mousemove", l, n),
		G("touchmove", l, n),
		G("drag", l, n)
	];
	return Z(() => {
		u.forEach((e) => e());
	});
}
function Ec({ mouseInteractionCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, sampling: a }) {
	if (a.mouseInteraction === !1) return () => {};
	let o = a.mouseInteraction === !0 || a.mouseInteraction === void 0 ? {} : a.mouseInteraction, s = [], c = null, l = (t) => (a) => {
		let o = Cc(a);
		if (K(o, r, i, !0)) return;
		let s = null, l = t;
		if ("pointerType" in a) {
			switch (a.pointerType) {
				case "mouse":
					s = lc.Mouse;
					break;
				case "touch":
					s = lc.Touch;
					break;
				case "pen": s = lc.Pen;
			}
			s === lc.Touch ? Y[t] === Y.MouseDown ? l = "TouchStart" : Y[t] === Y.MouseUp && (l = "TouchEnd") : lc.Pen;
		} else qs(a) && (s = lc.Touch);
		s === null ? Y[t] === Y.Click && (s = c, c = null) : (c = s, (l.startsWith("Touch") && s === lc.Touch || l.startsWith("Mouse") && s === lc.Mouse) && (s = null));
		let u = qs(a) ? a.changedTouches[0] : a;
		if (!u) return;
		let d = n.getId(o), { clientX: f, clientY: p } = u;
		Z(e)({
			type: Y[l],
			id: d,
			x: f,
			y: p,
			...s !== null && { pointerType: s }
		});
	};
	return Object.keys(Y).filter((e) => Number.isNaN(Number(e)) && !e.endsWith("_Departed") && o[e] !== !1).forEach((e) => {
		let n = jt(e), r = l(e);
		if (window.PointerEvent) switch (Y[e]) {
			case Y.MouseDown:
			case Y.MouseUp:
				n = n.replace("mouse", "pointer");
				break;
			case Y.TouchStart:
			case Y.TouchEnd: return;
		}
		s.push(G(n, r, t));
	}), Z(() => {
		s.forEach((e) => e());
	});
}
function Dc({ scrollCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, sampling: a }) {
	return G("scroll", Z(Rs(Z((a) => {
		let o = Cc(a);
		if (!o || K(o, r, i, !0)) return;
		let s = n.getId(o);
		if (o === t && t.defaultView) {
			let n = Bs(t.defaultView);
			e({
				id: s,
				x: n.left,
				y: n.top
			});
		} else e({
			id: s,
			x: o.scrollLeft,
			y: o.scrollTop
		});
	}), a.scroll || 100)), t);
}
function Oc({ viewportResizeCb: e }, { win: t }) {
	let n = -1, r = -1;
	return G("resize", Z(Rs(Z(() => {
		let t = Vs(), i = Hs();
		(n !== t || r !== i) && (e({
			width: Number(i),
			height: Number(t)
		}), n = t, r = i);
	}), 200)), t);
}
var kc = [
	"INPUT",
	"TEXTAREA",
	"SELECT"
], Ac = /* @__PURE__ */ new WeakMap();
function jc({ inputCb: e, doc: t, mirror: n, blockClass: r, blockSelector: i, ignoreClass: a, ignoreSelector: o, maskInputOptions: s, maskInputFn: c, sampling: l, userTriggeredOnInput: u }) {
	function d(e) {
		let n = Cc(e), l = e.isTrusted, d = n && n.tagName;
		if (n && d === "OPTION" && (n = W.parentElement(n)), !n || !d || kc.indexOf(d) < 0 || K(n, r, i, !0) || n.classList.contains(a) || o && n.matches(o)) return;
		let p = n.value, m = !1, h = Ft(n) || "";
		h === "radio" || h === "checkbox" ? m = n.checked : (s[d.toLowerCase()] || s[h]) && (p = At({
			element: n,
			maskInputOptions: s,
			tagName: d,
			type: h,
			value: p,
			maskInputFn: c
		})), f(n, u ? {
			text: p,
			isChecked: m,
			userTriggered: l
		} : {
			text: p,
			isChecked: m
		});
		let g = n.name;
		h === "radio" && g && m && t.querySelectorAll(`input[type="radio"][name="${g}"]`).forEach((e) => {
			if (e !== n) {
				let t = e.value;
				f(e, u ? {
					text: t,
					isChecked: !m,
					userTriggered: !1
				} : {
					text: t,
					isChecked: !m
				});
			}
		});
	}
	function f(t, r) {
		let i = Ac.get(t);
		if (!i || i.text !== r.text || i.isChecked !== r.isChecked) {
			Ac.set(t, r);
			let i = n.getId(t);
			Z(e)({
				...r,
				id: i
			});
		}
	}
	let p = (l.input === "last" ? ["change"] : ["input", "change"]).map((e) => G(e, Z(d), t)), m = t.defaultView;
	if (!m) return () => {
		p.forEach((e) => e());
	};
	let h = m.Object.getOwnPropertyDescriptor(m.HTMLInputElement.prototype, "value"), g = [
		[m.HTMLInputElement.prototype, "value"],
		[m.HTMLInputElement.prototype, "checked"],
		[m.HTMLSelectElement.prototype, "value"],
		[m.HTMLTextAreaElement.prototype, "value"],
		[m.HTMLSelectElement.prototype, "selectedIndex"],
		[m.HTMLOptionElement.prototype, "selected"]
	];
	return h && h.set && p.push(...g.map((e) => zs(e[0], e[1], { set() {
		Z(d)({
			target: this,
			isTrusted: !1
		});
	} }, !1, m))), Z(() => {
		p.forEach((e) => e());
	});
}
function Mc(e) {
	let t = [];
	function n(e, t) {
		if (Uc("CSSGroupingRule") && e.parentRule instanceof CSSGroupingRule || Uc("CSSMediaRule") && e.parentRule instanceof CSSMediaRule || Uc("CSSSupportsRule") && e.parentRule instanceof CSSSupportsRule || Uc("CSSConditionRule") && e.parentRule instanceof CSSConditionRule) {
			let r = Array.from(e.parentRule.cssRules).indexOf(e);
			return t.unshift(r), n(e.parentRule, t);
		}
		if (e.parentStyleSheet) {
			let n = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
			t.unshift(n);
		}
		return t;
	}
	return n(e, t);
}
function Nc(e, t, n) {
	let r, i;
	return e ? (e.ownerNode ? r = t.getId(e.ownerNode) : i = n.getId(e), {
		styleId: i,
		id: r
	}) : {};
}
function Pc({ styleSheetRuleCb: e, mirror: t, stylesheetManager: n }, { win: r }) {
	if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
	let i = r.CSSStyleSheet.prototype.insertRule;
	r.CSSStyleSheet.prototype.insertRule = new Proxy(i, { apply: Z((r, i, a) => {
		let [o, s] = a, { id: c, styleId: l } = Nc(i, t, n.styleMirror);
		return (c && c !== -1 || l && l !== -1) && e({
			id: c,
			styleId: l,
			adds: [{
				rule: o,
				index: s
			}]
		}), r.apply(i, a);
	}) }), r.CSSStyleSheet.prototype.addRule = function(e, t, n = this.cssRules.length) {
		let i = `${e} { ${t} }`;
		return r.CSSStyleSheet.prototype.insertRule.apply(this, [i, n]);
	};
	let a = r.CSSStyleSheet.prototype.deleteRule;
	r.CSSStyleSheet.prototype.deleteRule = new Proxy(a, { apply: Z((r, i, a) => {
		let [o] = a, { id: s, styleId: c } = Nc(i, t, n.styleMirror);
		return (s && s !== -1 || c && c !== -1) && e({
			id: s,
			styleId: c,
			removes: [{ index: o }]
		}), r.apply(i, a);
	}) }), r.CSSStyleSheet.prototype.removeRule = function(e) {
		return r.CSSStyleSheet.prototype.deleteRule.apply(this, [e]);
	};
	let o;
	r.CSSStyleSheet.prototype.replace && (o = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = new Proxy(o, { apply: Z((r, i, a) => {
		let [o] = a, { id: s, styleId: c } = Nc(i, t, n.styleMirror);
		return (s && s !== -1 || c && c !== -1) && e({
			id: s,
			styleId: c,
			replace: o
		}), r.apply(i, a);
	}) }));
	let s;
	r.CSSStyleSheet.prototype.replaceSync && (s = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = new Proxy(s, { apply: Z((r, i, a) => {
		let [o] = a, { id: s, styleId: c } = Nc(i, t, n.styleMirror);
		return (s && s !== -1 || c && c !== -1) && e({
			id: s,
			styleId: c,
			replaceSync: o
		}), r.apply(i, a);
	}) }));
	let c = {};
	Wc("CSSGroupingRule") ? c.CSSGroupingRule = r.CSSGroupingRule : (Wc("CSSMediaRule") && (c.CSSMediaRule = r.CSSMediaRule), Wc("CSSConditionRule") && (c.CSSConditionRule = r.CSSConditionRule), Wc("CSSSupportsRule") && (c.CSSSupportsRule = r.CSSSupportsRule));
	let l = {};
	return Object.entries(c).forEach(([r, i]) => {
		l[r] = {
			insertRule: i.prototype.insertRule,
			deleteRule: i.prototype.deleteRule
		}, i.prototype.insertRule = new Proxy(l[r].insertRule, { apply: Z((r, i, a) => {
			let [o, s] = a, { id: c, styleId: l } = Nc(i.parentStyleSheet, t, n.styleMirror);
			return (c && c !== -1 || l && l !== -1) && e({
				id: c,
				styleId: l,
				adds: [{
					rule: o,
					index: [...Mc(i), s || 0]
				}]
			}), r.apply(i, a);
		}) }), i.prototype.deleteRule = new Proxy(l[r].deleteRule, { apply: Z((r, i, a) => {
			let [o] = a, { id: s, styleId: c } = Nc(i.parentStyleSheet, t, n.styleMirror);
			return (s && s !== -1 || c && c !== -1) && e({
				id: s,
				styleId: c,
				removes: [{ index: [...Mc(i), o] }]
			}), r.apply(i, a);
		}) });
	}), Z(() => {
		r.CSSStyleSheet.prototype.insertRule = i, r.CSSStyleSheet.prototype.deleteRule = a, o && (r.CSSStyleSheet.prototype.replace = o), s && (r.CSSStyleSheet.prototype.replaceSync = s), Object.entries(c).forEach(([e, t]) => {
			t.prototype.insertRule = l[e].insertRule, t.prototype.deleteRule = l[e].deleteRule;
		});
	});
}
function Fc({ mirror: e, stylesheetManager: t }, n) {
	let r = null;
	r = n.nodeName === "#document" ? e.getId(n) : e.getId(W.host(n));
	let i = n.nodeName === "#document" ? n.defaultView?.Document : n.ownerDocument?.defaultView?.ShadowRoot, a = i?.prototype ? Object.getOwnPropertyDescriptor(i?.prototype, "adoptedStyleSheets") : void 0;
	return r === null || r === -1 || !i || !a ? () => {} : (Object.defineProperty(n, "adoptedStyleSheets", {
		configurable: a.configurable,
		enumerable: a.enumerable,
		get() {
			return a.get?.call(this);
		},
		set(e) {
			let n = a.set?.call(this, e);
			if (r !== null && r !== -1) try {
				t.adoptStyleSheets(e, r);
			} catch {}
			return n;
		}
	}), Z(() => {
		Object.defineProperty(n, "adoptedStyleSheets", {
			configurable: a.configurable,
			enumerable: a.enumerable,
			get: a.get,
			set: a.set
		});
	}));
}
function Ic({ styleDeclarationCb: e, mirror: t, ignoreCSSAttributes: n, stylesheetManager: r }, { win: i }) {
	let a = i.CSSStyleDeclaration.prototype.setProperty;
	i.CSSStyleDeclaration.prototype.setProperty = new Proxy(a, { apply: Z((i, o, s) => {
		let [c, l, u] = s;
		if (n.has(c)) return a.apply(o, [
			c,
			l,
			u
		]);
		let { id: d, styleId: f } = Nc(o.parentRule?.parentStyleSheet, t, r.styleMirror);
		return (d && d !== -1 || f && f !== -1) && e({
			id: d,
			styleId: f,
			set: {
				property: c,
				value: l,
				priority: u
			},
			index: Mc(o.parentRule)
		}), i.apply(o, s);
	}) });
	let o = i.CSSStyleDeclaration.prototype.removeProperty;
	return i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, { apply: Z((i, a, s) => {
		let [c] = s;
		if (n.has(c)) return o.apply(a, [c]);
		let { id: l, styleId: u } = Nc(a.parentRule?.parentStyleSheet, t, r.styleMirror);
		return (l && l !== -1 || u && u !== -1) && e({
			id: l,
			styleId: u,
			remove: { property: c },
			index: Mc(a.parentRule)
		}), i.apply(a, s);
	}) }), Z(() => {
		i.CSSStyleDeclaration.prototype.setProperty = a, i.CSSStyleDeclaration.prototype.removeProperty = o;
	});
}
function Lc({ mediaInteractionCb: e, blockClass: t, blockSelector: n, mirror: r, sampling: i, doc: a }) {
	let o = Z((a) => Rs(Z((i) => {
		let o = Cc(i);
		if (!o || K(o, t, n, !0)) return;
		let { currentTime: s, volume: c, muted: l, playbackRate: u, loop: d } = o;
		e({
			type: a,
			id: r.getId(o),
			currentTime: s,
			volume: c,
			muted: l,
			playbackRate: u,
			loop: d
		});
	}), i.media || 500)), s = [
		G("play", o(dc.Play), a),
		G("pause", o(dc.Pause), a),
		G("seeked", o(dc.Seeked), a),
		G("volumechange", o(dc.VolumeChange), a),
		G("ratechange", o(dc.RateChange), a)
	];
	return Z(() => {
		s.forEach((e) => e());
	});
}
function Rc({ fontCb: e, doc: t }) {
	let n = t.defaultView;
	if (!n) return () => {};
	let r = [], i = /* @__PURE__ */ new WeakMap(), a = n.FontFace;
	n.FontFace = function(e, t, n) {
		let r = new a(e, t, n);
		return i.set(r, {
			family: e,
			buffer: typeof t != "string",
			descriptors: n,
			fontSource: typeof t == "string" ? t : JSON.stringify(Array.from(new Uint8Array(t)))
		}), r;
	};
	let o = Fs(t.fonts, "add", function(t) {
		return function(n) {
			return setTimeout(Z(() => {
				let t = i.get(n);
				t && (e(t), i.delete(n));
			}), 0), t.apply(this, [n]);
		};
	});
	return r.push(() => {
		n.FontFace = a;
	}), r.push(o), Z(() => {
		r.forEach((e) => e());
	});
}
function zc(e) {
	let { doc: t, mirror: n, blockClass: r, blockSelector: i, selectionCb: a } = e, o = !0, s = Z(() => {
		let e = t.getSelection();
		if (!e || o && e?.isCollapsed) return;
		o = e.isCollapsed || !1;
		let s = [], c = e.rangeCount || 0;
		for (let t = 0; t < c; t++) {
			let { startContainer: a, startOffset: o, endContainer: c, endOffset: l } = e.getRangeAt(t);
			K(a, r, i, !0) || K(c, r, i, !0) || s.push({
				start: n.getId(a),
				startOffset: o,
				end: n.getId(c),
				endOffset: l
			});
		}
		a({ ranges: s });
	});
	return s(), G("selectionchange", s);
}
function Bc({ doc: e, customElementCb: t }) {
	let n = e.defaultView;
	return !n || !n.customElements ? () => {} : Fs(n.customElements, "define", function(e) {
		return function(n, r, i) {
			try {
				t({ define: { name: n } });
			} catch {
				console.warn(`Custom element callback failed for ${n}`);
			}
			return e.apply(this, [
				n,
				r,
				i
			]);
		};
	});
}
function Vc(e, t) {
	let { mutationCb: n, mousemoveCb: r, mouseInteractionCb: i, scrollCb: a, viewportResizeCb: o, inputCb: s, mediaInteractionCb: c, styleSheetRuleCb: l, styleDeclarationCb: u, canvasMutationCb: d, fontCb: f, selectionCb: p, customElementCb: m } = e;
	e.mutationCb = (...e) => {
		t.mutation && t.mutation(...e), n(...e);
	}, e.mousemoveCb = (...e) => {
		t.mousemove && t.mousemove(...e), r(...e);
	}, e.mouseInteractionCb = (...e) => {
		t.mouseInteraction && t.mouseInteraction(...e), i(...e);
	}, e.scrollCb = (...e) => {
		t.scroll && t.scroll(...e), a(...e);
	}, e.viewportResizeCb = (...e) => {
		t.viewportResize && t.viewportResize(...e), o(...e);
	}, e.inputCb = (...e) => {
		t.input && t.input(...e), s(...e);
	}, e.mediaInteractionCb = (...e) => {
		t.mediaInteaction && t.mediaInteaction(...e), c(...e);
	}, e.styleSheetRuleCb = (...e) => {
		t.styleSheetRule && t.styleSheetRule(...e), l(...e);
	}, e.styleDeclarationCb = (...e) => {
		t.styleDeclaration && t.styleDeclaration(...e), u(...e);
	}, e.canvasMutationCb = (...e) => {
		t.canvasMutation && t.canvasMutation(...e), d(...e);
	}, e.fontCb = (...e) => {
		t.font && t.font(...e), f(...e);
	}, e.selectionCb = (...e) => {
		t.selection && t.selection(...e), p(...e);
	}, e.customElementCb = (...e) => {
		t.customElement && t.customElement(...e), m(...e);
	};
}
function Hc(e, t = {}) {
	let n = e.doc.defaultView;
	if (!n) return () => {};
	Vc(e, t);
	let r, i = () => {};
	e.recordDOM && ([r, i] = wc(e, e.doc));
	let a = Tc(e), o = Ec(e), s = Dc(e), c = Oc(e, { win: n }), l = jc(e), u = Lc(e), d = () => {}, f = () => {}, p = () => {}, m = () => {};
	e.recordDOM && (d = Pc(e, { win: n }), f = Fc(e, e.doc), p = Ic(e, { win: n }), e.collectFonts && (m = Rc(e)));
	let h = zc(e), g = Bc(e), _ = [];
	for (let t of e.plugins) _.push(t.observer(t.callback, n, t.options));
	return Z(() => {
		Sc.forEach((e) => e.reset()), r?.disconnect(), i(), a(), o(), s(), c(), l(), u(), d(), f(), p(), m(), h(), g(), _.forEach((e) => e());
	});
}
function Uc(e) {
	return window[e] !== void 0;
}
function Wc(e) {
	return !!(window[e] !== void 0 && window[e].prototype && "insertRule" in window[e].prototype && "deleteRule" in window[e].prototype);
}
for (var Gc = class {
	constructor(e) {
		N(this, "iframeIdToRemoteIdMap", /* @__PURE__ */ new WeakMap()), N(this, "iframeRemoteIdToIdMap", /* @__PURE__ */ new WeakMap()), this.generateIdFn = e;
	}
	getId(e, t, n, r) {
		let i = n || this.getIdToRemoteIdMap(e), a = r || this.getRemoteIdToIdMap(e), o = i.get(t);
		return o || (o = this.generateIdFn(), i.set(t, o), a.set(o, t)), o;
	}
	getIds(e, t) {
		let n = this.getIdToRemoteIdMap(e), r = this.getRemoteIdToIdMap(e);
		return t.map((t) => this.getId(e, t, n, r));
	}
	getRemoteId(e, t, n) {
		let r = n || this.getRemoteIdToIdMap(e);
		return typeof t == "number" ? r.get(t) || -1 : t;
	}
	getRemoteIds(e, t) {
		let n = this.getRemoteIdToIdMap(e);
		return t.map((t) => this.getRemoteId(e, t, n));
	}
	reset(e) {
		if (!e) {
			this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
			return;
		}
		this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e);
	}
	getIdToRemoteIdMap(e) {
		let t = this.iframeIdToRemoteIdMap.get(e);
		return t || (t = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(e, t)), t;
	}
	getRemoteIdToIdMap(e) {
		let t = this.iframeRemoteIdToIdMap.get(e);
		return t || (t = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(e, t)), t;
	}
}, Kc = class {
	constructor(e) {
		N(this, "iframes", /* @__PURE__ */ new WeakMap()), N(this, "crossOriginIframeMap", /* @__PURE__ */ new WeakMap()), N(this, "crossOriginIframeMirror", new Gc(Yt)), N(this, "crossOriginIframeStyleMirror"), N(this, "crossOriginIframeRootIdMap", /* @__PURE__ */ new WeakMap()), N(this, "mirror"), N(this, "mutationCb"), N(this, "wrappedEmit"), N(this, "loadListener"), N(this, "stylesheetManager"), N(this, "recordCrossOriginIframes"), this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new Gc(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
	}
	addIframe(e) {
		this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
	}
	addLoadListener(e) {
		this.loadListener = e;
	}
	attachIframe(e, t) {
		var n, r;
		this.mutationCb({
			adds: [{
				parentId: this.mirror.getId(e),
				nextId: null,
				node: t
			}],
			removes: [],
			texts: [],
			attributes: [],
			isAttachIframe: !0
		}), this.recordCrossOriginIframes && ((n = e.contentWindow) == null || n.addEventListener("message", this.handleMessage.bind(this))), (r = this.loadListener) == null || r.call(this, e), e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(e.contentDocument.adoptedStyleSheets, this.mirror.getId(e.contentDocument));
	}
	handleMessage(e) {
		let t = e;
		if (t.data.type !== "rrweb" || t.origin !== t.data.origin || !e.source) return;
		let n = this.crossOriginIframeMap.get(e.source);
		if (!n) return;
		let r = this.transformCrossOriginEvent(n, t.data.event);
		r && this.wrappedEmit(r, t.data.isCheckout);
	}
	transformCrossOriginEvent(e, t) {
		var n;
		switch (t.type) {
			case q.FullSnapshot: {
				this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e);
				let n = t.data.node.id;
				return this.crossOriginIframeRootIdMap.set(e, n), this.patchRootIdOnNode(t.data.node, n), {
					timestamp: t.timestamp,
					type: q.IncrementalSnapshot,
					data: {
						source: J.Mutation,
						adds: [{
							parentId: this.mirror.getId(e),
							nextId: null,
							node: t.data.node
						}],
						removes: [],
						texts: [],
						attributes: [],
						isAttachIframe: !0
					}
				};
			}
			case q.Meta:
			case q.Load:
			case q.DomContentLoaded: return !1;
			case q.Plugin: return t;
			case q.Custom: return this.replaceIds(t.data.payload, e, [
				"id",
				"parentId",
				"previousId",
				"nextId"
			]), t;
			case q.IncrementalSnapshot: switch (t.data.source) {
				case J.Mutation: return t.data.adds.forEach((t) => {
					this.replaceIds(t, e, [
						"parentId",
						"nextId",
						"previousId"
					]), this.replaceIdOnNode(t.node, e);
					let n = this.crossOriginIframeRootIdMap.get(e);
					n && this.patchRootIdOnNode(t.node, n);
				}), t.data.removes.forEach((t) => {
					this.replaceIds(t, e, ["parentId", "id"]);
				}), t.data.attributes.forEach((t) => {
					this.replaceIds(t, e, ["id"]);
				}), t.data.texts.forEach((t) => {
					this.replaceIds(t, e, ["id"]);
				}), t;
				case J.Drag:
				case J.TouchMove:
				case J.MouseMove: return t.data.positions.forEach((t) => {
					this.replaceIds(t, e, ["id"]);
				}), t;
				case J.ViewportResize: return !1;
				case J.MediaInteraction:
				case J.MouseInteraction:
				case J.Scroll:
				case J.CanvasMutation:
				case J.Input: return this.replaceIds(t.data, e, ["id"]), t;
				case J.StyleSheetRule:
				case J.StyleDeclaration: return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
				case J.Font: return t;
				case J.Selection: return t.data.ranges.forEach((t) => {
					this.replaceIds(t, e, ["start", "end"]);
				}), t;
				case J.AdoptedStyleSheet: return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), (n = t.data.styles) == null || n.forEach((t) => {
					this.replaceStyleIds(t, e, ["styleId"]);
				}), t;
			}
		}
		return !1;
	}
	replace(e, t, n, r) {
		for (let i of r) (Array.isArray(t[i]) || typeof t[i] == "number") && (t[i] = Array.isArray(t[i]) ? e.getIds(n, t[i]) : e.getId(n, t[i]));
		return t;
	}
	replaceIds(e, t, n) {
		return this.replace(this.crossOriginIframeMirror, e, t, n);
	}
	replaceStyleIds(e, t, n) {
		return this.replace(this.crossOriginIframeStyleMirror, e, t, n);
	}
	replaceIdOnNode(e, t) {
		this.replaceIds(e, t, ["id", "rootId"]), "childNodes" in e && e.childNodes.forEach((e) => {
			this.replaceIdOnNode(e, t);
		});
	}
	patchRootIdOnNode(e, t) {
		e.type !== fc.Document && !e.rootId && (e.rootId = t), "childNodes" in e && e.childNodes.forEach((e) => {
			this.patchRootIdOnNode(e, t);
		});
	}
}, qc = class {
	constructor(e) {
		N(this, "shadowDoms", /* @__PURE__ */ new WeakSet()), N(this, "mutationCb"), N(this, "scrollCb"), N(this, "bypassOptions"), N(this, "mirror"), N(this, "restoreHandlers", []), this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror, this.init();
	}
	init() {
		this.reset(), this.patchAttachShadow(Element, document);
	}
	addShadowRoot(e, t) {
		if (!bt(e) || this.shadowDoms.has(e)) return;
		this.shadowDoms.add(e);
		let [n] = wc({
			...this.bypassOptions,
			doc: t,
			mutationCb: this.mutationCb,
			mirror: this.mirror,
			shadowDomManager: this
		}, e);
		this.restoreHandlers.push(() => n.disconnect()), this.restoreHandlers.push(Dc({
			...this.bypassOptions,
			scrollCb: this.scrollCb,
			doc: e,
			mirror: this.mirror
		})), setTimeout(() => {
			e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(W.host(e))), this.restoreHandlers.push(Fc({
				mirror: this.mirror,
				stylesheetManager: this.bypassOptions.stylesheetManager
			}, e));
		}, 0);
	}
	observeAttachShadow(e) {
		e.contentWindow && e.contentDocument && this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
	}
	patchAttachShadow(e, t) {
		let n = this;
		this.restoreHandlers.push(Fs(e.prototype, "attachShadow", function(e) {
			return function(r) {
				let i = e.call(this, r), a = W.shadowRoot(this);
				return a && cc(this) && n.addShadowRoot(a, t), i;
			};
		}));
	}
	reset() {
		this.restoreHandlers.forEach((e) => {
			try {
				e();
			} catch {}
		}), this.restoreHandlers = [], this.shadowDoms = /* @__PURE__ */ new WeakSet();
	}
}, Jc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Yc = typeof Uint8Array > "u" ? [] : /* @__PURE__ */ new Uint8Array(256), Xc = 0; Xc < Jc.length; Xc++) Yc[Jc.charCodeAt(Xc)] = Xc;
var Zc = function(e) {
	var t = new Uint8Array(e), n, r = t.length, i = "";
	for (n = 0; n < r; n += 3) i += Jc[t[n] >> 2], i += Jc[(t[n] & 3) << 4 | t[n + 1] >> 4], i += Jc[(t[n + 1] & 15) << 2 | t[n + 2] >> 6], i += Jc[t[n + 2] & 63];
	return r % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i;
}, Qc = function(e) {
	var t = e.length * .75, n = e.length, r, i = 0, a, o, s, c;
	e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
	var l = new ArrayBuffer(t), u = new Uint8Array(l);
	for (r = 0; r < n; r += 4) a = Yc[e.charCodeAt(r)], o = Yc[e.charCodeAt(r + 1)], s = Yc[e.charCodeAt(r + 2)], c = Yc[e.charCodeAt(r + 3)], u[i++] = a << 2 | o >> 4, u[i++] = (o & 15) << 4 | s >> 2, u[i++] = (s & 3) << 6 | c & 63;
	return l;
}, $c = /* @__PURE__ */ new Map();
function el(e, t) {
	let n = $c.get(e);
	return n || (n = /* @__PURE__ */ new Map(), $c.set(e, n)), n.has(t) || n.set(t, []), n.get(t);
}
var tl = (e, t, n) => {
	if (!e || !(il(e, t) || typeof e == "object")) return;
	let r = e.constructor.name, i = el(n, r), a = i.indexOf(e);
	return a === -1 && (a = i.length, i.push(e)), a;
};
function nl(e, t, n) {
	if (e instanceof Array) return e.map((e) => nl(e, t, n));
	if (e === null) return e;
	if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray) return {
		rr_type: e.constructor.name,
		args: [Object.values(e)]
	};
	if (e instanceof ArrayBuffer) return {
		rr_type: e.constructor.name,
		base64: Zc(e)
	};
	if (e instanceof DataView) return {
		rr_type: e.constructor.name,
		args: [
			nl(e.buffer, t, n),
			e.byteOffset,
			e.byteLength
		]
	};
	if (e instanceof HTMLImageElement) {
		let t = e.constructor.name, { src: n } = e;
		return {
			rr_type: t,
			src: n
		};
	}
	return e instanceof HTMLCanvasElement ? {
		rr_type: "HTMLImageElement",
		src: e.toDataURL()
	} : e instanceof ImageData ? {
		rr_type: e.constructor.name,
		args: [
			nl(e.data, t, n),
			e.width,
			e.height
		]
	} : il(e, t) || typeof e == "object" ? {
		rr_type: e.constructor.name,
		index: tl(e, t, n)
	} : e;
}
var rl = (e, t, n) => e.map((e) => nl(e, t, n)), il = (e, t) => !![
	"WebGLActiveInfo",
	"WebGLBuffer",
	"WebGLFramebuffer",
	"WebGLProgram",
	"WebGLRenderbuffer",
	"WebGLShader",
	"WebGLShaderPrecisionFormat",
	"WebGLTexture",
	"WebGLUniformLocation",
	"WebGLVertexArrayObject",
	"WebGLVertexArrayObjectOES"
].filter((e) => typeof t[e] == "function").find((n) => e instanceof t[n]);
function al(e, t, n, r) {
	let i = [], a = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
	for (let o of a) try {
		if (typeof t.CanvasRenderingContext2D.prototype[o] != "function") continue;
		let a = Fs(t.CanvasRenderingContext2D.prototype, o, function(i) {
			return function(...a) {
				return K(this.canvas, n, r, !0) || setTimeout(() => {
					let n = rl(a, t, this);
					e(this.canvas, {
						type: uc["2D"],
						property: o,
						args: n
					});
				}, 0), i.apply(this, a);
			};
		});
		i.push(a);
	} catch {
		let n = zs(t.CanvasRenderingContext2D.prototype, o, { set(t) {
			e(this.canvas, {
				type: uc["2D"],
				property: o,
				args: [t],
				setter: !0
			});
		} });
		i.push(n);
	}
	return () => {
		i.forEach((e) => e());
	};
}
function ol(e) {
	return e === "experimental-webgl" ? "webgl" : e;
}
function sl(e, t, n, r) {
	let i = [];
	try {
		let a = Fs(e.HTMLCanvasElement.prototype, "getContext", function(e) {
			return function(i, ...a) {
				if (!K(this, t, n, !0)) {
					let e = ol(i);
					if ("__context" in this || (this.__context = e), r && ["webgl", "webgl2"].includes(e)) {
						if (a[0] && typeof a[0] == "object") {
							let e = a[0];
							e.preserveDrawingBuffer ||= !0;
						} else a.splice(0, 1, { preserveDrawingBuffer: !0 });
					}
				}
				return e.apply(this, [i, ...a]);
			};
		});
		i.push(a);
	} catch {
		console.error("failed to patch HTMLCanvasElement.prototype.getContext");
	}
	return () => {
		i.forEach((e) => e());
	};
}
function cl(e, t, n, r, i, a) {
	let o = [], s = Object.getOwnPropertyNames(e);
	for (let c of s) if (![
		"isContextLost",
		"canvas",
		"drawingBufferWidth",
		"drawingBufferHeight"
	].includes(c)) try {
		if (typeof e[c] != "function") continue;
		let s = Fs(e, c, function(e) {
			return function(...o) {
				let s = e.apply(this, o);
				if (tl(s, a, this), "tagName" in this.canvas && !K(this.canvas, r, i, !0)) {
					let e = rl(o, a, this), r = {
						type: t,
						property: c,
						args: e
					};
					n(this.canvas, r);
				}
				return s;
			};
		});
		o.push(s);
	} catch {
		let r = zs(e, c, { set(e) {
			n(this.canvas, {
				type: t,
				property: c,
				args: [e],
				setter: !0
			});
		} });
		o.push(r);
	}
	return o;
}
function ll(e, t, n, r) {
	let i = [];
	return t.WebGLRenderingContext !== void 0 && i.push(...cl(t.WebGLRenderingContext.prototype, uc.WebGL, e, n, r, t)), t.WebGL2RenderingContext !== void 0 && i.push(...cl(t.WebGL2RenderingContext.prototype, uc.WebGL2, e, n, r, t)), () => {
		i.forEach((e) => e());
	};
}
var ul = "(function() {\n  \"use strict\";\n  var chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n  var lookup = typeof Uint8Array === \"undefined\" ? [] : new Uint8Array(256);\n  for (var i = 0; i < chars.length; i++) {\n    lookup[chars.charCodeAt(i)] = i;\n  }\n  var encode = function(arraybuffer) {\n    var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = \"\";\n    for (i2 = 0; i2 < len; i2 += 3) {\n      base64 += chars[bytes[i2] >> 2];\n      base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];\n      base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];\n      base64 += chars[bytes[i2 + 2] & 63];\n    }\n    if (len % 3 === 2) {\n      base64 = base64.substring(0, base64.length - 1) + \"=\";\n    } else if (len % 3 === 1) {\n      base64 = base64.substring(0, base64.length - 2) + \"==\";\n    }\n    return base64;\n  };\n  const lastBlobMap = /* @__PURE__ */ new Map();\n  const transparentBlobMap = /* @__PURE__ */ new Map();\n  async function getTransparentBlobFor(width, height, dataURLOptions) {\n    const id = `${width}-${height}`;\n    if (\"OffscreenCanvas\" in globalThis) {\n      if (transparentBlobMap.has(id)) return transparentBlobMap.get(id);\n      const offscreen = new OffscreenCanvas(width, height);\n      offscreen.getContext(\"2d\");\n      const blob = await offscreen.convertToBlob(dataURLOptions);\n      const arrayBuffer = await blob.arrayBuffer();\n      const base64 = encode(arrayBuffer);\n      transparentBlobMap.set(id, base64);\n      return base64;\n    } else {\n      return \"\";\n    }\n  }\n  const worker = self;\n  worker.onmessage = async function(e) {\n    if (\"OffscreenCanvas\" in globalThis) {\n      const { id, bitmap, width, height, dataURLOptions } = e.data;\n      const transparentBase64 = getTransparentBlobFor(\n        width,\n        height,\n        dataURLOptions\n      );\n      const offscreen = new OffscreenCanvas(width, height);\n      const ctx = offscreen.getContext(\"2d\");\n      ctx.drawImage(bitmap, 0, 0);\n      bitmap.close();\n      const blob = await offscreen.convertToBlob(dataURLOptions);\n      const type = blob.type;\n      const arrayBuffer = await blob.arrayBuffer();\n      const base64 = encode(arrayBuffer);\n      if (!lastBlobMap.has(id) && await transparentBase64 === base64) {\n        lastBlobMap.set(id, base64);\n        return worker.postMessage({ id });\n      }\n      if (lastBlobMap.get(id) === base64) return worker.postMessage({ id });\n      worker.postMessage({\n        id,\n        type,\n        base64,\n        width,\n        height\n      });\n      lastBlobMap.set(id, base64);\n    } else {\n      return worker.postMessage({ id: e.data.id });\n    }\n  };\n})();\n//# sourceMappingURL=image-bitmap-data-url-worker-IJpC7g_b.js.map\n", dl = typeof self < "u" && self.Blob && new Blob([ul], { type: "text/javascript;charset=utf-8" });
function fl(e) {
	let t;
	try {
		if (t = dl && (self.URL || self.webkitURL).createObjectURL(dl), !t) throw "";
		let n = new Worker(t, { name: e?.name });
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(ul), { name: e?.name });
	} finally {
		t && (self.URL || self.webkitURL).revokeObjectURL(t);
	}
}
var pl = class {
	constructor(e) {
		N(this, "pendingCanvasMutations", /* @__PURE__ */ new Map()), N(this, "rafStamps", {
			latestId: 0,
			invokeId: null
		}), N(this, "mirror"), N(this, "mutationCb"), N(this, "resetObservers"), N(this, "frozen", !1), N(this, "locked", !1), N(this, "processMutation", (e, t) => {
			(this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []), this.pendingCanvasMutations.get(e).push(t);
		});
		let { sampling: t = "all", win: n, blockClass: r, blockSelector: i, recordCanvas: a, dataURLOptions: o } = e;
		this.mutationCb = e.mutationCb, this.mirror = e.mirror, a && t === "all" && this.initCanvasMutationObserver(n, r, i), a && typeof t == "number" && this.initCanvasFPSObserver(t, n, r, i, { dataURLOptions: o });
	}
	reset() {
		this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
	}
	freeze() {
		this.frozen = !0;
	}
	unfreeze() {
		this.frozen = !1;
	}
	lock() {
		this.locked = !0;
	}
	unlock() {
		this.locked = !1;
	}
	initCanvasFPSObserver(e, t, n, r, i) {
		let a = sl(t, n, r, !0), o = /* @__PURE__ */ new Map(), s = new fl();
		s.onmessage = (e) => {
			let { id: t } = e.data;
			if (o.set(t, !1), !("base64" in e.data)) return;
			let { base64: n, type: r, width: i, height: a } = e.data;
			this.mutationCb({
				id: t,
				type: uc["2D"],
				commands: [{
					property: "clearRect",
					args: [
						0,
						0,
						i,
						a
					]
				}, {
					property: "drawImage",
					args: [
						{
							rr_type: "ImageBitmap",
							args: [{
								rr_type: "Blob",
								data: [{
									rr_type: "ArrayBuffer",
									base64: n
								}],
								type: r
							}]
						},
						0,
						0
					]
				}]
			});
		};
		let c = 1e3 / e, l = 0, u, d = () => {
			let e = [];
			return t.document.querySelectorAll("canvas").forEach((t) => {
				K(t, n, r, !0) || e.push(t);
			}), e;
		}, f = (e) => {
			if (l && e - l < c) {
				u = requestAnimationFrame(f);
				return;
			}
			l = e, d().forEach(async (e) => {
				let t = this.mirror.getId(e);
				if (o.get(t) || e.width === 0 || e.height === 0) return;
				if (o.set(t, !0), ["webgl", "webgl2"].includes(e.__context)) {
					let t = e.getContext(e.__context);
					t?.getContextAttributes()?.preserveDrawingBuffer === !1 && t.clear(t.COLOR_BUFFER_BIT);
				}
				let n = await createImageBitmap(e);
				s.postMessage({
					id: t,
					bitmap: n,
					width: e.width,
					height: e.height,
					dataURLOptions: i.dataURLOptions
				}, [n]);
			}), u = requestAnimationFrame(f);
		};
		u = requestAnimationFrame(f), this.resetObservers = () => {
			a(), cancelAnimationFrame(u);
		};
	}
	initCanvasMutationObserver(e, t, n) {
		this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
		let r = sl(e, t, n, !1), i = al(this.processMutation.bind(this), e, t, n), a = ll(this.processMutation.bind(this), e, t, n);
		this.resetObservers = () => {
			r(), i(), a();
		};
	}
	startPendingCanvasMutationFlusher() {
		requestAnimationFrame(() => this.flushPendingCanvasMutations());
	}
	startRAFTimestamping() {
		let e = (t) => {
			this.rafStamps.latestId = t, requestAnimationFrame(e);
		};
		requestAnimationFrame(e);
	}
	flushPendingCanvasMutations() {
		this.pendingCanvasMutations.forEach((e, t) => {
			let n = this.mirror.getId(t);
			this.flushPendingCanvasMutationFor(t, n);
		}), requestAnimationFrame(() => this.flushPendingCanvasMutations());
	}
	flushPendingCanvasMutationFor(e, t) {
		if (this.frozen || this.locked) return;
		let n = this.pendingCanvasMutations.get(e);
		if (!n || t === -1) return;
		let r = n.map((e) => {
			let { type: t, ...n } = e;
			return n;
		}), { type: i } = n[0];
		this.mutationCb({
			id: t,
			type: i,
			commands: r
		}), this.pendingCanvasMutations.delete(e);
	}
}, ml = class {
	constructor(e) {
		N(this, "trackedLinkElements", /* @__PURE__ */ new WeakSet()), N(this, "mutationCb"), N(this, "adoptedStyleSheetCb"), N(this, "styleMirror", new ic()), this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb;
	}
	attachLinkElement(e, t) {
		"_cssText" in t.attributes && this.mutationCb({
			adds: [],
			removes: [],
			texts: [],
			attributes: [{
				id: t.id,
				attributes: t.attributes
			}]
		}), this.trackLinkElement(e);
	}
	trackLinkElement(e) {
		this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
	}
	adoptStyleSheets(e, t) {
		if (e.length === 0) return;
		let n = {
			id: t,
			styleIds: []
		}, r = [];
		for (let t of e) {
			let e;
			this.styleMirror.has(t) ? e = this.styleMirror.getId(t) : (e = this.styleMirror.add(t), r.push({
				styleId: e,
				rules: Array.from(t.rules || CSSRule, (e, n) => ({
					rule: wt(e, t.href),
					index: n
				}))
			})), n.styleIds.push(e);
		}
		r.length > 0 && (n.styles = r), this.adoptedStyleSheetCb(n);
	}
	reset() {
		this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
	}
	trackStylesheetInLinkElement(e) {}
}, hl = class {
	constructor() {
		N(this, "nodeMap", /* @__PURE__ */ new WeakMap()), N(this, "active", !1);
	}
	inOtherBuffer(e, t) {
		let n = this.nodeMap.get(e);
		return n && Array.from(n).some((e) => e !== t);
	}
	add(e, t) {
		this.active || (this.active = !0, requestAnimationFrame(() => {
			this.nodeMap = /* @__PURE__ */ new WeakMap(), this.active = !1;
		})), this.nodeMap.set(e, (this.nodeMap.get(e) || /* @__PURE__ */ new Set()).add(t));
	}
	destroy() {}
}, Q, gl, _l, vl = !1;
try {
	if (Array.from([1], (e) => e * 2)[0] !== 2) {
		let e = document.createElement("iframe");
		document.body.appendChild(e), Array.from = e.contentWindow?.Array.from || Array.from, document.body.removeChild(e);
	}
} catch (e) {
	console.debug("Unable to override Array.from", e);
}
var yl = kt();
function bl(e = {}) {
	let { emit: t, checkoutEveryNms: n, checkoutEveryNth: r, blockClass: i = "rr-block", blockSelector: a = null, ignoreClass: o = "rr-ignore", ignoreSelector: s = null, maskTextClass: c = "rr-mask", maskTextSelector: l = null, inlineStylesheet: u = !0, maskAllInputs: d, maskInputOptions: f, slimDOMOptions: p, maskInputFn: m, maskTextFn: h, hooks: g, packFn: _, sampling: v = {}, dataURLOptions: y = {}, mousemoveWait: b, recordDOM: x = !0, recordCanvas: S = !1, recordCrossOriginIframes: C = !1, recordAfter: ee = e.recordAfter === "DOMContentLoaded" ? e.recordAfter : "load", userTriggeredOnInput: w = !1, collectFonts: T = !1, inlineImages: E = !1, plugins: D, keepIframeSrcFn: O = () => !1, ignoreCSSAttributes: te = /* @__PURE__ */ new Set([]), errorHandler: ne } = e;
	bc(ne);
	let re = !C || window.parent === window, ie = !1;
	if (!re) try {
		window.parent.document && (ie = !1);
	} catch {
		ie = !0;
	}
	if (re && !t) throw Error("emit function is required");
	if (!re && !ie) return () => {};
	b !== void 0 && v.mousemove === void 0 && (v.mousemove = b), yl.reset();
	let k = d === !0 ? {
		color: !0,
		date: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0,
		textarea: !0,
		select: !0,
		password: !0
	} : f === void 0 ? { password: !0 } : f, ae = vn(p);
	Js();
	let oe, se = 0, ce = (e) => {
		for (let t of D || []) t.eventProcessor && (e = t.eventProcessor(e));
		return _ && !ie && (e = _(e)), e;
	};
	Q = (e, i) => {
		let a = e;
		if (a.timestamp = Ps(), Sc[0]?.isFrozen() && a.type !== q.FullSnapshot && (a.type !== q.IncrementalSnapshot || a.data.source !== J.Mutation) && Sc.forEach((e) => e.unfreeze()), re) t?.(ce(a), i);
		else if (ie) {
			let e = {
				type: "rrweb",
				event: ce(a),
				origin: window.location.origin,
				isCheckout: i
			};
			window.parent.postMessage(e, "*");
		}
		if (a.type === q.FullSnapshot) oe = a, se = 0;
		else if (a.type === q.IncrementalSnapshot) {
			if (a.data.source === J.Mutation && a.data.isAttachIframe) return;
			se++;
			let e = r && se >= r, t = n && a.timestamp - oe.timestamp > n;
			(e || t) && gl(!0);
		}
	};
	let le = (e) => {
		Q({
			type: q.IncrementalSnapshot,
			data: {
				source: J.Mutation,
				...e
			}
		});
	}, ue = (e) => Q({
		type: q.IncrementalSnapshot,
		data: {
			source: J.Scroll,
			...e
		}
	}), de = (e) => Q({
		type: q.IncrementalSnapshot,
		data: {
			source: J.CanvasMutation,
			...e
		}
	}), A = new ml({
		mutationCb: le,
		adoptedStyleSheetCb: (e) => Q({
			type: q.IncrementalSnapshot,
			data: {
				source: J.AdoptedStyleSheet,
				...e
			}
		})
	}), fe = new Kc({
		mirror: yl,
		mutationCb: le,
		stylesheetManager: A,
		recordCrossOriginIframes: C,
		wrappedEmit: Q
	});
	for (let e of D || []) e.getMirror && e.getMirror({
		nodeMirror: yl,
		crossOriginIframeMirror: fe.crossOriginIframeMirror,
		crossOriginIframeStyleMirror: fe.crossOriginIframeStyleMirror
	});
	let pe = new hl();
	_l = new pl({
		recordCanvas: S,
		mutationCb: de,
		win: window,
		blockClass: i,
		blockSelector: a,
		mirror: yl,
		sampling: v.canvas,
		dataURLOptions: y
	});
	let j = new qc({
		mutationCb: le,
		scrollCb: ue,
		bypassOptions: {
			blockClass: i,
			blockSelector: a,
			maskTextClass: c,
			maskTextSelector: l,
			inlineStylesheet: u,
			maskInputOptions: k,
			dataURLOptions: y,
			maskTextFn: h,
			maskInputFn: m,
			recordCanvas: S,
			inlineImages: E,
			sampling: v,
			slimDOMOptions: ae,
			iframeManager: fe,
			stylesheetManager: A,
			canvasManager: _l,
			keepIframeSrcFn: O,
			processedNodeManager: pe
		},
		mirror: yl
	});
	gl = (e = !1) => {
		if (!x) return;
		Q({
			type: q.Meta,
			data: {
				href: window.location.href,
				width: Hs(),
				height: Vs()
			}
		}, e), A.reset(), j.init(), Sc.forEach((e) => e.lock());
		let t = xn(document, {
			mirror: yl,
			blockClass: i,
			blockSelector: a,
			maskTextClass: c,
			maskTextSelector: l,
			inlineStylesheet: u,
			maskAllInputs: k,
			maskTextFn: h,
			maskInputFn: m,
			slimDOM: ae,
			dataURLOptions: y,
			recordCanvas: S,
			inlineImages: E,
			onSerialize: (e) => {
				Zs(e, yl) && fe.addIframe(e), Qs(e, yl) && A.trackLinkElement(e), ec(e) && j.addShadowRoot(W.shadowRoot(e), document);
			},
			onIframeLoad: (e, t) => {
				fe.attachIframe(e, t), j.observeAttachShadow(e);
			},
			onStylesheetLoad: (e, t) => {
				A.attachLinkElement(e, t);
			},
			keepIframeSrcFn: O
		});
		if (!t) return console.warn("Failed to snapshot the document");
		Q({
			type: q.FullSnapshot,
			data: {
				node: t,
				initialOffset: Bs(window)
			}
		}, e), Sc.forEach((e) => e.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && A.adoptStyleSheets(document.adoptedStyleSheets, yl.getId(document));
	};
	try {
		let e = [], t = (e) => Z(Hc)({
			mutationCb: le,
			mousemoveCb: (e, t) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: t,
					positions: e
				}
			}),
			mouseInteractionCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.MouseInteraction,
					...e
				}
			}),
			scrollCb: ue,
			viewportResizeCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.ViewportResize,
					...e
				}
			}),
			inputCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.Input,
					...e
				}
			}),
			mediaInteractionCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.MediaInteraction,
					...e
				}
			}),
			styleSheetRuleCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.StyleSheetRule,
					...e
				}
			}),
			styleDeclarationCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.StyleDeclaration,
					...e
				}
			}),
			canvasMutationCb: de,
			fontCb: (e) => Q({
				type: q.IncrementalSnapshot,
				data: {
					source: J.Font,
					...e
				}
			}),
			selectionCb: (e) => {
				Q({
					type: q.IncrementalSnapshot,
					data: {
						source: J.Selection,
						...e
					}
				});
			},
			customElementCb: (e) => {
				Q({
					type: q.IncrementalSnapshot,
					data: {
						source: J.CustomElement,
						...e
					}
				});
			},
			blockClass: i,
			ignoreClass: o,
			ignoreSelector: s,
			maskTextClass: c,
			maskTextSelector: l,
			maskInputOptions: k,
			inlineStylesheet: u,
			sampling: v,
			recordDOM: x,
			recordCanvas: S,
			inlineImages: E,
			userTriggeredOnInput: w,
			collectFonts: T,
			doc: e,
			maskInputFn: m,
			maskTextFn: h,
			keepIframeSrcFn: O,
			blockSelector: a,
			slimDOMOptions: ae,
			dataURLOptions: y,
			mirror: yl,
			iframeManager: fe,
			stylesheetManager: A,
			shadowDomManager: j,
			processedNodeManager: pe,
			canvasManager: _l,
			ignoreCSSAttributes: te,
			plugins: (D?.filter((e) => e.observer))?.map((e) => ({
				observer: e.observer,
				options: e.options,
				callback: (t) => Q({
					type: q.Plugin,
					data: {
						plugin: e.name,
						payload: t
					}
				})
			})) || []
		}, g);
		fe.addLoadListener((n) => {
			try {
				e.push(t(n.contentDocument));
			} catch (e) {
				console.warn(e);
			}
		});
		let n = () => {
			gl(), e.push(t(document)), vl = !0;
		};
		return ["interactive", "complete"].includes(document.readyState) ? n() : (e.push(G("DOMContentLoaded", () => {
			Q({
				type: q.DomContentLoaded,
				data: {}
			}), ee === "DOMContentLoaded" && n();
		})), e.push(G("load", () => {
			Q({
				type: q.Load,
				data: {}
			}), ee === "load" && n();
		}, window))), () => {
			e.forEach((e) => {
				try {
					e();
				} catch (e) {
					String(e).toLowerCase().includes("cross-origin") || console.warn(e);
				}
			}), pe.destroy(), vl = !1, xc();
		};
	} catch (e) {
		console.warn(e);
	}
}
bl.addCustomEvent = (e, t) => {
	if (!vl) throw Error("please add custom event after start recording");
	Q({
		type: q.Custom,
		data: {
			tag: e,
			payload: t
		}
	});
}, bl.freezePage = () => {
	Sc.forEach((e) => e.freeze());
}, bl.takeFullSnapshot = (e) => {
	if (!vl) throw Error("please take full snapshot after start recording");
	gl(e);
}, bl.mirror = yl;
function xl(e) {
	return {
		all: e ||= /* @__PURE__ */ new Map(),
		on: function(t, n) {
			var r = e.get(t);
			r ? r.push(n) : e.set(t, [n]);
		},
		off: function(t, n) {
			var r = e.get(t);
			r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : e.set(t, []));
		},
		emit: function(t, n) {
			var r = e.get(t);
			r && r.slice().map(function(e) {
				e(n);
			}), (r = e.get("*")) && r.slice().map(function(e) {
				e(t, n);
			});
		}
	};
}
function Sl(e = window, t = document) {
	if ("scrollBehavior" in t.documentElement.style && e.__forceSmoothScrollPolyfill__ !== !0) return;
	let n = e.HTMLElement || e.Element, r = {
		scroll: e.scroll || e.scrollTo,
		scrollBy: e.scrollBy,
		elementScroll: n.prototype.scroll || s,
		scrollIntoView: n.prototype.scrollIntoView
	}, i = e.performance && e.performance.now ? e.performance.now.bind(e.performance) : Date.now;
	function a(e) {
		return new RegExp([
			"MSIE ",
			"Trident/",
			"Edge/"
		].join("|")).test(e);
	}
	let o = +!!a(e.navigator.userAgent);
	function s(e, t) {
		this.scrollLeft = e, this.scrollTop = t;
	}
	function c(e) {
		return .5 * (1 - Math.cos(Math.PI * e));
	}
	function l(e) {
		if (typeof e != "object" || !e || e.behavior === void 0 || e.behavior === "auto" || e.behavior === "instant") return !0;
		if (typeof e == "object" && e.behavior === "smooth") return !1;
		throw TypeError("behavior member of ScrollOptions " + e.behavior + " is not a valid value for enumeration ScrollBehavior.");
	}
	function u(e, t) {
		if (t === "Y") return e.clientHeight + o < e.scrollHeight;
		if (t === "X") return e.clientWidth + o < e.scrollWidth;
	}
	function d(t, n) {
		let r = e.getComputedStyle(t, null)["overflow" + n];
		return r === "auto" || r === "scroll";
	}
	function f(e) {
		let t = u(e, "Y") && d(e, "Y"), n = u(e, "X") && d(e, "X");
		return t || n;
	}
	function p(e) {
		for (; e !== t.body && f(e) === !1;) e = e.parentNode || e.host;
		return e;
	}
	function m(t) {
		let n = i(), r, a, o, s = (n - t.startTime) / 468;
		s = s > 1 ? 1 : s, r = c(s), a = t.startX + (t.x - t.startX) * r, o = t.startY + (t.y - t.startY) * r, t.method.call(t.scrollable, a, o), (a !== t.x || o !== t.y) && e.requestAnimationFrame(m.bind(e, t));
	}
	function h(n, a, o) {
		let c, l, u, d, f = i();
		n === t.body ? (c = e, l = e.scrollX || e.pageXOffset, u = e.scrollY || e.pageYOffset, d = r.scroll) : (c = n, l = n.scrollLeft, u = n.scrollTop, d = s), m({
			scrollable: c,
			method: d,
			startTime: f,
			startX: l,
			startY: u,
			x: a,
			y: o
		});
	}
	e.scroll = e.scrollTo = function() {
		if (arguments[0] !== void 0) {
			if (l(arguments[0]) === !0) {
				r.scroll.call(e, arguments[0].left === void 0 ? typeof arguments[0] == "object" ? e.scrollX || e.pageXOffset : arguments[0] : arguments[0].left, arguments[0].top === void 0 ? arguments[1] === void 0 ? e.scrollY || e.pageYOffset : arguments[1] : arguments[0].top);
				return;
			}
			h.call(e, t.body, arguments[0].left === void 0 ? e.scrollX || e.pageXOffset : ~~arguments[0].left, arguments[0].top === void 0 ? e.scrollY || e.pageYOffset : ~~arguments[0].top);
		}
	}, e.scrollBy = function() {
		if (arguments[0] !== void 0) {
			if (l(arguments[0])) {
				r.scrollBy.call(e, arguments[0].left === void 0 ? typeof arguments[0] == "object" ? 0 : arguments[0] : arguments[0].left, arguments[0].top === void 0 ? arguments[1] === void 0 ? 0 : arguments[1] : arguments[0].top);
				return;
			}
			h.call(e, t.body, ~~arguments[0].left + (e.scrollX || e.pageXOffset), ~~arguments[0].top + (e.scrollY || e.pageYOffset));
		}
	}, n.prototype.scroll = n.prototype.scrollTo = function() {
		if (arguments[0] === void 0) return;
		if (l(arguments[0]) === !0) {
			if (typeof arguments[0] == "number" && arguments[1] === void 0) throw SyntaxError("Value could not be converted");
			r.elementScroll.call(this, arguments[0].left === void 0 ? typeof arguments[0] == "object" ? this.scrollLeft : ~~arguments[0] : ~~arguments[0].left, arguments[0].top === void 0 ? arguments[1] === void 0 ? this.scrollTop : ~~arguments[1] : ~~arguments[0].top);
			return;
		}
		let e = arguments[0].left, t = arguments[0].top;
		h.call(this, this, e === void 0 ? this.scrollLeft : ~~e, t === void 0 ? this.scrollTop : ~~t);
	}, n.prototype.scrollBy = function() {
		if (arguments[0] !== void 0) {
			if (l(arguments[0]) === !0) {
				r.elementScroll.call(this, arguments[0].left === void 0 ? ~~arguments[0] + this.scrollLeft : ~~arguments[0].left + this.scrollLeft, arguments[0].top === void 0 ? ~~arguments[1] + this.scrollTop : ~~arguments[0].top + this.scrollTop);
				return;
			}
			this.scroll({
				left: ~~arguments[0].left + this.scrollLeft,
				top: ~~arguments[0].top + this.scrollTop,
				behavior: arguments[0].behavior
			});
		}
	}, n.prototype.scrollIntoView = function() {
		if (l(arguments[0]) === !0) {
			r.scrollIntoView.call(this, arguments[0] === void 0 || arguments[0]);
			return;
		}
		let n = p(this), i = n.getBoundingClientRect(), a = this.getBoundingClientRect();
		n === t.body ? e.scrollBy({
			left: a.left,
			top: a.top,
			behavior: "smooth"
		}) : (h.call(this, n, n.scrollLeft + a.left - i.left, n.scrollTop + a.top - i.top), e.getComputedStyle(n).position !== "fixed" && e.scrollBy({
			left: i.left,
			top: i.top,
			behavior: "smooth"
		}));
	};
}
var Cl = class {
	constructor(e = [], t) {
		N(this, "timeOffset", 0), N(this, "speed"), N(this, "actions"), N(this, "raf", null), N(this, "lastTimestamp"), this.actions = e, this.speed = t.speed;
	}
	addAction(e) {
		let t = this.raf === !0;
		if (!this.actions.length || this.actions[this.actions.length - 1].delay <= e.delay) this.actions.push(e);
		else {
			let t = this.findActionIndex(e);
			this.actions.splice(t, 0, e);
		}
		t && (this.raf = requestAnimationFrame(this.rafCheck.bind(this)));
	}
	start() {
		this.timeOffset = 0, this.lastTimestamp = performance.now(), this.raf = requestAnimationFrame(this.rafCheck.bind(this));
	}
	updateLiveTime() {
		this.raf === !0 && this.rafCheck();
	}
	rafCheck() {
		let e = performance.now();
		for (this.timeOffset += (e - this.lastTimestamp) * this.speed, this.lastTimestamp = e; this.actions.length;) {
			let e = this.actions[0];
			if (this.timeOffset >= e.delay) this.actions.shift(), e.doAction();
			else break;
		}
		this.raf = this.actions.length > 0 ? requestAnimationFrame(this.rafCheck.bind(this)) : !0;
	}
	clear() {
		this.raf &&= (this.raf !== !0 && cancelAnimationFrame(this.raf), null), this.actions.length = 0;
	}
	setSpeed(e) {
		this.speed = e;
	}
	isActive() {
		return this.raf !== null;
	}
	findActionIndex(e) {
		let t = 0, n = this.actions.length - 1;
		for (; t <= n;) {
			let r = Math.floor((t + n) / 2);
			if (this.actions[r].delay < e.delay) t = r + 1;
			else if (this.actions[r].delay > e.delay) n = r - 1;
			else return r + 1;
		}
		return t;
	}
};
function wl(e, t) {
	if (e.type === q.IncrementalSnapshot && e.data.source === J.MouseMove && e.data.positions && e.data.positions.length) {
		let n = e.data.positions[0].timeOffset, r = e.timestamp + n;
		return e.delay = r - t, r - t;
	}
	return e.delay = e.timestamp - t, e.delay;
}
function Tl(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r, i, a = n.call(e), o = [];
	try {
		for (; (t === void 0 || t-- > 0) && !(r = a.next()).done;) o.push(r.value);
	} catch (e) {
		i = { error: e };
	} finally {
		try {
			r && !r.done && (n = a.return) && n.call(a);
		} finally {
			if (i) throw i.error;
		}
	}
	return o;
}
var El;
(function(e) {
	e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped";
})(El ||= {});
var Dl = { type: "xstate.init" };
function Ol(e) {
	return e === void 0 ? [] : [].concat(e);
}
function kl(e) {
	return {
		type: "xstate.assign",
		assignment: e
	};
}
function Al(e, t) {
	return typeof (e = typeof e == "string" && t && t[e] ? t[e] : e) == "string" ? { type: e } : typeof e == "function" ? {
		type: e.name,
		exec: e
	} : e;
}
function jl(e) {
	return function(t) {
		return e === t;
	};
}
function Ml(e) {
	return typeof e == "string" ? { type: e } : e;
}
function Nl(e, t) {
	return {
		value: e,
		context: t,
		actions: [],
		changed: !1,
		matches: jl(e)
	};
}
function Pl(e, t, n) {
	var r = t, i = !1;
	return [
		e.filter(function(e) {
			if (e.type === "xstate.assign") {
				i = !0;
				var t = Object.assign({}, r);
				return typeof e.assignment == "function" ? t = e.assignment(r, n) : Object.keys(e.assignment).forEach(function(i) {
					t[i] = typeof e.assignment[i] == "function" ? e.assignment[i](r, n) : e.assignment[i];
				}), r = t, !1;
			}
			return !0;
		}),
		r,
		i
	];
}
function Fl(e, t) {
	t === void 0 && (t = {});
	var n = Tl(Pl(Ol(e.states[e.initial].entry).map(function(e) {
		return Al(e, t.actions);
	}), e.context, Dl), 2), r = n[0], i = n[1], a = {
		config: e,
		_options: t,
		initialState: {
			value: e.initial,
			actions: r,
			context: i,
			matches: jl(e.initial)
		},
		transition: function(t, n) {
			var r, i, o = typeof t == "string" ? {
				value: t,
				context: e.context
			} : t, s = o.value, c = o.context, l = Ml(n), u = e.states[s];
			if (u.on) {
				var d = Ol(u.on[l.type]);
				try {
					for (var f = function(e) {
						var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
						if (n) return n.call(e);
						if (e && typeof e.length == "number") return { next: function() {
							return e && r >= e.length && (e = void 0), {
								value: e && e[r++],
								done: !e
							};
						} };
						throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
					}(d), p = f.next(); !p.done; p = f.next()) {
						var m = p.value;
						if (m === void 0) return Nl(s, c);
						var h = typeof m == "string" ? { target: m } : m, g = h.target, _ = h.actions, v = _ === void 0 ? [] : _, y = h.cond, b = y === void 0 ? function() {
							return !0;
						} : y, x = g === void 0, S = g ?? s, C = e.states[S];
						if (b(c, l)) {
							var ee = Tl(Pl((x ? Ol(v) : [].concat(u.exit, v, C.entry).filter(function(e) {
								return e;
							})).map(function(e) {
								return Al(e, a._options.actions);
							}), c, l), 3), w = ee[0], T = ee[1], E = ee[2], D = g ?? s;
							return {
								value: D,
								context: T,
								actions: w,
								changed: g !== s || w.length > 0 || E,
								matches: jl(D)
							};
						}
					}
				} catch (e) {
					r = { error: e };
				} finally {
					try {
						p && !p.done && (i = f.return) && i.call(f);
					} finally {
						if (r) throw r.error;
					}
				}
			}
			return Nl(s, c);
		}
	};
	return a;
}
var Il = function(e, t) {
	return e.actions.forEach(function(n) {
		var r = n.exec;
		return r && r(e.context, t);
	});
};
function Ll(e) {
	var t = e.initialState, n = El.NotStarted, r = /* @__PURE__ */ new Set(), i = {
		_machine: e,
		send: function(i) {
			n === El.Running && (t = e.transition(t, i), Il(t, Ml(i)), r.forEach(function(e) {
				return e(t);
			}));
		},
		subscribe: function(e) {
			return r.add(e), e(t), { unsubscribe: function() {
				return r.delete(e);
			} };
		},
		start: function(r) {
			if (r) {
				var a = typeof r == "object" ? r : {
					context: e.config.context,
					value: r
				};
				t = {
					value: a.value,
					actions: [],
					context: a.context,
					matches: jl(a.value)
				};
			}
			return n = El.Running, Il(t, Dl), i;
		},
		stop: function() {
			return n = El.Stopped, r.clear(), i;
		},
		get state() {
			return t;
		},
		get status() {
			return n;
		}
	};
	return i;
}
function Rl(e, t) {
	for (let n = e.length - 1; n >= 0; n--) {
		let r = e[n];
		if (r.type === q.Meta && r.timestamp <= t) return e.slice(n);
	}
	return e;
}
function zl(e, { getCastFn: t, applyEventsSynchronously: n, emitter: r }) {
	return Ll(Fl({
		id: "player",
		context: e,
		initial: "paused",
		states: {
			playing: { on: {
				PAUSE: {
					target: "paused",
					actions: ["pause"]
				},
				CAST_EVENT: {
					target: "playing",
					actions: "castEvent"
				},
				END: {
					target: "paused",
					actions: ["resetLastPlayedEvent", "pause"]
				},
				ADD_EVENT: {
					target: "playing",
					actions: ["addEvent"]
				}
			} },
			paused: { on: {
				PLAY: {
					target: "playing",
					actions: ["recordTimeOffset", "play"]
				},
				CAST_EVENT: {
					target: "paused",
					actions: "castEvent"
				},
				TO_LIVE: {
					target: "live",
					actions: ["startLive"]
				},
				ADD_EVENT: {
					target: "paused",
					actions: ["addEvent"]
				}
			} },
			live: { on: {
				ADD_EVENT: {
					target: "live",
					actions: ["addEvent"]
				},
				CAST_EVENT: {
					target: "live",
					actions: ["castEvent"]
				}
			} }
		}
	}, { actions: {
		castEvent: kl({ lastPlayedEvent: (e, t) => t.type === "CAST_EVENT" ? t.payload.event : e.lastPlayedEvent }),
		recordTimeOffset: kl((e, t) => {
			let n = e.timeOffset;
			return "payload" in t && "timeOffset" in t.payload && (n = t.payload.timeOffset), {
				...e,
				timeOffset: n,
				baselineTime: e.events[0].timestamp + n
			};
		}),
		play(e) {
			let { timer: i, events: a, baselineTime: o, lastPlayedEvent: s } = e;
			i.clear();
			for (let e of a) wl(e, o);
			let c = Rl(a, o), l = s?.timestamp;
			s?.type === q.IncrementalSnapshot && s.data.source === J.MouseMove && (l = s.timestamp + s.data.positions[0]?.timeOffset), o < (l || 0) && r.emit(X.PlayBack);
			let u = [];
			for (let e of c) if (!(l && l < o && (e.timestamp <= l || e === s))) {
				if (e.timestamp < o) u.push(e);
				else {
					let n = t(e, !1);
					i.addAction({
						doAction: () => {
							n();
						},
						delay: e.delay
					});
				}
			}
			n(u), r.emit(X.Flush), i.start();
		},
		pause(e) {
			e.timer.clear();
		},
		resetLastPlayedEvent: kl((e) => ({
			...e,
			lastPlayedEvent: null
		})),
		startLive: kl({ baselineTime: (e, t) => (e.timer.start(), t.type === "TO_LIVE" && t.payload.baselineTime ? t.payload.baselineTime : Date.now()) }),
		addEvent: kl((e, n) => {
			let { baselineTime: r, timer: i, events: a } = e;
			if (n.type === "ADD_EVENT") {
				let { event: e } = n.payload;
				wl(e, r);
				let o = a.length - 1;
				if (!a[o] || a[o].timestamp <= e.timestamp) a.push(e);
				else {
					let t = -1, n = 0;
					for (; n <= o;) {
						let t = Math.floor((n + o) / 2);
						a[t].timestamp <= e.timestamp ? n = t + 1 : o = t - 1;
					}
					t === -1 && (t = n), a.splice(t, 0, e);
				}
				let s = e.timestamp < r, c = t(e, s);
				s ? c() : i.isActive() && i.addAction({
					doAction: () => {
						c();
					},
					delay: e.delay
				});
			}
			return {
				...e,
				events: a
			};
		})
	} }));
}
function Bl(e) {
	return Ll(Fl({
		id: "speed",
		context: e,
		initial: "normal",
		states: {
			normal: { on: {
				FAST_FORWARD: {
					target: "skipping",
					actions: ["recordSpeed", "setSpeed"]
				},
				SET_SPEED: {
					target: "normal",
					actions: ["setSpeed"]
				}
			} },
			skipping: { on: {
				BACK_TO_NORMAL: {
					target: "normal",
					actions: ["restoreSpeed"]
				},
				SET_SPEED: {
					target: "normal",
					actions: ["setSpeed"]
				}
			} }
		}
	}, { actions: {
		setSpeed: (e, t) => {
			"payload" in t && e.timer.setSpeed(t.payload.speed);
		},
		recordSpeed: kl({ normalSpeed: (e) => e.timer.speed }),
		restoreSpeed: (e) => {
			e.timer.setSpeed(e.normalSpeed);
		}
	} }));
}
var Vl = (e) => [`.${e} { background: currentColor }`, "noscript { display: none !important; }"], Hl = /* @__PURE__ */ new Map();
function Ul(e, t) {
	let n = Hl.get(e);
	return n || (n = /* @__PURE__ */ new Map(), Hl.set(e, n)), n.has(t) || n.set(t, []), n.get(t);
}
function Wl(e, t, n) {
	return async (r) => {
		if (r && typeof r == "object" && "rr_type" in r) {
			if (n && (n.isUnchanged = !1), r.rr_type === "ImageBitmap" && "args" in r) {
				let i = await Wl(e, t, n)(r.args);
				return await createImageBitmap.apply(null, i);
			}
			if ("index" in r) {
				if (n || t === null) return r;
				let { rr_type: e, index: i } = r;
				return Ul(t, e)[i];
			}
			if ("args" in r) {
				let { rr_type: i, args: a } = r, o = window[i];
				return new o(...await Promise.all(a.map(Wl(e, t, n))));
			}
			if ("base64" in r) return Qc(r.base64);
			if ("src" in r) {
				let t = e.get(r.src);
				if (t) return t;
				{
					let t = new Image();
					return t.src = r.src, e.set(r.src, t), t;
				}
			}
			if ("data" in r && r.rr_type === "Blob") {
				let i = await Promise.all(r.data.map(Wl(e, t, n)));
				return new Blob(i, { type: r.type });
			}
		} else if (Array.isArray(r)) return await Promise.all(r.map(Wl(e, t, n)));
		return r;
	};
}
function Gl(e, t) {
	try {
		return t === uc.WebGL ? e.getContext("webgl") || e.getContext("experimental-webgl") : e.getContext("webgl2");
	} catch {
		return null;
	}
}
var Kl = [
	"WebGLActiveInfo",
	"WebGLBuffer",
	"WebGLFramebuffer",
	"WebGLProgram",
	"WebGLRenderbuffer",
	"WebGLShader",
	"WebGLShaderPrecisionFormat",
	"WebGLTexture",
	"WebGLUniformLocation",
	"WebGLVertexArrayObject"
];
function ql(e, t) {
	if (!t?.constructor) return;
	let { name: n } = t.constructor;
	if (!Kl.includes(n)) return;
	let r = Ul(e, n);
	r.includes(t) || r.push(t);
}
async function Jl({ mutation: e, target: t, type: n, imageMap: r, errorHandler: i }) {
	try {
		let i = Gl(t, n);
		if (!i) return;
		if (e.setter) {
			i[e.property] = e.args[0];
			return;
		}
		let a = i[e.property], o = await Promise.all(e.args.map(Wl(r, i)));
		ql(i, a.apply(i, o));
	} catch (t) {
		i(e, t);
	}
}
async function Yl({ event: e, mutations: t, target: n, imageMap: r, errorHandler: i }) {
	let a = n.getContext("2d");
	if (!a) {
		i(t[0], /* @__PURE__ */ Error("Canvas context is null"));
		return;
	}
	let o = t.map(async (e) => Promise.all(e.args.map(Wl(r, a))));
	(await Promise.all(o)).forEach((n, o) => {
		let s = t[o];
		try {
			if (s.setter) {
				a[s.property] = s.args[0];
				return;
			}
			let t = a[s.property];
			s.property === "drawImage" && typeof s.args[0] == "string" ? (r.get(e), t.apply(a, s.args)) : t.apply(a, n);
		} catch (e) {
			i(s, e);
		}
	});
}
async function Xl({ event: e, mutation: t, target: n, imageMap: r, canvasEventMap: i, errorHandler: a }) {
	try {
		let o = i.get(e) || t, s = "commands" in o ? o.commands : [o];
		if ([uc.WebGL, uc.WebGL2].includes(t.type)) {
			for (let e = 0; e < s.length; e++) {
				let i = s[e];
				await Jl({
					mutation: i,
					type: t.type,
					target: n,
					imageMap: r,
					errorHandler: a
				});
			}
			return;
		}
		await Yl({
			event: e,
			mutations: s,
			target: n,
			imageMap: r,
			errorHandler: a
		});
	} catch (e) {
		a(t, e);
	}
}
var Zl = class {
	constructor(e) {
		N(this, "mediaMap", /* @__PURE__ */ new Map()), N(this, "warn"), N(this, "service"), N(this, "speedService"), N(this, "emitter"), N(this, "getCurrentTime"), N(this, "metadataCallbackMap", /* @__PURE__ */ new Map()), this.warn = e.warn, this.service = e.service, this.speedService = e.speedService, this.emitter = e.emitter, this.getCurrentTime = e.getCurrentTime, this.emitter.on(X.Start, this.start.bind(this)), this.emitter.on(X.SkipStart, this.start.bind(this)), this.emitter.on(X.Pause, this.pause.bind(this)), this.emitter.on(X.Finish, this.pause.bind(this)), this.speedService.subscribe(() => {
			this.syncAllMediaElements();
		});
	}
	syncAllMediaElements(e = { pause: !1 }) {
		this.mediaMap.forEach((t, n) => {
			this.syncTargetWithState(n), e.pause && n.pause();
		});
	}
	start() {
		this.syncAllMediaElements();
	}
	pause() {
		this.syncAllMediaElements({ pause: !0 });
	}
	seekTo({ time: e, target: t, mediaState: n }) {
		if (n.isPlaying) {
			let r = (e - n.lastInteractionTimeOffset) / 1e3 * n.playbackRate, i = "duration" in t && t.duration;
			if (Number.isNaN(i)) {
				this.waitForMetadata(t);
				return;
			}
			let a = n.currentTimeAtLastInteraction + r;
			t.loop && i !== !1 && (a %= i), t.currentTime = a;
		} else t.pause(), t.currentTime = n.currentTimeAtLastInteraction;
	}
	waitForMetadata(e) {
		if (this.metadataCallbackMap.has(e) || !("addEventListener" in e)) return;
		let t = () => {
			this.metadataCallbackMap.delete(e);
			let t = this.mediaMap.get(e);
			t && this.seekTo({
				time: this.getCurrentTime(),
				target: e,
				mediaState: t
			});
		};
		this.metadataCallbackMap.set(e, t), e.addEventListener("loadedmetadata", t, { once: !0 });
	}
	getMediaStateFromMutation({ target: e, timeOffset: t, mutation: n }) {
		let r = this.mediaMap.get(e), { type: i, playbackRate: a, currentTime: o, muted: s, volume: c, loop: l } = n;
		return {
			isPlaying: i === dc.Play || i !== dc.Pause && (r?.isPlaying || e.getAttribute("autoplay") !== null),
			currentTimeAtLastInteraction: o ?? r?.currentTimeAtLastInteraction ?? 0,
			lastInteractionTimeOffset: t,
			playbackRate: a ?? r?.playbackRate ?? 1,
			volume: c ?? r?.volume ?? 1,
			muted: s ?? r?.muted ?? e.getAttribute("muted") === null,
			loop: l ?? r?.loop ?? e.getAttribute("loop") === null
		};
	}
	syncTargetWithState(e) {
		let t = this.mediaMap.get(e);
		if (!t) return;
		let { muted: n, loop: r, volume: i, isPlaying: a } = t, o = this.service.state.matches("paused"), s = t.playbackRate * this.speedService.state.context.timer.speed;
		try {
			this.seekTo({
				time: this.getCurrentTime(),
				target: e,
				mediaState: t
			}), e.volume !== i && (e.volume = i), e.muted = n, e.loop = r, e.playbackRate !== s && (e.playbackRate = s), a && !o ? e.play() : e.pause();
		} catch (e) {
			this.warn(`Failed to replay media interactions: ${e.message || e}`);
		}
	}
	addMediaElements(e, t, n) {
		if (!["AUDIO", "VIDEO"].includes(e.nodeName)) return;
		let r = e, i = n.getMeta(r);
		if (!i || !("attributes" in i)) return;
		let a = this.service.state.matches("paused"), o = i.attributes, s = !1;
		s = o.rr_mediaState ? o.rr_mediaState === "played" : r.getAttribute("autoplay") !== null, s && a && r.pause();
		let c = 1;
		typeof o.rr_mediaPlaybackRate == "number" && (c = o.rr_mediaPlaybackRate);
		let l = !1;
		l = typeof o.rr_mediaMuted == "boolean" ? o.rr_mediaMuted : r.getAttribute("muted") !== null;
		let u = !1;
		u = typeof o.rr_mediaLoop == "boolean" ? o.rr_mediaLoop : r.getAttribute("loop") !== null;
		let d = 1;
		typeof o.rr_mediaVolume == "number" && (d = o.rr_mediaVolume);
		let f = 0;
		typeof o.rr_mediaCurrentTime == "number" && (f = o.rr_mediaCurrentTime), this.mediaMap.set(r, {
			isPlaying: s,
			currentTimeAtLastInteraction: f,
			lastInteractionTimeOffset: t,
			playbackRate: c,
			volume: d,
			muted: l,
			loop: u
		}), this.syncTargetWithState(r);
	}
	mediaMutation({ target: e, timeOffset: t, mutation: n }) {
		this.mediaMap.set(e, this.getMediaStateFromMutation({
			target: e,
			timeOffset: t,
			mutation: n
		})), this.syncTargetWithState(e);
	}
	isSupportedMediaElement(e) {
		return ["AUDIO", "VIDEO"].includes(e.nodeName);
	}
	reset() {
		this.mediaMap.clear();
	}
};
function Ql(e, t) {
	if (e.nodeName !== "DIALOG" || e instanceof xo) return;
	let n = e, r = n.open, i = r && n.matches("dialog:modal"), a = n.getAttribute("rr_open_mode"), o = typeof t?.attributes.open == "string" || typeof n.getAttribute("open") == "string", s = a === "modal";
	if (!r || i && a === "non-modal" || !i && s) {
		if (!n.isConnected) {
			console.warn("dialog is not attached to the dom", n);
			return;
		}
		r && n.close(), o && (s ? n.showModal() : n.show());
	}
}
function $l(e, t) {
	if (e.nodeName !== "DIALOG" || e instanceof xo) return;
	let n = e;
	if (!n.isConnected) {
		console.warn("dialog is not attached to the dom", n);
		return;
	}
	t.attributes.open === null && (n.removeAttribute("open"), n.removeAttribute("rr_open_mode"));
}
var eu = 5e3, tu = xl, nu = "[replayer]", ru = {
	duration: 500,
	lineCap: "round",
	lineWidth: 3,
	strokeStyle: "red"
};
function iu(e) {
	return e.type == q.IncrementalSnapshot && (e.data.source == J.TouchMove || e.data.source == J.MouseInteraction && e.data.type == Y.TouchStart);
}
var au = class {
	constructor(e, t) {
		if (N(this, "wrapper"), N(this, "iframe"), N(this, "UNSAFE_replayCanvas", !1), N(this, "service"), N(this, "speedService"), N(this, "config"), N(this, "usingVirtualDom", !1), N(this, "virtualDom", new Go()), N(this, "mouse"), N(this, "mouseTail", null), N(this, "tailPositions", []), N(this, "emitter", tu()), N(this, "nextUserInteractionEvent"), N(this, "legacy_missingNodeRetryMap", {}), N(this, "cache", ui()), N(this, "imageMap", /* @__PURE__ */ new Map()), N(this, "canvasEventMap", /* @__PURE__ */ new Map()), N(this, "mirror", kt()), N(this, "styleMirror", new ic()), N(this, "mediaManager"), N(this, "firstFullSnapshot", null), N(this, "newDocumentQueue", []), N(this, "mousePos", null), N(this, "touchActive", null), N(this, "lastMouseDownEvent", null), N(this, "lastHoveredRootNode"), N(this, "lastSelectionData", null), N(this, "constructedStyleMutations", []), N(this, "adoptedStyleSheets", []), N(this, "handleResize", (e) => {
			this.iframe.style.display = "inherit";
			for (let t of [this.mouseTail, this.iframe]) t && (t.setAttribute("width", String(e.width)), t.setAttribute("height", String(e.height)));
		}), N(this, "applyEventsSynchronously", (e) => {
			for (let t of e) {
				switch (t.type) {
					case q.DomContentLoaded:
					case q.Load: continue;
					case q.FullSnapshot:
					case q.Meta:
					case q.Plugin:
					case q.IncrementalSnapshot:
				}
				this.getCastFn(t, !0)();
			}
		}), N(this, "getCastFn", (e, t = !1) => {
			let n;
			switch (e.type) {
				case q.DomContentLoaded:
				case q.Load: break;
				case q.Custom:
					n = () => {
						this.emitter.emit(X.CustomEvent, e);
					};
					break;
				case q.Meta:
					n = () => this.emitter.emit(X.Resize, {
						width: e.data.width,
						height: e.data.height
					});
					break;
				case q.FullSnapshot:
					n = () => {
						var n;
						if (this.firstFullSnapshot) {
							if (this.firstFullSnapshot === e) {
								this.firstFullSnapshot = !0;
								return;
							}
						} else this.firstFullSnapshot = !0;
						this.mediaManager.reset(), this.styleMirror.reset(), this.rebuildFullSnapshot(e, t), (n = this.iframe.contentWindow) == null || n.scrollTo(e.data.initialOffset);
					};
					break;
				case q.IncrementalSnapshot: n = () => {
					if (this.applyIncremental(e, t), !t && (e === this.nextUserInteractionEvent && (this.nextUserInteractionEvent = null, this.backToNormal()), this.config.skipInactive && !this.nextUserInteractionEvent)) {
						for (let t of this.service.state.context.events) if (!(t.timestamp <= e.timestamp) && this.isUserInteraction(t)) {
							t.delay - e.delay > this.config.inactivePeriodThreshold * this.speedService.state.context.timer.speed && (this.nextUserInteractionEvent = t);
							break;
						}
						if (this.nextUserInteractionEvent) {
							let t = this.nextUserInteractionEvent.delay - e.delay, n = { speed: Math.min(Math.round(t / eu), this.config.maxSpeed) };
							this.speedService.send({
								type: "FAST_FORWARD",
								payload: n
							}), this.emitter.emit(X.SkipStart, n);
						}
					}
				};
			}
			return () => {
				n && n();
				for (let n of this.config.plugins || []) n.handler && n.handler(e, t, { replayer: this });
				this.service.send({
					type: "CAST_EVENT",
					payload: { event: e }
				});
				let r = this.service.state.context.events.length - 1;
				if (!this.config.liveMode && e === this.service.state.context.events[r]) {
					let t = () => {
						r < this.service.state.context.events.length - 1 || (this.backToNormal(), this.service.send("END"), this.emitter.emit(X.Finish));
					}, n = 50;
					e.type === q.IncrementalSnapshot && e.data.source === J.MouseMove && e.data.positions.length && (n += Math.max(0, -e.data.positions[0].timeOffset)), setTimeout(t, n);
				}
				this.emitter.emit(X.EventCast, e);
			};
		}), !t?.liveMode && e.length < 2) throw Error("Replayer need at least 2 events.");
		let n = {
			speed: 1,
			maxSpeed: 360,
			root: document.body,
			loadTimeout: 0,
			skipInactive: !1,
			inactivePeriodThreshold: 1e4,
			showWarning: !0,
			showDebug: !1,
			blockClass: "rr-block",
			liveMode: !1,
			insertStyleRules: [],
			triggerFocus: !0,
			UNSAFE_replayCanvas: !1,
			pauseAnimation: !0,
			mouseTail: ru,
			useVirtualDom: !0,
			logger: console
		};
		this.config = Object.assign({}, n, t), this.handleResize = this.handleResize.bind(this), this.getCastFn = this.getCastFn.bind(this), this.applyEventsSynchronously = this.applyEventsSynchronously.bind(this), this.emitter.on(X.Resize, this.handleResize), this.setupDom();
		for (let e of this.config.plugins || []) e.getMirror && e.getMirror({ nodeMirror: this.mirror });
		this.emitter.on(X.Flush, () => {
			if (this.usingVirtualDom) {
				let e = {
					mirror: this.mirror,
					applyCanvas: (e, t, n) => {
						Xl({
							event: e,
							mutation: t,
							target: n,
							imageMap: this.imageMap,
							canvasEventMap: this.canvasEventMap,
							errorHandler: this.warnCanvasMutationFailed.bind(this)
						});
					},
					applyInput: this.applyInput.bind(this),
					applyScroll: this.applyScroll.bind(this),
					applyStyleSheetMutation: (e, t) => {
						e.source === J.StyleSheetRule ? this.applyStyleSheetRule(e, t) : e.source === J.StyleDeclaration && this.applyStyleDeclaration(e, t);
					},
					afterAppend: (e, t) => {
						for (let n of this.config.plugins || []) n.onBuild && n.onBuild(e, {
							id: t,
							replayer: this
						});
					}
				};
				if (this.iframe.contentDocument) try {
					Lo(this.iframe.contentDocument, this.virtualDom, e, this.virtualDom.mirror);
				} catch (e) {
					this.warn(e);
				}
				if (this.virtualDom.destroyTree(), this.usingVirtualDom = !1, Object.keys(this.legacy_missingNodeRetryMap).length) for (let t in this.legacy_missingNodeRetryMap) try {
					let n = this.legacy_missingNodeRetryMap[t], r = Ho(n.node, this.mirror, this.virtualDom.mirror);
					Lo(r, n.node, e, this.virtualDom.mirror), n.node = r;
				} catch (e) {
					this.warn(e);
				}
				this.constructedStyleMutations.forEach((e) => {
					this.applyStyleSheetMutation(e);
				}), this.constructedStyleMutations = [], this.adoptedStyleSheets.forEach((e) => {
					this.applyAdoptedStyleSheet(e);
				}), this.adoptedStyleSheets = [];
			}
			if (this.mousePos &&= (this.moveAndHover(this.mousePos.x, this.mousePos.y, this.mousePos.id, !0, this.mousePos.debugData), null), this.touchActive === !0 ? this.mouse.classList.add("touch-active") : this.touchActive === !1 && this.mouse.classList.remove("touch-active"), this.touchActive = null, this.lastMouseDownEvent) {
				let [e, t] = this.lastMouseDownEvent;
				e.dispatchEvent(t);
			}
			this.lastMouseDownEvent = null, this.lastSelectionData &&= (this.applySelection(this.lastSelectionData), null);
		}), this.emitter.on(X.PlayBack, () => {
			this.firstFullSnapshot = null, this.mirror.reset(), this.styleMirror.reset(), this.mediaManager.reset();
		});
		let r = new Cl([], { speed: this.config.speed });
		this.service = zl({
			events: e.map((e) => t && t.unpackFn ? t.unpackFn(e) : e).sort((e, t) => e.timestamp - t.timestamp),
			timer: r,
			timeOffset: 0,
			baselineTime: 0,
			lastPlayedEvent: null
		}, {
			getCastFn: this.getCastFn,
			applyEventsSynchronously: this.applyEventsSynchronously,
			emitter: this.emitter
		}), this.service.start(), this.service.subscribe((e) => {
			this.emitter.emit(X.StateChange, { player: e });
		}), this.speedService = Bl({
			normalSpeed: -1,
			timer: r
		}), this.speedService.start(), this.speedService.subscribe((e) => {
			this.emitter.emit(X.StateChange, { speed: e });
		}), this.mediaManager = new Zl({
			warn: this.warn.bind(this),
			service: this.service,
			speedService: this.speedService,
			emitter: this.emitter,
			getCurrentTime: this.getCurrentTime.bind(this)
		});
		let i = this.service.state.context.events.find((e) => e.type === q.Meta), a = this.service.state.context.events.find((e) => e.type === q.FullSnapshot);
		if (i) {
			let { width: e, height: t } = i.data;
			setTimeout(() => {
				this.emitter.emit(X.Resize, {
					width: e,
					height: t
				});
			}, 0);
		}
		a && setTimeout(() => {
			var e;
			this.firstFullSnapshot || (this.firstFullSnapshot = a, this.rebuildFullSnapshot(a), (e = this.iframe.contentWindow) == null || e.scrollTo(a.data.initialOffset));
		}, 1), this.service.state.context.events.find(iu) && this.mouse.classList.add("touch-device");
	}
	get timer() {
		return this.service.state.context.timer;
	}
	on(e, t) {
		return this.emitter.on(e, t), this;
	}
	off(e, t) {
		return this.emitter.off(e, t), this;
	}
	setConfig(e) {
		Object.keys(e).forEach((t) => {
			e[t], this.config[t] = e[t];
		}), this.config.skipInactive || this.backToNormal(), e.speed !== void 0 && this.speedService.send({
			type: "SET_SPEED",
			payload: { speed: e.speed }
		}), e.mouseTail !== void 0 && (e.mouseTail === !1 ? this.mouseTail && (this.mouseTail.style.display = "none") : (this.mouseTail || (this.mouseTail = document.createElement("canvas"), this.mouseTail.width = Number.parseFloat(this.iframe.width), this.mouseTail.height = Number.parseFloat(this.iframe.height), this.mouseTail.classList.add("replayer-mouse-tail"), this.wrapper.insertBefore(this.mouseTail, this.iframe)), this.mouseTail.style.display = "inherit"));
	}
	getMetaData() {
		let e = this.service.state.context.events[0], t = this.service.state.context.events[this.service.state.context.events.length - 1];
		return {
			startTime: e.timestamp,
			endTime: t.timestamp,
			totalTime: t.timestamp - e.timestamp
		};
	}
	getCurrentTime() {
		return this.config.liveMode && this.timer.updateLiveTime(), this.timer.timeOffset + this.getTimeOffset();
	}
	getTimeOffset() {
		let { baselineTime: e, events: t } = this.service.state.context;
		return e - t[0].timestamp;
	}
	getMirror() {
		return this.mirror;
	}
	play(e = 0) {
		var t;
		this.service.state.matches("paused") || this.service.send({ type: "PAUSE" }), this.service.send({
			type: "PLAY",
			payload: { timeOffset: e }
		}), (t = this.iframe.contentDocument?.getElementsByTagName("html")[0]) == null || t.classList.remove("rrweb-paused"), this.emitter.emit(X.Start);
	}
	pause(e) {
		var t;
		e === void 0 && this.service.state.matches("playing") && this.service.send({ type: "PAUSE" }), typeof e == "number" && (this.play(e), this.service.send({ type: "PAUSE" })), (t = this.iframe.contentDocument?.getElementsByTagName("html")[0]) == null || t.classList.add("rrweb-paused"), this.emitter.emit(X.Pause);
	}
	resume(e = 0) {
		this.warn("The 'resume' was deprecated in 1.0. Please use 'play' method which has the same interface."), this.play(e), this.emitter.emit(X.Resume);
	}
	destroy() {
		this.pause(), this.mirror.reset(), this.styleMirror.reset(), this.mediaManager.reset(), this.config.root.removeChild(this.wrapper), this.emitter.emit(X.Destroy);
	}
	startLive(e) {
		this.service.send({
			type: "TO_LIVE",
			payload: { baselineTime: e }
		});
	}
	addEvent(e) {
		let t = this.config.unpackFn ? this.config.unpackFn(e) : e;
		iu(t) && this.mouse.classList.add("touch-device"), Promise.resolve().then(() => this.service.send({
			type: "ADD_EVENT",
			payload: { event: t }
		}));
	}
	enableInteract() {
		this.iframe.setAttribute("scrolling", "auto"), this.iframe.style.pointerEvents = "auto";
	}
	disableInteract() {
		this.iframe.setAttribute("scrolling", "no"), this.iframe.style.pointerEvents = "none";
	}
	resetCache() {
		this.cache = ui();
	}
	setupDom() {
		this.wrapper = document.createElement("div"), this.wrapper.classList.add("replayer-wrapper"), this.config.root.appendChild(this.wrapper), this.mouse = document.createElement("div"), this.mouse.classList.add("replayer-mouse"), this.wrapper.appendChild(this.mouse), this.config.mouseTail !== !1 && (this.mouseTail = document.createElement("canvas"), this.mouseTail.classList.add("replayer-mouse-tail"), this.mouseTail.style.display = "inherit", this.wrapper.appendChild(this.mouseTail)), this.config.UNSAFE_replayCanvas ? (this.iframe = document.createElement("iframe"), this.iframe.setAttribute("sandbox", "allow-same-origin allow-scripts"), this.wrapper.appendChild(this.iframe), this.UNSAFE_replayCanvas = !0) : (this.iframe = Ci({ root: this.wrapper }), this.UNSAFE_replayCanvas = !1), this.iframe.style.display = "none", this.disableInteract(), this.iframe.contentWindow && this.iframe.contentDocument && (Sl(this.iframe.contentWindow, this.iframe.contentDocument), Js(this.iframe.contentWindow));
	}
	rebuildFullSnapshot(e, t = !1) {
		if (!this.iframe.contentDocument) return this.warn("Looks like your replayer has been destroyed.");
		Object.keys(this.legacy_missingNodeRetryMap).length && this.warn("Found unresolved missing node map", this.legacy_missingNodeRetryMap), this.legacy_missingNodeRetryMap = {};
		let n = [], r = /* @__PURE__ */ new Set(), i = (t, i) => {
			if (t.nodeName === "DIALOG" && r.add(t), this.collectIframeAndAttachDocument(n, t), this.mediaManager.isSupportedMediaElement(t)) {
				let { events: n } = this.service.state.context;
				this.mediaManager.addMediaElements(t, e.timestamp - n[0].timestamp, this.mirror);
			}
			for (let e of this.config.plugins || []) e.onBuild && e.onBuild(t, {
				id: i,
				replayer: this
			});
		};
		this.usingVirtualDom &&= (this.virtualDom.destroyTree(), !1), this.mirror.reset(), Si(e.data.node, {
			doc: this.iframe.contentDocument,
			afterAppend: i,
			cache: this.cache,
			mirror: this.mirror,
			UNSAFE_allowUnprotectedRebuild: this.UNSAFE_replayCanvas
		}), i(this.iframe.contentDocument, e.data.node.id);
		for (let { mutationInQueue: e, builtNode: t } of n) this.attachDocumentToIframe(e, t), this.newDocumentQueue = this.newDocumentQueue.filter((t) => t !== e);
		let { documentElement: a, head: o } = this.iframe.contentDocument;
		this.insertStyleRules(a, o), r.forEach((e) => Ql(e)), this.service.state.matches("playing") || this.iframe.contentDocument.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(X.FullsnapshotRebuilded, e), t || this.waitForStylesheetLoad(), this.config.UNSAFE_replayCanvas && this.preloadAllImages();
	}
	insertStyleRules(e, t) {
		var n;
		let r = Vl(this.config.blockClass).concat(this.config.insertStyleRules);
		if (this.config.pauseAnimation && r.push("html.rrweb-paused *, html.rrweb-paused *:before, html.rrweb-paused *:after { animation-play-state: paused !important; }"), r.length) {
			if (this.usingVirtualDom) {
				let n = this.virtualDom.createElement("style");
				this.virtualDom.mirror.add(n, ss(n, this.virtualDom.unserializedId)), e.insertBefore(n, t), n.rules.push({
					source: J.StyleSheetRule,
					adds: r.map((e, t) => ({
						rule: e,
						index: t
					}))
				});
			} else {
				let i = document.createElement("style");
				e.insertBefore(i, t);
				for (let e = 0; e < r.length; e++) (n = i.sheet) == null || n.insertRule(r[e], e);
			}
		}
	}
	attachDocumentToIframe(e, t) {
		let n = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror, r = [], i = /* @__PURE__ */ new Set(), a = (e, a) => {
			e.nodeName === "DIALOG" && i.add(e), this.collectIframeAndAttachDocument(r, e);
			let o = n.getMeta(e);
			if (o?.type === fc.Element && o?.tagName.toUpperCase() === "HTML") {
				let { documentElement: e, head: n } = t.contentDocument;
				this.insertStyleRules(e, n);
			}
			if (!this.usingVirtualDom) for (let t of this.config.plugins || []) t.onBuild && t.onBuild(e, {
				id: a,
				replayer: this
			});
		};
		yi(e.node, {
			doc: t.contentDocument,
			mirror: n,
			hackCss: !0,
			skipChild: !1,
			afterAppend: a,
			cache: this.cache
		}), a(t.contentDocument, e.node.id);
		for (let { mutationInQueue: e, builtNode: t } of r) this.attachDocumentToIframe(e, t), this.newDocumentQueue = this.newDocumentQueue.filter((t) => t !== e);
		i.forEach((e) => Ql(e));
	}
	collectIframeAndAttachDocument(e, t) {
		if (Zs(t, this.mirror)) {
			let n = this.newDocumentQueue.find((e) => e.parentId === this.mirror.getId(t));
			n && e.push({
				mutationInQueue: n,
				builtNode: t
			});
		}
	}
	waitForStylesheetLoad() {
		let e = this.iframe.contentDocument?.head;
		if (e) {
			let t = /* @__PURE__ */ new Set(), n, r = this.service.state, i = () => {
				r = this.service.state;
			};
			this.emitter.on(X.Start, i), this.emitter.on(X.Pause, i);
			let a = () => {
				this.emitter.off(X.Start, i), this.emitter.off(X.Pause, i);
			};
			e.querySelectorAll("link[rel=\"stylesheet\"]").forEach((e) => {
				e.sheet || (t.add(e), e.addEventListener("load", () => {
					t.delete(e), t.size === 0 && n !== -1 && (r.matches("playing") && this.play(this.getCurrentTime()), this.emitter.emit(X.LoadStylesheetEnd), n && clearTimeout(n), a());
				}));
			}), t.size > 0 && (this.service.send({ type: "PAUSE" }), this.emitter.emit(X.LoadStylesheetStart), n = setTimeout(() => {
				r.matches("playing") && this.play(this.getCurrentTime()), n = -1, a();
			}, this.config.loadTimeout));
		}
	}
	async preloadAllImages() {
		let e = [];
		for (let t of this.service.state.context.events) t.type === q.IncrementalSnapshot && t.data.source === J.CanvasMutation && (e.push(this.deserializeAndPreloadCanvasEvents(t.data, t)), ("commands" in t.data ? t.data.commands : [t.data]).forEach((e) => {
			this.preloadImages(e, t);
		}));
		return Promise.all(e);
	}
	preloadImages(e, t) {
		if (e.property === "drawImage" && typeof e.args[0] == "string" && !this.imageMap.has(t)) {
			let e = document.createElement("canvas"), t = e.getContext("2d"), n = t?.createImageData(e.width, e.height);
			t?.putImageData(n, 0, 0);
		}
	}
	async deserializeAndPreloadCanvasEvents(e, t) {
		if (!this.canvasEventMap.has(t)) {
			let n = { isUnchanged: !0 };
			if ("commands" in e) {
				let r = await Promise.all(e.commands.map(async (e) => {
					let t = await Promise.all(e.args.map(Wl(this.imageMap, null, n)));
					return {
						...e,
						args: t
					};
				}));
				n.isUnchanged === !1 && this.canvasEventMap.set(t, {
					...e,
					commands: r
				});
			} else {
				let r = await Promise.all(e.args.map(Wl(this.imageMap, null, n)));
				n.isUnchanged === !1 && this.canvasEventMap.set(t, {
					...e,
					args: r
				});
			}
		}
	}
	applyIncremental(e, t) {
		var n, r;
		let { data: i } = e;
		switch (i.source) {
			case J.Mutation:
				try {
					this.applyMutation(i, t);
				} catch (e) {
					this.warn(`Exception in mutation ${e.message || e}`, i);
				}
				break;
			case J.Drag:
			case J.TouchMove:
			case J.MouseMove:
				if (t) {
					let e = i.positions[i.positions.length - 1];
					this.mousePos = {
						x: e.x,
						y: e.y,
						id: e.id,
						debugData: i
					};
				} else i.positions.forEach((n) => {
					let r = {
						doAction: () => {
							this.moveAndHover(n.x, n.y, n.id, t, i);
						},
						delay: n.timeOffset + e.timestamp - this.service.state.context.baselineTime
					};
					this.timer.addAction(r);
				}), this.timer.addAction({
					doAction() {},
					delay: e.delay - i.positions[0]?.timeOffset
				});
				break;
			case J.MouseInteraction: {
				if (i.id === -1) break;
				let e = new Event(jt(Y[i.type])), n = this.mirror.getNode(i.id);
				if (!n) return this.debugNodeNotFound(i, i.id);
				this.emitter.emit(X.MouseInteraction, {
					type: i.type,
					target: n
				});
				let { triggerFocus: r } = this.config;
				switch (i.type) {
					case Y.Blur:
						"blur" in n && n.blur();
						break;
					case Y.Focus:
						r && n.focus && n.focus({ preventScroll: !0 });
						break;
					case Y.Click:
					case Y.TouchStart:
					case Y.TouchEnd:
					case Y.MouseDown:
					case Y.MouseUp:
						t ? (i.type === Y.TouchStart ? this.touchActive = !0 : i.type === Y.TouchEnd && (this.touchActive = !1), i.type === Y.MouseDown ? this.lastMouseDownEvent = [n, e] : i.type === Y.MouseUp && (this.lastMouseDownEvent = null), this.mousePos = {
							x: i.x || 0,
							y: i.y || 0,
							id: i.id,
							debugData: i
						}) : (i.type === Y.TouchStart && (this.tailPositions.length = 0), this.moveAndHover(i.x || 0, i.y || 0, i.id, t, i), i.type === Y.Click ? (this.mouse.classList.remove("active"), this.mouse.offsetWidth, this.mouse.classList.add("active")) : i.type === Y.TouchStart ? (this.mouse.offsetWidth, this.mouse.classList.add("touch-active")) : i.type === Y.TouchEnd ? this.mouse.classList.remove("touch-active") : n.dispatchEvent(e));
						break;
					case Y.TouchCancel:
						t ? this.touchActive = !1 : this.mouse.classList.remove("touch-active");
						break;
					default: n.dispatchEvent(e);
				}
				break;
			}
			case J.Scroll:
				if (i.id === -1) break;
				if (this.usingVirtualDom) {
					let e = this.virtualDom.mirror.getNode(i.id);
					if (!e) return this.debugNodeNotFound(i, i.id);
					e.scrollData = i;
					break;
				}
				this.applyScroll(i, t);
				break;
			case J.ViewportResize:
				this.emitter.emit(X.Resize, {
					width: i.width,
					height: i.height
				});
				break;
			case J.Input:
				if (i.id === -1) break;
				if (this.usingVirtualDom) {
					let e = this.virtualDom.mirror.getNode(i.id);
					if (!e) return this.debugNodeNotFound(i, i.id);
					e.inputData = i;
					break;
				}
				this.applyInput(i);
				break;
			case J.MediaInteraction: {
				let t = this.usingVirtualDom ? this.virtualDom.mirror.getNode(i.id) : this.mirror.getNode(i.id);
				if (!t) return this.debugNodeNotFound(i, i.id);
				let n = t, { events: r } = this.service.state.context;
				this.mediaManager.mediaMutation({
					target: n,
					timeOffset: e.timestamp - r[0].timestamp,
					mutation: i
				});
				break;
			}
			case J.StyleSheetRule:
			case J.StyleDeclaration:
				this.usingVirtualDom ? i.styleId ? this.constructedStyleMutations.push(i) : i.id && ((n = this.virtualDom.mirror.getNode(i.id)) == null || n.rules.push(i)) : this.applyStyleSheetMutation(i);
				break;
			case J.CanvasMutation:
				if (!this.config.UNSAFE_replayCanvas) return;
				if (this.usingVirtualDom) {
					let t = this.virtualDom.mirror.getNode(i.id);
					if (!t) return this.debugNodeNotFound(i, i.id);
					t.canvasMutations.push({
						event: e,
						mutation: i
					});
				} else {
					let t = this.mirror.getNode(i.id);
					if (!t) return this.debugNodeNotFound(i, i.id);
					Xl({
						event: e,
						mutation: i,
						target: t,
						imageMap: this.imageMap,
						canvasEventMap: this.canvasEventMap,
						errorHandler: this.warnCanvasMutationFailed.bind(this)
					});
				}
				break;
			case J.Font:
				try {
					let e = new FontFace(i.family, i.buffer ? new Uint8Array(JSON.parse(i.fontSource)) : i.fontSource, i.descriptors);
					(r = this.iframe.contentDocument) == null || r.fonts.add(e);
				} catch (e) {
					this.warn(e);
				}
				break;
			case J.Selection:
				if (t) {
					this.lastSelectionData = i;
					break;
				}
				this.applySelection(i);
				break;
			case J.AdoptedStyleSheet: this.usingVirtualDom ? this.adoptedStyleSheets.push(i) : this.applyAdoptedStyleSheet(i);
		}
	}
	applyMutation(e, t) {
		if (this.config.useVirtualDom && !this.usingVirtualDom && t && (this.usingVirtualDom = !0, is(this.iframe.contentDocument, this.mirror, this.virtualDom), Object.keys(this.legacy_missingNodeRetryMap).length)) for (let e in this.legacy_missingNodeRetryMap) try {
			let t = this.legacy_missingNodeRetryMap[e], n = rs(t.node, this.virtualDom, this.mirror);
			n && (t.node = n);
		} catch (e) {
			this.warn(e);
		}
		let n = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror;
		e.removes = e.removes.filter((t) => n.getNode(t.id) ? !0 : (this.warnNodeNotFound(e, t.id), !1)), e.removes.forEach((t) => {
			let r = n.getNode(t.id);
			if (!r) return;
			let i = n.getNode(t.parentId);
			if (!i) return this.warnNodeNotFound(e, t.parentId);
			if (t.isShadow && ec(i) && (i = i.shadowRoot), n.removeNodeFromMap(r), i) try {
				i.removeChild(r), this.usingVirtualDom && r.nodeName === "#text" && i.nodeName === "STYLE" && i.rules?.length > 0 && (i.rules = []);
			} catch (t) {
				if (t instanceof DOMException) this.warn("parent could not remove child in mutation", i, r, e);
				else throw t;
			}
		});
		let r = { ...this.legacy_missingNodeRetryMap }, i = [], a = (e) => {
			let t = null;
			return e.nextId && (t = n.getNode(e.nextId)), e.nextId !== null && e.nextId !== void 0 && e.nextId !== -1 && !t;
		}, o = (e) => {
			if (!this.iframe.contentDocument) return this.warn("Looks like your replayer has been destroyed.");
			let t = n.getNode(e.parentId);
			if (!t) return e.node.type === fc.Document ? this.newDocumentQueue.push(e) : i.push(e);
			e.node.isShadow && (ec(t) || t.attachShadow({ mode: "open" }), t = t.shadowRoot);
			let o = null, s = null;
			if (e.previousId && (o = n.getNode(e.previousId)), e.nextId && (s = n.getNode(e.nextId)), a(e)) return i.push(e);
			if (e.node.rootId && !n.getNode(e.node.rootId)) return;
			let c = e.node.rootId ? n.getNode(e.node.rootId) : this.usingVirtualDom ? this.virtualDom : this.iframe.contentDocument;
			if (Zs(t, n)) {
				this.attachDocumentToIframe(e, t);
				return;
			}
			let l = (e, t) => {
				if (!this.usingVirtualDom) {
					Ql(e);
					for (let n of this.config.plugins || []) n.onBuild && n.onBuild(e, {
						id: t,
						replayer: this
					});
				}
			}, u = yi(e.node, {
				doc: c,
				mirror: n,
				skipChild: !0,
				hackCss: !0,
				cache: this.cache,
				afterAppend: l
			});
			if (e.previousId === -1 || e.nextId === -1) {
				r[e.node.id] = {
					node: u,
					mutation: e
				};
				return;
			}
			let d = n.getMeta(t);
			if (d && d.type === fc.Element && e.node.type === fc.Text) {
				let e = Array.isArray(t.childNodes) ? t.childNodes : Array.from(t.childNodes);
				if (d.tagName === "textarea") for (let n of e) n.nodeType === t.TEXT_NODE && t.removeChild(n);
				else if (d.tagName === "style" && e.length === 1) for (let r of e) r.nodeType === t.TEXT_NODE && !n.hasNode(r) && (u.textContent = r.textContent, t.removeChild(r));
			} else if (d?.type === fc.Document) {
				let n = t;
				e.node.type === fc.DocumentType && n.childNodes[0]?.nodeType === Node.DOCUMENT_TYPE_NODE && n.removeChild(n.childNodes[0]), u.nodeName === "HTML" && n.documentElement && n.removeChild(n.documentElement);
			}
			if (o && o.nextSibling && o.nextSibling.parentNode ? t.insertBefore(u, o.nextSibling) : s && s.parentNode ? t.contains(s) ? t.insertBefore(u, s) : t.insertBefore(u, null) : t.appendChild(u), l(u, e.node.id), this.usingVirtualDom && u.nodeName === "#text" && t.nodeName === "STYLE" && t.rules?.length > 0 && (t.rules = []), Zs(u, this.mirror)) {
				let e = this.mirror.getId(u), t = this.newDocumentQueue.find((t) => t.parentId === e);
				t && (this.attachDocumentToIframe(t, u), this.newDocumentQueue = this.newDocumentQueue.filter((e) => e !== t));
			}
			(e.previousId || e.nextId) && this.legacy_resolveMissingNode(r, t, u, e);
		};
		e.adds.forEach((e) => {
			o(e);
		});
		let s = Date.now();
		for (; i.length;) {
			let e = Ys(i);
			if (i.length = 0, Date.now() - s > 500) {
				this.warn("Timeout in the loop, please check the resolve tree data:", e);
				break;
			}
			for (let t of e) n.getNode(t.value.parentId) ? Xs(t, (e) => {
				o(e);
			}) : this.debug("Drop resolve tree since there is no parent for the root node.", t);
		}
		Object.keys(r).length && Object.assign(this.legacy_missingNodeRetryMap, r), rc(e.texts).forEach((t) => {
			let r = n.getNode(t.id);
			if (!r) return e.removes.find((e) => e.id === t.id) ? void 0 : this.warnNodeNotFound(e, t.id);
			let i = r.parentElement;
			if (r.textContent = t.value && i && i.tagName === "STYLE" ? li(t.value, this.cache) : t.value, this.usingVirtualDom) {
				let e = r.parentNode;
				e?.rules?.length > 0 && (e.rules = []);
			}
		}), e.attributes.forEach((t) => {
			let r = n.getNode(t.id);
			if (!r) return e.removes.find((e) => e.id === t.id) ? void 0 : this.warnNodeNotFound(e, t.id);
			for (let e in t.attributes) if (typeof e == "string") {
				let i = t.attributes[e];
				if (i === null) r.removeAttribute(e), e === "open" && $l(r, t);
				else if (typeof i == "string") try {
					if (e === "_cssText" && (r.nodeName === "LINK" || r.nodeName === "STYLE")) try {
						let e = n.getMeta(r), i = yi({
							...e,
							attributes: {
								...e.attributes,
								...t.attributes
							}
						}, {
							doc: r.ownerDocument,
							mirror: n,
							skipChild: !0,
							hackCss: !0,
							cache: this.cache
						});
						Object.assign(e.attributes, t.attributes);
						let a = r.nextSibling, o = r.parentNode;
						if (i && o) {
							o.removeChild(r), o.insertBefore(i, a), n.replace(t.id, i);
							break;
						}
					} catch {}
					if (e === "value" && r.nodeName === "TEXTAREA") {
						let e = r;
						e.childNodes.forEach((t) => e.removeChild(t));
						let t = r.ownerDocument?.createTextNode(i);
						t && e.appendChild(t);
					} else r.setAttribute(e, i);
					e === "rr_open_mode" && r.nodeName === "DIALOG" && Ql(r, t);
				} catch (e) {
					this.warn("An error occurred may due to the checkout feature.", e);
				}
				else if (e === "style") {
					let e = i, t = r;
					for (let n in e) if (e[n] === !1) t.style.removeProperty(n);
					else if (e[n] instanceof Array) {
						let r = e[n];
						t.style.setProperty(n, r[0], r[1]);
					} else {
						let r = e[n];
						t.style.setProperty(n, r);
					}
				}
			}
		});
	}
	applyScroll(e, t) {
		var n, r;
		let i = this.mirror.getNode(e.id);
		if (!i) return this.debugNodeNotFound(e, e.id);
		let a = this.mirror.getMeta(i);
		if (i === this.iframe.contentDocument) (n = this.iframe.contentWindow) == null || n.scrollTo({
			top: e.y,
			left: e.x,
			behavior: t ? "auto" : "smooth"
		});
		else if (a?.type === fc.Document) (r = i.defaultView) == null || r.scrollTo({
			top: e.y,
			left: e.x,
			behavior: t ? "auto" : "smooth"
		});
		else try {
			i.scrollTo({
				top: e.y,
				left: e.x,
				behavior: t ? "auto" : "smooth"
			});
		} catch {}
	}
	applyInput(e) {
		let t = this.mirror.getNode(e.id);
		if (!t) return this.debugNodeNotFound(e, e.id);
		try {
			t.checked = e.isChecked, t.value = e.text;
		} catch {}
	}
	applySelection(e) {
		try {
			let t = /* @__PURE__ */ new Set(), n = e.ranges.map(({ start: e, startOffset: n, end: r, endOffset: i }) => {
				let a = this.mirror.getNode(e), o = this.mirror.getNode(r);
				if (!a || !o) return;
				let s = new Range();
				s.setStart(a, n), s.setEnd(o, i);
				let c = a.ownerDocument?.getSelection();
				return c && t.add(c), {
					range: s,
					selection: c
				};
			});
			t.forEach((e) => e.removeAllRanges()), n.forEach((e) => e && e.selection?.addRange(e.range));
		} catch {}
	}
	applyStyleSheetMutation(e) {
		let t = null;
		e.styleId ? t = this.styleMirror.getStyle(e.styleId) : e.id && (t = this.mirror.getNode(e.id)?.sheet || null), t && (e.source === J.StyleSheetRule ? this.applyStyleSheetRule(e, t) : e.source === J.StyleDeclaration && this.applyStyleDeclaration(e, t));
	}
	applyStyleSheetRule(e, t) {
		var n, r, i, a;
		if ((n = e.adds) == null || n.forEach(({ rule: e, index: n }) => {
			try {
				if (Array.isArray(n)) {
					let { positions: r, index: i } = nc(n);
					tc(t.cssRules, r)?.insertRule(e, i);
				} else {
					let r = n === void 0 ? void 0 : Math.min(n, t.cssRules.length);
					t?.insertRule(e, r);
				}
			} catch {}
		}), (r = e.removes) == null || r.forEach(({ index: e }) => {
			try {
				if (Array.isArray(e)) {
					let { positions: n, index: r } = nc(e);
					tc(t.cssRules, n)?.deleteRule(r || 0);
				} else t?.deleteRule(e);
			} catch {}
		}), typeof e.replace == "string") try {
			(i = t.replace) == null || i.call(t, e.replace);
		} catch {}
		if (typeof e.replaceSync == "string") try {
			(a = t.replaceSync) == null || a.call(t, e.replaceSync);
		} catch {}
	}
	applyStyleDeclaration(e, t) {
		if (e.set) {
			let n = tc(t.rules, e.index);
			n?.style && n.style.setProperty(e.set.property, e.set.value, e.set.priority);
		}
		if (e.remove) {
			let n = tc(t.rules, e.index);
			n?.style && n.style.removeProperty(e.remove.property);
		}
	}
	applyAdoptedStyleSheet(e) {
		var t;
		let n = this.mirror.getNode(e.id);
		if (!n) return;
		(t = e.styles) == null || t.forEach((e) => {
			let t = null, r = null;
			if (ec(n) ? r = n.ownerDocument?.defaultView || null : n.nodeName === "#document" && (r = n.defaultView), r) try {
				t = new r.CSSStyleSheet(), this.styleMirror.add(t, e.styleId), this.applyStyleSheetRule({
					source: J.StyleSheetRule,
					adds: e.rules
				}, t);
			} catch {}
		});
		let r = 0, i = (e, t) => {
			let n = t.map((e) => this.styleMirror.getStyle(e)).filter((e) => e !== null);
			ec(e) ? e.shadowRoot.adoptedStyleSheets = n : e.nodeName === "#document" && (e.adoptedStyleSheets = n), n.length !== t.length && r < 10 && (setTimeout(() => i(e, t), 0 + 100 * r), r++);
		};
		i(n, e.styleIds);
	}
	legacy_resolveMissingNode(e, t, n, r) {
		let { previousId: i, nextId: a } = r, o = i && e[i], s = a && e[a];
		if (o) {
			let { node: r, mutation: i } = o;
			t.insertBefore(r, n), delete e[i.node.id], delete this.legacy_missingNodeRetryMap[i.node.id], (i.previousId || i.nextId) && this.legacy_resolveMissingNode(e, t, r, i);
		}
		if (s) {
			let { node: r, mutation: i } = s;
			t.insertBefore(r, n.nextSibling), delete e[i.node.id], delete this.legacy_missingNodeRetryMap[i.node.id], (i.previousId || i.nextId) && this.legacy_resolveMissingNode(e, t, r, i);
		}
	}
	moveAndHover(e, t, n, r, i) {
		let a = this.mirror.getNode(n);
		if (!a) return this.debugNodeNotFound(i, n);
		let o = $s(a, this.iframe), s = e * o.absoluteScale + o.x, c = t * o.absoluteScale + o.y;
		this.mouse.style.left = `${s}px`, this.mouse.style.top = `${c}px`, r || this.drawMouseTail({
			x: s,
			y: c
		}), this.hoverElements(a);
	}
	drawMouseTail(e) {
		if (!this.mouseTail) return;
		let { lineCap: t, lineWidth: n, strokeStyle: r, duration: i } = this.config.mouseTail === !0 ? ru : Object.assign({}, ru, this.config.mouseTail), a = () => {
			if (!this.mouseTail) return;
			let e = this.mouseTail.getContext("2d");
			e && this.tailPositions.length && (e.clearRect(0, 0, this.mouseTail.width, this.mouseTail.height), e.beginPath(), e.lineWidth = n, e.lineCap = t, e.strokeStyle = r, e.moveTo(this.tailPositions[0].x, this.tailPositions[0].y), this.tailPositions.forEach((t) => e.lineTo(t.x, t.y)), e.stroke());
		};
		this.tailPositions.push(e), a(), setTimeout(() => {
			this.tailPositions = this.tailPositions.filter((t) => t !== e), a();
		}, i / this.speedService.state.context.timer.speed);
	}
	hoverElements(e) {
		var t;
		(t = this.lastHoveredRootNode || this.iframe.contentDocument) == null || t.querySelectorAll(".\\:hover").forEach((e) => {
			e.classList.remove(":hover");
		}), this.lastHoveredRootNode = e.getRootNode();
		let n = e;
		for (; n;) n.classList && n.classList.add(":hover"), n = n.parentElement;
	}
	isUserInteraction(e) {
		return e.type === q.IncrementalSnapshot && e.data.source > J.Mutation && e.data.source <= J.Input;
	}
	backToNormal() {
		this.nextUserInteractionEvent = null, !this.speedService.state.matches("normal") && (this.speedService.send({ type: "BACK_TO_NORMAL" }), this.emitter.emit(X.SkipEnd, { speed: this.speedService.state.context.normalSpeed }));
	}
	warnNodeNotFound(e, t) {
		this.warn(`Node with id '${t}' not found. `, e);
	}
	warnCanvasMutationFailed(e, t) {
		this.warn("Has error on canvas update", t, "canvas mutation:", e);
	}
	debugNodeNotFound(e, t) {
		this.debug(`Node with id '${t}' not found. `, e);
	}
	warn(...e) {
		this.config.showWarning && this.config.logger.warn(nu, ...e);
	}
	debug(...e) {
		this.config.showDebug && this.config.logger.log(nu, ...e);
	}
}, { addCustomEvent: ou } = bl, { freezePage: su } = bl, { takeFullSnapshot: cu } = bl, lu = {
	ru: {
		recordings: "Записи",
		noRecordings: "Нет записей",
		loading: "Загрузка…",
		play: "Играть",
		pause: "Пауза",
		speed: "Скорость",
		skipInactive: "Пропускать паузы",
		fullscreen: "На весь экран",
		events: "событий",
		clicks: "кликов",
		unplayable: "нет снимка страницы",
		skipping: "пропуск бездействия",
		lost: "потери",
		selectHint: "Выберите запись слева",
		warnings: "Предупреждения",
		page: "Страница",
		started: "Начало",
		browser: "Браузер",
		device: "Устройство",
		geo: "Гео",
		viewport: "Экран",
		user: "Пользователь"
	},
	en: {
		recordings: "Recordings",
		noRecordings: "No recordings",
		loading: "Loading…",
		play: "Play",
		pause: "Pause",
		speed: "Speed",
		skipInactive: "Skip inactive",
		fullscreen: "Fullscreen",
		events: "events",
		clicks: "clicks",
		unplayable: "no page snapshot",
		skipping: "skipping inactivity",
		lost: "lost",
		selectHint: "Select a recording on the left",
		warnings: "Warnings",
		page: "Page",
		started: "Started",
		browser: "Browser",
		device: "Device",
		geo: "Geo",
		viewport: "Viewport",
		user: "User"
	}
}, uu = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\"><path fill=\"currentColor\" d=\"M8 5v14l11-7z\"/></svg>", du = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\"><path fill=\"currentColor\" d=\"M6 5h4v14H6zm8 0h4v14h-4z\"/></svg>", fu = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\"><path fill=\"currentColor\" d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/></svg>";
function pu(e) {
	let t = Math.max(0, Math.round(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = String(r).padStart(2, "0"), o = String(i).padStart(2, "0");
	return n ? `${n}:${a}:${o}` : `${a}:${o}`;
}
function $(e, t, n) {
	let r = document.createElement(e);
	return t && (r.className = t), n !== void 0 && (r.innerHTML = n), r;
}
function mu(e) {
	return e.replace(/[&<>"']/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[e]);
}
function hu(e) {
	try {
		let t = new URL(e), n = t.pathname + (t.search.length > 1 ? t.search : "");
		return n.length > 60 ? n.slice(0, 57) + "…" : n || "/";
	} catch {
		return e || "—";
	}
}
var gu = 1, _u = 5, vu = class {
	root;
	t;
	opts;
	recordings = [];
	replayer = null;
	currentIndex = -1;
	state = "empty";
	totalTime = 0;
	speed;
	skipInactive;
	raf = 0;
	dragging = !1;
	destroyed = !1;
	resizeObserver;
	ui;
	constructor(e, t = {}) {
		let n = typeof e == "string" ? document.querySelector(e) : e;
		if (!n) throw Error(`RrwebViewer: контейнер не найден: ${String(e)}`);
		this.root = n, this.opts = {
			speed: 1,
			speeds: [
				.5,
				1,
				2,
				4,
				8,
				16
			],
			skipInactive: !0,
			autoPlay: !1,
			autoNext: !1,
			showList: !0,
			showInfo: !0,
			mouseTail: !0,
			inactiveThreshold: 1e4,
			...t
		}, this.t = lu[this.opts.locale ?? "ru"], this.speed = this.opts.speed, this.skipInactive = this.opts.skipInactive, this.root.classList.add("rrv"), this.root.tabIndex = 0, this.root.innerHTML = "";
		let r = $("aside", "rrv-sidebar"), i = $("div", "rrv-sidebar-title", this.t.recordings), a = $("div", "rrv-list");
		r.append(i, a), this.opts.showList || (r.hidden = !0);
		let o = $("section", "rrv-main"), s = $("div", "rrv-stage"), c = $("div", "rrv-frame"), l = $("div", "rrv-hint", this.t.selectHint), u = $("div", "rrv-badge", this.t.skipping);
		u.hidden = !0, s.append(c, l, u);
		let d = $("div", "rrv-controls"), f = $("button", "rrv-btn rrv-play", uu);
		f.type = "button", f.title = this.t.play;
		let p = $("div", "rrv-time", "00:00 / 00:00"), m = $("div", "rrv-track"), h = $("div", "rrv-spans"), g = $("div", "rrv-markers"), _ = $("div", "rrv-fill"), v = $("div", "rrv-handle");
		m.append(h, g, _, v);
		let y = $("select", "rrv-speed");
		y.title = this.t.speed;
		for (let e of this.opts.speeds) {
			let t = $("option", void 0, `${e}×`);
			t.value = String(e), e === this.speed && (t.selected = !0), y.append(t);
		}
		let b = $("label", "rrv-skip"), x = $("input");
		x.type = "checkbox", x.checked = this.skipInactive, b.append(x, document.createTextNode(" " + this.t.skipInactive));
		let S = $("button", "rrv-btn rrv-full", fu);
		S.type = "button", S.title = this.t.fullscreen, d.append(f, p, m, y, b, S);
		let C = $("div", "rrv-info");
		this.opts.showInfo || (C.hidden = !0), o.append(s, d, C), this.root.append(r, o), this.ui = {
			sidebar: r,
			list: a,
			listTitle: i,
			main: o,
			stage: s,
			frame: c,
			hint: l,
			badge: u,
			controls: d,
			playBtn: f,
			time: p,
			track: m,
			spans: h,
			markers: g,
			fill: _,
			handle: v,
			speedSel: y,
			skipChk: x,
			fullBtn: S,
			info: C
		}, f.addEventListener("click", () => this.toggle()), y.addEventListener("change", () => this.setSpeed(Number(y.value))), x.addEventListener("change", () => this.setSkipInactive(x.checked)), S.addEventListener("click", () => this.toggleFullscreen()), this.bindTrack(), this.root.addEventListener("keydown", this.onKeyDown), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.fit()), this.resizeObserver.observe(s)), this.renderList(), this.setControlsEnabled(!1);
	}
	get current() {
		return this.recordings[this.currentIndex] ?? null;
	}
	get currentIndexValue() {
		return this.currentIndex;
	}
	get list() {
		return this.recordings;
	}
	get playing() {
		return this.state === "playing";
	}
	setRecordings(e) {
		this.unmount(), this.recordings = e, this.currentIndex = -1, this.renderList();
		let t = e.findIndex((e) => e.playable);
		t >= 0 ? this.select(t) : (this.setState("empty"), this.ui.hint.textContent = e.length ? this.t.unplayable : this.t.noRecordings, this.ui.hint.hidden = !1, this.renderInfo(null), this.setControlsEnabled(!1), this.opts.onSelect?.(null, -1));
	}
	loadRows(e) {
		let t = ye(e, this.opts.parse);
		return this.setRecordings(t), t;
	}
	async load(e, t) {
		this.unmount(), this.recordings = [], this.currentIndex = -1, this.setState("loading"), this.ui.listTitle.textContent = this.t.loading, this.ui.list.innerHTML = "", this.ui.hint.textContent = this.t.loading, this.ui.hint.hidden = !1;
		try {
			let n = await t.fetchRecordings(e);
			return this.destroyed || this.setRecordings(n), n;
		} catch (e) {
			throw this.renderList(), this.setState("empty"), this.ui.hint.textContent = e instanceof Error ? e.message : String(e), e;
		}
	}
	select(e, t = this.opts.autoPlay) {
		let n = this.recordings[e];
		if (n) {
			if (this.unmount(), this.currentIndex = e, this.highlightList(), this.renderInfo(n), this.opts.onSelect?.(n, e), !n.playable) {
				this.ui.hint.textContent = this.t.unplayable, this.ui.hint.hidden = !1, this.setControlsEnabled(!1), this.setState("paused");
				return;
			}
			this.mount(n, t);
		}
	}
	play() {
		this.replayer && (this.state === "finished" ? this.replayer.play(0) : this.replayer.play(this.replayer.getCurrentTime()));
	}
	pause() {
		this.replayer?.pause();
	}
	toggle() {
		this.state === "playing" ? this.pause() : this.play();
	}
	seek(e) {
		if (!this.replayer) return;
		let t = Math.max(0, Math.min(this.totalTime, e));
		this.state === "playing" ? this.replayer.play(t) : (this.replayer.pause(t), this.setState("paused")), this.updateProgress(t);
	}
	setSpeed(e) {
		this.speed = e, this.ui.speedSel.value = String(e), this.replayer?.setConfig({ speed: e });
	}
	setSkipInactive(e) {
		this.skipInactive = e, this.ui.skipChk.checked = e, this.replayer?.setConfig({ skipInactive: e });
	}
	setAutoNext(e) {
		this.opts.autoNext = e;
	}
	next() {
		let e = this.recordings.findIndex((e, t) => t > this.currentIndex && e.playable);
		e >= 0 && this.select(e, !0);
	}
	prev() {
		for (let e = this.currentIndex - 1; e >= 0; e--) if (this.recordings[e].playable) {
			this.select(e, !0);
			return;
		}
	}
	toggleFullscreen() {
		document.fullscreenElement ? document.exitFullscreen() : this.ui.main.requestFullscreen?.();
	}
	destroy() {
		this.destroyed = !0, this.unmount(), this.resizeObserver?.disconnect(), this.root.removeEventListener("keydown", this.onKeyDown), this.root.classList.remove("rrv"), this.root.innerHTML = "";
	}
	mount(e, t) {
		this.ui.frame.innerHTML = "", this.ui.hint.hidden = !0;
		let n = new au(this.opts.rewriteAssets ? Le(structuredClone(e.events), this.opts.rewriteAssets) : e.events, {
			root: this.ui.frame,
			speed: this.speed,
			skipInactive: this.skipInactive,
			inactivePeriodThreshold: this.opts.inactiveThreshold,
			mouseTail: this.opts.mouseTail,
			showWarning: !1,
			showDebug: !1,
			useVirtualDom: !0,
			UNSAFE_replayCanvas: !1
		});
		this.replayer = n, this.totalTime = n.getMetaData().totalTime, n.on("resize", () => this.fit()), n.on("start", () => this.setState("playing")), n.on("resume", () => this.setState("playing")), n.on("pause", () => {
			this.state !== "finished" && this.setState("paused");
		}), n.on("finish", () => {
			this.setState("finished"), this.updateProgress(this.totalTime), this.opts.autoNext && this.next();
		}), n.on("skip-start", () => this.ui.badge.hidden = !1), n.on("skip-end", () => this.ui.badge.hidden = !0), this.renderTrack(e), this.setControlsEnabled(!0), n.pause(0), this.setState("paused"), this.updateProgress(0), this.fit(), t && n.play(0);
	}
	unmount() {
		if (cancelAnimationFrame(this.raf), this.raf = 0, this.replayer) {
			try {
				this.replayer.pause(), this.replayer.destroy();
			} catch {}
			this.replayer = null;
		}
		this.ui.frame.innerHTML = "", this.ui.badge.hidden = !0, this.totalTime = 0;
	}
	setState(e) {
		let t = this.state;
		this.state = e;
		let n = e === "playing";
		this.ui.playBtn.innerHTML = n ? du : uu, this.ui.playBtn.title = n ? this.t.pause : this.t.play, this.root.dataset.state = e, n ? this.startTicker() : cancelAnimationFrame(this.raf), t !== e && this.opts.onStateChange?.(e);
	}
	startTicker() {
		cancelAnimationFrame(this.raf);
		let e = () => {
			this.replayer && this.state === "playing" && (this.dragging || this.updateProgress(this.replayer.getCurrentTime()), this.raf = requestAnimationFrame(e));
		};
		this.raf = requestAnimationFrame(e);
	}
	updateProgress(e) {
		let t = this.totalTime ? Math.min(100, Math.max(0, e / this.totalTime * 100)) : 0;
		this.ui.fill.style.width = `${t}%`, this.ui.handle.style.left = `${t}%`, this.ui.time.textContent = `${pu(e)} / ${pu(this.totalTime)}`;
	}
	fit() {
		let e = this.replayer, t = this.current;
		if (!e || !t) return;
		let n = e.wrapper, r = e.iframe, i = parseFloat(r.width || "") || t.width || 1280, a = parseFloat(r.height || "") || t.height || 720, o = this.ui.stage.clientWidth, s = this.ui.stage.clientHeight;
		if (!o || !s) return;
		let c = Math.min(o / i, s / a);
		n.style.position = "absolute", n.style.left = "50%", n.style.top = "50%", n.style.transformOrigin = "0 0", n.style.transform = `scale(${c}) translate(-50%, -50%)`;
	}
	setControlsEnabled(e) {
		this.ui.controls.classList.toggle("rrv-disabled", !e), this.ui.playBtn.disabled = !e, e || (this.ui.fill.style.width = "0", this.ui.handle.style.left = "0", this.ui.time.textContent = "00:00 / 00:00", this.ui.markers.innerHTML = "", this.ui.spans.innerHTML = "");
	}
	bindTrack() {
		let { track: e } = this.ui, t = (t) => {
			let n = e.getBoundingClientRect(), r = n.width ? (t.clientX - n.left) / n.width : 0;
			return Math.max(0, Math.min(1, r)) * this.totalTime;
		}, n = !1;
		e.addEventListener("pointerdown", (r) => {
			this.replayer && (this.dragging = !0, n = this.state === "playing", n && this.replayer.pause(), e.setPointerCapture(r.pointerId), this.updateProgress(t(r)));
		}), e.addEventListener("pointermove", (e) => {
			this.dragging && this.updateProgress(t(e));
		});
		let r = (e) => {
			if (!this.dragging) return;
			this.dragging = !1;
			let r = t(e);
			this.replayer && (n ? this.replayer.play(r) : (this.replayer.pause(r), this.setState("paused")), this.updateProgress(r));
		};
		e.addEventListener("pointerup", r), e.addEventListener("pointercancel", r);
	}
	onKeyDown = (e) => {
		if ((e.target?.tagName !== "INPUT" || e.target.type === "checkbox") && this.replayer) switch (e.key) {
			case " ":
				e.preventDefault(), this.toggle();
				break;
			case "ArrowLeft":
				e.preventDefault(), this.seek(this.replayer.getCurrentTime() - 5e3);
				break;
			case "ArrowRight":
				e.preventDefault(), this.seek(this.replayer.getCurrentTime() + 5e3);
				break;
			case "n":
				this.next();
				break;
			case "p": this.prev();
		}
	};
	renderTrack(e) {
		let { markers: t, spans: n } = this.ui;
		t.innerHTML = "", n.innerHTML = "";
		let r = this.totalTime || 1, i = e.startTime, a = [], o = [], s = i;
		for (let t of e.events) if (t.type === 2 && a.push({
			at: t.timestamp - i,
			kind: "snapshot"
		}), t.type === 3) {
			let e = t.data.source;
			t.data.type === 2 && e === 2 && a.push({
				at: t.timestamp - i,
				kind: "click"
			}), e >= gu && e <= _u && (t.timestamp - s > this.opts.inactiveThreshold && o.push({
				from: s - i,
				to: t.timestamp - i
			}), s = t.timestamp);
		}
		e.endTime - s > this.opts.inactiveThreshold && o.push({
			from: s - i,
			to: e.endTime - i
		});
		for (let e of o) {
			let t = $("div", "rrv-span");
			t.style.left = `${e.from / r * 100}%`, t.style.width = `${(e.to - e.from) / r * 100}%`, n.append(t);
		}
		for (let e of a) {
			let n = $("div", `rrv-marker rrv-marker-${e.kind}`);
			n.style.left = `${e.at / r * 100}%`, n.title = `${e.kind} · ${pu(e.at)}`, t.append(n);
		}
	}
	renderList() {
		let { list: e, listTitle: t } = this.ui;
		if (t.textContent = `${this.t.recordings} (${this.recordings.length})`, e.innerHTML = "", !this.recordings.length) {
			e.append($("div", "rrv-empty", this.t.noRecordings));
			return;
		}
		this.recordings.forEach((t, n) => {
			let r = $("button", "rrv-item");
			r.type = "button", r.dataset.index = String(n), t.playable || r.classList.add("rrv-item-unplayable");
			let i = new Date(t.startTime), a = t.stats.lostParts ? ` · <span class="rrv-lost">${this.t.lost}: ${t.stats.lostParts}</span>` : "";
			r.innerHTML = `<div class="rrv-item-head"><span class="rrv-item-num">${n + 1}</span><span class="rrv-item-url" title="${mu(t.pageUrl)}">${mu(hu(t.pageUrl))}</span><span class="rrv-item-dur">${pu(t.duration)}</span></div><div class="rrv-item-sub">${i.toLocaleString()} · ${t.width}×${t.height}</div><div class="rrv-item-sub">${t.stats.events} ${this.t.events} · ${t.stats.clicks} ${this.t.clicks}${a}` + (t.playable ? "" : ` · <span class="rrv-lost">${this.t.unplayable}</span>`) + "</div>", r.addEventListener("click", () => this.select(n, this.opts.autoPlay || this.state === "playing")), e.append(r);
		}), this.highlightList();
	}
	highlightList() {
		this.ui.list.querySelectorAll(".rrv-item").forEach((e) => e.classList.toggle("rrv-item-active", Number(e.dataset.index) === this.currentIndex)), this.ui.list.querySelector(".rrv-item-active")?.scrollIntoView({ block: "nearest" });
	}
	renderInfo(e) {
		let { info: t } = this.ui;
		if (t.innerHTML = "", !e) return;
		let n = [];
		n.push([this.t.page, `<a href="${mu(e.pageUrl)}" target="_blank" rel="noopener">${mu(e.pageUrl || "—")}</a>${e.pageTitle ? ` — ${mu(e.pageTitle)}` : ""}`]), n.push([this.t.started, `${new Date(e.startTime).toLocaleString()} (${pu(e.duration)})`]);
		let r = e.meta;
		(r.browser || r.os) && n.push([this.t.browser, mu([r.browser, r.os].filter(Boolean).join(" · "))]), r.device && n.push([this.t.device, mu(r.device)]), (r.country || r.city || r.ip) && n.push([this.t.geo, mu([
			r.country,
			r.city,
			r.ip
		].filter(Boolean).join(" · "))]), n.push([this.t.viewport, `${e.width}×${e.height}`]), r.userId && n.push([this.t.user, mu(r.userId)]), n.push(["uid", `${mu(e.uid)} · ${e.stats.events} ${this.t.events} · ${e.stats.clicks} ${this.t.clicks} · snapshots: ${e.stats.snapshots} · batches: ${e.stats.batches}`]), e.warnings.length && n.push([this.t.warnings, mu(e.warnings.join("; "))]);
		for (let [e, r] of n) {
			let n = $("div", "rrv-info-row");
			n.append($("span", "rrv-info-key", mu(e)), $("span", "rrv-info-val", r)), t.append(n);
		}
	}
};
//#endregion
export { we as ClickHouseSource, xe as DEFAULT_COLUMNS, oe as PACK_MARK, vu as RrwebViewer, le as extractStrings, pu as formatDuration, be as groupByUid, ye as parseRows, Re as proxyRewriter, Le as rewriteAssetUrls, Pe as rewriteCssUrls, se as unpackEvent };

//# sourceMappingURL=rrweb-viewer.js.map