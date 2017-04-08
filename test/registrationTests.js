'use strict';

//jshint expr: true;

var Course = require('../Course');
var Student = require('../Student');
var Registration = require('../Registration');
var DataLoader = require('../DataLoader');
var chai = require('chai');
var sinon = require('sinon');

chai.should();

describe('Registration', function(){
  var dataLoader;
  var student;
  var course;
  var registration;

  beforeEach(function(){
    // Mocking for testing
    dataLoader = sinon.stub(new DataLoader());
    course = Course.create(dataLoader);
    student = Student.create(dataLoader);

    dataLoader.saveCourseSync.returns(true);
    dataLoader.getStudentSync.returns({
      name: "Susan",
      id: 1
    });
  });

  it('should not call save if the course is full', function(){
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 2,
      students: [{id:2},{id:3}],
      id: 1
    })

    registration.registerStudentForCourse(1,1);

    sinon.assert.notCalled(dataLoader.saveCourseSync);
  });
  it('should call save if the course is full', function(){
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 3,
      students: [{id:2},{id:3}],
      id: 1
    })

    registration.registerStudentForCourse(1,1);

    sinon.assert.called(dataLoader.saveCourseSync);
  });
});