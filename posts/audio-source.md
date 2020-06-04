---
title: 'Parts of with Web Audio API'
date: '2020-06-01'
---

**AudioContext**
```
const audioContext = new AudioContext();
```

**from ```<audio>``` tag**

`const element = document.querySelector("audio");`

`const source = audioContext.createMediaElementSource(element);`


**from url**

