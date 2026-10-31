// Default-sensitive: all runtime source can affect private/shared boundaries or amounts.
export function isHighRiskDiff(diff) {
  return diff.split('\n').filter(line => line.startsWith('diff --git ')).some(line => /(?:^diff --git | )"?[ab]\/(?:src\/|tools\/|\.husky\/|\.github\/|\.storybook\/|\.(?:agents|claude)(?:\/|\b)|\.semgrep\/|AGENTS\.md\b|CLAUDE\.md\b|package\.json\b|pnpm-lock\.yaml\b|pnpm-workspace\.yaml\b|.*\.config\.[cm]?[jt]s\b)/i.test(line));
}
