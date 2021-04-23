"use strict";

// define classes 

class Model{
  static create_blk = false 

  static resetCreateBlk(){
    this.create_blk=false 
  }

  static toggleCreateBlk(){
    this.create_blk = ! this.create_blk
  }

  /*static showChildren(selector){
    //$(selector).children().show()
    this.showChildren(selector)
  } */

  static mustCreateBlock(){
    if(this.create_blk){
      this.create_blk = false
      $H.clear(this.block_create_name)
      return false
    }
    this.create_blk = true
    return true 
  }

  static validateForm(form){
    if(! form.checkValidity()) {
      form.classList.add('was-validated')
      show_alert('review your input and try again')
      return false 
    }
    form.classList.remove('was-validated')
    return true
  }
}

function eventManagerCallback(event,callback,context){
  event.preventDefault()
  let target=event.currentTarget
  let callbackb = callback.bind(context)
  return callbackb(target,event)
}

/**
 * this handler allows to call any method from an object using Proxy class 
 * @todo improve this, like a class, function,etc
 */
const handlerEvent ={
  get: function get(target, name) {
    return function wrapper() {
      // target : target object, myobj?
      // name : method name called 
      var args = Array.prototype.slice.call(arguments);
      let event = args[0]
      
      if (!( name in target) ){
        event.preventDefault()
        throw new Error(`No such method "${name}"`)
      }

      return eventManagerCallback(event,target[name],target) 
    }
  }
}