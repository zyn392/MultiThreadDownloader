<img src="assets/logo.png" width="72" alt="Multi-Thread Downloader">

# 多线程下载器 · Multi-Thread Downloader

Windows / Linux 平台的多线程 HTTP/HTTPS 下载工具，使用 CPU 性能自动推荐线程数，支持分段下载、断点续传、批量队列和已下载文件列表。

> iOS 版暂未提供，后续需要原生 SwiftUI 重写并在 macOS/Xcode 上构建。

> **这是二进制发布仓库，不包含源代码。**
>
> 本仓库只发布编译后的安装包与更新包，应用程序源代码保持私有。因此它属于“公开二进制分发仓库”，不是 OSI 定义的开源软件仓库。

**最新版本：v2.1.1**

## 下载

请前往本仓库的 **Releases** 页面下载最新版本：

- `MultiThreadDownloader-Setup.exe`：Windows 单文件安装包
- `MultiThreadDownloader-Linux-x64.tar.gz`：Linux x64 压缩包
- `update.zip`：Windows 自动更新包（普通用户无需手动下载）
- `SHA256SUMS.txt`：所有发布文件的 SHA-256 校验值

[前往 Releases 下载](../../releases/latest)

## 功能

- **CPU 智能线程数**：根据逻辑核心数与基础频率自动推荐线程数，默认上限 128，开发者模式可调整到 512。
- **多线程分段下载**：使用 HTTP Range 并发下载，实时显示每个线程的进度、速度和状态。
- **批量下载**：一次粘贴多个链接，按顺序执行；支持队列停止、移出和失败重试。
- **已下载文件列表**：自动记录完成的文件，可打开文件、打开目录、重新下载或移除记录。
- **暂停 / 继续 / 断点续传**：使用 `.part` 和 `.part.json` 保留中断状态。
- **单线程回退**：服务器不支持 Range 时自动切换为单连接下载。
- **自动更新（Windows）**：程序每次启动后会检查一次更新，发现新版本时自动下载、校验 SHA-256、替换主程序并重启。
- **主题与语言**：浅色 / 深色 / 跟随系统，简体中文 / English。
- **开机自启动（Windows）**：以最小化方式启动，并保留全局快捷键。
- **全局快捷键（Windows）**：复制链接后按 `Ctrl+Alt+D` 即可开始下载。
- **Linux 版**：复用相同下载引擎和界面，通过本机浏览器打开；支持批量、历史、主题和语言。

## 系统要求

### Windows

- Windows 10 / 11，x64
- Microsoft Edge WebView2 Runtime（Windows 11 通常已内置；Windows 10 如缺失请先从 Microsoft 官网安装）
- 安装包为自包含版本，不需要预装 .NET

### Linux

- Linux x64（glibc）
- 桌面环境和浏览器
- 可选：`zenity` 或 `kdialog`（文件夹选择）
- 可选：`wl-clipboard` / `xclip` / `xsel`（剪贴板）
- 自包含版本，不需要预装 .NET

## 安装

### Windows

1. 从 Releases 下载 `MultiThreadDownloader-Setup.exe`。
2. 运行安装程序，阅读并同意免责声明。
3. 选择安装目录，完成安装。
4. 安装程序会创建开始菜单快捷方式，桌面快捷方式可选。

程序默认安装到：

```text
%LOCALAPPDATA%\Programs\MultiThreadDownloader
```

卸载：再次运行安装程序，检测到已安装后会进入卸载界面；也可以在 Windows「设置 → 应用 → 已安装的应用」中卸载。

卸载会删除程序文件、快捷方式、开机启动项、缓存和设置。**已经下载的文件不会被删除。**

### Linux

```bash
tar -xzf MultiThreadDownloader-Linux-x64.tar.gz
cd MultiThreadDownloader-Linux-x64
bash install.sh
```

安装后可从应用菜单启动“多线程下载器”，或运行：

```bash
~/.local/share/MultiThreadDownloader.App/MultiThreadDownloader.Linux
```

Linux 版会启动一个仅监听 `127.0.0.1` 的本地服务，并在浏览器中打开与 Windows 版相同的界面。在“设置 → 退出程序”中可完全停止服务。

Linux 版暂不支持全局快捷键、开机自启动和程序内自动更新；也不提供原生桌面窗口，界面运行在本机浏览器中。

卸载：

```bash
~/.local/share/MultiThreadDownloader.App/uninstall.sh
```

## 自动更新（Windows）

Windows 版启动后会在后台检查更新，不会阻塞正常使用。发现新版本后：

1. 下载 `update.zip`；
2. 校验服务器提供的 SHA-256；
3. 解压并等待当前程序退出；
4. 替换安装目录中的主程序和界面文件；
5. 自动重新启动。

自动更新要求更新包提供 SHA-256 校验值。校验不通过时会终止安装。

如果你使用自行构建的版本，更新服务器地址由构建时的 `update-url.txt` 或本机设置决定。

Linux 版请从 Releases 下载新版本并重新运行 `install.sh`。

## 完整性校验

发布页提供 `SHA256SUMS.txt`。

Windows PowerShell：

```powershell
Get-FileHash .\MultiThreadDownloader-Setup.exe -Algorithm SHA256
```

Linux：

```bash
sha256sum -c SHA256SUMS.txt
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
- 配置的更新清单地址（用于启动时检查更新）。

下载记录和设置仅保存在本机。

Windows：

```text
%LOCALAPPDATA%\MultiThreadDownloader\
```

Linux：

```text
~/.local/share/MultiThreadDownloader/
```

## 免责声明

本软件是一款本地 HTTP/HTTPS 文件下载工具，仅提供文件传输功能，不提供、不托管、不推荐任何下载内容。

用户应确保其下载、保存、使用的内容不侵犯他人知识产权，不违反法律法规及目标网站的服务条款。严禁将本软件用于下载违法、侵权、恶意软件或未经授权的内容。因用户使用行为产生的一切责任由用户自行承担。

本软件按「现状」提供，不附带任何明示或暗示的保证。下载速度与稳定性受网络环境、服务器策略等因素影响，不保证任何特定效果。对于因使用或无法使用本软件而导致的任何直接或间接损失，开发者不承担法律责任。

## 许可证

本仓库仅分发编译后的二进制程序，不提供源代码。使用条款见 [LICENSE](LICENSE)。

## 问题反馈

请通过本仓库的 Issues 反馈安装、使用或更新问题，并附上：

- Windows 或 Linux 版本
- 程序版本
- 错误提示或日志
- 复现步骤

请勿在 Issue 中上传包含个人隐私的完整下载路径或链接。
