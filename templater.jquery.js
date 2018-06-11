(function($) {
    $.fn.templater = function(settings) {
        return this.each(function() {
            Templater.call(this, settings);
        });
    };
})(jQuery);