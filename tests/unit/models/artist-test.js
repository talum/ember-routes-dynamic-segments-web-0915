/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'artist',
  'Artist',
  {
    // Specify the other units that are required for this test.
      needs: []
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var model = this.subject({firstName: "Steven", lastName: "Nunez"});
      // var store = this.store();
      expect(model.get('fullName')).to.eq("Steven Nunez");
    });
  }
);
