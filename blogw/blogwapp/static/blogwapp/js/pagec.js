"use strict";

// define classes 

class PageC {
  // restrict to only one instance
  constructor(){
    if(PageC._instance){
      throw new Error('Only one instance is allowed')
    }
    PageC._instance = this
  }

  // load project list
  reload(){
    Project.loadList()
  }

}