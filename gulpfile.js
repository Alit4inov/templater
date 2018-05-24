'use strict';

var gulp = require('gulp'),
    pump = require('pump'),
    through = require('through2'),
    uglify = require('gulp-uglifyes'),
    templater = require('./templater-gulp.js') ;
    
gulp.task('build', function() {
    
    pump([
            gulp.src('templater.js'),
            uglify(),
            gulp.dest('./dist/js')
        ],
    );
});

// gulp.task('build', function() {
//   gulp.src('./src/tmpl.html')
//     .pipe(templater({
//             tags: {
//                 'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
//                 'button_custom': '<button class="btn btn-default {{class}}" type="{{type}}">{{html}}</button>'
//             }
//         }))
//     .pipe(gulp.dest('./dist'));
// });


gulp.task('default', ['build']);
