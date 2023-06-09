import moment from 'moment';
import './ky';

moment.locale('ky');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('parse', () => {
  const tests =
    'январь янв_февраль фев_март март_апрель апр_май май_июнь июнь_июль июль_август авг_сентябрь сен_октябрь окт_ноябрь ноя_декабрь дек'.split(
      '_'
    );

  function equalTest(input, mmm, i) {
    assert.equal(
      moment(input, mmm).month(),
      i,
      `${input} should be month ${i + 1}`
    );
  }

  let i;
  for (i = 0; i < 12; i += 1) {
    tests[i] = tests[i].split(' ');
    equalTest(tests[i][0], 'MMM', i);
    equalTest(tests[i][1], 'MMM', i);
    equalTest(tests[i][0], 'MMMM', i);
    equalTest(tests[i][1], 'MMMM', i);
    equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
    equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
    equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
  }
});

test('format', () => {
  const a = [
    ['dddd, Do MMMM YYYY, HH:mm:ss', 'Жекшемби, 14-чү февраль 2010, 15:25:50'],
    ['ddd, hA', 'Жек, 3PM'],
    ['M Mo MM MMMM MMM', '2 2-чи 02 февраль фев'],
    ['YYYY YY', '2010 10'],
    ['D Do DD', '14 14-чү 14'],
    ['d do dddd ddd dd', '0 0-чү Жекшемби Жек Жк'],
    ['DDD DDDo DDDD', '45 45-чи 045'],
    ['w wo ww', '7 7-чи 07'],
    ['h hh', '3 03'],
    ['H HH', '15 15'],
    ['m mm', '25 25'],
    ['s ss', '50 50'],
    ['a A', 'pm PM'],
    ['[жылдын] DDDo [күнү]', 'жылдын 45-чи күнү'],
    ['LTS', '15:25:50'],
    ['L', '14.02.2010'],
    ['LL', '14 февраль 2010'],
    ['LLL', '14 февраль 2010 15:25'],
    ['LLLL', 'Жекшемби, 14 февраль 2010 15:25'],
    ['l', '14.2.2010'],
    ['ll', '14 фев 2010'],
    ['lll', '14 фев 2010 15:25'],
    ['llll', 'Жек, 14 фев 2010 15:25'],
  ];
  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  let i;
  for (i = 0; i < a.length; i += 1) {
    assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
  }
});

test('format ordinal', () => {
  assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-чи', '1st');
  assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-чи', '2nd');
  assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-чү', '3rd');
  assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-чү', '4th');
  assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-чи', '5th');
  assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-чы', '6th');
  assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-чи', '7th');
  assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-чи', '8th');
  assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-чу', '9th');
  assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-чу', '10th');

  assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-чи', '11th');
  assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-чи', '12th');
  assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-чү', '13th');
  assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-чү', '14th');
  assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-чи', '15th');
  assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-чы', '16th');
  assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-чи', '17th');
  assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-чи', '18th');
  assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-чу', '19th');
  assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-чы', '20th');

  assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-чи', '21st');
  assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-чи', '22nd');
  assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-чү', '23rd');
  assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-чү', '24th');
  assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-чи', '25th');
  assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-чы', '26th');
  assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-чи', '27th');
  assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-чи', '28th');
  assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-чу', '29th');
  assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-чу', '30th');

  assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-чи', '31st');
});

test('format month', () => {
  const expected =
    'январь янв_февраль фев_март март_апрель апр_май май_июнь июнь_июль июль_август авг_сентябрь сен_октябрь окт_ноябрь ноя_декабрь дек'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, i, 1]).format('MMMM MMM'),
      expected[i],
      expected[i]
    );
  }
});

