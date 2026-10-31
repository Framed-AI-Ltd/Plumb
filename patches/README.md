# Development dependency compatibility

`minimatch@11.0.2.patch` restores callable CommonJS and default ESM exports for older lint consumers. The patched matcher implementation itself is unchanged. Integration tests cover legacy and modern consumers and the dependency security floors.

The upstream ISC notice is preserved in [minimatch-LICENSE.txt](minimatch-LICENSE.txt). Remove this compatibility patch when all development consumers support the modern export shape; keep the security and compatibility regressions.
