const jsdom = require('jsdom');
const assert = require('assert');
const { JSDOM } = jsdom;
const fetch = require("node-fetch")

// jsdom instance
const testurl = "http://localhost:4010/table.html"
const posturl = "http://localhost:4010/data/Slide/post"
const findurl = "http://localhost:4010/data/Slide/find?slide=TEST"


describe('Slide Loading Step 1', function () {

  it('Posts a Slide', function (done) {
    var slideData = {"name" : "TEST" , "location" : "/images/sample.svs" , "mpp" : 0.499};
    var postProcess = fetch(posturl, {
        "method":"POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
            // "Content-Type": "application/x-www-form-urlencoded",
            },
        body:JSON.stringify(slideData)})
    postProcess.then(x=>x.json()).then(x=>{
      assert.equal(x.count,1, "Post Reported Successful")
      done()
    }).catch(e=>{
      console.log("err")
      console.log(e)
      done(e)
    })
  })
})
describe('Slide Loading Step 2', function () {
  // can we see it in find
  it('Finds the added slide', function (done) {
    let getProcess = fetch(findurl)
    getProcess.then(x=>x.json()).then(x=>{
      assert.equal(x.length,1, "Slide Shows up in API List")
    }).catch(e=>{
      console.log("err")
      console.log(e)
      done(e)
    })

  });
})
