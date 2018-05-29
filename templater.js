(function($) {

    $.fn.templater = function(settings) {
        return this.each(function() {

            if (!$(settings).length) {
                return false;
            }

            // write the parameters of custom tags to the object and call run function

            if (settings.tags) {
                let template = settings.tags,
                    tagRepo = {};
                for (let tag in template) {
                    tagRepo[tag] = template[tag];
                }
                run.call(this, tagRepo);
            }

            // Main function that runs a chain of functions for converting custom tags to native for replacing html

            function run(tagRepo) {
                let elementsArr = [];
                for (let key in tagRepo) {

                    elementsArr = Array.from(this.getElementsByTagName(key));

                    elementsArr.every(function(el, index, arr) {
                        if (el.querySelector(key)) {
                            findInner(el, key, tagRepo);
                            run.call(this, tagRepo);
                            return false;
                        }
                        el.outerHTML = render(tagRepo[key], el);
                    }, this);
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
                    if (sourceElement.innerHTML === '') {
                        return sourceElement.innerHTML = defaultText;
                    } else {
                        return sourceElement.innerHTML
                    }
                } else {
                    if (sourceElement.getAttribute(attr) === null) {
                        return '';
                    } else {
                        return sourceElement.getAttribute(attr);
                    }
                }
            }

        });

    };

})(jQuery);