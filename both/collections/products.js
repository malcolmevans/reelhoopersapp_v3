Products = new Mongo.Collection('products');

Products.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

var urlRe = /^https?:\/\/[^ \/,"]+\/[^ ,"]+$/i;

// LOAD OEMBED
Meteor.startup(function() {
    IframelyOembed.setTemplate('iframely');
    IframelyOembed.setEndpoint('http://open.iframe.ly/api/oembed');
    IframelyOembed.setCacheOptions({
        cacheTTL: 1000 * 60 * 60, // Hour.
        cacheErrorTTL: 1000 * 60, // Minute.
        cacheEnabled: true
    });
});

/*Meteor.startup(function() {

    Urls.find().observe({

        added: function () {

            var last = Urls.findOne({}, {
                sort: {
                    created_at: -1
                },
                skip: 2,
                limit: 1
            });

            if (last) {

                Urls.remove({
                    created_at: {
                        $lt: last.created_at
                    }
                });
            }
        }
    });
});*/


//
Products.helpers({
  datePosted: function () {
    return moment(this.createdAt).format('M/D');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  voters: function () {
    return Meteor.users.find({_id: {$in: this.voterIds}});
  }
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Products.search = function(query) {
  if (!query) {
    return;
  }
  return Products.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Products.attachSchema(new SimpleSchema({
  url: {
    type: String,
    regEx: urlRe,
    //this.value = String(this.value),
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product URL'
    },
    max: 200
  },
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product Name'
    },
    max: 200
  },
  tagline: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Tagline'
    },
    max: 200
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  voterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numberOfVotes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfComments: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  createdAt: {
    type: Date
  }
}));

SimpleSchema.debug = true;
SimpleSchema.messages({
  regEx: [
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
  ]
});