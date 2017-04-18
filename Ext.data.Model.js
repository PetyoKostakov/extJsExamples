//  Ext.data.field.Field - converters


Ext.define('My.data.Model', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'phone',
        {
            name: 'info',
            convert: function (value, rec) {
                return rec.get('name') + ' ' + rec.get('email')
            }
        }
    ],
});

var model = Ext.create('My.data.Model', {
    name: 'Some name',
    phone: '+359 883 123 123'
});

model.get('info'); // Some name +359 883 123 123



// Model validation


Ext.define('My.data.Model', {
    extend: 'Ext.data.Model',

    fields: [ 'name' ],

    validators: [
        {type: 'length', field: 'name', min: 3}
    ]
});

var model = Ext.create('My.data.Model');

model.set('name', 'a'); // setting not valid name i.e. less than 3 chars

model.isValid() // false

var validation = model.getValidation();

for( var prop in validation.data) {
    console.log(prop); // model field name i.e. name, phone
    console.log(validation.data[prop]); // return true if its valid, if not message why is not
    //"Length must be at least 3"
}



// Proxy


Ext.define('My.data.Model', {
    extend: 'Ext.data.Model',

    proxy: {
        type: 'rest',
        url: '/api/session',
        reader: {
            type: 'json'
        }
    }
});

var model = Ext.create('My.data.Model');
model.save(); // POST request to '/api/session'