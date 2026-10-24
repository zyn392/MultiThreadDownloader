# 发布到 GitHub

这个文件夹是**公开二进制发布仓库**，不包含源代码。可以把它初始化为一个独立的 Git 仓库并上传到 GitHub。

## 1. 重要限制

GitHub 对单个仓库文件有 **100 MB** 限制。当前 `MultiThreadDownloader-Setup.exe` 约 132 MB，不能直接提交到仓库。

因此发布方式是：

- **仓库**：只放 README、许可证、更新清单、版本说明等小文件；
- **Releases**：上传 `MultiThreadDownloader-Setup.exe` 和 `update.zip`，单个 Release 附件最大 2 GB。

`release-assets/` 中的大文件已被 `.gitignore` 排除，避免误提交。

## 2. 生成公开版安装包

在源码目录运行（下面已按 `zyn392/MultiThreadDownloader` 填好）：

```powershell
powershell -ExecutionPolicy Bypass -File .\build-public.ps1 `
  -Owner zyn392 `
  -Repo MultiThreadDownloader `
  -Version 2.1.1
```

脚本会：

1. 生成带默认更新地址的 Windows 安装包；
2. 生成 `update.zip` 和 `manifest.json`；
3. 生成 Linux x64 的 `MultiThreadDownloader-Linux-x64.tar.gz`；
4. 把发布文件复制到本仓库的 `release-assets/`；
5. 把 `manifest.json` 复制到本仓库根目录。

默认更新清单地址为：

```text
https://raw.githubusercontent.com/zyn392/MultiThreadDownloader/main/manifest.json
```

如果你修改了 `Owner` 或 `Repo`，必须重新运行该脚本，否则安装包里的默认更新地址会不正确。

## 3. 上传仓库

本文件夹已经是一个本地 Git 仓库：

- 已基于远程 `main` 创建提交 `Release v2.1.1 binaries`
- `origin` 已设置为 `https://github.com/zyn392/MultiThreadDownloader.git`
- 当前分支 `main` 比远程领先 1 个提交

直接推送即可：

```powershell
cd "C:/Users/62605/OneDrive/Desktop/MultiThreadDownloader-GitHub"
git push
```

第一次推送时如果弹出 GitHub 登录窗口，登录并授权即可。

`manifest.json` 必须位于 `main` 分支根目录，因为自动更新会通过 raw 地址读取它。

## 4. 创建 Release 并上传附件

推荐使用 GitHub CLI：

```powershell
gh release create v2.1.1 `
  .\release-assets\MultiThreadDownloader-Setup.exe `
  .\release-assets\MultiThreadDownloader-Linux-x64.tar.gz `
  .\release-assets\update.zip `
  .\release-assets\SHA256SUMS.txt `
  --title "v2.1.1" `
  --notes-file .\CHANGELOG.md
```

也可以打开 GitHub 的 **Releases → Draft a new release**：

- Tag：`v2.1.1`
- 标题：`v2.1.1`
- 上传：
  - `release-assets/MultiThreadDownloader-Setup.exe`
  - `release-assets/MultiThreadDownloader-Linux-x64.tar.gz`
  - `release-assets/update.zip`
  - `release-assets/SHA256SUMS.txt`
- 发布 Release。

## 5. 验证自动更新

在一台没有旧版本残留的 Windows 机器上：

1. 安装 `MultiThreadDownloader-Setup.exe`；
2. 启动程序；
3. 程序会在约 1.5 秒后检查 raw 地址上的 `manifest.json`；
4. 发布一个更高版本后，确认程序能自动下载、校验并重启。

测试自动更新时，可以先把旧版本安装包安装到测试机，再发布新版本。

## 6. 不要公开内容

本仓库不要加入：

- `.cs` / `.csproj` / `.sln` 源文件
- `build-*.ps1` 构建脚本
- PDB、XML 调试文件
- 开发者密码
- 本地更新服务器配置
- 测试用户数据和下载记录

公开仓库只需要 README、LICENSE、CHANGELOG、SECURITY、UPLOAD-GUIDE、manifest 和 release-assets 中的发布文件。
