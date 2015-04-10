AutoForm.hooks({
  'products-new-form': {
    onSuccess: function () {
      IonModal.close();
      IonKeyboard.close();
      Router.go('products.show', {_id: result});
    }
  }
});
