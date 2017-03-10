# On Tap

> Digital taplist using Vue.js and Firebase.

[![build status](https://git.microfocus.com/ToddQu/ontap/badges/master/build.svg)](https://git.microfocus.com/ToddQu/ontap/commits/master)

View at: [http://ontap.attachmate.com]()

Like many others, this was originally inspired by [Kegerface](http://github.com/kegerface/kegerface).  I looked at [RaspberryPints](https://github.com/RaspberryPints/RaspberryPints), and while I think they have a great project, I had 2 goals that didn't quite align.

1. Super fast and simple entry updating.
 - I know that if it takes me more than a minute to update the list when I'm swapping kegs out, it's just not going to happen.
 - I'm satisfied with name, style, and abv. Color and relative hoppiness are nice as well.
2. No server infrastructure required*.
 - RaspberryPints requires a full LAMP stack, which seems like overkill to me.
 - I discovered the awesome Firebase service, which provides a solid backend to go with a JS frontend.
 -  - * The first version of this could run off of `file://index.hml`.  That's no longer true, but a static webserver is all that's needed.


## Basic usage
Data is namespaced to the url.  The idea was to be able host multiple lists from an instance, such as `#/mybrewery`, `#/mybrewery/bottles`, or even `#/myhomebrewclub`, `#/myhomebrewclub/brewer`, `#/myhomebrewclub/brewer2`. 

By default the display view is shown.  To enter edit mode, double-click the brewery title area (there's currently a temporary toggle button), or append `/edit` to the url.  In edit mode, click `+` to add a new beer, or double-click an existing one to edit or delete it.  The list can be re-ordered by simply dragging and dropping.

To start a new list, just enter a new url, such as `#/foo`.

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Docker

There's a `Dockerfile` in the root directory that you can use to build either a development or "production" server environment.

A Docker image containing the latest code is also in this project's container registry.  Domain authentication is necessary.

``` bash
docker login docker.microfocus.com
docker pull docker.microfocus.com/toddqu/ontap

# dev mode server
docker run -it --rm -p 8080:8080 docker.microfocus.com/toddqu/ontap

# production mode server
docker run -d --name ontap -p 80:8080 docker.microfocus.com/toddqu/ontap npm start

```

## Credit

Thanks to Micro Focus for sponsoring building this as a Hackfest project.  Also thanks to Vue.js and Firebase for building awesome toolsets that make rapid, enjoyable development possible.