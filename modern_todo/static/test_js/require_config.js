var require = {
//  baseUrl: "../resources/",
  /* for buster test -po use: */
  baseUrl: "../static/",
  shim: {
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    "backbone-tastypie": {
      deps: ["backbone"],
      exports: "Backbone"
    },
    "backbone-relational": {
      deps: ["backbone-tastypie"],
      exports: "Backbone"
    },
    "bootstrap": {deps: ["jquery"]},
    "humane": {deps: ["jquery"]},
    "jquery": {exports: "$"},
    "mustache": {exports: "Mustache"},
    "underscore": {exports: "_"}
  },
  paths: {
    "backbone": "backbone-0.9.2",
    "backbone-tastypie": "test_js/backbone-tastypie",
    "backbone-relational": "backbone-relational.head",
    "bootstrap": "bootstrap-2.1.0/js/bootstrap",
    "humane": "humane-custom",
    "jquery": "jquery-1.8.0",
    "mustache": "mustache-0.7.0",
    "underscore": "underscore-1.4.2",
    "when": "when-1.6.0"
  }
}
