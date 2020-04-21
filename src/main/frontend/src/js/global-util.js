module.exports = {

    escapeRegExp: function (string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    replaceAll: function (string, find, replace) {
        return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },
    isEquivalent: function (a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    scrollIfNotInView: function(element){
        var offset = element.offset().top - jQuery(window).scrollTop();

        if (offset > window.innerHeight) {
            // Not in view
            jQuery('html,body').animate({scrollTop: offset}, 1000);
            return false;
        }
        return true;
    }
};