### webpack + react + antd + dva + tailwind + eslint 项目基本框架

个人维护的React最佳实践脚手架

### Why?
为了兼顾开发效率和灵活性

### 一些实践方案：
#### 数据请求
- 数据请求方式：
业务请求 -> useRequest/useMutation -> xFetch

在xFetch中对api的处理进行了处理，现在可以通过更加方便的方式识别请求方式和路由参数:
```js
xFetch("GET /api/user/{id}", { id: 1, username: "abc" }) -> fetch("/api/user/1?username=abc")
```

所有的请求尽量都走hooks,因为在useMutation自动处理了错误提示和post/delete等请求成功提示, 以及添加与全局状态相关的参数

#### css
同时支持tailwind css 和 less 以及 css module

#### 状态管理
使用dva管理全局状态，除了必要数据，其他状态不推荐存储在dva

#### 国际化
使用react-intl, 所有的国际化通过其提供的`useIntl`hooks进行

#### 布局
相关文件放在layout文件夹，包括侧边栏相关内容，若需要将相关功能提取出来，可以提取为hooks

#### 代码规范
eslint会在commit之前自动执行并尝试格式化代码，不符合规范的代码提交会失败
使用prettier和eslint:recommended规范
