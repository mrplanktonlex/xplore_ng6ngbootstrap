// Shows basics of TestScheduler (rxjs/testing), Observable + Notification (rxjs)

// https://chrisnoring.gitbooks.io/rxjs-5-ultimate/content/testing.html
// https://github.com/ReactiveX/rxjs/blob/master/spec/schedulers/TestScheduler-spec.ts  <<<<======== VIMP.

import { Observable, Notification } from 'rxjs';
// import * as Rx from 'rxjs';
// import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';
import { take } from 'rxjs/operators';
// import 'rxjs/add/observable/interval'; // doesnt work anymore

const testScheduler = new TestScheduler(null);

describe('TestScheduler', () => {
  it('should exist', () => {
    expect(TestScheduler).toBeTruthy();
    // expect(TestScheduler).toBeFalsy(); // expected to fail
  });
});

describe('parseMarbles()', () => {
    it('should parse a marble string into a series of notifications and types', () => {
      const result = TestScheduler.parseMarbles('-------a---b---|', { a: 'A', b: 'B' });
      expect(result).toEqual([
        { frame: 70, notification: Notification.createNext('A') },    // Notification is defined in rxjs
        { frame: 110, notification: Notification.createNext('B') },
        { frame: 150, notification: Notification.createComplete() }
      ]);
    });

    it('should parse a marble string with a subscription point', () => {
      const result = TestScheduler.parseMarbles('---^---a---b---|', { a: 'A', b: 'B' });
      expect(result).toEqual([
        { frame: 40, notification: Notification.createNext('A') },
        { frame: 80, notification: Notification.createNext('B') },
        { frame: 120, notification: Notification.createComplete() }
      ]);
    });

    it('should parse a marble string with an error', () => {
      const result = TestScheduler.parseMarbles('-------a---b---#', { a: 'A', b: 'B' }, 'omg error!');
      expect(result).toEqual([
        { frame: 70, notification: Notification.createNext('A') },
        { frame: 110, notification: Notification.createNext('B') },
        { frame: 150, notification: Notification.createError('omg error!') }
      ]);
    });

    it('should default in the letter for the value if no value hash was passed', () => {
      const result = TestScheduler.parseMarbles('--a--b--c--');
      expect(result).toEqual([
        { frame: 20, notification: Notification.createNext('a') },
        { frame: 50, notification: Notification.createNext('b') },
        { frame: 80, notification: Notification.createNext('c') },
      ]);
    });

    it('should handle grouped values', () => {
      const result = TestScheduler.parseMarbles('---(abc)---');
      expect(result).toEqual([
        { frame: 30, notification: Notification.createNext('a') },
        { frame: 30, notification: Notification.createNext('b') },
        { frame: 30, notification: Notification.createNext('c') }
      ]);
    });

    it('should ignore whitespace when runMode=true', () => {
      const runMode = true;
      const result = TestScheduler.parseMarbles('  -a - b -    c |       ', { a: 'A', b: 'B', c: 'C' }, undefined, undefined, runMode);
      expect(result).toEqual([
        { frame: 10, notification: Notification.createNext('A') },
        { frame: 30, notification: Notification.createNext('B') },
        { frame: 50, notification: Notification.createNext('C') },
        { frame: 60, notification: Notification.createComplete() }
      ]);
    });

    it('should suppport time progression syntax when runMode=true', () => {
      const runMode = true;
      const result = TestScheduler.parseMarbles('10.2ms a 1.2s b 1m c|', { a: 'A', b: 'B', c: 'C' }, undefined, undefined, runMode);
      expect(result).toEqual([
        { frame: 10.2, notification: Notification.createNext('A') },
        { frame: 10.2 + 10 + (1.2 * 1000), notification: Notification.createNext('B') },
        { frame: 10.2 + 10 + (1.2 * 1000) + 10 + (1000 * 60), notification: Notification.createNext('C') },
        { frame: 10.2 + 10 + (1.2 * 1000) + 10 + (1000 * 60) + 10, notification: Notification.createComplete() }
      ]);
    });

});

