# Ember Routes - Dynamic Segment
In this lab we're going to get into creating dynamic segments.

### In rails

We create urls with dynamic segments like this.

In our routes file:

```ruby
# routes.rb
get '/artists/:id', to: "artists#show"
```

In our controller
```ruby
def show
  @widget = Widget.find(params[:id])
end
```

We access the dynamic portion of the url using `params`

### In Ember
We create urls with dynamic segments like this.

In our router:

```javascript
// app/router.js
this.route('artists', function() {
  this.route('artist', { path: ':artist_id' });
});
```

In our route
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    this.store.findRecord('artist', params["artist_id"]);
  }
});
```

We access the dynamic portion of the url using `params`.

Let's get into it.

## Dynamic Segments and the path
In Ember, all routes are named. Rails has this option with the `:as` option in routes, but Ember generates the name for you. This is useful when we want to reference a route.

In our example router, the route for `/artists` is simply `artists`. We use this route name in helpers like the `link-to` helper.

```html
{{link-to "All Artists" "artists"}}
```

The path to something like `/artists/1` is named `artists.artist`. Using this in the `link-to` helper looks like this:
```html
{{link-to "See artist 1" "artists.artist" 1}}
```

Since it's a dynamic segment, we have to pass in the part that's *dynamic*.

## Models
Routes are responsible for loading a model. We're going to be using [Ember Data](http://guides.emberjs.com/v2.1.0/models/) to fetch data from an endpoint. We'll be covering Ember Data in more detail in future lessons but for now, all we need to know is how to get all `artists` and how to get a single `artist`.

Within our route's `model` method, we can get all of the artists by returning the result of `this.store.findAll('artist')`. This works because we have a model in `app/models/artist.js`.

We'll use the `findRecord` method to find a specific artist. By setting the `path` option in our router to a dynamic segment, the `model` method in the route is called with an argument. The argument is an object with a property named after the dynamic segment you put in the router.

Here we have a route "artists.artist". The url for this route is "/artist/:artist_id". If we didn't have the path argument, the url would be "artists/artist". No dynamic nothing.

```javascript
// app/router.js
this.route('artists', function() {
  this.route('artist', { path: ':artist_id' });
});
```

Here's the code for finding a record by id.

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    this.store.findRecord('artist', params["artist_id"]);
  }
});
```
Actually... I lied. Here's some Ember Magic. If you named your dynamic segment after a model, it will try to look that model up automatically.

![MAGIC](http://media2.giphy.com/media/Es3FISPjOZzAA/200.gif)

Our code then looks like this:
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
});
```
![Yea](http://media0.giphy.com/media/d8hmw74CXBdXW/200.gif)

## Templates
In the generated templates you'll see `{{outlet}}`. This is a lot like `yield` in rails templates, except it's used a LOT in Ember. If you look in `app/templates/application.hbs`, you'll see `{{outlet}}`. When you generate your `artists` route, the template will have `{{outlet}}`.

![getinsertpic.com](http://media0.giphy.com/media/B9wll4m6KLtyE/200.gif)

You can probably see that the template in `app/templates/artists.hbs` gets rendered into `app/templates/application.hbs`'s `{{outlet}}`, but what get's rendered into `artists.hbs`'s `{{outlet}}`?

### If your urls are nested your templates are nested

Ember is going to see that your route is `artists.artist` and will render the `artist.hbs` template inside of `artists.hbs`... which is inside of `application.hbs`.

ˆ![Inside Man](http://media1.giphy.com/media/xlTwaFb20TVjW/200.gif)

## Generators
You can generate a route and have it automatically write the path for you by using the generator's `path` option. Say we wanted to create "artists.artist" with a dynamic segment of `:artist_id`. Here's what we'd run:

`ember g route artists/artist --path=:artist_id`

## Tests

In these tests you'll be setting up 2 routes. `/artists` and `/artists/1`.

You'll be loading the data using Ember Data. You might have noticed that we haven't set up a backend. We are using a library called [Ember CLI Mirage](http://www.ember-cli-mirage.com/) to fake requests. It's a temporary stand in until we build our Rails backend later. Right now, the endpoints are /artists and /artists/:id. This is enough to get the basic Ember Data working outlined in this README.

Check the tests to deduce which CSS classes you need to apply to your templates.

**Happy Hacking**
