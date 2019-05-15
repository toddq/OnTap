# OnTap
Single page webapp for displaying a beer tap list.

Like many others, this was originally inspired by [Kegerface](http://github.com/kegerface/kegerface).  I looked at [RaspberryPints](https://github.com/RaspberryPints/RaspberryPints), and while I think they have a great project, I had 2 goals that didn't quite align.

1. Super fast and simple entry updating.
 - I know that if it takes me more than a minute to update the list when I'm swapping kegs out, it's just not going to happen.
 - I'm satisfied with name, style, and abv. As inevitable feature creep sets in, and for the benefits of my less knowledgable friends viewing the list, color and relative hoppiness are nice as well.
2. No server infrastructure required.
 - RaspberryPints requires a full LAMP stack, which seems like overkill to me.
 - I discovered the awesome Firebase service, which provides a solid backend to go with a JS frontend.
 - If I ever get this project finished, I'd like it to be easily available to anyone to be able to run their own instance without a web server, ie just open the index file off their desktop.

#### Basic usage
Data is namespaced to the url.  By default `#/demo` data is loaded.  The idea was to be able host multiple lists from an instance, such as `#/mybrewery`, `#/mybrewery/bottles`, or even `#/myhomebrewclub`, `#/myhomebrewclub/brewer`, `#/myhomebrewclub/brewer2`.

By default the display view is shown.  To enter edit mode, double-click the brewery title area, or append `/edit` to the url.  In edit mode, click `+` to add a new beer, or double-click an existing one to edit or delete it.  The list can be re-ordered by simply dragging and dropping.  Double-click the brewery title again to exit edit mode.

To start a new list, just enter a new url, such as `#/foo`.  When in edit mode of a new list (or any list that has not yet been password protected), you have the option to password protect that list so that it can't be randomly edited by anyone.  Enter an email address and password.  I can't remember at the moment, but I don't think there's currently any provision for editing, deleting, or recovering the password.  It's not intended to be high security, just keeping your bozo friends from changing your beer names to innappropriate things.

#### Development
I actually haven't worked on this for quite some time, as I'm better at starting projects than finishing them.  It's using AngularJS, Firebase, and AngularFire for 3-way data-binding between the view and the data store.  Changes that you make are reflected instantly in any other browser viewing your list.

One of the major challenges to this project (besides that Angular is not my top framework choice) has been my desire for it to work without a webserver.  Due to some of the requirements by Angular, this limits the ability to break the app up into more separate files and has created a messier project than I'd like.

<a href="https://imgur.com/JemXukW.png">
  <img src="https://imgur.com/JemXukW.png">
</a>

<a href="https://imgur.com/PEDSFo2.png">
  <img src="https://imgur.com/PEDSFo2.png">
</a>

##### TODO
There are several things left to do before I'll consider this complete.

- Edit mode
 - Color picker - A popup color picker with beer srm values
 - Glass/bottle picker - A popup picker to choose between a couple different glass styles, but also icons for bottles and carboys, to be able to have lists of things clearly in bottles or on deck.
 - Upload custom brewery logo.

- View mode
 - Color/glass display.  Combine the choices from the values saved by the color and glass pickers to render an svg image of the vessel filled by the appropriate color.
- column dividers are wonky
- make it responsive - look good on both bigscreen tv and phone
- printable - add css for being able to print the list nicely
- Change SVG usage to sprites and use xlink:href so they can be styled with CSS.

- Bigger Picture
 - Reconsider requirement to run without a webserver.  Would be easier to maintain if it was more modular.
 - Consider porting it from Angular to something else.
 - Clean up the project structure.  It's a mess.
  - Use a dependency manager (bower or something).
  - Separate my code from 3rd party code.
  - Remove unneeded stuff (spinner, etc)
  - Use Travis to minify source and publish to GitHub Pages.