test('format week', () => {
  const expected =
    'Жекшемби Жек Жк_Дүйшөмбү Дүй Дй_Шейшемби Шей Шй_Шаршемби Шар Шр_Бейшемби Бей Бй_Жума Жум Жм_Ишемби Ише Иш'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, 0, 2 + i]).format('dddd ddd dd'),
      expected[i],
      expected[i]
    );
  }
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'бирнече секунд',
    '44 seconds = a few seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    '1 мүнөт',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    '1 мүнөт',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '2 мүнөт',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '44 мүнөт',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    '1 саат',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    '1 саат',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '2 саат',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '5 саат',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '21 саат',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'бир күн',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'бир күн',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    '2 күн',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'бир күн',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    '5 күн',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    '25 күн',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'бир ай',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'бир ай',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
    'бир ай',
    '43 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    '2 ай',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    '2 ай',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    '3 ай',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'бир ай',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    '5 ай',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'бир жыл',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    '2 жыл',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'бир жыл',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    '5 жыл',
    '5 years = 5 years'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'бирнече секунд ичинде', 'prefix');
  assert.equal(moment(0).from(30000), 'бирнече секунд мурда', 'suffix');
});

test('now from now', () => {
  assert.equal(
    moment().fromNow(),
    'бирнече секунд мурда',
    'now from now should display as in the past'
  );
});

test('fromNow', () => {
  assert.equal(
    moment().add({ s: 30 }).fromNow(),
    'бирнече секунд ичинде',
    'in a few seconds'
  );
  assert.equal(moment().add({ d: 5 }).fromNow(), '5 күн ичинде', 'in 5 days');
});

test('calendar day', () => {
  const a = moment().hours(12).minutes(0).seconds(0);

  assert.equal(
    moment(a).calendar(),
    'Бүгүн саат 12:00',
    'today at the same time'
  );
  assert.equal(
    moment(a).add({ m: 25 }).calendar(),
    'Бүгүн саат 12:25',
    'Now plus 25 min'
  );
  assert.equal(
    moment(a).add({ h: 1 }).calendar(),
    'Бүгүн саат 13:00',
    'Now plus 1 hour'
  );
  assert.equal(
    moment(a).add({ d: 1 }).calendar(),
    'Эртең саат 12:00',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(a).subtract({ h: 1 }).calendar(),
    'Бүгүн саат 11:00',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(a).subtract({ d: 1 }).calendar(),
    'Кечээ саат 12:00',
    'yesterday at the same time'
  );
});

test('calendar next week', () => {
  let i;
  let m;
  for (i = 2; i < 7; i += 1) {
    m = moment().add({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd [саат] LT'),
      `Today + ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd [саат] LT'),
      `Today + ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd [саат] LT'),
      `Today + ${i} days end of day`
    );
  }
});

test('calendar last week', () => {
  let i;
  let m;

  for (i = 2; i < 7; i += 1) {
    m = moment().subtract({ d: i });
    assert.equal(
      m.calendar(),
      m.format('[Өткөн аптанын] dddd [күнү] [саат] LT'),
      `Today - ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('[Өткөн аптанын] dddd [күнү] [саат] LT'),
      `Today - ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('[Өткөн аптанын] dddd [күнү] [саат] LT'),
      `Today - ${i} days end of day`
    );
  }
});

test('calendar all else', () => {
  let weeksAgo = moment().subtract({ w: 1 });
  let weeksFromNow = moment().add({ w: 1 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

  weeksAgo = moment().subtract({ w: 2 });
  weeksFromNow = moment().add({ w: 2 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday formatted', () => {
  assert.equal(
    moment([2012, 0, 1]).format('w ww wo'),
    '1 01 1-чи',
    'Jan  1 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 2]).format('w ww wo'),
    '2 02 2-чи',
    'Jan  2 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 8]).format('w ww wo'),
    '2 02 2-чи',
    'Jan  8 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 9]).format('w ww wo'),
    '3 03 3-чү',
    'Jan  9 2012 should be week 3'
  );
  assert.equal(
    moment([2012, 0, 15]).format('w ww wo'),
    '3 03 3-чү',
    'Jan 15 2012 should be week 3'
  );
});
