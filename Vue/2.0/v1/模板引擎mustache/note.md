# Vue
## 模板引擎（mustache）

### 什么是模板引擎
 > 数据变为视图（html的dom元素）的最优雅的解决方案
 > AST 模板解析（v-for）
 > 纯DOM法，数组join法，反引号法，mustache

### 模板引擎基本使用
 > Mustache.render(templateStr, data)

### 模板引擎的核心原理
 > 模本翻译成tokens ，tokens + data ==> dom字符串

### 手写模板引擎