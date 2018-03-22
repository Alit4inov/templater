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

var Templater = {
    tagRepo: [ ],
    tmplRepo: [ ],
    ElementsArr: [ ],
    addTag: function(tag, template) {
      this.tagRepo.push(tag);
      this.tmplRepo.push(template)
    },
    run: function() {
        
        var allElements;

        for (var i = 0; i < this.tagRepo.length; i++) {
          
            var element = [ [ ],[ ],[ ] ];
            this.ElementsArr.push(element);
            allElements = document.getElementsByTagName(this.tagRepo[i]);
            var HtmlArr = Array.from(allElements);
          
            for (var j = 0; j < HtmlArr.length; j++) {
              var types = HtmlArr[j].getAttribute('type');
              var classes = HtmlArr[j].getAttribute('class');
              var text = HtmlArr[j].innerHTML;
              element[0].push(types);
              element[1].push(classes);
              element[2].push(text);
              var newTemplate = this.render(this.tmplRepo[i],this.ElementsArr[i],i,j);
              HtmlArr[j].outerHTML = (newTemplate);

            }
        }; 
    },
    render: function(template, element, counteri, counterj) {
      var RegExpArr = ['{{type}}','{{class}}','{{html}}'];
      for (var i = 0; i < RegExpArr.length; i++) {
        template = template.replace(new RegExp(RegExpArr[i]),this.ElementsArr[counteri][i][counterj]);
      }
      return template;
    },
}