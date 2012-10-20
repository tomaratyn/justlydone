var config = module.exports;

config["My tests"] = {
  rootPath: "./",
  environment: "browser", // or "node"
  libs: [
    "test_js/require_config.js",
    "require-2.1.0.js"
  ],
  sources: [
    "*.js",
    "**/*.js"
  ],
  tests: [
    "test_js/*-test.js"
  ],
  extensions: [ require("buster-amd") ]
  ,
  resources: [{
    path:"/api",
    backend:"http://localhost:8000/api"
  }]
}


