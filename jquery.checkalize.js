/* Checkalize jQuery plugin by Simen Brekken (http://github.com/simenbrekken) */

(function($) {
    var Checkalizer = function(checkbox, options) {
        this.$checkbox = $(checkbox);

        this.initialize(options || {});
    };

    Checkalizer.prototype.initialize = function(options) {
        var settings = {
            className: 'checkalizer'
        };

        $.extend(settings, options);

        if (!this.$container) {
            this.$container = $('<div />').addClass(settings.className);
            this.$container.insertBefore(this.$checkbox);

            this.$label = $('label[for=' + this.$checkbox.attr('id') + ']');

            this.$checkbox.on('change', $.proxy(this.updateChecked, this));
            this.$checkbox.hide();

            this.$container.add(this.$label).on('click.checkalizer', $.proxy(this.toggle, this));
        }

        this.updateChecked();
    };

    Checkalizer.prototype.updateChecked = function() {
        this.$container.toggleClass('checked', this.$checkbox.prop('checked'));
    };

    Checkalizer.prototype.toggle = function(e) {
        e.preventDefault();

        !this.$checkbox.prop('disabled') && this.$checkbox.prop('checked', !this.$checkbox.prop('checked')).change();
    };

    $.fn.checkalize = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            var instance = $.data(this, 'checkalizer');

            if (typeof options === 'string' && typeof instance[options] === 'function') {
                instance[options].apply(instance, args);
            } else if (instance) {
                instance.initialize(options);
            } else {
                $.data(this, 'checkalizer', new Checkalizer(this, options));
            }
        });
    };
})(jQuery);
