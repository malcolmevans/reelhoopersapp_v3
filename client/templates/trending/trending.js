Template.trending.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('products');
  }.bind(this));
};

Template.trending.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.trending.helpers({
  products: function () {
    return Products.find({}, {sort: {numberOfVotes: -1, createdAt: -1}});
  },
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

Accounts.ui.config({
passwordSignupFields: "USERNAME_ONLY"
});