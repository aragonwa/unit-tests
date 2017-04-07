'use strict';

var Student = require('../Student');
var Course = require('../Course');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('Course', function(){
  var courseName = "Introduction to Awesomeness";
  var courseCode = "AWE 101";
  var courseDescription = "This course will make you awesome!";
  var student;
  beforeEach(function(){
    student = Student.create('John Doe', 5);
  });

  it('it should save data correctly', function(){
    var course = Course.create(courseName, courseCode, courseDescription);
    // Assert: test that change produce expected change
    should.exist(course.name);
    should.exist(course.code);
    should.exist(course.description);
    should.exist(course.students);
    course.students.should.eql([]);
    should.exist(course.times);
    course.times.should.eql([]);
  });
  describe('registerStudent', function(){
    it('should add the student to the students array', function(){
      var course = Course.create(courseName, courseCode, courseDescription);
      
      course.registerStudent(student);

      course.students.length.should.equal(1);
      course.students[0].id.should.equal(student.id);
    });
  });
  describe('unregisterStudent', function(){
    it('should throw an error if we try to remove a student that isn\'t in the class', function(){
      var course = Course.create(courseName, courseCode, courseDescription);
      expect(function(){
        course.unregisterStudent('asd');
      }).to.throw();
    });
  });
});