var Promise = require('bluebird');
var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var student = {name:"John Doe", id:3};

var dataAccess = {
  getStudent: function(id) {
    if(id === 3) {
      return Promise.resolve(student);
    } else {
      return Promise.reject('Invalid Student id')
    }
  }
};

describe('getStudent', function(){
  it('use the done function', function(done){
    dataAccess.getStudent(3).then(function(student){
      student.id.should.equal(3);
      done();
    });
  });

  it('fullfills the promise', function(){
    dataAccess.getStudent(3);
  });

  it('fullfills the promise wit hthe correct student', function(){
    return dataAccess.getStudent(3).should.eventually.equal(student);
  });
});  