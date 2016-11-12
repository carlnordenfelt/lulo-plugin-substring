'use strict';

var expect = require('chai').expect;

describe('Index unit tests', function () {
    var subject = require('../../src/index');
    var event;
    beforeEach(function () {
        event = { ResourceProperties: { String: '1234567890', Characters: 5, Start: 2 } };
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if String is not set', function (done) {
            delete event.ResourceProperties.String;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property String/);
            done();
        });
        it('should fail if Characters is not set', function (done) {
            delete event.ResourceProperties.Characters;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property Characters/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.physicalResourceId).to.equal('34567');
                done();
            });
        });
        it('should succeed without start', function (done) {
            delete event.ResourceProperties.Start;
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.physicalResourceId).to.equal('12345');
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.physicalResourceId).to.equal('34567');
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                done();
            });
        });
    });
});
