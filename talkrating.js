Talks = new Mongo.Collection('talks');

if (Meteor.isClient) {
    Meteor.subscribe('talks');

    Template.talks.helpers({
        talks: function () {
            return Talks.find({}, {
                sort: {
                    votes: -1
                }
            }).fetch();
        }
    });

    Template.talks.events({
        'click dd button': function () {
            this.votes ? this.votes++ : this.votes = 1;
            Talks.update({
                _id: this._id
            }, this);
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
    Meteor.publish('talks', function () {
        return Talks.find();
    });
}