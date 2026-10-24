# Security

## Download integrity

Only download releases from this repository's **Releases** page.

Every release includes `SHA256SUMS.txt`. Verify the installer before running it:

```powershell
Get-FileHash .\MultiThreadDownloader-Setup.exe -Algorithm SHA256
```

Compare the result with the value in `SHA256SUMS.txt`.

## Automatic updates

The application verifies the SHA-256 checksum of every automatic update before
installing it. An update is rejected when the checksum is missing or does not
match.

The update manifest and update package should be served over HTTPS.

## Reporting a vulnerability

Please report security issues privately through GitHub's **Security → Report a
vulnerability** feature, or open an issue without including sensitive details.

Include:

- affected version;
- Windows version;
- steps to reproduce;
- impact;
- any relevant log output.

Please do not publish working exploit details before a fix is available.

## Scope

This repository contains compiled binaries and documentation only. Source code
changes are handled in the private source repository.
