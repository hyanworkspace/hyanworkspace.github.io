---
layout: post
title:  "WebArt 3.0 (Cursor部分)"
date:   2024-12-04
is_project: false
categories: blogs
---
# Cursor
<img src="/assets/images/cursor_snapshot.png" width="100%" alt="cursor选项">

Cursor 是一个以 AI 为核心的代码编辑器，它通过智能自动完成、多行编辑、智能重写等功能来提高软件开发效率，同时提供了与 AI 对话的能力，以帮助开发者理解和操作代码库。

[官网](https://www.cursor.com)

### cursor 对比其他（AI）编辑器的优点？

* 多行编辑：Cursor 支持多行编辑，除了可以像其他 ai 插件一样生成代码以外，还可以基于现有代码自动提示可能需要修改的地方，实际使体验非常顺滑，很多时候一路 tab 键就可以完成所有修改。
* AI 对话：Cursor 可以与 AI 对话，以帮助开发者理解和操作代码库。尤其值得一提的是，对话背后是个多模态模型，可以输入图片、代码、文本等，然后生成对应的代码。

### 订阅价格
* **Hobby**： 免费计划，包括两周 Pro 试用期、每月 2000 个代码补全（completions）、50 个慢速优先的高级请求（slow premium requests）和 200 次 Cursor-small 模型的使用。Cursor-small 是一个更小但是更快（？待考证）的模型，适用于快速编辑任务。

* **Pro**： 每月 $20，包括所有 Hobby 计划内容，并提供无限制的代码补全、每月 500 个快速优先的高级请求、无限制的慢速高级请求、无限制的 Cursor-small 使用以及每天 10 次 Claude Opus 使用。高级模型包括 GPT-4、GPT-4o 和 <span style="color: blue;">Claude 3.5 Sonnet（推荐使用）</span>。快速使用意味着请求会优先处理，而超出快速使用限额后的请求可能会在高负载时排队（不过暂时还没有碰到过）。

* **Business**： 每用户每月 $40，包括 Pro 计划内容，并增加了集中式账单、管理员使用情况仪表板、强制隐私模式和 OpenAI/Anthropic 零数据保留政策。隐私模式确保代码仅存储在用户的设备上，不会用于训练。Cursor 的某些功能不支持通过 API 密钥计费。如果用户超出计划限制，Cursor 会请求用户升级计划。

### 实际使用方案
综上所述，你可以：

* 不停切换账号（邮箱注册）🤔 来保持 Pro 版本的持续白嫖，如果资源有限。但是鼓励大家支持自己觉得好用的软件，这样才会有更多好用的软件出现！
* 换成国产的 deepseek-coder, [deepseek](https://www.deepseek.com) 是幻方出品的 AI 模型，提供 API 支持，可能是国内代码能力最强，而且价格非常便宜！！输入 1 元/ 1 百万 tokens（命中缓存 0.1元百万 tokens），输出 2 元/ 1 百万 tokens。

#### 设置方法
1. 在 cursor settings 界面设置模型.
<img src="/assets/images/cursor_setting.png" width="80%" alt="cursor设置">
2. 具体如下截图所示，选择"Add model+"添加模型名称 deepseek-coder
<img src="/assets/images/cursor_model_sel.png" width="80%" alt="cursor模型选择">
3. 注册并获取 deepseek 的 api（如果没有免费额度，可以充值 1 元来激活）
4. 设置 openai api 的地方输入 deepseek 的 api 密钥（API key），需要特别注意的是需要点开 Overwrite OpenAI Base URL，里面输入 `https://api.deepseek.com/beta`。
5. （optional）也可以通过 过硅基流动开源版 DeepSeek-Coder-V2-Instruct api来设置，硅基流动提供的 DeepSeek-Coder-V2-Instruct api 价格是 1.33 元/ 1 百万 tokens，输入输出同价。注册即送 14 元免费额度(2000万Tokens)，链接在[这里](https://cloud.siliconflow.cn/i/kYdgPAHH)。
6. 注册成功后，在 cursor settings 界面设置模型，具体如下截图所示，添加模型名称 `deepseek-ai/DeepSeek-Coder-V2-Instruct`, 设置 openai api 的地方输入输入硅基流动的 api 密钥，需要特别注意的是需要点开 Overwrite OpenAI Base URL，里面输入 `https://api.siliconflow.cn/v1` 即可使用。