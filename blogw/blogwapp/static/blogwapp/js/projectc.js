"use strict"

class ProjectC extends Model {

  static block_create_name = 'block_project_create'
  
  static loadList(){
    $H.clear(this.block_create_name)

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
    let itemclicked = targetFromEvent(event)
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
    let item = targetFromEvent(event)

    ProjectC.showList()
    // EYE: can't use this for call methods here because is called from an Event
    if(! ProjectC.mustCreateBlock()) { 
      return 
    }
    // create html block
    ProjectWriteC.add(item)
  }

  static postAdd(event){
    let item = targetFromEvent(event)

    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.cPost(url, form_data, BlogC.onAdded)
  }

  static onAdded(data){
    PageC.reload()
  }

  static edit(event){
    let item = targetFromEvent(event,true,true)
    // create update template 
    ProjectWriteC.edit(item)
  }

  static cancelUpdate(event){
    let item = targetFromEvent(event)

    let block = $(item).parent()
    ProjectC.showList()

    block.remove()
  }

  static showList(){
    super.showChildren('#' +   PREFIX_TARGET + 'project_list')
  }

  static postUpdate(event){
    let item = targetFromEvent(event)
    // submit 
    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.callBw(url, form_data, ProjectC.onUpdated,'put')
  }

  /**
   * actions:
   * - remove modify form(s) 
   * - reload page 
   * @param {*} data 
   */
  static onUpdated(data){
    $H.removeForms()
    $H.resetCreateBlocks()
    ProjectC.showList()
    PageC.reload()
  }

  static delete(event){
    let item = targetFromEvent(event)
    if(! confirm('Really want to delete this item?')){
      return 
    }

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
    $H.removeForms()

    $H.write('block_project_create',{
      url  : item.href,
      csrf : getCsrfHtml(),
    })
  }

  /**
   * edit project item 
   * 
   * - se obtiene el div objeto padre
   * - se agrega el update form en el nodo anterior con .before
   * - se oculta el div objeto (con hide() )
   * si hace submit, se quita el form y se actualizar
   * si hace cancel, se quita el form y reaparece el div objeto(con show)
   * @param {*} item 
   */
  static edit(item){
    // 1. get dom object to edit 
    let block_project = $(item).parent().parent()
    
    $H.removeForms()

    ProjectC.showList()
    // 2. get previous neighbour or parent 
    // 3. crear div con el formulario 
    // los detalles se obtienen del html existente
    const data ={
      url : block_project.attr('href') ,
      text : $(block_project).find('.project_detail_text').html().trim() ,
      description : $(block_project).find('.project_detail_description').html().trim()
    }

    // 4. add formulary block to this parent 
    let html_update = $H.render('block_project_update',data)
    
    $(block_project).before(html_update)
    
    // hide current detail block 
    block_project.hide()
  }
}