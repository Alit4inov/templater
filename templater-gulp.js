var through = require('through2'),
    gutil = require('gulp-util'),
    jsdom = require("jsdom"),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'templater';
const { JSDOM } = jsdom

function Templater(settings) {

    let stream = through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {

            try {

                let str = file.contents.toString('utf8');
                const DOM = new JSDOM(str);

                let result = (function(settings, DOM) {

                    let that = DOM.window.document.querySelector("html");

                    if ((settings).length) {
                        return false;
                    }

                    // write the parameters of custom tags to the object and call run function

                    if (settings.tags) {
                        let template = settings.tags,
                            tagRepo = {};

                        for (let tag in template) {
                            tagRepo[tag] = template[tag];
                        }

                        run.call(that, tagRepo);
                        return (DOM.window.document.querySelector("html").outerHTML);
                    }

                    // Main function that runs a chain of functions for converting custom tags to native for replacing html

                    function run(tagRepo) {
                        let elementsArr = [];
                        for (let key in tagRepo) {
                            elementsArr = Array.from(that.querySelectorAll(key));
                            elementsArr.every(function(el, index, arr) {
                                if (el.querySelector(key)) {
                                    findInner(el, key, tagRepo);
                                    run.call(that, tagRepo);
                                    return false;
                                }

                                el.outerHTML = render(tagRepo[key], el);

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
                        return el.outerHTML = render(tagRepo[tag], el);
                    }

                    // function that directly performs the conversion and return template

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

                })(settings, DOM);

                file.contents = new Buffer.from(result);

                return cb(null, file);

            } catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, err));
                return cb();
            }
        }

    });
    return stream;
}

module.exports = (settings) => Templater(settings);