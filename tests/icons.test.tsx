import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Search, styleIcon } from '../src/lib/icons';

it('keeps decorative Lucide icons hidden while preserving explicit accessible names', () => {
  const decorative = renderToStaticMarkup(<Search />);
  expect(decorative).toContain('aria-hidden="true"');
  const labelled = renderToStaticMarkup(<Search aria-label="Find work" role="img" aria-hidden={false} />);
  expect(labelled).toContain('aria-label="Find work"');
  expect(labelled).toContain('role="img"');
  expect(labelled).not.toContain('aria-hidden="true"');
});

it('preserves supplied icon names and classes through the shared style wrapper', () => {
  const markup = renderToStaticMarkup(styleIcon(<Search aria-label="Find work" className="consumer-icon" />));
  expect(markup).toContain('consumer-icon');
  expect(markup).toContain('aria-label="Find work"');
  expect(markup).not.toContain('aria-hidden="true"');
});
