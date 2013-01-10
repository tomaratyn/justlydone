/*
 * Copyright (C) 2012  The Boulevard Platform Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Contributors:
 *  - Tom Aratyn <tom@aratyn.name>
 */

// URLS are only hardcoded for testing, in production each template should define
// a set of urls using a global `DEFINED_URLS` variable.

define(["test_js/testing_host", "underscore"], function(testing_host, _) {
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