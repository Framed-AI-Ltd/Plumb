import * as stylex from '@stylexjs/stylex';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
const styles = stylex.create({ probe: { opacity: 0.42 } });
it('compiles StyleX declarations in the SSR test pipeline', () => {
  const markup = renderToStaticMarkup(<div {...stylex.props(styles.probe)}>transform probe</div>);
  expect(markup).toMatch(/class="[^"]+"/);
  expect(markup).not.toContain('style=');
});
