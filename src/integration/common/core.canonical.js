export default () => {
  if (process.env.DEV_MODE) return;

  it('Bundle scripts', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(?:comscore\\/)?(main|framework|commons|shared|${global.service}|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );

    bbcOriginScripts.forEach(bbcOriginScript => {
      expect(bbcOriginScript.getAttribute('src')).toMatch(bundleScriptMatcher);
    });
  });

  it('Service bundle is loaded', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(${global.service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );
    const serviceScripts = bbcOriginScripts.filter(script =>
      bundleScriptMatcher.test(script.getAttribute('src')),
    );

    expect(serviceScripts.length).toBe(1);
  });
};
