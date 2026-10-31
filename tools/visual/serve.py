"""Serve one frozen Storybook build for visual tests without shell path interpolation."""
import functools
import http.server
import os
import pathlib
import sys

root = pathlib.Path(os.environ.get("VISUAL_STORYBOOK_DIR", "storybook-static")).resolve()
if not (root / "index.json").is_file():
    raise SystemExit("Build Storybook before running visual tests")
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
server = http.server.ThreadingHTTPServer(("127.0.0.1", int(sys.argv[1])), handler)
server.serve_forever()
