"use strict"

class ProjectC {

  static loadList(){
    $H.clear('block_project_create')

    const url = getUrl('#reload_page')
    $WB.cGet(url,ProjectC.writeProject)
  }

  // write to html
  static writeProject(data){
    ProjectWriteC.list(data)

    ProjectC.detail(data[0])
  }

  static detailFromAjax(url){
    $WB.cGet(url,ProjectC.detail)
  }

  static detailStatic(event){
    event.preventDefault()
    //let itemclicked = $(event.currentTarget)[0]
    let itemclicked = getTargetEvent(event)
    // get object data 
    let target = itemclicked.href
    ProjectC.detailFromAjax(target)
  }

  /**
   * display project detail and do blog listing
   * if called from reload, project is defined, is the list of projects
   * if called from clicked project, project is event 
   */
  static detail(project){
    // the two links below are called each time project is selected 
    ProjectWriteC.detail(project)
    // get blog list 
    BlogC.list(project)

    // add url for add blog 
    BlogCWrite.addUrl(project)
  }

  static add(event){
    event.preventDefault()
    let item = getTargetEvent(event)

    // create html block
    ProjectWriteC.add(item)
  }

  static postAdd(event){
    event.preventDefault()
    //console.log('post add',event)

    let item = getTargetEvent(event)

    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.cPost(url, form_data, BlogC.onAdded)
  }

  static onAdded(data){
    // clear block
    
    // update project list and so on
    ProjectC.loadList()
  }

  static update(){}

  static delete(event){
    event.preventDefault()
    if(! confirm('Really want to delete this item?')){
      return 
    }

    let item = getTargetEvent(event)
    let url = item.href
    
    $WB.callBw(url,{},ProjectC.onDeleted,'delete')
  }

  static onDeleted(data){
    ProjectC.loadList()
  }

  static search(){}
}

let ProjectWriteC = class{
  static list(data){
    $H.write('project_list', data)
  }

  static detail(info){
    $H.write('project_detail', info)
  }

  static add(item){
    $H.write('block_project_create',{
      url  : item.href,
      csrf : getCsrfHtml(),
    })
  }
}