'use strict';

var Student = require('../Student');
var Course = require('../Course');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

xdescribe('Student', function(){
  var studentName = "John Doe";
  var studentGrade = 5;

  it('should save the info on the student and create an id when created', function(){
    // Good unit test consists of three parts
    // Tests can be Damp not DRY
    // Arrange: Set up inital environment or state
    // Act: make some kind of change to state
    var student = Student.create(studentName, studentGrade);
    // Assert: test that change produce expected change
    should.exist(student.name);
    student.name.should.equal(studentName);
    should.exist(student.grade);
    student.grade.should.equal(studentGrade);
    should.exist(student.id);
  });
  it('should increase the student\'s grade by 1 when advanceGrade is called', function(){
    var student = Student.create(studentName, studentGrade);

    student.advanceGrade();
    student.grade.should.equal(studentGrade+1);
  });
});