const assert = require('assert')
const when = require('../lib/index').when

const SHOULD_NOT_BE_HERE = 'should not be executed to here.'

describe('when', function () {

  describe('when true then', function (done) {
    return new Promise(function (resolve) {
      when(true).then(() => {
        assert.ok(true)
        resolve()
      })
    }).then(done)
  })

  describe('when predicate', function (done) {
    return new Promise(function (resolve) {
      when(() => true).then(() => {
        assert.ok(true)
        resolve()
      }).else(() => {
        assert.fail(SHOULD_NOT_BE_HERE)
      })
    }).then(done)
  })

  describe('when false', function (done) {
    return new Promise(function (resolve) {
      when(false).then(() => {
        assert.fail(SHOULD_NOT_BE_HERE)
      }).else(() => {
        assert.ok(true)
        resolve()
      })
    }).then(done)
  })

  describe('when promise true', function (done) {
    return new Promise(function (resolve) {
      when(() => {
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      }).then(() => {
        assert.ok(true)
      }).else(() => {
        assert.fail(SHOULD_NOT_BE_HERE)
      })
    }).then(done)
  })

  describe('when promise false', function (done) {
    return new Promise(function (resolve) {
      when(() => {
        return new Promise((resolve, reject) => {
          resolve(false)
        })
      }).then(() => {
        assert.fail(SHOULD_NOT_BE_HERE)
      }).else(() => {
        assert.ok(true)
        resolve()
      })
    }).then(done)
  })

})