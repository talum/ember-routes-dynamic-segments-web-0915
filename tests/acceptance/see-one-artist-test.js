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

describe('Acceptance: SeeOneArtist', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can see the details of an artist', function() {
    server.create('artist', {first_name: "Steven", last_name: "Nunez"});
    visit('/');
    click('.all-artists');
    // click the first artist
    click('.artist a:first');

    andThen(function() {
      expect(currentPath()).to.equal("artists.artist");
    });
  });

  it('can see the details of an artist', function() {
    server.create('artist', {first_name: "Steven", last_name: "Nunez", genre: "Pop"});
    visit('/');
    click('.all-artists');
    click('.artist a:first');

    andThen(function() {
      expect($(".genre").text()).to.eq("Pop");
    });
  });
});
