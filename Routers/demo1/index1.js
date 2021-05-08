class Route {
  constructor() {
    this.routes = {};
    this.currentUrl = "";
    this.history = [];


    this.currentIndex = this.history.length - 1
    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)

    this.isBack = false;
    document.addEventListener("load", refresh);
    document.addEventListener("hashchange", refresh);
  }

  route(path, cb) {
    this.routes[path] = callback || function() {}
  }
}
