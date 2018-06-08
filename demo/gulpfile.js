'use strict';

var gulp = require('gulp'),
    pump = require('pump'),
    uglify = require('gulp-uglifyes'),
    templater = require('../gulp-templater.js'),
    rename = require('gulp-rename');

gulp.task('build', function() {
    pump([
        gulp.src('templater.js'),
        uglify(),
        rename({
            suffix: '.min'
        }),
        gulp.dest('../dist/js')
    ], );
});

gulp.task('tmpl-build', function() {
    gulp.src('./src/tmpl.html')
        .pipe(templater({
            tags: {
                'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'bootstrap_button': '<button class="btn btn-default {{class}}" type="{{type}}">{{html}}</button>'
            }
        }))
        .pipe(rename({
            suffix: '-build'
        }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['build', 'tmpl-build']);