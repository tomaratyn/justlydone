/* URLS are only hardcoded for testing, in production each template should define
 * a set of urls using a global `DEFINED_URLS` variable.
 */
define([], function() {
  if (typeof module !== "undefined" && module.exports ) {
   return {
    TODO_URL: "http://localhost:8000/api/testing/todo/",
    TODOLISTS_URL: "http://localhost:8000/api/testing/todolist"
    }
  }
  else {
    return DEFINED_URLS
  }
})