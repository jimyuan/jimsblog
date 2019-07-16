---
layout: post
title:  音律与 Web Audio API
jsfile: Math
tags: js waa api
---
昨天看了网红李永乐老师的一则最新教学视频——[《乐理基础》](https://m.toutiaoimg.cn/group/6683391962764018183)，里面讲到了各个音律的频率是如何制定的等等，虽然小错误不少，但仍然保持了一贯的精彩水准和经典的板书。由此我想到了去年我在公司里做的一个有关 Web Audio API 的技术分享，在准备这个分享的时候，针对声音的频率与音律的关系，我当时也去网上查找资料，了解了一下基本的乐理知识，其中的收获还是蛮有意思的。
<!--more-->

## 音律的形成
我们知道，声音就是物体震动产生的一系列波动，不同频率的波动传入人耳，让我们听到高低不同的声音，有些刺耳，有些动听，动听的声音形成了让人们感觉舒适愉悦的音乐。我们从小就知道 do ra mi fa so... 等等音阶，通过作曲家排列组合这些音阶，我们就可以得到乐曲。

古希腊大能必大哥斯拉……，哦不，是那个…… 毕达哥拉斯(Πυθαγόρας，前 570 年 ~ 前 495 年)，不但在数学、哲学等领域雄霸一方，他竟然还精通乐理！认为万物皆为有理数的他，通过观察和计算，提出了“[五度相生律](https://en.wikipedia.org/wiki/Pythagorean_tuning)”的音律律制；而我国古代也有用“[三分损益法](https://zh.wikipedia.org/wiki/%E5%8D%81%E4%BA%8C%E5%BE%8B#%E4%B8%89%E5%88%86%E6%90%8D%E7%9B%8A%E6%B3%95)”推演出宫、商、角、徵、羽五音。而音乐界目前的实行的音律标准——[十二平均律](https://en.wikipedia.org/wiki/Equal_temperament)，竟然最早是由一位王爷、明太祖朱元璋的九世孙[朱载堉](https://en.wikipedia.org/wiki/Zhu_Zaiyu)首先发明的。

## 标准音制定
我们先来瞧一下十二平均律到底是怎样的概念，我们将某一段音程分成十二份，每一份我们称之为半音，两份则是全音，相邻半音间的频率比率都是相同的。下图中每个相邻的黑白键之间就是半音关系，当然，有特殊情况，E 和 F，B 和后一个 C 之间没有黑键，所以这两个白键也是相差半音。为啥会这样呢，大概是为了和谐吧。

<img src="{{ '/img/waa/12.png' | prepend: site.baseurl }}" class="center-block">

我们这里也不去深入研究其他的乐理知识了，此刻我们上数学！每个半音之间的频率之比为整个纯八度音的  $$\frac{1}{12}$$，也就是半音之间的频率为 $$\sqrt[12]{2}$$ 倍关系，经过 12 个半音后， C 和高音 C 之间就是纯的 2 倍频率了。

在 1935 年 5 月的伦敦国际音乐会议上，规定在 88 键钢琴上，第 49 键，即第 5 个 A（亦称 A4，中音 la）一般被用作调音标准。现行的标准是 440 赫兹，亦称 A440。

<img src="{{ '/img/waa/keyboard.png' | prepend: site.baseurl }}" class="center-block">

_88键钢琴，以数字显示八度和中央 C (青色) 以及 A440 (黄色)_

从上图我们能数出，标准音 A440 和中央 C 之间差了 9 个半音，因此中央 C 的频率为 $$440 \times (\sqrt[12]{2})^{-9} \approx 261.626$$Hz。OK，有了标准音频率，那其他音阶的频率都可以以此为基准，全部推算出来了，管你是 88 键还是 104 键！

## WEB AUDIO API
下面我们先转换一下场景，看看现代浏览器支持的一个强大的 API, Web Audio API（以下简称 WAA）。这是一个可以用 JS 在网页上处理、合成声音的强大功能，有了这个武器，我们就允许开发者通过浏览器这个平台来自选音频源，对音频添加特效，使音频可视化，添加空间效果，等等。

使用 WAA 的基本流程如下：

1. 创建 audio context，类似我们用 `getContext('2d')` 创建一个 canvas 上下文；
1. 设置声音来源，例如从页面里的 audio 标签、音频流或 API 内置的振荡器等；
1. 创建 effect 节点，例如增益、滤波、抽样数据等(非必须)；
1. 选择音频的最终输出节点，通常是你的电脑的扬声器；
1. 连接声源、效果器（如果有）和输出节点，完成音频输出。

<img src="{{ '/img/waa/audio-context.png' | prepend: site.baseurl }}" class="center-block">

下面，我们来体验一下，用 API 提供的音频振荡器发声：

> 人们把人耳能够听到的振动频率称为音频，它的频率范围是从 20Hz - 20KHz，低于 20Hz 的频率称次声波，高于 20KHz 的频率称超声波。能够产生 20Hz - 20KHz 的振荡器就称为音频振荡器。

```javascript
function beep () {
  // 创建一个 audio 实例
  // 目前除了标准方法外，Safari 这种还需要加上 webkit 前缀
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  // 创建一个音频振荡器
  const oscillator = audioCtx.createOscillator()

  // 振荡器开始工作
  oscillator.start()

  // 振荡器 1 秒后停止
  oscillator.stop(1)

  // 将振荡器节点连接到 audio 实例的输出端（扬声器）
  oscillator.connect(audioCtx.destination)
}
```
注意，页面加载时直接执行这个函数没有用，控制台会报警告。我们必须将该方法绑定一下，通过一些行为事件，例如 click 触发： `<button onclick="beep()">play</button>`。想想也对，这样是为了避免被流氓网页骚扰啊！顺利执行了该函数后，支持 WAA 的浏览器将发出“嘟”的声音，持续 1 秒。

第一次使用 WAA 的感觉是不是有点神奇？写几行代码就能让扬声器发声了。这里，我没有为该振荡器传入相应的频率，其内部的默认值就是标准频率 440Hz。当然，我们除了能改变频率，还能为声波进行波形设置，默认值为 `sine`，正弦波形。波形与频率可以通过以下属性或方法进行设置：

- `oscillator.type`
- `oscillator.frequency.setValueAtTime()`

刚才讲到 `oscillator.type` 的默认值为 `sine`，还有其他取值 `square`、`sawtooth`、`triangle`。当然，如果你的数学够好，还能通过 `audioCtx.createPeriodicWave()` 方法创建自定义周期波形，这个我就不深入展开了，因为…… 我也不会！^o^

![波形示意]({{ '/img/waa/sound-wave.png' | prepened: site.baseurl }})

我们可以试试调整一下波形和频率的取值，听听由振荡器发出的不同声音：
```javascript
function beep () {
  /* 进行 audio 上下文、音源和输出的常规设定 */
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const audioCtx = new AudioContext()
  const oscillator = audioCtx.createOscillator()
  const destNode = audioCtx.destination
  oscillator.connect(destNode)
  /* 常规设定结束 */

  // 设置鲨鱼齿波形，还可以赋值的预设值为：sine、square 和 triangle
  oscillator.type = 'sawtooth'
  // 设置振荡器频率为 262Hz，也就是中音 do
  oscillator.frequency.setValueAtTime(262, audioCtx.currentTime)
  oscillator.start(audioCtx.currentTime)
  oscillator.stop(audioCtx.currentTime + 1)
}
```
以上代码，我们看到我们用了一个叫 `audioCtx.currentTime` 的代码代替当前时间，当然，我们可以直接使用数字作为时间，这里牵涉到系统时钟和 “web audio clock” 之间的区别，我们先记住，这里强烈建议用 audio 实例的内置属性——`currentTime` 来表示 aduio 内部运行时的时钟。我们还可以看看这篇博文来加深对不同时钟系统的理解：[Understanding The Web Audio Clock](https://sonoport.github.io/web-audio-clock.html)

听了上面这段代码产生的声音，是不是感觉还是不太自然？我们回忆一下，例如按下钢琴的琴键，它是如何产生自然悦耳的声音的？上面这段声音太过于直接，震动从静止到一定频率，再到静止，应该有一个淡入淡出的过程吧？要控制声音的变化，我们又要来引入一个 audio node 了 —— GainNode！我们称之为增益器，通过增益器我们就能够控制从前一节点来的音源音量了。

我们可以拿上面那段代码稍作修改，先定义和串联各个节点，然后再对单个节点做详细设置：

```javascript
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
const oscillator = audioCtx.createOscillator()
// 新增增益器节点
const gainNode = audioCtx.createGain()
const destNode = audioCtx.destination
// 将声源音频振荡器和增益器、扬声器依次连接
oscillator.connect(gainNode).connect(destNode)
```
振荡器的配置我就不写了，跟上一段一样，下面我们来看下如何利用增益器做淡入淡出：
```javascript
// 当前时间设置音量为 0
gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
// 0.01 秒后音量为 1
gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01)
// 1 秒内声音慢慢降低
gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1)
```
`gainNode` 只有一个 gain 属性，利用这个属性的两个方法 `linearRampToValueAtTime()` 和 `exponentialRampToValueAtTime()`，我们可以成功的实现刚刚的设想。经过以上两个方法的修饰，我们再听声音，已经自然多了。完整的代码，可以看这里：[waa demo](https://codepen.io/jimyuan/pen/vMvjKB)。现在我们能通过这个振荡器 + 增益器完成许多声音效果了，还能演奏几个简单的音符呢，是吧！

接下来有机会，我们再来研究一下 web audio clock 这个重要的话题，等我自己也完全弄明白啊！
