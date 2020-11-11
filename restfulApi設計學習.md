## RESTful架构

### 起源
* REST这个词，是Roy Thomas Fielding在他2000年的博士论文中提出的。

### 名称
* 互联网软件架构原则，如果一个架构符合REST原则，那么它称为RESTful架构

### 资源
* REST的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。
* 所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。

### 表现层
* "资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。
* URI只代表资源的实体，不代表它的形式。严格地说，有些网址最后的".html"后缀名是不必要的，因为这个后缀名表示格式，属于"表现层"范畴，而URI应该只代表"资源"的位置。它的具体表现形式，应该在HTTP请求的头信息中用Accept和Content-Type字段指定，这两个字段才是对"表现层"的描述。

### 状态转化
* 访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化
* 如果客户端想要操作服务器，必须通过HTTP协议中的方法，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

### API设计指南
* 协议（HTTPS）
* 域名:应该尽量将API部署在专用域名之下。
* 版本:应该将API的版本号放入URL。
* 路径:不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。
```javascript
  https://api.example.com/v1/zoos
  https://api.example.com/v1/animals
  https://api.example.com/v1/employees
```
* HTTP动词
```javascript
 GET /zoos：列出所有动物园
 POST /zoos：新建一个动物园
 GET /zoos/ID：获取某个指定动物园的信息
 PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
 PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
 DELETE /zoos/ID：删除某个动物园
 GET /zoos/ID/animals：列出某个指定动物园的所有动物
 DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```
* 过滤信息
```javascript
  ?limit=10：指定返回记录的数量
  ?offset=10：指定返回记录的开始位置。
  ?page=2&per_page=100：指定第几页，以及每页的记录数。
  ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
  ?animal_type_id=1：指定筛选条件
```
* 状态码
```javascipt
  200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
  201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
  202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
  204 NO CONTENT - [DELETE]：用户删除数据成功。
  400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
  401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
  403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
  404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
  406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
  410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
  422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
  500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
```

* 返回结果
  针对不同操作，服务器向用户返回的结果应该符合以下规范。
```javascript
  GET /collection：返回资源对象的列表（数组）
  GET /collection/resource：返回单个资源对象
  POST /collection：返回新生成的资源对象
  PUT /collection/resource：返回完整的资源对象
  PATCH /collection/resource：返回完整的资源对象
  DELETE /collection/resource：返回一个空文档
```
