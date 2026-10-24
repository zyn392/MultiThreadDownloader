# 发布到 GitHub + Cloudflare Pages

本仓库同时承担两个角色：

- **GitHub**：保存静态页面、更新清单和发布记录；
- **Cloudflare Pages**：把仓库根目录的 `index.html`、`manifest.json`、`assets/` 作为网站发布；
- **GitHub Releases**：存放大文件安装包和更新包。

## 1. 大文件限制

Cloudflare Pages 单个文件通常限制为 **25 MiB**，GitHub 普通仓库单文件限制为 **100 MiB**。

当前文件大小约：

- `MultiThreadDownloader-Setup.exe`：133.2 MB
- `update.zip`：64.4 MB

因此两个文件都放在 **GitHub Releases**，不放进仓库。仓库只保留：

```text
index.html
manifest.json
assets/
_headers
README.md
```

## 2. 确认 Cloudflare Pages

Cloudflare Pages 项目已经连接：

```text
https://github.com/zyn392/MultiThreadDownloader
```

构建配置应为：

- Framework preset：None
- Build command：留空
- Build output directory：`/`
- 根目录：`/`

部署后，更新清单地址为：

```text
https://multithreaddownloader.pages.dev/manifest.json
```

例如：

```text
https://multithreaddownloader.pages.dev/manifest.json
```

请以 Cloudflare 控制台中显示的实际域名为准。

## 3. 构建公开版

在源码目录运行（把 `PagesUrl` 换成你的 Cloudflare Pages 域名）：

```powershell
powershell -ExecutionPolicy Bypass -File .\build-public.ps1 `
  -Owner zyn392 `
  -Repo MultiThreadDownloader `
  -Version 2.3.0 `
  -PagesUrl https://multithreaddownloader.pages.dev
```

脚本会：

1. 生成带 Cloudflare Pages 默认更新地址的 Windows 安装包；
2. 生成 `update.zip`；
3. 生成 `manifest.json`，其中 `url` 指向 GitHub Release；
4. 把发布文件复制到 `release-assets/`；
5. 把 `manifest.json` 复制到本仓库根目录。

## 4. 上传仓库

```powershell
cd "C:/Users/62605/OneDrive/Desktop/MultiThreadDownloader-GitHub"
git push
```

本文件夹已经是一个本地 Git 仓库，并已基于远程 `main` 创建提交；首次推送时登录 GitHub 即可。

`manifest.json`、`index.html`、`_headers` 必须位于 `main` 分支根目录，Cloudflare Pages 才能直接发布它们。

## 5. 创建 GitHub Release

打开：

```text
https://github.com/zyn392/MultiThreadDownloader/releases
```

创建 `v2.3.0`，上传：

- `release-assets/MultiThreadDownloader-Setup.exe`
- `release-assets/update.zip`
- `release-assets/SHA256SUMS.txt`

不要把 `.exe` 或 `.zip` 提交进 Git 仓库。

## 6. 验证

部署完成后依次检查：

1. 打开 Pages 首页，确认下载按钮可用；
2. 访问 `https://multithreaddownloader.pages.dev/manifest.json`，确认版本和 SHA-256；
3. 确认清单中的 `url` 指向 GitHub Release 的 `update.zip`；
4. 安装旧版本，启动程序，确认能自动发现并安装新版本。

如果 Pages 返回旧清单，检查 Cloudflare Pages 是否重新部署了最新 `main` 提交，以及 `_headers` 是否生效。

## 7. 不公开的内容

本仓库不要加入：

- `.cs` / `.csproj` / `.sln` 源文件
- 构建脚本
- PDB、XML 调试文件
- 开发者密码
- 测试用户数据和下载记录
