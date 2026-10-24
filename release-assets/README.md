# Release assets

这个目录用于暂存需要上传到 GitHub Releases 的文件：

- `MultiThreadDownloader-Setup.exe`（Windows）
- `MultiThreadDownloader-Linux-x64.tar.gz`（Linux x64）
- `update.zip`（Windows 自动更新）
- `SHA256SUMS.txt`

这些大文件已被仓库的 `.gitignore` 排除，不会进入 Git 历史。请在 GitHub
Release 页面手动上传它们。

生成方式见仓库根目录的 `UPLOAD-GUIDE.md`，或在源码目录运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\build-public.ps1 -Owner zyn392 -Repo MultiThreadDownloader
```
