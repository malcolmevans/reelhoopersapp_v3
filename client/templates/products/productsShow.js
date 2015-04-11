
Template.productsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('product', Router.current().params._id);
  }.bind(this));
};

Template.productsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.productsShow.helpers({
  product: function () {
    return Products.findOne({_id: Router.current().params._id});
  },

  comments: function () {
    return Comments.find({productId: Router.current().params._id}, {sort: {createdAt: -1}});
  },
  onError: function () {
    return function (error) { alert("BOO!"); console.log(error); };
  },
  onSuccess: function () {
    return function (result) { 
      alert("YAY!"); 
      console.log(result); 
      Router.go('trending');
    };
  },
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }  
});

/*Template.productsShow.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {productId: this._id});
    } else {
      IonModal.open('signIn');
    }
  }
});*/
