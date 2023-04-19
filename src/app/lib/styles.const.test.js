import * as styles from './styles.const';

describe('Styles', () => {
  Object.keys(styles).forEach(style => {
    const value = styles[style];
    it(`${style} should match text`, () => {
      expect(value).toMatchSnapshot();
    });
  });
});
