---
title: "Mac 按住说话语音输入：把 Fn 键绑到鼠标侧键（30 秒设置）"
description: "Mac 上开启按住说话（push-to-talk）语音输入的最快方法：把 macOS 听写使用的 Fn / Globe 键绑到鼠标拇指侧键，按住说话、松开停止。兼容 macOS 系统听写、Wispr Flow、superwhisper、Typeless 等 hold-to-talk 语音工具。"
keywords:
  - mac 鼠标 语音输入
  - mac 按住说话
  - macbook 按住说话 鼠标
  - mac 鼠标侧键 语音输入
  - mac 语音输入 鼠标
  - macos 语音输入 快捷键
  - mac 鼠标 push to talk
  - mac 苹果电脑 按住说话
  - macos dictation 鼠标
  - wispr flow mac 鼠标
  - superwhisper mac 鼠标
---

# Mac 按住说话语音输入：把 Fn 键绑到鼠标侧键

**按住说话（push-to-talk）** 是最贴合手感的语音输入方式：按住讲、松开停，不用切换、不用记状态。macOS 的**系统听写（Dictation）**和大部分第三方语音工具都用 **Fn（Globe，地球）键**作为触发键。LinguaX 可以把这次"按住 Fn"绑到鼠标上的**侧键 / 拇指键**，让你的手不用离开鼠标就能开口说话。

## 为什么用鼠标侧键，而不是键盘

在 Mac 上做浏览、阅读、审稿这些事时，右手一直在鼠标上。中途按键盘上的 Fn 键会打断动作节奏。改到鼠标侧键之后：

- **手停在原位**，看到一段文字想回复就直接按侧键说话。
- **拇指按住比键盘任何键都快**，反应零延迟。
- **hold-to-talk 比 toggle 更自然**——就像对讲机、就像按住 shift 打大写，不用记"是不是还在录音"。
- **左手完全空出来**，可以边说边编辑。

## LinguaX 是怎么做到的

LinguaX 的 **Mouse+** 提供一种叫**修饰键按住（Modifier Hold）**的手势。绑到鼠标按键之后，按下这颗按键时，系统就像你实际按住某个修饰键（Fn、Command、Option 等）一样，松开就释放：

- **按下鼠标侧键** → 系统持续接收 **Fn（Globe）** 键按下信号。
- **松开鼠标侧键** → 系统释放 Fn 键。

因为动作是"按住期间生效、松开立刻取消"，跟所有 hold-to-talk 语音工具的触发模型完全对齐。

## 设置步骤（大约 30 秒）

1. 打开 LinguaX，进入 **Mouse+** 设置。
2. 选中你想用的鼠标按键（侧键或拇指键最合手）。
3. 手势选**修饰键按住（Modifier Hold）**，修饰键选 **Fn**。
4. 保存即可。这颗按键现在等价于"按住 Fn"。

> Modifier Hold 会独占这颗按键。保存后，该按键之前绑定的其他手势会被替换。

## 语音工具那一侧要同步配置

把语音工具的按住说话快捷键指向 **Fn（Globe）** 键：

- **macOS 系统听写**：在**系统设置 → 键盘 → 听写**里，把听写快捷键设为 Globe / Fn 键。
- **hold-to-talk 语音工具**（如 Typeless、Wispr Flow、superwhisper 等）：在应用偏好里把"按住说话"的快捷键设置成 Fn/Globe。

两边都对准 Fn 之后，按住鼠标侧键就是开始听写、松开就是停止。

如果你用的语音工具不认 Fn 而是要求别的按键，看 [Wispr Flow 与 superwhisper 快捷键设置](/docs/use-cases/wispr-flow-superwhisper-hotkey-mac)——里面同时讲了 Modifier Hold 和普通键盘快捷键两条路径。

## 关于快捷键权限（少走弯路）

- LinguaX 需要**辅助功能（Accessibility）**权限才能全局按住修饰键。首次运行会提示授权。
- 如果你用的语音工具还需要**麦克风**和**输入监听**权限，一次授全，别每次报错才补——中途打断听写反而更烦。

## 让设置更稳的几个建议

- 选一颗**平时不常用**的按键。别把它绑在你已经拿来做浏览器"后退"的按键上，跟你的肌肉记忆打架。
- 一开始先在**记事本或浏览器地址栏**这种普通文本框里测。等确认能稳定听写，再折腾各家应用的兼容问题。
- 如果语音工具同时提供 **toggle（切换）**和 **hold（按住）**两种模式，选 **hold**——才和这个按键手势对齐。
- 别让两个鼠标工具（比如同时装了 Logi Options+ 和 LinguaX）都绑同一颗按键，冲突时肯定丢事件。

## 排错清单

- 确认 LinguaX 已获得辅助功能权限。
- 确认没有其他工具（Logi Options+、Karabiner 等）也绑了同一按键。
- 确认语音工具的快捷键是 Fn/Globe，不是别的键。
- 若之前这颗按键绑过别的手势，重新保存一次 Modifier Hold。

## 常见问题

### 只有 macOS 系统听写能这样用吗？

不是。macOS 系统听写、Wispr Flow、superwhisper、Typeless 这些用 Fn/Globe 作为触发键的都可以直接生效。用别的快捷键的工具（比如 Whisper 类的自定义组合键），用 LinguaX 的普通键盘快捷键映射也能同样做出按住说话效果。

### 需要罗技鼠标吗？

不需要。任何 USB 或蓝牙鼠标只要有闲置的侧键都能用。罗技识别的型号（MX Master 2S/3/3S、MX Anywhere、G502 X、M720、M585 等）会有额外的默认映射优化，但按住说话不依赖罗技硬件。看[设备兼容性](/docs/mouse-plus/device-compatibility)。

### Mac 睡眠唤醒后按键还会灵吗？

会。蓝牙鼠标唤醒后自动重连，LinguaX 会在唤醒时刷新输入服务，按键映射继续生效，不用重启。

### LinguaX 免费吗？

有 30 天的完整功能免费试用，无需注册账号。之后是**一次性 9.9 美元、可授权 3 台设备**，没有订阅。

## 开始使用

**[下载 LinguaX](/download)**，30 秒把按住说话绑到你的鼠标侧键上。

## 延伸阅读

- [按键映射基础](/docs/mouse-plus/button-mapping)
- [用鼠标按键触发 macOS 听写](/docs/use-cases/macos-dictation-mouse-button)
- [Mac 上最好的按住说话（Push-to-Talk）应用推荐](/docs/use-cases/best-push-to-talk-app-mac)
- [Wispr Flow 与 superwhisper 快捷键设置](/docs/use-cases/wispr-flow-superwhisper-hotkey-mac)
- [Mac 鼠标侧键映射方法](/docs/use-cases/map-mouse-side-buttons-macos)
- [Mouse+ 概览](/docs/mouse-plus/overview)
