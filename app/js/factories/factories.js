angular.module('contactFactories', ['ngResource'])

.factory('storeData', ['requestData', 'groupClass', 'contactClass',
  function(requestData, groupClass, contactClass) {
    return {
      data: {
        contacts: [],
        groups: []
      },
      loaded: false,
      getData: function(successCallback, errorCallback) {
        if (this.loaded) {
          return this;
        } else {
          var __self = this;
          return requestData.getData()
            .then(
              function(responseObject) {

                // Load Users
                var tmpContacts = responseObject.data.users,
                    i,
                    contact;

                for (i in tmpContacts) {
                  contact = new contactClass(tmpContacts[i]);
                  __self.data.contacts.push(contact);
                }
                contact = null;
                tmpContacts = null;

                // Load Groups
                var tmpGroups = responseObject.data.groups,
                    j,
                    group,
                    membersGroup = [];

                for (i in tmpGroups) {

                  group = new groupClass(tmpGroups[i]);
                  group.set('id', (i + 1) * 1);

                  // Load Contacts on Group
                  for (j in group.members) {
                    contact = __self.findContactById(group.members[j]);
                    if (contact) {

                      // Add member on group
                      membersGroup.push(contact);

                      // Load Groups on Contact
                      contact.addGroup(group);
                    }
                  }
                  group.set('members', membersGroup);

                  __self.data.groups.push(group);
                }
                group = null;
                tmpGroups = null;

                __self.loaded = true;
                return __self;
              },
              errorCallback
            );
        }
      },
      isLoaded: function() {
        return this.loaded;
      },
      findGroupById: function(id) {
        var groups = this.data.groups,
            i;
        for (i in groups) {
          if (groups[i].id == id) {
            return groups[i];
          }
        }
        return false;
      },
      findContactById: function(id) {
        var contacts = this.data.contacts,
            i;
        for (i in contacts) {
          if (contacts[i].id == id) {
            return contacts[i];
          }
        }
        return false;
      }
    };
  }
])

.factory('personClass', function() {
  return function(settings) {
    var __self = this;
    this.id = null;
    this.name = null;
    this.gender = null;
    this.age = null;
    this.get = function(key) {
      if (typeof __self[key]) {
        return __self[key];
      }
      return null;
    }
    this.set = function(key, value) {
      if (typeof __self[key]) {
        __self[key] = value;
      }
    };
    this.loadSettings = function(settings, selfEntity) {
      if ($.isPlainObject(settings)) {
        $.extend(true, this, settings);
      }
    };
    this.init = function(settings) {
      this.loadSettings(settings, this);
    };
  };
})

.factory('contactClass', ['personClass', 'groupClass', 'APP_CONTANTS',
  function(personClass, groupClass, APP_CONTANTS) {
    return function(settings) {
      $.extend(true, this, new personClass(settings));
      var __self = this;
      this.image = APP_CONTANTS.imgProfileDefault;
      this.groups = [];
      this.loadGroups = function(groups) {
        var i,
          j,
          group;
        for (i = 0; i < groups.length; i++) {
          groups[i].id = (i + 1);
          for (j in groups[i].members) {
            if (__self.id == (groups[i].members[j] * 1)) {
              groups[i].into = true;
              break;
            }
          }
          group = new groupClass(groups[i]);
          __self.groups.push(group);
        };
      };
      this.addGroup = function(group) {
        this.groups.push(group);
      };
      this.init(settings);
    };
  }
])

.factory('groupClass', ['personClass',
  function(personClass) {
    return function(settings) {
      var __self = this;
      this.id;
      this.name;
      this.members = [];
      this.get = function(key) {
        if (typeof __self[key]) {
          return __self[key];
        }
        return null;
      }
      this.set = function(key, value) {
        if (typeof __self[key]) {
          __self[key] = value;
        }
      };
      this.loadSettings = function(settings, selfEntity) {
        if ($.isPlainObject(settings)) {
          $.extend(true, this, settings);
        }
      };
      this.addMember = function(member) {
        this.members.push(member);
      };
      this.init = function(settings) {
        this.loadSettings(settings, this);
      };
      this.init(settings);
    };
  }
])