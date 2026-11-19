/* ───────── natural dates: type "next friday 3pm" ───────── */
var When = (function () {
  var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  function sod(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function parseTime(s) {
    var m, out = { h: null, m: 0, rest: s };
    if ((m = /\b(?:at\s+)?(noon|midday)\b/.exec(s))) { out.h = 12; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(midnight)\b/.exec(s))) { out.h = 0; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/.exec(s))) { var h = +m[1] % 12; if (m[3] === 'pm') h += 12; out.h = h; out.m = +(m[2] || 0); out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(?:at\s+)?([01]?\d|2[0-3]):([0-5]\d)\b/.exec(s))) { out.h = +m[1]; out.m = +m[2]; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\bat\s+(\d{1,2})\b/.exec(s))) { var hh = +m[1]; if (hh >= 1 && hh <= 7) hh += 12; out.h = hh; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(eod|end of (?:the )?day)\b/.exec(s))) { out.h = 17; out.m = 30; out.rest = s.replace(m[0], ' ') + ' today'; return out; }
    if ((m = /\b(morning)\b/.exec(s))) { out.h = 9; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(afternoon)\b/.exec(s))) { out.h = 14; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(evening)\b/.exec(s))) { out.h = 18; out.rest = s.replace(m[0], ' '); return out; }
    if ((m = /\b(tonight)\b/.exec(s))) { out.h = 20; out.rest = s.replace(m[0], ' today '); return out; }
    return out;
  }
  function parse(input, now) {
    now = now || new Date();
    var s = String(input || '').toLowerCase().replace(/[,]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!s) return null;
    var t = parseTime(s); var rest = t.rest.replace(/\s+/g, ' ').trim();
    var today = sod(now), d = null, m;
    if ((m = /^in (\d+|a|an|half an?) ?(min|mins|minutes?|hours?|hrs?|h|days?|d|weeks?|w|months?)$/.exec(rest))) {
      var n = /^(a|an)$/.test(m[1]) ? 1 : /half/.test(m[1]) ? 0.5 : +m[1], u = m[2][0] === 'm' && /^mo/.test(m[2]) ? 'mo' : m[2][0];
      var x = new Date(now);
      if (u === 'm') x = new Date(+now + n * 60000); else if (u === 'h') x = new Date(+now + n * 3600000);
      else if (u === 'd') x = addDays(now, n); else if (u === 'w') x = addDays(now, n * 7); else if (u === 'mo') x.setMonth(x.getMonth() + n);
      return { date: x, hasTime: u === 'm' || u === 'h' || t.h != null ? true : false, fromNow: true };
    }
    if (/^(today|now)?$/.test(rest)) d = (rest === '' && t.h == null) ? null : today;
    else if (/^(tomorrow|tmrw|tmr)$/.test(rest)) d = addDays(today, 1);
    else if (/^(yesterday)$/.test(rest)) d = addDays(today, -1);
    else if (/^(the )?(weekend|this weekend)$/.test(rest)) d = addDays(today, (6 - today.getDay() + 7) % 7 || 7);
    else if (/^(eow|end of (the )?week)$/.test(rest)) d = addDays(today, (5 - today.getDay() + 7) % 7);
    else if (/^next week$/.test(rest)) d = addDays(today, ((8 - today.getDay()) % 7) || 7);
    else if (/^next month$/.test(rest)) { d = new Date(today); d.setMonth(d.getMonth() + 1, 1); }
    else if ((m = /^(next |this |on )?(sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)[a-z]*$/.exec(rest))) {
      var idx = DAYS.map(function (x) { return x.slice(0, 3); }).indexOf(m[2].slice(0, 3));
      var diff = (idx - today.getDay() + 7) % 7; if (diff === 0) diff = 7;
      d = addDays(today, diff);
    } else if ((m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(rest))) d = new Date(+m[1], +m[2] - 1, +m[3]);
    else if ((m = /^(\d{1,2})(?:st|nd|rd|th)? ?([a-z]{3})[a-z]*(?: (\d{4}))?$/.exec(rest)) && MONTHS.indexOf(m[2]) >= 0) d = new Date(m[3] ? +m[3] : today.getFullYear(), MONTHS.indexOf(m[2]), +m[1]);
    else if ((m = /^([a-z]{3})[a-z]* (\d{1,2})(?:st|nd|rd|th)?(?: (\d{4}))?$/.exec(rest)) && MONTHS.indexOf(m[1]) >= 0) d = new Date(m[3] ? +m[3] : today.getFullYear(), MONTHS.indexOf(m[1]), +m[2]);
    else if ((m = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/.exec(rest))) { var yr = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : today.getFullYear(); d = new Date(yr, +m[2] - 1, +m[1]); }
    else return null;
    if (!d) { d = today; if (t.h != null) { var c = new Date(today); c.setHours(t.h, t.m); if (c < now) d = addDays(today, 1); } }
    else if (!/\b\d{4}\b/.test(rest) && d < today && /(\d|[a-z]{3}) ?[a-z]*$/.test(rest) && (MONTHS.indexOf((/[a-z]{3}/.exec(rest) || [''])[0]) >= 0)) d = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    var out = new Date(d); if (t.h != null) out.setHours(t.h, t.m, 0, 0);
    return { date: out, hasTime: t.h != null };
  }
  function fmt(r, now) {
    var d = r.date, f = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }).format(d);
    var t = r.hasTime ? new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d) : '';
    var days = Math.round((sod(d) - sod(now || new Date())) / 864e5);
    var rel = days === 0 ? 'today' : days === 1 ? 'tomorrow' : days === -1 ? 'yesterday' : days > 1 && days < 14 ? 'in ' + days + ' days' : days < 0 ? Math.abs(days) + ' days ago' : '';
    return { day: f, time: t, rel: rel };
  }
  return { parse: parse, format: fmt };
})();
B.When = When;

