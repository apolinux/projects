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
