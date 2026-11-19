/* ───────── greetings with opinions ───────── */
var Greet = (function () {
  var last = '';
  var BANDS = [
    [[0, 5], 'Still up, {n}?', ['Bold choice. The tasks will still be here, sadly.', 'Nothing good happens after 2am, apart from deploys, apparently.', 'Sleep is a feature. You might want to enable it.']],
    [[5, 9], 'Morning, {n}.', ['Up before the kettle. Terrifying.', 'Tea first. Productivity second. Rules are rules.', 'The early bird gets the worm. The worm, one imagines, had objections.']],
    [[9, 12], 'Good morning, {n}.', ["Let's pretend we have this under control.", 'Plenty of day left to disappoint yourself in.', 'Coffee is a valid first task.']],
    [[12, 14], 'Afternoon-ish, {n}.', ['Lunch is also a task. Do consider it.', 'Technically still morning somewhere. Not here.', 'A sandwich would fix at least three of these problems.']],
    [[14, 17], 'Afternoon, {n}.', ['Peak slump. A biscuit is strongly advised.', 'The afternoon: nature\'s way of testing resolve.', 'Almost there. "There" being a nebulous concept.']],
    [[17, 21], 'Evening, {n}.', ['Technically off the clock. Spiritually, too.', 'Whatever is left can wait. Probably. Possibly.', 'Ah, the traditional hour of ambitious plans.']],
    [[21, 24], 'Late one, {n}.', ['Any more tasks and we shall start charging overtime.', 'The day has been good to you. Mostly. Go to bed.', 'Last one, then. And you do not mean it.']]
  ];
  function line(name, o) {
    o = o || {}; var h = o.now ? o.now.getHours() : new Date().getHours(), b = BANDS.filter(function (x) { return h >= x[0][0] && h < x[0][1]; })[0] || BANDS[0];
    var wit;
    if (o.left === 0) wit = 'Nothing left. Suspiciously efficient.';
    else if (o.left > 12) wit = o.left + ' to go. Ambitious. Optimistic, even.';
    else if (o.done > 4 && o.left < 5) wit = 'Look at you, being productive in public.';
    else wit = pick(b[2], last);
    last = wit; return { hi: b[1].replace('{n}', name || 'you'), wit: wit, name: name || 'you' };
  }
  return { line: line, html: function (name, o) { var g = line(name, o); return '<div class="br-greeting"><h2 class="br-greeting__hi">' + esc(g.hi).replace(esc(g.name), '<em>' + esc(g.name) + '</em>') + '</h2><p class="br-wit br-body-lg" style="margin:0">' + esc(g.wit) + '</p></div>'; } };
})();

