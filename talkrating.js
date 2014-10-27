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
            Meteor.call('updateTalk', this, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });

    Template.talkForm.events({
        'click form[name=addEntryForm] button': function (event) {
            var form = $(event.target).parents('form'),
                title = $('input#title', form),
                description = $('textarea#description', form);

            if (title.val() && description.val()) {
                Meteor.call('saveTalk', {
                    title: title.val(),
                    description: description.val()
                }, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        title.val('');
                        description.val('');
                    }
                });
            }
        }
    });
}

if (Meteor.isServer) {
    function sanitzeTalk(talk) {
        check(talk, Object);
        check(talk.title, String);
        check(talk.description, String);

        if (talk.votes) {
            check(talk.votes, Number);
        }
    }

    function saveTalk(talk) {
        sanitzeTalk(talk);
        Talks.insert(talk);
    }

    function updateTalk(talk) {
        sanitzeTalk(talk);
        Talks.update(talk._id, talk);
    }

    Meteor.methods({
        saveTalk: saveTalk,
        updateTalk: updateTalk
    });

    Meteor.publish('talks', function () {
        return Talks.find();
    });
}