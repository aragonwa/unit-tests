'use strict';

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.should();

describe('sinon tests', function () {
  var student, schedule;

  beforeEach(function () {
    student = {
      dropClass: function (classId, cb) {
        // do stuff
        // Checks if dropclass exists on object
        if (!!cb.dropClass) {
          cb.dropClass();
        } else {
          cb();
        }
      },
      addClass: function(schedule){
        if(!schedule.classIsFull()){
          //do stuff
          return true;
        } else {
          return false;s
        }
      }
    };
    schedule = {
      dropClass: function () {
        console.log('class dropped');
      },
      classIsFull: function(){
        return true;
      }

    };
  });

  describe('student.dropClass', function () {
    it('it should call the callback', function () {
      var spy = sinon.spy();

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });
    it('should call the callback and log to the console', function () {
      function onClassDropped () {
        console.log('onClassDropped was called');
      }

      var spy = sinon.spy(onClassDropped);

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback even if it\'s a method of an object', function(){
      sinon.spy(schedule, 'dropClass');
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });
  });

  describe('student with stubs', function(){
    it('should call a stubbed method', function(){
      var stub = sinon.stub(schedule);
      student.dropClass(1, stub)
      stub.dropClass.called.should.be.true;
    });
    if('should return true when the class is not full', function(){
      var stub = sinon.stub(schedule);
      stub.classIsFull.returns(false);
      var returnVal = student.addClass(stub);
      returnVal.should.be.true;
    });
  });

  describe('student with mocks', function(){
    it('mocks schedule', function(){
      var mockObj = sinon.mock(schedule);
      var expectation = mockObj.expects('classIsFull').once();

      student.addClass(schedule);
      expectation.verify();
    });
  });
});
