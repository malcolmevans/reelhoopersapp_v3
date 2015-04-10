Template.signIn.events({
   'click [data-action=sign-in-instagram]': function (event, template) {
    Meteor.loginWithInstagram(function (err, res) {
          if (err !== undefined)
            console.log('sucess ' + res)
          else
            console.log('login failed ' + err)
      })
    IonModal.close();
    },
   'click [data-action=sign-in-facebook]': function (event, template) {
    Meteor.loginWithFacebook(function (err, res) {
          if (err !== undefined)
            console.log('sucess ' + res)
          else
            console.log('login failed ' + err)
      })
    IonModal.close();
    },
   'click [data-action=sign-in-twitter]': function (event, template) {
    Meteor.loginWithTwitter(function (err, res) {
          if (err !== undefined)
            console.log('sucess ' + res)
          else
            console.log('login failed ' + err)
      })
    IonModal.close();
    },
   'click [data-action=sign-in-google]': function (event, template) {
    Meteor.loginWithGoogle(function (err, res) {
          if (err !== undefined)
            console.log('sucess ' + res)
          else
            console.log('login failed ' + err)
      })
    IonModal.close();
    },
    'click [data-action=closeSignInSuccess]': function (event, template) {
      IonModal.close('signInSuccess');
    }
});
