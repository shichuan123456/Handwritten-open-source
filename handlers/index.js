const Handlebars = require("handlebars");
const string = `
    <div class="entry">
      <h1>{{title}}</h1>
      <div class="body">
        {{#noop}}{{body}}{{/noop}}
      </div>
    </div>
  `;
  Handlebars.registerHelper("noop", function(options) {
    return new Handlebars.SafeString('<div class="mybold">' + options.fn(this) + "</div>");
  });
const template = Handlebars.compile(string);
const data = {
  title: 'title',
  body: 'body'
};
console.log(template(data));
