import { isDataStale, shouldRenderLastUpdated } from './isDataStale';

const epochTimeNow = Date.now();
const currentTime = new Date();

const calcTimestampMinutesAgo = minutes =>
  new Date(epochTimeNow - 60 * 1000 * minutes).toUTCString();

const calcTimestampDaysAgo = days =>
  new Date(epochTimeNow - 24 * 60 * 60 * 1000 * days);

describe('mostReadRecordIsFresh', () => {
  it('should return true if 60 minutes ago or less', () => {
    expect(isDataStale(currentTime.toUTCString())).toEqual(false);
    expect(isDataStale(calcTimestampMinutesAgo(59))).toEqual(false);
  });

  it('should return false if more than 60 minutes ago', () => {
    expect(isDataStale(calcTimestampMinutesAgo(61))).toEqual(true);
    expect(isDataStale(calcTimestampDaysAgo(1))).toEqual(true);
  });
});

describe('shouldRenderLastUpdated', () => {
  it('should return lastUpdated time if older than 60 days', () => {
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(61))).toEqual(true);
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(100))).toEqual(true);
  });

  it('should return null if less than 60 days old', () => {
    expect(shouldRenderLastUpdated(currentTime)).toEqual(false);
    expect(shouldRenderLastUpdated(calcTimestampDaysAgo(59))).toEqual(false);
  });
});
