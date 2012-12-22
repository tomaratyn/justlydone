define(["jquery", "underscore", "backbone-relational", "mustache"],
function($,        _,            Backbone,              Mustache) {
    return Backbone.View.extend({
      render: function() {
        this.setElement(Mustache.render(this.template, this.model.attributes))
        return this
      },
      template: $("script#donetodo_template").text()
    })
  }
)