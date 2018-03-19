var Templater = {
    newTag: '<button class="btn btn-default">' + 'Some Text' + '</button>',
    run: function() {
        var oldTag = document.getElementsByTagName('bootstrap_button')[0];
        console.log(oldTag);
        oldTag.outerHTML = this.newTag;
        console.log(this.newTag);
    }
}