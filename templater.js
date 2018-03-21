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

var Templater = {
    tagRepo: [],
    tmplRepo: [],
    addTag: function(tag, template) {
        this.tagRepo.push(tag);
        this.tmplRepo.push(template)
    },
    run: function() {
        var allElements;
        for (var i = 0; i < this.tagRepo.length; i++) {
            allElements = document.getElementsByTagName(this.tagRepo[i]);
            var HtmlArr = Array.from(allElements);
            console.log(HtmlArr);
            for (var j = 0; j < HtmlArr.length; j++) {
                HtmlArr[j].outerHTML = (this.tmplRepo[i]);
                console.log(HtmlArr[j]);
            }
        }
    }
}