---
slug: linguax-new-ui-aix-beta
title: "LinguaX Beta：全新界面与 AIx 文字处理"
authors: [deepzz0]
tags: [linguax, macos, productivity, workflow]
keywords:
  - LinguaX AIx
  - LinguaX 新界面
  - Mac 划词翻译
  - macOS AI 文字处理
  - Mac 鼠标按键映射
description: "了解 LinguaX Beta 的全新鼠标与键盘设置界面，以及 AIx 的划词翻译、润色、总结、自定义动作和服务设置。"
image: /img/linguax-new-ui-mouse.jpg
---

新版 LinguaX Beta 带来了两项直观的变化：**重新设计的设置界面**，以及用于翻译、润色和总结文字的 **AIx**。

鼠标、键盘、输入源规则和 AIx 现在都有独立的侧边栏入口。进入页面后，相关设置放在一起，让你更容易看清正在配置什么，以及哪些选项会影响它。

这篇文章带你看看新界面，也介绍 AIx 如何融入日常阅读和写作。**文中功能属于 6000 系列 Beta**，最新改动可查看[更新日志](/zh-Hans/docs/reference/changelog)。

<!-- truncate -->

## 鼠标、按键映射与滚动设置，在同一个视图里

新的鼠标页把配置过程分成并排的三部分：设备、按键映射，以及指针和滚动设置。

<figure>
  <img src="/img/linguax-new-ui-mouse.jpg" alt="新版 LinguaX 鼠标界面：左侧为 MX Master 3S 示意图，中间为拇指键手势，右侧为指针速度与滚动设置" width="1760" height="1168" loading="lazy" style={{width: '100%', height: 'auto', display: 'block'}} />
  <figcaption style={{fontSize: '0.85rem', color: 'var(--ifm-color-content-secondary)', marginTop: '0.5rem'}}>Beta 鼠标页实拍：在设备上选择按键，查看手势，同时保留右侧的指针与滚动设置。</figcaption>
</figure>

点击鼠标示意图上的标记，就能查看这个按键的单击、双击、长按和方向拖动映射。列表上方的应用范围，让你可以在全局映射与特定 App 的覆盖配置之间切换。

右侧集中展示 **Pointer Speed**、设备支持时可用的硬件 **DPI** 控制，以及 **Smooth Scroll** 设置。硬件能力取决于连接的型号。滚动曲线仍由全局的 **Min Step、Speed Gain、Duration** 三个参数调整；按 App 覆盖的是平滑滚动的开关。

具体配置方法可参考[按键映射](/zh-Hans/docs/mouse-plus/fundamentals/button-mapping)和[设备兼容性](/zh-Hans/docs/mouse-plus/device-compatibility)。

## 键盘快捷键有了更清楚的分类

键盘页按 **Media & System（媒体与系统）**、**Apps & Content（应用与内容）**、**Automation（自动化）**组织映射，也保留 **All Shortcuts（全部快捷键）**视图。每一行都能看到动作和对应组合键，右侧则显示快捷键状态与权限。

<figure>
  <img src="/img/linguax-new-ui-keyboard.jpg" alt="LinguaX 新版键盘页：按媒体与系统、应用与内容、自动化分类展示快捷键，右侧显示权限状态" width="1760" height="1168" loading="lazy" style={{width: '100%', height: 'auto', display: 'block'}} />
  <figcaption style={{fontSize: '0.85rem', color: 'var(--ifm-color-content-secondary)', marginTop: '0.5rem'}}>按用途整理快捷键，方便回顾已经配置过的动作。</figcaption>
</figure>

**Input Sources（输入源）**也有独立入口，用于管理 App 和网站规则。调整鼠标按键、检查快捷键或修改输入源规则，都可以直接进入对应页面。

## AIx：围绕正在阅读和编辑的文字执行动作

AIx 为可读取选区的应用提供六个内置动作：

| 动作 | 用途 |
| --- | --- |
| **Polish · 润色** | 改善表达与行文，保留原有语气 |
| **Proofread · 校对** | 修正语法、拼写和标点 |
| **Simplify · 简化** | 让复杂文字更容易阅读 |
| **Expand · 扩写** | 为简短草稿补充说明和结构 |
| **Translate · 翻译** | 翻译到指定语言 |
| **Summarize · 总结** | 提炼段落中的关键信息 |

例如，选中正在阅读的一段文字，执行 **Translate**；或者选中一份还不够流畅的回复草稿，执行 **Polish**。结果出现在浮动窗口中，你可以先阅读，生成完成后再编辑和复制。遇到较长的内容，也可以移动窗口、调整大小。

选区能否读取取决于应用及权限。AIx 通过辅助功能或已授权的浏览器访问读取文字，不依赖剪贴板历史。只有你执行动作时，文字才会发送给对应服务。

## 把常用动作放在手边

**Actions（动作）**页集中管理内置和自定义动作。你可以固定最常用的动作，再调整它们在快捷菜单中的顺序。

<figure>
  <img src="/img/linguax-aix-actions.jpg" alt="AIx 动作页：六个内置文字动作、自动翻译目标语言设置，以及已固定的翻译和总结动作" width="1760" height="1168" loading="lazy" style={{width: '100%', height: 'auto', display: 'block'}} />
  <figcaption style={{fontSize: '0.85rem', color: 'var(--ifm-color-content-secondary)', marginTop: '0.5rem'}}>翻译可指定目标语言，也可选择 Automatic；固定的动作按你设置的顺序显示。</figcaption>
</figure>

翻译的 **Automatic（自动）**模式会参考语言偏好，选择不同于原文的目标语言。你也可以明确指定翻译目标，并为总结设置输出语言。

自定义动作适合保存那些反复输入的指令。比如创建一个“提取决定与下一步”的动作，要求整理决定、负责人和后续事项，并将原文没有提供的信息标为未说明。保存后，把它固定在内置动作旁边，之后便可重复使用。

**Overview（概览）**中的 **Quick Test（快速试用）**提供了直接测试的地方：输入一小段样例，选择动作，查看结果，再到其他应用里使用。输入上限为 20,000 字符，Quick Test 不保存测试正文。

## 选择服务，也看清文字会发到哪里

进入 **AIx → Service（服务）**，可以选择 **LinguaX AI** 或 **Your API（自有 API）**。LinguaX AI 使用点数；自有 API 会将请求直接发往你配置的兼容接口，不消耗 LinguaX 点数，API Key 保存在 macOS 钥匙串中。AIx 需要有效的 LinguaX 许可，AI 使用额度与应用许可需分别看待。

第一次请求前，需要查看发送目标并同意文字传输。这里还可以控制选区菜单，以及排除不希望显示菜单的应用。

**Activity（活动）**在本机保留最近七天的动作元数据，记录中不保存输入或结果正文。服务条款与数据处理说明见 [AIx 服务补充条款](/zh-Hans/terms/aix-service-addendum)。

## 试用新版 Beta

打开[下载页面](/zh-Hans/download)，选择 **Download Beta** 即可体验新版界面与 AIx。可以先检查一项熟悉的鼠标映射，再进入 **AIx → Service** 配置服务，最后在 **Overview** 中用一小段不敏感的文字测试。

文中的截图展示 Beta 的实际界面与配置控件，没有展示成功生成的 AI 结果；生成文字需要可用的服务连接。

欢迎告诉我们：哪些文字动作最常用，新布局的哪些地方更顺手，还有哪些配置仍然费力。反馈可发至 [hello@linguax.app](mailto:hello@linguax.app)。
