/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: SeeAllArtists', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('shows all artists', function() {
    // make 10 fake artists
    server.createList('artist', 10);
    visit('/');
    // create link that goes to '/artists' with a class of all-artists
    click('.all-artists');

    andThen(function() {
      // put each artist in an element with class of artist
      expect($(".artist").length).to.eq(10);
    });
  });

  it('links to the artist show page', function(){
    // make a single artist
    let artist = server.create('artist', {first_name: "Steven", last_name: "Nunez"});
    visit('/');
    click('.all-artists');

    andThen(function(){
      let $artist = $('.artist a').first();
      expect($artist.attr('href')).to.eq(`/artists/${artist.id}`);
      expect($artist.text()).to.eq('Steven Nunez');
    });
  });
});
