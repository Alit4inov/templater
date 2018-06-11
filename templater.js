(function(window) {
    'use strict';

    const Templater = function(settings, VDOM) {

        if (!settings.tags) {
            return false;
        }

        let that;

        if (VDOM) {
            that = VDOM.window.document.querySelector('html');
        } else {
            that = this;
        }

        // write the parameters of custom tags to the object and call run function, if work with gulp task return outer html

        let template = settings.tags,
            tagRepo = {};

        for (let tag in template) {
            tagRepo[tag] = template[tag];
        }

        run.call(that, tagRepo);

        if (VDOM) {
            return (VDOM.window.document.querySelector('html').outerHTML);
        }
   
        // Main function that runs a chain of functions for converting custom tags to native for replacing html

        function run(tagRepo) {
            for (let key in tagRepo) {
                if(!that.querySelectorAll(key).length) continue;
                let elementsArr = Array.from(that.querySelectorAll(key));
                elementsArr.every(function(el, index) {
                    if (el.querySelector(key)) {
                        findInner(el, key, tagRepo);
                        run.call(that, tagRepo);
                        return false;
                    }
                    el.outerHTML = render(tagRepo[key], el);
                    run.call(that,tagRepo);
                }, that);
            }
        }

        // function searches for nested custom tags and call render function for html replacement

        function findInner(el, tag, tagRepo) {
            if (typeof el === "undefined") {
                return false;
            }
            for (let tag in tagRepo) {
                if (el.querySelector(tag)) {
                    let innerelement = el.querySelector(tag);
                    findInner(innerelement, tag, tagRepo);
                }
            }
            el.outerHTML = render(tagRepo[tag], el);
        }

        // function that directly performs the conversion

        function render(template, sourceElement) {
            let attrpattern = /{{(\w+)}}/gi,
                TemplateAttrArr = template.match(attrpattern),
                defaultText = 'Some Text';

            let AttrArr = TemplateAttrArr.map(function(el) {
                return el.replace(/[{+}+]/g, '');
            })
            TemplateAttrArr.forEach(function(el, i) {
                template = template.replace(el, sourceAttr(AttrArr[i], sourceElement, defaultText));
            });
            return template;
        }

        // function that replaces the template values ​to ​source values, is called by the render function when converting elements

        function sourceAttr(attr, sourceElement, defaultText) {
            if (attr === 'html') {
                if (!sourceElement.innerHTML) {
                    return sourceElement.innerHTML = defaultText;
                }
                return sourceElement.innerHTML
            }
            if (sourceElement.getAttribute(attr) === null || undefined) {
                return '';
            }
            return sourceElement.getAttribute(attr);
        }
    }

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function() { return Templater; });
        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Templater;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Templater = Templater;
    } else {
        window.Templater = Templater;
    }


})(this);