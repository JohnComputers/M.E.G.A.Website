M.E.G.A. — placeholder download artifact
========================================

This ZIP is a PLACEHOLDER so the secure download flow works end-to-end during
development and demos. It does NOT contain the real M.E.G.A. application.

BEFORE GOING LIVE:
  Replace this file with your real distribution build, named:
      private/mega-app.zip

  (Or point the MEGA_ZIP_PATH environment variable at your real ZIP.)

The file in /private is never served publicly. It is released only through
/api/download/file with a valid, single-use, signed token that is issued after a
confirmed Square payment (see README.md).
