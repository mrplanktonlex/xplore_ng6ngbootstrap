import { TestScheduler } from 'rxjs/testing/';

describe('createTime()', () => {
    it('should parse a simple time marble string to a number', () => {
      const scheduler = new TestScheduler(null);
      const time = scheduler.createTime('-----|'); // NOTICE .createtime()
      expect(time).toEqual(50);
    });

    it('should throw if not given good marble input', () => {
      const scheduler = new TestScheduler(null);
      expect(() => {
        scheduler.createTime('-a-b-#');
      }).toThrow();
    });

  });
