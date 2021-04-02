"use strict"

let BlogC = class{

  // restrict to only one instance
  constructor(){
    if(BlogC._instance){
      throw new Error('Only one instance is allowed')
    }
    BlogC._instance = this
  }

  load(id){}

  create(){}

  update(){}

  delete(){}

  search(){}
}