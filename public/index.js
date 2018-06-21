/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {
                name: "",
                bio: ""
                }
    };
  },
  created: function() {
    axios
    .get('/api/people')
    .then(function(response) {
      this.people = response.data ;
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      if (this.newPersonName && this.newPersonBio) {
        var newPersonInfo = {
                            name: this.newPerson.name,
                            bio: this.newPerson.bio
        };
        this.people.push(newPersonInfo);
        this.newPerson = '';
      }
    },

    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },

    numberOfPeople: function() {
      var count = this.people.length;
      return count;
    },

    toggleBio: function(inputPerson) {
     inputPerson.bioVisible = !inputPerson.bioVisible;
   }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});