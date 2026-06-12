# LinguaX 功能权威事实（基于源码，2026-06-12）

> 来源：`linguax-app` 源码深度调研。**这是文档/博客内容的唯一事实依据**，优先级高于 changelog 推断。changelog 描述与此冲突时以本文档为准。

## 1. 产品架构（重要纠偏）

LinguaX 主窗口有 **5 个平级 Tab**：Home（Overview）、Mouse（Mouse+）、Keyboard、Mapping（App/Web 输入法规则）、Settings（About）。

- **鼠标增强 与 输入法自动切换是两大平级核心模块**，源码层面无耦合（仅共享 License gate 和 AppCoordinator 编排）。
- **不要把输入法切换描述为「Mouse+ 的附加/companion 能力」或「baseline 之上的叠加层」**——这是架构性失实。
- **营销叙事可以鼠标优先**（推广计划要求）：标题、排序、卖点侧重鼠标增强，输入法作为「另一大能力 / 差异化亮点」。但**机制描述要平级**，不能说输入法是鼠标的子功能。
- 输入法切换还有独立的快捷键触发动作（`switchInputSource`）。

## 2. 平滑滚动（Smooth Scroll）

- UI 区块标题：**Mouse+**。开关：**Smooth Scroll**（描述 "Inertia effect like trackpad"）。
- **三个全局滑块**（不是 Speed/Smoothness！）：
  - **Min Step**：范围 1.0–100.0，默认 **33.6**
  - **Speed Gain**：范围 1.0–10.0，默认 **2.70**
  - **Duration**：范围 1.0–5.0，默认 **4.35**
- **Reverse Vertical Scroll** / **Reverse Horizontal Scroll**：两个**独立**全局开关（不是单一反转开关）。
- **仅作用于鼠标滚轮，触控板被放行**（连续滚动事件 passthrough）。
- 按住任一修饰键 `⌘⌥⌃⇧fn` 会**暂停**平滑滚动。
- 文档措辞：用真实参数名 Min Step / Speed Gain / Duration；不要写 "Speed/Smoothness"。

## 3. Per-App 覆盖（AppScrollOverride + AppGestureOverride）

- **仅 Smooth Scroll 开关** 支持 per-app 覆盖（按 bundleID 存 bool）。
- **手势映射**也支持 app-specific override（`AppGestureOverrideStore`）。
- **滚动三参数（Min Step/Speed Gain/Duration）和翻转方向是全局**，不支持 per-app。
- 不要宣称"可 per-app 调滚动手感/速度/翻转"。

## 4. 按键映射 / 槽位

- 槽名：Left/Right Button（不可配置）、Middle、Side 1–4、Scroll Mode(SM)、Thumb(T)、Extra 1–5、Wheel Tilt Left/Right(WL/WR)。
- 中键左右倾斜（WL/WR）= 水平滚动触发，独立路径。
- 不要给绝对 buttonID 数字（编号在不同设备/helper 不一致），用槽名。

## 5. 手势类型（UI label）

**Click / Double-Click / Drag Up / Drag Down / Drag Left / Drag Right / Long Press / Modifier Hold**

- Drag = swipe，方向 up/down/left/right。
- Swipe 三种触发模式：**Release / Threshold / Interval**。
- Long Press 时长 0.5s；拇指键(T)的长按**仅 Logitech HID++ 路径可用**。
- 滚轮槽(WL/WR)只支持 Click。

## 6. Modifier Hold / Push-to-Talk

- UI **只开放 Fn（Globe）** 一种修饰键（枚举有 Cmd/Opt/Ctrl/Shift 但未暴露）。
- 机制：按住鼠标键时注入 Fn 修饰键 flag，松开撤销。Push-to-talk 即「按住侧键 = 按住 Fn/Globe」→ 触发 macOS Dictation。**与音频/录音无关**，是注入修饰键。
- 仅鼠标按钮可绑 modifierHold，键盘无此动作。
- 不要写"可按住 Command/Option/Control/Shift"。

## 7. 指针速度（Feel Adjustment）

- UI 区块：**Feel Adjustment**，单滑块 **Pointer Speed**（范围 0.1–5.0，默认 1.0）。
- **per-device 持久化**（按设备 stableID 存），写入私有 `HIDMouseAcceleration`。
- 同型号多台（同 VID:PID）无法区分。
- 无 DPI 调节功能。

## 8. 设备识别

- **基础鼠标功能（平滑滚动/指针速度/通用按键）适用于任意 USB/蓝牙鼠标，无需驱动**。
- 但**增强型号识别 + profile（拇指键/特殊键/HID++）是白名单**，约 20 款，主要 Logitech：MX Master/2S/3/3S/4、MX Anywhere 2/2S/3/3S、M720、M585/M590、POP、G502 X/HERO/Proteus、G305；另含 Surface Precision、Razer Viper Ultimate/DeathAdder V3。
- 识别机制：VID:PID 匹配 + Logitech HID++/BLE 解析 + 手动绑定型号。
- 电量：仅 BLE（GATT 0x180F）与 Logitech HID++ 支持；有线/普通 USB 无电量。
- Magic Mouse 在 UI 隐藏。
- 措辞：可说"works with any USB/Bluetooth mouse"（基础功能），但型号识别/拇指键等高级能力是"enhanced support for 20+ models, primarily Logitech"，不要笼统说"支持所有鼠标的所有功能"。

## 9. 动作类型（trigger → action）

**真实可用 8 种**：switchInputSource、openApplication、pastePresetText、mediaControl、systemSetting（41 个预设）、customScript（**仅 AppleScript**）、keyboardShortcut、modifierHold（仅 Fn）。

