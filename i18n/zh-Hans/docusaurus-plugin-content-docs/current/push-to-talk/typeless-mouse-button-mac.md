---
title: "Typeless 用鼠标触发：把按住说话绑到鼠标侧键（Mac）"
description: "Mac 上把 Typeless 的按住说话触发键从 Fn 搬到鼠标侧键：按住侧键说话、松开插入文字，手不用离开鼠标。附 macOS Globe 键冲突的解决方法。"
keywords:
  - typeless 鼠标触发
  - typeless 用鼠标触发
  - typeless 按住说话 鼠标
  - typeless 快捷键 mac
  - typeless 鼠标侧键
  - typeless 语音输入 鼠标
  - typeless fn 键 触发
---

# Typeless 用鼠标触发：把按住说话绑到鼠标侧键

**Typeless** 默认用 **Fn（Globe，地球）键**做按住说话：按住 Fn 说话、松开出字。但 Fn 是键盘上最不顺手的键之一，而且它是硬件级按键，很多外设和宏工具根本发不出来。用 LinguaX 可以把 **Typeless 的触发搬到鼠标侧键**上：按住侧键说话、松开插入文字，右手全程不用离开鼠标。

## 为什么把 Typeless 触发键搬到鼠标上

- 浏览、阅读、审稿时右手本来就在鼠标上，伸手去够 Fn 会打断节奏。
- 拇指侧键比键盘上任何键都快。
- 侧键按住说话像对讲机一样自然，不用惦记"现在是不是还在录音"。
- Fn 是硬件级按键，很多遥控器和宏工具发不出来——LinguaX 的**修饰键按住（Modifier Hold）**是在系统层面真实按住 Fn，Typeless 收到的就是它期望的信号。

## 工作原理

LinguaX 的 **Mouse+** 提供**修饰键按住（Modifier Hold）**手势。绑到鼠标按键后：

- **按下并按住鼠标侧键** → 系统持续接收 **Fn（Globe）** 键按下信号，Typeless 开始听写。
- **松开侧键** → Fn 释放，Typeless 把整理好的文字插入光标处。

动作只在按住期间生效，和 Typeless 的 hold-to-talk 模型一一对应。

## 设置步骤

### 1. 先解除 macOS 对 Globe 键的占用

macOS 默认把 Globe/Fn 键分配给**显示表情符号**或**切换输入法**，会在 Typeless 之前把按键吞掉：

1. 打开**系统设置 → 键盘**。
2. 找到**"按下 🌐/Fn 键以"**。
3. 改成**不执行任何操作**。

### 2. 确认 Typeless 使用 Fn

在 **Typeless → 设置 → Shortcuts（快捷键）**里，保持默认的 **Fn** 按住说话快捷键。（Typeless 的每个快捷键都可以在这里改，以后想换布局也行。）

### 3. 在 LinguaX 里绑定鼠标按键

1. 打开 LinguaX，进入 **Mouse+** 设置。
2. 选中一颗闲置的侧键（拇指键最合手）。
3. 手势选**修饰键按住（Modifier Hold）**，修饰键选 **Fn**。
4. 保存。

> Modifier Hold 会独占这颗按键。保存后，该按键之前绑定的其他手势会被替换。

### 4. 测试

点进任意文本框，**按住**鼠标侧键说话，**松开**——Typeless 会把整理后的文字插入到光标处。

## 更喜欢切换式？用免手持模式

长段落一直按着累的话，Typeless 还有免手持模式（默认 **Fn + 空格**：按一下开始、再按 Fn 结束）。用鼠标触发它：

1. 在 LinguaX **Mouse+** 里选中侧键。
2. 手势选普通点击，动作选**键盘快捷键（Keyboard Shortcut）**。
3. 录制 **Fn + 空格**（或你在 Typeless 里自定义的免手持快捷键）。
4. 保存——按一下开始听写，再按一下结束。

同样的方法也适用于 Typeless 的其他快捷键，比如**翻译**（Fn + 左 Shift）和 **Ask AI**（Cmd + Shift + A）。

## 让设置更稳的几个建议

- 选一颗平时不用于点击、滚动或浏览器"前进/后退"的按键。
- LinguaX 需要**辅助功能（Accessibility）**权限才能全局按住修饰键；Typeless 那一侧需要**麦克风**和**输入监听**权限，一次授全。
- 先在纯文本框里测稳了，再到浏览器、IDE、聊天软件里用。
- 别让 LinguaX 和别的鼠标工具（Logi Options+、Karabiner 等）同时绑同一颗按键，冲突时会丢事件。

## 排错清单

- **按住侧键 Typeless 没反应** → 检查 macOS 是否还占用着 Globe 键（第 1 步），以及 LinguaX 是否有辅助功能权限。
- **能开始听写但不出字** → 检查 Typeless 的麦克风 / 输入监听权限。
- **按键触发的还是旧动作** → 重新保存一次 Modifier Hold，它会替换该按键上的旧映射。
- **记事本里正常、某个应用里不行** → 回到纯文本框复测，确认是不是该应用本身拦截输入的问题。

## 常见问题

### Typeless 可以用鼠标触发吗？

可以。Typeless 默认用 Fn（Globe）键做按住说话的快捷键。LinguaX 的 Modifier Hold 手势能让鼠标侧键在你按住期间一直按住 Fn，所以按住侧键就开始听写、松开就插入文字。

### 为什么按 Fn 时 Typeless 没反应？

macOS 默认把 Globe/Fn 键分给了"显示表情符号"或"切换输入法"。去**系统设置 → 键盘**，把**"按下 🌐/Fn 键以"**改成**不执行任何操作**，Typeless 才能收到这个键。

### 免手持（hands-free）模式也能用鼠标触发吗？

能。喜欢切换式听写的话，用 LinguaX 的键盘快捷键动作把侧键映射到 Typeless 的免手持快捷键（默认 Fn + 空格）即可，不用 Modifier Hold。

### 需要罗技鼠标吗？

不需要。任何 USB 或蓝牙鼠标只要有闲置侧键都能用。罗技已识别的型号（MX Master 2S/3/3S/4、MX Anywhere、G502 X、M720、M585 等）有额外的默认映射优化，但 Typeless 触发不依赖罗技硬件。

### LinguaX 免费吗？

有 30 天完整功能免费试用，无需注册账号。之后是**一次性 9.9 美元、可授权 3 台设备**，没有订阅。

## 开始使用

**[下载 LinguaX](/download)**，30 秒把 Typeless 的按住说话绑到鼠标侧键上。

## 延伸阅读

- [Mac 按住说话语音输入：把 Fn 键绑到鼠标侧键](/docs/push-to-talk/push-to-talk-voice-typing-mac)
- [Wispr Flow 与 superwhisper 快捷键设置](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)
- [Mac 上最好的按住说话（Push-to-Talk）应用推荐](/docs/push-to-talk/best-push-to-talk-app-mac)
- [用鼠标按键触发 macOS 听写](/docs/mouse-plus/recipes/macos-dictation-mouse-button)
- [Mac 鼠标侧键映射方法](/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [按键映射基础](/docs/mouse-plus/fundamentals/button-mapping)
