/* URLS are only hardcoded for testing, in production each template should define
 * a set of urls using a global `DEFINED_URLS` variable.
 */
define(["test_js/testing_host", "underscore"], function(testing_host, _) {
	console.log("inside urls.js, DEFINED_URLS is ", (typeof DEFINED_URLS))
  if (typeof DEFINED_URLS !== "undefined") {
    return DEFINED_URLS
  }
  else if (typeof buster !== "undefined") {
    var urls =  {
      TODO_URL: "/api/testing/todo/",
      TODOLISTS_URL: "/api/testing/todolist"
    }
    _.map(urls, function(value, key, collection) {
      return collection[key] = testing_host.host + value
    })
    return urls;
  }
  else {
    throw "No URLS in this context"
  }
})