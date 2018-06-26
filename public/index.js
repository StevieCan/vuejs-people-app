/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPersonName: "",
      newPersonBio: "",
      errors: [],
      nameFilter: "",
      bioFilter: "",
      sortAttribute: "name",
      sortAscending: "true"
    };
  },
  created: function() {
    axios
    .get('/api/people')
    .then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {

      if ( this.newPersonName && this.newPersonBio ) {
        var clientParams = {
                          name: this.newPersonName,
                           bio: this.newPersonBio,
                          bioVisible: false
                          };

        axios
        .post('/api/people', clientParams)
        .then(function(response) {
          this.people.push(response.data);
          this.newPersonName = "";
          this.newPersonBio = "";
          this.errors = [];
        }.bind(this))
        .catch(function(error) {
          this.errors = error.response.data.errors;
        }.bind(this));  
      }
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
      // this.$set(inputPerson, "bioVisible", !(inputPerson.bioVisible))
    },
    isValidPerson: function(inputPerson) {
      var vaildName = inputPerson.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      var vaildBio = inputPerson.bio.includes(this.bioFilter);
      return vaildName && vaildBio;
    },
    setAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }
      this.sortAttribute = inputAttribute;
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var lowerAttribute1 = person1[this.sortAttribute].toLowerCase();
        var lowerAttribute2 = person2[this.sortAttribute].toLowerCase();
        if (this.sortAscending) {
          return lowerAttribute1.localeCompare(lowerAttribute2);
        } else {
          return lowerAttribute2.localeCompare(lowerAttribute1);
        }
      }.bind(this));
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app", 
  data: function() {
    return {
    };
  },
  router: router
});

