# Justly Done - Libre and Open Source Productivity

Justly Done is a GTD todo list web app and RESTful server (for desktop+mobile apps to use as a datastore and sync). We think it's important to provide a Libre way for to store our productivity data and todos rather than being restricted to platform specific walled gardens (like iCloud), platform specific walled gardens (like 2do), or proprietary platforms (like toodledo).

Justly Done is written in Django, Bacbone.js, and Bootstrap. Django code is tested with the Django test framework and JavaScript is tested with BusterJS. We aim for a high degree of test coverage. The project was created and maintained by [Tom Aratyn](http://tom.aratyn.name) and [the Boulevard Platform](http://boulevardplatform.com).

A hosted private alpha is currently available from the Boulevard Platform. Contact [tom@boulevardplatform.com](mailto:tom@boulevardplatform.com) for an account. You are also encouraged to setup your own server. 

Please help out by [reporting bugs](https://github.com/themystic/justlydone/issues/new)! Patches/Pull Requests are also welcome!

You can also support Justly Done via: [![Flattr this!](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/1104382/justlydone-app" target="_blank)  [![Donate via PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PJY546A8S7TMQ&) [Gittip](https://www.gittip.com/themystic/)

## FAQ

### Q: Why another todolist app?

A:  Justly Done was created out of a concern for privacy and frustration that "todo list clients" (like Things, 2DO, Todo.app, Due Today, etc.) either keep data in platform specific places (like iCloud) where apps on other platforms can't reach it, their own walled gardens, or on proprietary services (like Toodledo - who should be praised for their exceptionally readable privacy policy). Justly Done wants to provide two things:

 1. A good api with a ready built online data store for todo client app creators to use by either running their own servers, using Boulevard Platform hosted services, and their users' own personal servers. Ideally supporting all three options.
 2. A well designed web todo interface.

### Q: Why don't you have Feature X?

A: We may not have some features *yet* for one of two reasons:

 1. We're initially focusing on GTD based features. But we're not restricted to just that forever.
 2. You haven't [filed a ticket](https://github.com/themystic/justlydone/issues/new) or [given us a shout](mailto:tom@boulevardplatform.com) *yet*. We want to make sure we provide the features our users want! Get in touch!
 
Justly Done's feature set aims for a balance along two axis:

 1. Good User Experience Vs. Opulent Feature set. If we can't figure out a good user experience we will be reluctant to add it to the front end.

 2. Front End Vs. Backend. Just because we can't figure out how to provide web client interface for a feature does not mean the backend shouldn't support it. Very different design concerns affect the backend (we want a well designed API) but it will not be solely restricted to the feature set of the front end.
 
### Q: My client todo app is awesome and the only thing missing is Justly Done integration. How do I integrate?

Currently (as of 0.0.1) integration must be done by getting and passing a session cookie. By 1.0.0, we'll offer OAUTH support.

#### Authenticate

To get (and authenticate) a session cookie an http library of your choice send using a `POST` request to `/login`.

	import requests
	response = requests("http://app.justlydone.com/login", data={"user": "myusername", "password": "secret")
	cookies = response.cookies
	cookies["sessionid"] //this is your session id
	
Then for all further requests keep sending this sessionid cookie.

#### Common API Notes

Excepting authentication, the entire API is RESTful. You can `POST` new items, `PUT` updates, `GET` items, and `DELETE` items. 

As of 0.0.1, the endpoints are all under `/api/testing/`. By 1.0.0, the api will be with `/api/stable/`.

All our endpoints support the same operations. The format can be specified using either the `ACCEPT` header or the `GET` parameter `format` (ex. `?format=json`).

For more common API features see [TastyPie Fetching Data Docs](http://django-tastypie.readthedocs.org/en/latest/interacting.html#fetching-data).

#### Using Todo Lists

Todo lists are the basic containers of Todos. A todo is in one todolist. As of 0.0.1, Todolists are at `http://app.justlydone.com/api/testing/todolist`.

#### Using Todos

Todos are exactly what it says on the tin. As of 0.0.1, Todos for the logged in user are available via: `http://app.justlydone.com/api/testing/todo`

    
## Contributing

We'd love to have you get involved! You can help by filing tickets, reviewing tickets (making sure there's enough info in each ticket), Flattr'ing (or just donating to) us, and, of course, contributing code (note: all code contributions must have python/javascript tests and be willing to grant shared copyright to the Boulevard Platform).

### Getting Started Developing

Justly Done developers must have Python 2.6+ and Node 0.6.3+ (for BusterJS). A Unix-like OS is highly recommended as [Buster doesn't support Windows yet](http://docs.busterjs.org/en/latest/getting-started/#windows).

 1. Checkout the git repo

 2. Create a virtual env (optional, but recommended)
 
    ```
    cd justlydone
    virtualenv --no-site-packages .     
    ```
 
 3. Activate the virtual env
 
    ```
    source bin/activate
    ```
 
 4. Install dependencies
 
    ```
    pip install -r requirements.txt
    ```

 5. Setup your local settings:
 
    ```
    cd justlydone
    cp main_project_settings/local_settings.sample.py main_project_settings/local_settings.py
    vim main_project_settings/local_settings.py #you'll need to setup the correct paths and db here.
    ```    

 6. Check the backend works (master MUST be stable, develop should be as well).
 
     ```
     python manage.py test     
     ```
     
  7. Install buster - see [BusterJS Getting Started Doc](http://docs.busterjs.org/en/latest/getting-started/)
 
     ```
     npm install -g buster
     npm install buster-amd
     ```
  
  8. (In another terminal) Start the buster server
  
     ```
     buster serve
     ```

  9. Capture a browser by opening up the buster server page in your favourite browser. By default: http://localhost:1111.
  
  10. (In the original terminal) Run the JavaScript Tests
  
     ```
     buster test -po
     ```
     
     `-po` makes it easier to do debugging in the browser and `console.log` messages will show up in the browser (rather than in the command line with buster). If you don't want this make sure to change your buster test config (`static/buster.js`).


## License

Justly Done is licensed under the Affero General Public License version 3 (see LICENSE file).
