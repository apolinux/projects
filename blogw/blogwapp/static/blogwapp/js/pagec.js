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

  static showChildren(selector){
    $(selector).children().show()
  } 

  static mustCreateBlock(){
    if(this.create_blk){
      this.create_blk = false
      $H.clear(this.block_create_name)
      return false
    }
    this.create_blk = true
    return true 
  }

}

class PageC {
  // load project list
  static reload(){
    ProjectC.loadList()
  }

}