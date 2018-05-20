+function($){

    function TemplateClass(config) {
        this._init(config);
        this._listenActions();
    }

    TemplateClass.DEFAULTS = {
        dom: {
        },
        events: {
        },
        options: {
        },
        data: {
        },
        objects: {
        }
    };

    TemplateClass.prototype.constructor = TemplateClass;

    TemplateClass.prototype.dom = {};
    TemplateClass.prototype.events = {};
    TemplateClass.prototype.options = {};
    TemplateClass.prototype.data = {};
    TemplateClass.prototype.objects = {};

    TemplateClass.prototype._init = function(config) {

        this.dom = $.extend({},TemplateClass.DEFAULTS.dom,config.dom);
        this.events = $.extend({},TemplateClass.DEFAULTS.events,config.events);
        this.options = $.extend({},TemplateClass.DEFAULTS.options,config.options);
        this.objects = $.extend({},TemplateClass.DEFAULTS.options,config.options);
        this.data = $.extend({},TemplateClass.DEFAULTS.data,config.data);


    };

    TemplateClass.prototype._listenActions = function() {

    };

    TemplateClass.prototype.publicMethod = function() {

    };

    TemplateClass.prototype._privateCart = function() {

    };

    $.newTemplateClass = function(config) {
        return new TemplateClass(config || {});
    };

}(jQuery);