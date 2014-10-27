Talks = new Mongo.Collection('talks');

if (Meteor.isClient) {
    Template.talks.helpers({
        talks: function () {
            return Talks.find().fetch();
        }
    });

    Template.talkForm.events({
        'click form[name=addEntryForm] button': function (event) {
            var form = $(event.target).parents('form'),
                title = $('input#title', form),
                description = $('textarea#description', form);

            if (title.val() && description.val()) {
                Talks.insert({
                    title: title.val(),
                    description: description.val()
                });
                title.val('');
                description.val('');
            }
        }
    });
}

if (Meteor.isServer) {

}