- **占位未实现（不要写成已支持）**：browserNavigate、clipboard、mouseGesture、systemCommand。
- systemSetting 41 预设含：Mission Control、Launchpad、Show Desktop、Control/Notification Center、Dark Mode、Lock Screen、Stage Manager、窗口操作、复制/粘贴/撤销等编辑、Finder 操作、截图、切换 Space/标签页/前进后退/缩放、开发者（Inspect Element、Hard Refresh、Copy File Path、Open Terminal Here）。
- **切换 Space** 用私有触控板手势 API（非快捷键），且不允许键盘触发（仅鼠标）。emptyTrash/openTerminalHere 也不允许键盘触发。

### 触发类型（3 种）
- **keyboard**：标准全局快捷键（需修饰键，或 F1-F19/导航键白名单单键）。
- **keyboardSpecial**：**仅 9 个写死的 Logitech 消费键**（Calculator/Back/Forward/Play-Pause/Next/Prev/Vol Up/Vol Down/Mute），HID Consumer Page 监听。不要说"支持任意多媒体键"。
- **mouse**：click/double-click/drag×4/long-press/modifier-hold/horizontal-scroll。

### 入口暴露的动作集不同
- 键盘快捷键编辑器只可选 5 种：Open Application、Paste Text、Media Control、System Setting、Custom Script。
- 鼠标按钮只可绑 5 种：System Setting、Media Control、Keyboard Shortcut、Modifier Hold、Open Application。
- 不要笼统说"任何触发都能绑定任何动作"。

## 10. 脚本（Custom Script）

- **仅 AppleScript**（`NSAppleScript`）。Shell 命令需经 AppleScript `do shell script` 间接执行。**不要写"支持 Shell 脚本"**。
- 内置模板 **3 个**（不是 6 个）：Restart Dock（killall Dock）、Copy Current Path、Clear Pasteboard。
- 有风险确认横幅。

## 11. 输入法自动切换

- **优先级**：网站域名规则（WebInputMapping）> App 规则（AppInputMapping）> 全局默认。
- 域名匹配：精确 → 父域回退（mail.google.com → google.com），去 www.。
- **按 App 切换不需辅助功能权限；按网站域名切换需要辅助功能权限**。
- 支持浏览器：Safari/Chrome/Edge/Brave/Opera。**Firefox 不支持按域名切换**（无 AppleScript 取 URL）。
- 浏览器 URL 监控：鼠标抬起后 0.1s 经 AppleScript 读前台标签 URL。

## 12. 权限（仅 2 项）

- **Accessibility（辅助功能）**：用于浏览器 URL 读取、鼠标事件 tap、平滑滚动、指针速度。
- **Input Monitoring（输入监控）**：用于 HID 设备管理。

## 13. 许可 / 定价

- 源码：服务器端 JWT License + 试用（试用天数由服务器下发，**客户端无硬编码天数/设备数/买断字段**）。
- 商业事实（来自推广执行计划，权威）：**30 天免费试用 + $9.9 一次性买断（3 台设备），无订阅**。文档可用这些数字，价格真相源指向官网 `/pricing`。
- License 验证周期 24 小时；License 详情显示 Email / Purchased / Expires。

## 14. 备份恢复（重要纠偏）

- **没有手动导入/导出配置功能**。
- 实为 **iCloud（CloudKit）自动同步**：App/Web/Action/鼠标设备等 Core Data 配置跨设备自动同步。
- **不要写"导出配置文件 / 导入 / 手动迁移到新 Mac"**。改为描述 iCloud 自动同步。

## 15. 诊断

- Diagnostics Center（诊断中心）：生命周期摘要、设备能力矩阵、实时事件流，可 Export。
- 入口：Mouse / Keyboard 页打开；会话级诊断开关 = Settings 的 Logo **2 秒内点 3 次**。
- 反馈奖励：反馈被采纳并发布赠 1 年 License。

## 16. UI 术语速查（对齐真实界面）

Overview / Input Source Rules / Connected Mice / Shortcut Mapping；App Rules / Web Rules / Add Web Rule / Domain / Input Method；Mouse+ / Smooth Scroll / Min Step / Speed Gain / Duration / Reverse Vertical Scroll / Reverse Horizontal Scroll / Feel Adjustment / Pointer Speed；Click / Double-Click / Drag Up·Down·Left·Right / Long Press / Modifier Hold；Release / Threshold / Interval；Settings / Default IME / Launch at Login / Check for Updates / Permission: Accessibility / Permission: Input Monitoring / Language / View License；Diagnostics Center / Export。作者：**Ermulin Studio**。

## 必须修正的高频失实点清单

1. ❌ "Speed / Smoothness" → ✅ Min Step / Speed Gain / Duration
2. ❌ 输入法是 "companion/add-on/baseline 叠加层" → ✅ 平级核心能力（营销侧重鼠标可保留）
3. ❌ backup-and-restore 导出/导入/迁移 → ✅ iCloud 自动同步
4. ❌ "Shell scripts" / 6 模板 → ✅ 仅 AppleScript / 3 模板
5. ❌ modifier-hold 多修饰键 → ✅ 仅 Fn/Globe
6. ❌ "supports any mouse"（笼统）→ ✅ 基础功能任意鼠标；增强识别白名单 20+ 款（主要 Logitech）
7. ❌ per-app 调三参数/翻转 → ✅ per-app 仅 Smooth Scroll 开关 + 手势
8. ❌ 把 browserNavigate/clipboard 等当已实现 → ✅ 不提或标注未实现
9. ❌ "任意多媒体键" → ✅ keyboardSpecial 仅 9 个 Logitech 消费键
10. ❌ how-linguax-works 双层 baseline 模型 → ✅ 两大平级模块
