<img src="assets/logo.png" width="72" alt="Multi-Thread Downloader">

# 多线程下载器 · Multi-Thread Downloader

Windows 平台的多协议多线程下载工具，支持 HTTP、HTTPS、FTP、BT 种子、磁力链接和主流网盘分享页，使用 CPU 性能自动推荐线程数，支持分段下载、断点续传、批量队列和已下载文件列表。

> **这是二进制发布仓库，不包含源代码。**
>
> 本仓库只发布编译后的安装包、更新包和静态下载页，应用程序源代码保持私有。因此它属于“公开二进制分发仓库”，不是 OSI 定义的开源软件仓库。

**最新版本：v2.5.0**

## 下载

请前往本仓库的 **Releases** 页面下载最新版本：

- `MultiThreadDownloader-Setup.exe`：Windows 单文件安装包
- `update.zip`：自动更新包（供程序内部使用，普通用户无需手动下载）
- `MultiThreadDownloader-Extension.zip`：Edge / Chrome 浏览器扩展（可选，程序内也可一键解压安装）
- `SHA256SUMS.txt`：所有发布文件的 SHA-256 校验值

[前往 Releases 下载](../../releases/latest)

本仓库根目录的 `index.html` 是面向 Cloudflare Pages 的静态下载页。

## 功能

- **全协议下载**：支持 HTTP、HTTPS、FTP / FTPS、`.torrent` 种子文件和 `magnet:` 磁力链接。
- **网盘工作台**：内置网盘浏览器，支持百度、阿里、移动、天翼、迅雷、夸克、UC、123 等分享页；登录并选择文件后捕获官方直链，自动携带 Cookie / Referer / User-Agent 进行多线程下载。
- **浏览器扩展**：Edge / Chrome 扩展可扫描当前网页的图片、视频、音频和媒体直链，发送到下载器多线程下载；浏览器手动下载也会被接管。程序启动时自动检测，未安装会提示。
- **全局限速**：可设置不限速、1 / 5 / 10 / 20 MB/s 或自定义速度。HTTP 多线程任务的所有线程共享同一额度，合计不超过上限；FTP / BT 对之后开始的任务生效；自动更新不受限速影响。
- **CPU 智能线程数**：根据逻辑核心数与基础频率自动推荐线程数，默认上限 128，开发者模式可调整到 512。
- **多线程分段下载**：使用 HTTP Range 并发下载，实时显示每个线程的进度、速度和状态。
- **FTP 断点续传**：使用单连接下载，支持用户名密码、`.part` 续传和进度显示。
- **BT / 磁力下载**：基于 MonoTorrent，支持 DHT / PEX、分片进度、Peer 与种子数量显示。
- **批量下载**：一次粘贴多个链接，按顺序执行；支持队列停止、移出和失败重试。
- **已下载文件列表**：自动记录完成的文件，可打开文件、打开目录、重新下载或移除记录。
- **暂停 / 继续 / 断点续传**：使用 `.part` 和 `.part.json` 保留中断状态。
- **单线程回退**：服务器不支持 Range 时自动切换为单连接下载。
- **自动更新**：程序每次启动后会检查一次更新；更新包使用 HTTP Range 多线程分段下载（最多 32 线程），校验 SHA-256 后替换主程序并重启；更新提示支持 `description` 简介。
- **主题与语言**：浅色 / 深色 / 跟随系统，简体中文 / English。
- **开机自启动**：以最小化方式启动，并保留全局快捷键。
- **全局快捷键**：复制链接后按 `Ctrl+Alt+D` 即可开始下载。
- **开发者模式**：在设置中解锁后可调整最大线程数（1–512）；更新服务器请保持默认，否则可能收不到新版本。

## 系统要求

- Windows 10 / 11，x64
- Microsoft Edge WebView2 Runtime（Windows 11 通常已内置；Windows 10 如缺失请先从 Microsoft 官网安装）
- 安装包为自包含版本，不需要预装 .NET

## 安装

1. 从 Releases 下载 `MultiThreadDownloader-Setup.exe`。
2. 运行安装程序，阅读并同意免责声明。
3. 选择安装目录，完成安装。
4. 安装程序会创建开始菜单快捷方式，桌面快捷方式可选。

程序默认安装到：

```text
%LOCALAPPDATA%\Programs\MultiThreadDownloader
```

### 卸载

再次运行安装程序，检测到已安装后会进入卸载界面；也可以在 Windows「设置 → 应用 → 已安装的应用」中卸载。

卸载会删除程序文件、快捷方式、开机启动项、缓存和设置。**已经下载的文件不会被删除。**

## 浏览器扩展

程序启动时会检测 Edge / Chrome 中的扩展。未安装时首页会出现提示，可以：

1. 点击「Edge 安装」或「Chrome 安装」，程序会把扩展解压到：

```text
%LOCALAPPDATA%\MultiThreadDownloader\BrowserExtension
```

