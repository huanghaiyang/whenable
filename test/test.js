const assert = require('assert')
const when = require('../lib/index').when

describe('when', function () {

  describe('when true else null', function () {
    assert(when(true).then(() => {
      assert(true, true)
    }) === null, true)
  })

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
      })
    }).then(done)
  })

  describe('when false', function (done) {
    return new Promise(function (resolve) {
      when(false).then(() => {
        assert.fail('should not execute to this line.')
      }).else(() => {
        assert.ok(true)
        resolve()
      })
    }).then(done)
  })

})