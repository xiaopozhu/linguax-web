---
title: "鼠标设备兼容性"
sidebar_label: "兼容性概览"
description: "了解 Mouse+ 的通用鼠标支持、22 款增强识别型号、HID++ 与 BLE、电量显示、接收器兼容性及无需驱动的工作方式。"
keywords:
  - "Mac 鼠标无需驱动"
  - "Logitech HID++ macOS"
  - "Mac 蓝牙鼠标电量"
  - "Mac Logi Options+ 替代"
  - "macOS Logitech 接收器"
---

# 鼠标设备兼容性 {#device-compatibility}

Mouse+ 的基础功能适用于 macOS 上的 USB 或蓝牙鼠标，无需驱动、内核扩展，也不会在系统层安装组件。连接或配对鼠标后即可使用基础增强；特殊按键和硬件控制能力取决于型号与连接方式。

## 各型号 Mac 设置指南 {#per-model-mac-setup-guides}

需要某个型号的分步说明？**兼容型号**系列介绍常见 Mac 鼠标的配对、侧键配置和按住说话设置：

- [MX Master 4](/zh-Hans/docs/mouse-plus/models/mx-master-4)——2025 年旗舰型号，在七槽位基础上增加 Actions Ring（`AR`）。
- [MX Master 3S](/zh-Hans/docs/mouse-plus/models/mx-master-3s)
- [MX Master 3](/zh-Hans/docs/mouse-plus/models/mx-master-3)
- [MX Anywhere 3S](/zh-Hans/docs/mouse-plus/models/mx-anywhere-3s)
- [MX Anywhere 3](/zh-Hans/docs/mouse-plus/models/mx-anywhere-3)
- [Logitech G Pro X Superlight](/zh-Hans/docs/mouse-plus/models/logitech-g-pro-x-superlight)
- [Logitech G Pro X Superlight 2](/zh-Hans/docs/mouse-plus/models/logitech-g-pro-x-superlight-2)
- [Logi Lift](/zh-Hans/docs/mouse-plus/models/logitech-lift)
- [MX Ergo](/zh-Hans/docs/mouse-plus/models/mx-ergo)

型号支持会持续扩充。完整列表与各型号按键槽位请见 [Mac 鼠标兼容性数据库](/zh-Hans/tools/mouse-compatibility)。

## 通用基础支持与 22 款型号的增强识别 {#any-mouse-plus-enhanced-recognition-for-23-models}

平滑滚动、指针速度和通用按键映射等基础增强，适用于 USB 或蓝牙鼠标，无需驱动。Mouse+ 另有包含 **22 款特定型号**的识别列表，提供相应型号配置；拇指键、滚轮模式、滚轮倾斜或拇指滚轮、特殊按键的具体支持取决于设备。

设备识别分为两个层级，其他设备使用通用路径：

- **HID++ 配置**——通过蓝牙或 Bolt、Unifying、Lightspeed 接收器连接的兼容 Logitech 鼠标。命名槽位（S1 / S2 / T / SM / WL / WR）、电量显示和硬件控制能力取决于型号与连接方式，并非每台设备都有全部槽位和功能。
- **VID:PID 配置**——按 USB 或蓝牙标识符匹配非 Logitech 鼠标。提供命名槽位和基于单击的侧键映射，不提供 Logitech HID++ 硬件控制。只有设备公开标准 BLE 电池服务时才能显示电量。
- **Universal HID**——识别列表之外的设备通过通用 HID 引擎获得平滑滚动、指针速度和基于单击的侧键映射。

### 具体包含哪些型号 {#which-models-exactly}

完整列表位于 **[Mac 鼠标兼容性数据库](/zh-Hans/tools/mouse-compatibility)**，列出全部 22 款已识别型号、USB ID 及具体槽位配置，包括可映射的侧键、拇指键、滚轮模式键与滚轮倾斜输入。该页面直接从应用内识别列表生成。

**G502 X、G502 HERO 和 G502 Proteus Spectrum** 各有九个可配置槽位，其中包含已命名的 **G7 / G8 / G9** 按键。**G102 LIGHTSYNC** 当前不在增强识别列表中，平滑滚动、指针速度与标准按键事件通过通用 HID 引擎处理；板载 DPI 键默认由固件处理，不保证能直接映射。

型号匹配使用 VID:PID，并结合 Logitech HID++ / BLE 解析与手动型号绑定。已识别设备在检测后会自动应用侧键映射；**Clear model binding**（清除型号绑定）可随时重置识别。没有单独设置指南的列表内型号也仍受识别支持，连接后会应用默认映射。

有两个例外需要区分。**Magic Mouse 2** 在识别列表中，但没有可映射按键，因此会从设备选择列表中隐藏；它的触控表面和手势由 macOS 原生处理。**MX Ergo** 与两款 **G Pro X Superlight** 则有设置指南，但不在增强识别列表中：它们通过通用 HID 引擎使用平滑滚动、指针速度和基于单击的侧键映射，不具备型号专属槽位。

**鼠标不在列表中？**通用 HID 引擎仍可提供平滑滚动、指针速度和基于单击的按键映射。新增型号会持续加入，你也可以提交问题反馈所需型号。

## HID++、BLE 与电量 {#hid--ble-and-battery}

对于支持 HID++ 的 Logitech 蓝牙鼠标，Mouse+ 可读取设备支持的按键与手势事件，而不局限于基础单击。事件驱动的 HID++ 读取有助于降低延迟。电量仅对主动提供数据的设备显示：BLE 鼠标通过标准电池服务提供，Logitech 鼠标也可通过 HID++ 提供。有线鼠标和普通 USB 鼠标没有电量读数。

## 支持的接收器系列 {#receiver-families-we-cover}

如果 Logitech 设备使用无线接收器，LinguaX 可与下列系列配合使用，具体功能仍取决于鼠标型号：

- **Bolt**——Logitech 新一代安全接收器，用于 2021 年以来多数 MX 系列及商务型号。
- **Unifying**——长期使用的小型接收器，仍随 M720、M585/M590 及较早的 MX 型号提供。
- **Lightspeed**——G 系列低延迟接收器，用于 G Pro X Superlight、G502 X Lightspeed 等型号。
- **Bluetooth**——无需接收器；LinguaX 可通过 BLE 读取兼容 Logitech 型号的 HID++ 数据。

需要在不安装 Logi Options+ 或 G HUB 的情况下配对新接收器？可使用[浏览器内配对工具](/zh-Hans/tools/pair-logitech-receiver)，仅支持 Chrome 和 Edge，无需安装软件。

## 与 Logi Options+ 相比 {#compared-to-logi-options}

- **无需账号。**Mouse+ 不要求登录。
- **支持睡眠与唤醒恢复。**蓝牙设备会在睡眠后自动恢复，无需手动重新连接。
- **约 10 MB，原生实现。**无需 Electron 或庞大的后台代理。

## 相关文档 {#related-docs}

- [macOS 的 Logi Options+ 替代方案](/zh-Hans/docs/comparisons/logi-options-plus-alternative-macos)
- [不使用 Logi Options+ 设置 MX Master 3S](/zh-Hans/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)
