const storybookPackages = ['storybook', '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/react-vite'];

export function dependencyProblems(pkg, runtime) {
  const problems = [];
  const major = runtime.trim().match(/^(?:v)?(\d+)(?:\.|$)/)?.[1];
  if (!major || !new RegExp(`^[~^]?${major}\\.\\d+\\.\\d+$`).test(pkg.devDependencies['@types/node'] ?? '')) {
    problems.push('Node typings must stay on the configured runtime major');
  }
  for (const name of storybookPackages) {
    if (pkg.devDependencies[name] !== pkg.devDependencies.storybook) problems.push(`${name} must match the Storybook core version`);
  }
  return problems;
}

export function workflowProblems(source) {
  const problems = [];
  for (const match of source.matchAll(/^\s*(?:-\s*)?uses:\s*(\S+)/gm)) {
    if (!match[1].startsWith('./') && !/^[\w./-]+@[a-f0-9]{40}$/.test(match[1])) problems.push('Remote actions must use immutable commit pins');
    if (match[1].startsWith('actions/checkout@')) {
      const rest = source.slice(match.index + match[0].length);
      const step = rest.split(/\n\s*-\s+(?:uses|name|run|id):/)[0];
      if (!/persist-credentials:\s*false/.test(step)) problems.push('Checkout credentials must not persist');
    }
  }
  if (/allow-unsafe-pr-checkout:\s*(?!false\b)\S+/.test(source)) problems.push('Checkout PR safety must remain enabled');
  return problems;
}
