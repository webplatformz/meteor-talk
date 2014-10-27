Talks = new Mongo.Collection('talks');

if (Meteor.isClient) {
    Template.talks.helpers({
        talks: function () {
            return Talks.find().fetch();
        }
    });
}

if (Meteor.isServer) {

}