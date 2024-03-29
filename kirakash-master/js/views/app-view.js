/**
 * User: Javlon Eraliyev
 * Date: 2/17/13
 */

window.AppView = Parse.View.extend({
    events:{
        "submit form.app-form":"submit"
    },

//    el:".content",

    initialize:function () {
        _.bindAll(this, "submit");
        this.render();
    },

    submit:function (callback) {
        var self = this;
//        var password = this.$("#signup-password").val();
//        var passwordConfirm = this.$("#signup-password-confirm").val();

//        if (password != passwordConfirm) {
//            this.$(".signup-form .error").html("Password and Password Confirm should be same").show();
//            return false;
//        }

//        var username = this.$("#signup-username").val();
//        var phone = this.$("#signup-phone").val();
//        var name = this.$("#signup-name").val();
//        var email = this.$("#signup-email").val();

//        var user = new Parse.User();

//        this.fillUserData(user, username, password, name, phone, email);


//        user.signUp(null, {
//            success:function (user) {
//                new ManageTodosView();
//                self.undelegateEvents();
//                delete self;
        if (_.isFunction(callback)) {
            callback();
        }
//            },
//            error:function (user, error) {
//                self.$(".signup-form .error").html(error.message).show();
//                self.$(".signup-form button").removeAttr("disabled");
//            }
//        });

//        this.$(".signup-form button").attr("disabled", "disabled");

        return false;
    },

    render:function () {
        var self = this;


        this.template = _.template($('#app-template').html());

        var date = self.model.get("date");
        var d = $.datepicker.formatDate('DD, d MM, yy', self.model.get("date"));
        var m = date.getMinutes();
        var h = date.getHours();

        var t = (h < 10 ? ("0" + h) : h) + ":" + (m < 10 ? ("0" + m) : h);

        this.$el.html(self.template({
            date:d,
            time:t,
            types:["Offer", "Request"],
            cities:["Tashkent", "Namangan", "Andijon"],
            app:self.model.toJSON()
        }));

//        $.datepicker.setDefaults($.datepicker.regional["uz"]);

        self.$("#app-date").datepicker({
            dateFormat:"DD, d MM, yy",
            showOtherMonths:true,
            selectOtherMonths:true
        });

//        var model = new window.Contact();

//        this.$el.prepend(row.$el);


//        self.$('#app-time').blur(function () {
//            self.model.setTime(self.$('#app-time').val());
//        });


        this.$("#app-type :contains('" + self.model.get("type") + "')").attr("selected", "selected");
        this.$("#app-from :contains('" + self.model.get("from") + "')").attr("selected", "selected");
        this.$("#app-to :contains('" + self.model.get("to") + "')").attr("selected", "selected");
        this.$("#app-place :contains('" + self.model.get("places") + "')").attr("selected", "selected");

        this.delegateEvents();
        return this;
    }
});

window.Application = Parse.Object.extend("Application", {

    defaults:{
        active:true,
        type:"offer",
        country:"Uzbekistan",
        from:"",
        to:"",
//        date:new Date(),
        comment:"Empty comment...",
        isRegular:false,
        stops:[],
        places:3,
        isSmoker:false,
        payment:"Cash when driving",
        price:"",
        contact:{
            phone:{
                visible:true
            },
            mobile:{
                visible:true
            },
            email:{
                visible:true
            }
        }
    },

    // Ensure that each todoA created has `content`.
    initialize:function () {
        var date = new Date();
        date.setHours(date.getHours() + 2);
        date.setMinutes(0);

        this.set("date", date);
        this.set("contact.phone.name", "HAHAA");
        if (Parse.User.current()) {
            this.set("vehicle", Parse.User.current().vehicle);
//            this.attributes.vehicle = Parse.User.current().vehicle;
            this.attributes.contact.phone.name = Parse.User.current().phone;
            this.attributes.contact.mobile.name = Parse.User.current().mobile;
            this.attributes.contact.email.name = Parse.User.current().email;
        }
    },

    setTime:function (h, m) {
        var d = this.get("date");
        d.setHours(h);
        d.setMinutes(m);
    }
});