2. 在打开的扩展页启用「开发者模式」。
3. 点击「加载解压缩的扩展」，选择上面的文件夹。
4. 回到下载器点击「重新检测」。

扩展功能：

- 扫描网页中的图片、视频、音频和媒体直链
- 勾选后发送到下载器，使用多线程引擎下载
- 接管浏览器普通下载：取消浏览器下载并转交下载器
- 自动携带当前站点的 Cookie、Referer、User-Agent
- 图片 / 视频 / 链接右键菜单快捷下载

扩展通过 Chrome Native Messaging 通信，下载器启动时会自动注册本机 Native Host。扩展 ID 固定，只有该扩展可以连接。扩展会随安装包提供，也可从 Releases 下载 `MultiThreadDownloader-Extension.zip`；扩展源码不在公开仓库。

> 扩展只能捕获页面中直接可访问的媒体地址；HLS / DASH 播放列表不会自动合并分片，DRM 内容无法下载。请仅下载你有权访问和保存的内容。

## 自动更新与 Cloudflare Pages

自动更新的工作方式：

1. 程序启动后在后台请求 Cloudflare Pages 上的 `manifest.json`：

```text
https://multithreaddownloader.pages.dev/manifest.json
```
2. 清单中的 `url` 指向 GitHub Releases 中的 `update.zip`；
3. 程序下载更新包并校验 SHA-256；
4. 等待当前程序退出，替换主程序和界面文件，然后自动重启。

Cloudflare Pages 与本 GitHub 仓库连接后，会直接发布仓库根目录的静态文件，包括：

```text
index.html
manifest.json
assets/
```

> Cloudflare Pages 单个文件通常限制为 **25 MiB**。当前 `update.zip` 约 64.4 MB，安装包约 133.2 MB，因此大文件不放入 Pages，而是放在 GitHub Releases；Pages 只负责更新清单和下载页。

`manifest.json` 应当保持短缓存或不缓存，仓库内的 `_headers` 已设置 `no-cache`。

发布新版本时，需要同时更新：

- GitHub Release 附件：`MultiThreadDownloader-Setup.exe`、`update.zip`、`MultiThreadDownloader-Extension.zip`
- `manifest.json` 中的 `version`、`url`、`sha256`、`notes`、`description`
- **官网 `index.html` 的 `#whats-new` 更新日志：每个版本必须新增一条功能描述**
- `CHANGELOG.md` 中对应版本的记录
- 静态下载页中的版本相关文案（如有）

## 完整性校验

发布页提供 `SHA256SUMS.txt`。在 PowerShell 中校验：

```powershell
Get-FileHash .\MultiThreadDownloader-Setup.exe -Algorithm SHA256
```

请只从本仓库的 Releases 页面下载。第三方转载的安装包可能被篡改。

## 关于代码与二进制保护

- 本仓库不包含 `.cs` 源文件、项目文件、调试符号或构建脚本。
- 发布包使用自包含单文件发布，并已排除 PDB/XML 调试文件。
- **任何可运行的 EXE 都无法同时做到“加密后无法逆向”**：程序必须能够被系统解密并执行，解密器和密钥最终仍在本地。.NET 程序即使不提供源码，也仍可能被专业工具反编译。
- 如需进一步提高逆向成本，可在发布前使用 .NET 混淆工具（如 Obfuscar、Dotfuscator 等）。混淆不是加密，并且可能导致杀毒软件误报，需要自行测试。

## 隐私

程序不包含遥测。它只会访问：

- 你添加的下载链接；
- BT / 磁力任务连接到的 Tracker、DHT 网络和其他 Peer（仅传输种子元数据与分片）；
- Cloudflare Pages 上的更新清单地址；
- 清单中指向的 GitHub Releases 更新包。

下载记录和设置仅保存在本机：

```text
%LOCALAPPDATA%\MultiThreadDownloader\
```

## 免责声明

本软件是一款本地文件下载工具，支持 HTTP、HTTPS、FTP、BT 和磁力链接，仅提供文件传输功能，不提供、不托管、不推荐任何下载内容。

用户应确保其下载、保存、使用的内容不侵犯他人知识产权，不违反法律法规及目标网站的服务条款。严禁将本软件用于下载违法、侵权、恶意软件或未经授权的内容。因用户使用行为产生的一切责任由用户自行承担。

本软件按「现状」提供，不附带任何明示或暗示的保证。下载速度与稳定性受网络环境、服务器策略等因素影响，不保证任何特定效果。对于因使用或无法使用本软件而导致的任何直接或间接损失，开发者不承担法律责任。

## 许可证

本仓库仅分发编译后的二进制程序，不提供源代码。使用条款见 [LICENSE](LICENSE)。

## 问题反馈

请通过本仓库的 Issues 反馈安装、使用或更新问题，并附上：

- Windows 版本
- 程序版本
- 错误提示或日志
- 复现步骤

请勿在 Issue 中上传包含个人隐私的完整下载路径或链接。
