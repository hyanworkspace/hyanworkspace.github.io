---
layout: post
title:  "有手就会，Mac上微信聊天记录导出指南"
date:   2024-09-14
# categories: [分类1, 分类2]
tags: ["AI", "local_first", "dev"]
---

# 有手就会，Mac上微信聊天记录导出指南
Windows系统下要实现这件事很容易，已经有开源的非常好用的工具**MemoTrace**了，传送门在这里：[github](https://github.com/LC044/WeChatMsg)，和[主页](https://memotrace.cn)。

其实 MacOS上 的微信是提供聊天数据迁移的，但是！事实上，我们作为个人用户，想要把聊天记录导出成其他形式（简单可读的 txt 比如说），放在其他地方，原始 app 是做不到这一点的。那就更不用提需要把聊天记录提取出来再做一些数据分析或者自己的小工具之类的了。

看到MemoTrace作者大大的下面这段话非常感动🥹
![Memotrace 主页截图](/assets/images/memotrace_cn.png)

数据是自己的，为什么不能用？

于是看了许多攻略和文章，尝试了许多方案：（需要教程的直接可以跳到，以下是探索的步骤，有点废话，但是解释了为什么最终选择这个方案）

1. 用 cursor 或者其他 AI 工具把 MemoTrace （感谢作者的开源❤️）翻译成 MacOS 兼容的app，学雷锋一样一下造福所有人😆。但是后来发现不是那么容易，其中有一步是为了破解微信原始聊天数据，并且MacOS 和 Windows 的一些默认地址并不相通，对于小白来说非常不友好。即使我有 AI神器，仍然是一件比较费劲的事情。可能也就是为什么MemoTrace也一直都只支持 Windows。
2. 既然 MemoTrace 不可 Mac 化，那要用就只能装一个 windows 环境。这个思路下，chatgpt 推荐了两种方案：
   1. 使用 Wine（最轻量的解决方案）：Wine 是一个兼容层，允许你在 MacOS 上直接运行某些 Windows 程序，而无需安装完整的 Windows 操作系统。它不需要虚拟机，因此是最节省空间的选项。
   2. 如果 Wine 不支持需要运行的exe，那么运行虚拟机，推荐了免费开源的VirtualBox。
   但是由于自己的 Macbook Air 实在小😭，不想为了一个任务浪费空间，转战第三个方案：**自己破译 MacOS 上的微信数据**。
3. 

# 操作指南

## 聊天记录位置
首先，我们需要知道Mac上微信的聊天记录是以数据库的形式保存的，先找到：
```shell
~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/com.tencent.xinWeChat/2.0b4.0.9/
```
说明：该文件夹下有一些类似于`50294ad4v3fede5b5df0b30e1b083bc1d`一长串字符的文件夹，每个微信对应一个文件夹。消息位于文件夹下面的Message子文件夹。形如`msg_x.db`的数据库文件就是我们的微信聊天记录。

打开 terminal 终端，输入：
```shell
csrutil status
```
如果为enabled，则需要关闭。如果为disabled则跳过*关闭 SIP*步骤。


## 关闭 SIP
首先，关机。
重新开机时，Intel MacBook 按下开机键后一直按 Command-R 组合键进入恢复模式，M系列芯片 MacBook 按住开机键不放直到出现选择界面，进入恢复模式。点击屏幕顶部工具栏上的 实用工具，选择终端。输入：
```shell
csrutil disable
```
按 y 确认操作后会看到`Successfully disabled System Integrity Protection`，重启。开机后可以通过 `csrutil status`再检查一下是不是 disabled 的状态。

## 环境准备

此时我们已经关掉了 SIP，由于微信聊天记录以数据库保存，且是加密的。

* 首先，请先确保你的电脑安装了`sqlite`，可以用 Homebrew 安装`brew install sqlite`
* 另外，请确保微信版本不要超过 3.7.3。（因为之后的版本修复了这个漏洞）[这里](https://blog.csdn.net/qq_29607687/article/details/140651324)可以找到历史版本，我下载了3.7.0。下载后，把旧版本卸载，再安装这个新下载的版本。
* 接着，我们开始破解访问密码。


## 找到破解密码

1. 打开Mac上的微信，但不要登录。可以对照着下面这个图来执行。
   ![执行结果](/assets/images/cmd_result_weixin_chat.png)
2. 打开终端，输入以下命令：
   ```shell
   sudo lldb -p $(pgrep WeChat)
   ```
3. 在lldb的子shell中，输入以下命令设置断点：
   ```shell
   br set -n sqlite3_key
   ```
   注意，这一步运行完之后应该能够找到 2 个断点。不然还是没有用，找不到 adr 那个值。
4. 继续程序执行：
   ```shell
   c
   ```
5. 这时会弹出微信登录界面，登录后可能会卡住，但不要担心，返回终端。
6. 在lldb的子shell中输入以下命令读取内存中的密码：
   ```shell
   memory read --size 1 --format x --count 32 $x1
   ```
   这时，会返回类似：
   ```shell
    0x000000000000: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000008: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000010: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000018: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    ```
    
7. 记录输出的内存地址，用 python 处理一下。 
    ```python
    source = """
    0x000000000000: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000008: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000010: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    0x000000000018: 0xab 0xcd 0xef 0xab 0xcd 0xef 0xab 0xcd
    """
    key = '0x' + ''.join(i.partition(':')[2].replace('0x', '').replace(' ', '') for i in source.split('\n')[1:5])
    print(key)
    ```
    此时的输出就是数据库的密码raw_key，一定要记住。
8. 记录完之后，退出lldb的子shell，直接 exit 即可。
9. 并且最后的最后，记得重启电脑，把 SIP 恢复！把 disable 换成 enable 即可。
到这里，我们就**成功获得了密码！** 🎉🎉🎉🎉🎉 

还没结束！

## 使用数据库浏览器打开数据库
有两种方案：
1. 可以使用有界面的数据库浏览器DB Browser for SQLite：
   
    [DB Browser for SQLite](https://sqlitebrowser.org/dl/)

    使用该软件打开形如`msg_*.db`的数据库文件，并在提示输入密码时，使用之前获取的密码。
    ![DB Browser界面](/assets/images/db_view.png)

    打开数据库后，你可以看到多个表格，每个表格代表一个聊天。选择`文件-导出-表到JSON`，全选所有表格，将聊天记录导出为JSON文件。
    一个简单的Python脚本示例：
    ```python
    import json
    chat_file = 'Chat_xxxxx.json'
    output_file = 'chat_result.txt'
    with open(output_file, "w") as fout:
        with open(chat_file, "r") as fin:
            results = json.load(fin)
            for dic in results:
                if dic["messageType"] == 1:
                    content = dic["msgContent"]
                    if dic["mesDes"] == 1:
                        msg = content.strip().split(":\n")
                        if len(msg) == 2:
                            username = msg[0]
                            msg = msg[1].strip().replace("\n", " ").replace("\r", " ")
                        else:
                            msg = content.strip().replace("\n", " ").replace("\r", " ")
                    else:
                        msg = content.strip().replace("\n", " ").replace("\r", " ")
                    fout.write("{}\n".format(msg))
    ```
    这段脚本会将`Chat_xxxxx.json`聊天记录中的文本内容提取出来并保存为`output_file`的文本文件。


2. 使用 pysqlcipher3 处理微信数据库
   
    这是一个已经不再维护的包，但是它让你免除下载一个 app 的步骤。并且可以直接用 python 控制整个流程。
    首先，现安装sqlcipher。可以使用 homebrew，`brew install sqlcipher`

    接下来，查看一下它的安装地址：

    ```shell
    brew info sqlcipher
    ```

    修改一些环境变量，假设你安装的地址是`/opt/homebrew/Cellar/sqlcipher/4.6.1`，那么改成：
    ```shell
    export LDFLAGS="-L/opt/homebrew/Cellar/sqlcipher/4.6.1/lib"
    export CPPFLAGS="-I/opt/homebrew/Cellar/sqlcipher/4.6.1/include"
    export PKG_CONFIG_PATH="/opt/homebrew/Cellar/sqlcipher/4.6.1/lib/pkgconfig"
    ```
    最后，安装 pysqlcipher3：
    ```shell
    pip install pysqlcipher3
    ```
    成功安装后，一个简单的Python脚本示例：
    ```python
    import pysqlcipher3.dbapi2 as sqlite

    key = '0x********************'
    chat_table = 'Chat_***********'

    db= sqlite.connect('WeChatDB/msg_1.db')
    db_cursor = db.cursor()
    db_cursor.execute(f"PRAGMA key='x''{key[2:]}''';")  
    db_cursor.execute("PRAGMA cipher_compatibility=3;")
    db_cursor.execute("PRAGMA cipher_page_size=1024;")
    db_cursor.execute("PRAGMA kdf_iter=64000;")
    db_cursor.execute("PRAGMA cipher_hmac_algorithm=HMAC_SHA1;")
    db_cursor.execute("PRAGMA cipher_kdf_algorithm=PBKDF2_HMAC_SHA1;")


    resoverall = db_cursor.execute(f"SELECT * FROM {chat_table};")
    data_list = resoverall.fetchall()
    columns = [i[0] for i in resoverall.description]

    # 创建一个列表来存储所有行的字典表示
    json_data = []

    for row in data_list:
        # 创建一个字典，将列名和对应的值配对
        row_dict = {columns[i]: value for i, value in enumerate(row)}
        json_data.append(row_dict)
    
    ```
    接着就可以随意操作了，由于微信有各种不同的 messageType，还需要自己再细化处理。再接入 AI，就可以实现一些自己的记录和整理了。
    
完结撒花 🎉🎉🎉🎉🎉

## 注意事项
- 确保在操作过程中不要关闭微信或终端。
- 导出的聊天记录可能包含敏感信息，请妥善保管。
- 如果遇到任何问题，可以尝试重启微信或重新执行上述步骤。

