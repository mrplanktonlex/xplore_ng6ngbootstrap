/*
    - : means frame i.e units of 10
    ^ : means subscribed frame/point. In a marble diagram, there can be only one subscription point.
        // Error: found a second subscription point '^' in a subscription marble diagram. There can only be one.
    ! : means unsubscribed Frame/point.


*/

import { TestScheduler } from 'rxjs/testing/';

describe('parseMarblesAsSubscriptions()', () => {
    it('should parse a subscription marble string into a subscriptionLog', () => {
      const result = TestScheduler.parseMarblesAsSubscriptions('---^---!-');
      expect(result.subscribedFrame).toEqual(30);
      expect(result.unsubscribedFrame).toEqual(70);
    });

    // MYJS #1
    it('MYJS #1: should parse a subscription marble string into a subscriptionLog', () => {
      const result = TestScheduler.parseMarblesAsSubscriptions('--^--!--'); // JS changed this to test it
      expect(result.subscribedFrame).toEqual(20);
      expect(result.unsubscribedFrame).toEqual(50);
    });

    // MYJS #2: Error: found a second subscription point '^' in a subscription marble diagram. There can only be one.
    it('MYJS #2: should parse a subscription marble string into a subscriptionLog', () => {
    // Error: found a second subscription point '^' in a subscription marble diagram. There can only be one.
    //   const result = TestScheduler.parseMarblesAsSubscriptions('--^--!--^--!--');
    //   expect(result.subscribedFrame).toEqual(20);
    //   expect(result.unsubscribedFrame).toEqual(50);
    });


    it('should parse a subscription marble string with an unsubscription', () => {
      const result = TestScheduler.parseMarblesAsSubscriptions('---^-'); // no unsubscription.
      expect(result.subscribedFrame).toEqual(30);
      expect(result.unsubscribedFrame).toEqual(Number.POSITIVE_INFINITY);
    });

    // WTH is synchronous unsubscription ??
    it('should parse a subscription marble string with a synchronous unsubscription', () => {
      const result = TestScheduler.parseMarblesAsSubscriptions('---(^!)-');
      expect(result.subscribedFrame).toEqual(30);
      expect(result.unsubscribedFrame).toEqual(30);
    });

    it('should ignore whitespace when runMode=true', () => {
      const runMode = true;
      const result = TestScheduler.parseMarblesAsSubscriptions('  - -  - -  ^ -   - !  -- -      ', runMode);
      expect(result.subscribedFrame).toEqual(40);
      expect(result.unsubscribedFrame).toEqual(70);
    });

    it('should suppport time progression syntax when runMode=true', () => {
      const runMode = true;
      const result = TestScheduler.parseMarblesAsSubscriptions('10.2ms ^ 1.2s - 1m !', runMode);
      expect(result.subscribedFrame).toEqual(10.2);
      expect(result.unsubscribedFrame).toEqual(10.2 + 10 + (1.2 * 1000) + 10 + (1000 * 60));
    });

});
