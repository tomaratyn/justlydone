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
    "test_js/controllers/*-test.js",
    "test_js/models/*-test.js",
    "test_js/views/*-test.js"
  ],
  extensions: [ require("buster-amd") ]
  // Not used until buster starts shipping with resources/proxying.
  // Also, should use testing_host.js
  /*
    ,
    resources: [{
      path:"/api",
      backend:"http://localhost:8000/api"
    }]
  */
};


