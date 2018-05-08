// Stage 1

// var Templater = {
//     newTag: '<button class="btn btn-default" type="submit">' + 'Some Text' + '</button>',
//     run: function() {
//         var oldTag = document.getElementsByTagName('bootstrap_button');
//         for (var i = 0; i < oldTag.length; i++) {
//           oldTag[i].outerHTML = this.newTag;
//           console.log(oldTag[i]);
//         }
//     }
// }


// Stage 2

// var Templater = {
//     tagRepo: [],
//     tmplRepo: [],
//     addTag: function(tag, template) {
//         this.tagRepo.push(tag);
//         this.tmplRepo.push(template)
//     },
//     run: function() {
//         var allElements;
//         for (var i = 0; i < this.tagRepo.length; i++) {
//             allElements = document.getElementsByTagName(this.tagRepo[i]);
//             var HtmlArr = Array.from(allElements);
//             console.log(HtmlArr);
//             for (var j = 0; j < HtmlArr.length; j++) {
//                 HtmlArr[j].outerHTML = (this.tmplRepo[i]);
//                 console.log(HtmlArr[j]);
//             }
//         }
//     }
// }

// Stage 3

// var Templater = {
//     tagRepo: [ ],
//     tmplRepo: [ ],
//     ElementsArr: [ ],
//     addTag: function(tag, template) {
//       this.tagRepo.push(tag);
//       this.tmplRepo.push(template)
//     },
//     run: function() {

//         var allElements;

//         for (var i = 0; i < this.tagRepo.length; i++) {

//             var element = [ [ ],[ ],[ ] ];
//             this.ElementsArr.push(element);
//             allElements = document.getElementsByTagName(this.tagRepo[i]);
//             var HtmlArr = Array.from(allElements);

//             for (var j = 0; j < HtmlArr.length; j++) {
//               var types = HtmlArr[j].getAttribute('type');
//               var classes = HtmlArr[j].getAttribute('class');
//               var text = HtmlArr[j].innerHTML;
//               element[0].push(types);
//               element[1].push(classes);
//               element[2].push(text);
//               var newTemplate = this.render(this.tmplRepo[i],this.ElementsArr[i],i,j);
//               HtmlArr[j].outerHTML = (newTemplate);

//             }
//         }; 
//     },
//     render: function(template, element, counteri, counterj) {
//       var RegExpArr = ['{{type}}','{{class}}','{{html}}'];
//       for (var i = 0; i < RegExpArr.length; i++) {
//         template = template.replace(new RegExp(RegExpArr[i]),this.ElementsArr[counteri][i][counterj]);
//       }
//       return template;
//     },
// }

const Templater = {
    tagRepo: {},
    addTag: function(tag, template) {
        this.tagRepo[tag] = template;
    },
    run: function() {
        let elementsArr = [],
            tagRepo = this.tagRepo,
            render = this.render;
        for (let key in tagRepo) {
            elementsArr = Array.from(document.querySelectorAll(key));
            elementsArr.forEach(function(el, index, arr) {
                el.outerHTML = render(tagRepo[key], el);
            })
        }
    },
    render: function(template, element) {
        let pattern1 = /{{(\w+)}}/gi,
            pattern2 = /(\w+)/gi,
            TemplateAttrArr = template.match(pattern1),
            ElementAttrArr = String(TemplateAttrArr).match(pattern2),
            defaultText = 'Some Text';

        function sourceAttr(el) {
            if (el === 'html') {
                if (element.innerHTML === '') {
                    return element.innerHTML = defaultText;
                } else {
                    return element.innerHTML
                }
            } else {
                if (element.getAttribute(el) === null) {
                    return '';
                } else {
                    return element.getAttribute(el);
                }
            }
        }

        TemplateAttrArr.forEach(function(el, i) {
            template = template.replace(el, sourceAttr(ElementAttrArr[i]));
        });

        return template;

    }
}