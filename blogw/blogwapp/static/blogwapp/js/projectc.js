"use strict"

class Project extends Model{
  static block_create_name = 'block_project_create'

  static setActive(project){
    $(`#tgt_project_list a.project_detail`).removeClass('active')
    $(`#tgt_project_list a.project_detail[data-id="${project.id}"]`).addClass('active')
  }

  static reload(){
    ProjectList.requestStatic()
  }

  static showList(){
    showChildren('#' +   PREFIX_TARGET + 'project_list')
  }

  static clearRightSide(){
    // clear project detail 
    let project = new ProjectDetail
    project.write({})
    //clear blog list 
    let blog = new BlogList
    blog.write([])
    //disable add blog link
    let blogd = new BlogDetail
    blogd.addUrl({})

    // overwrite project id
    $('.tgt_current_project_id').val('')
  }
}

class ProjectList{
  constructor(){
    this.block_create_name = 'block_project_create' 
  }

  static requestStatic(){
    let instance = new ProjectList 
    instance.request()
  }

  request(){
    $H.clear(this.block_create_name)
    const url = getUrl('#reload_page')
    let method = this.show.bind(this)
    $WB.cGet(url,method)
  }

  show(prj_list){
    this.write(prj_list)

    if(prj_list.length < 1){
      Project.clearRightSide()
      return 
    }
    let project = this.getCurrent(prj_list)
    //this.setActiveProject(project)
    Project.setActive(project)
    //ProjectC.detail(project)
    let projd = new ProjectDetail
    projd.requestDb(project)
  }

  write(project_list){
    $H.write('project_list', project_list)
  }

  getCurrent(prj_list){
    let project = prj_list[0]
    // filter by id 
    if(current_prj_id !== undefined ){
      let new_list = prj_list.filter(function(item){
        return item.id == current_prj_id
      })
      if(new_list.length > 0){
        project = new_list[0]
      }
    }
    return project 
  }
}

class ProjectDetail{

  // called from ProjectList 
  requestDb(project_db){
    this.write(project_db)
    let blogd = new BlogDetail()
    blogd.requestDb(project_db)
  }

  // called from clicked project block 
  requestFromClick(item){
    let url = item.href
  
    current_prj_id = $(item).data('id')
    let method = this.show.bind(this)
    $WB.cGet(url,method)
  }

  show(project){
    // select project 
    Project.setActive(project)
    this.write(project)
    let blogd = new BlogDetail()
    blogd.requestDb(project)
  }

  write(project){
    $H.write('project_detail', project)
  }
}
class ProjectAdd{
  request(project_dom){
    
    Project.showList()
    if(! Project.mustCreateBlock()) { 
      return 
    }
    // create html block
    this.write(project_dom)
  }

  write(project){
    $H.removeForms()

    $H.write('block_project_create',{
      url  : project.href,
      csrf : getCsrfHtml(),
    })
  }

  /**
   * on submit add project 
   * @param {*} event 
   */
  submit(project,event){
    let form = $(project.form)[0]
    if(! Model.validateForm(form)){
      return 
    }

    let form_data = $(project.form).serialize()
    let url = project.form.action
    
    let method = this.onAdded.bind(this)
    $WB.cPost(url, form_data, method)
  }

  onAdded(response){
    $H.resetCreateBlocks()
    Project.reload()
  }
}

class ProjectDelete{
  request(project,event){
    event.stopPropagation()

    if(! confirm('Really want to delete this item?')){
      return 
    }

    let url = $(project).data('url_delete')
    let method = this.onDeleted.bind(this)
    $WB.callBw(url,{},method,'delete')
  }

  onDeleted(data){
    Project.reload()
  }
}

class ProjectUpdate{
  requestPage(project, event){
    event.stopPropagation()
    // create update template 
    this.write(project)
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
   write(item){
    // 1. get dom object to edit 
    let block_project = $(item).parent().parent()
    
    $H.removeForms()

    Project.showList()
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

  submitPage(project){
    // submit 
    let form_data = $(project.form).serialize()
    let url = project.form.action
    
    let method = this.afterSubmit.bind(this)
    $WB.callBw(url, form_data, method,'put')
  }

  /**
   * actions:
   * - remove modify form(s) 
   * - reload page 
   */
  afterSubmit(){
    $H.removeForms()
    $H.resetCreateBlocks()
    Project.showList()
    Project.reload()
  }

  cancel(project_form){
    let block = $(project_form).parent()
    Project.showList()
    block.remove()
    $H.resetCreateBlocks()
  }  
}

class ProjectSearch{

  request(){
    let search = $('#search_project :input[name="text"]').val()
    let url = $('#search_project').attr('action')
    let method = this.onSubmit.bind(this)
    $WB.cGet(url + '?text=' + search,method)
  }

  onSubmit(proj_list){
    //ProjectC.list(proj_list)
    let prj = new ProjectList 
    prj.show(proj_list)
  }

  clear(){
    $('#search_project :input[name="text"]').val('')
    this.request()
  }
}
/*class ProjectC extends Model {

  static block_create_name = 'block_project_create'
  
  /*static reload(){
    ProjectC.loadList()
  }

  static loadList(){
    $H.clear(this.block_create_name)

    const url = getUrl('#reload_page')
    $WB.cGet(url,ProjectC.list)
  }

  // write to html
  static list(prj_list){
    ProjectWriteC.list(prj_list)
    if(prj_list.length < 1){
      ProjectC.clearRightSide()
      return 
    }
    let project = ProjectC.getCurrent(prj_list)
    ProjectC.setActiveProject(project)
    ProjectC.detail(project)
  }

  static setActiveProject(project){
    //console.log('set active prj, proj',project)
    $(`#tgt_project_list a.project_detail`).removeClass('active')
    $(`#tgt_project_list a.project_detail[data-id="${project.id}"]`).addClass('active')
  }

  static clearRightSide(){
    // clear project detail 
    ProjectWriteC.detail({})
    //clear blog list 
    BlogCWrite.list([])
    //disable add blog link
    BlogCWrite.addUrl({})

    // overwrite project id
    $('.tgt_current_project_id').val('')
  }

  static getCurrent(prj_list){
    let project = prj_list[0]
    // filter by id 
    if(current_prj_id !== undefined ){
      let new_list = prj_list.filter(function(item){
        return item.id == current_prj_id
      })
      if(new_list.length > 0){
        project = new_list[0]
      }
    }
    return project 
  }*/

  /*static detailFromAjax(url){
    $WB.cGet(url,ProjectC.detail)
  }

  static onDetail(event){
    let itemclicked = targetFromEvent(event)
    let target = itemclicked.href
    //console.log('on prj detail,itemclicked',itemclicked)
    current_prj_id = $(itemclicked).data('id')
    ProjectC.detailFromAjax(target)
  }

  static onDetail(item){
    //let itemclicked = targetFromEvent(event)
    let target = item.href
    
    current_prj_id = $(item).data('id')
    ProjectC.detailFromAjax(target)
  }*/

  /**
   * display project detail and do blog listing
   * if called from reload, project is defined, is the list of projects
   * if called from clicked project, project is event 
   */
  /*static detail(project){
    ProjectWriteC.detail(project)
    BlogC.detail(project)
  }*/

  /*static add(item){
    ProjectC.showList()
    // EYE: can't use this for call methods here because is called from an Event
    if(! Project.mustCreateBlock()) { 
      return 
    }
    // create html block
    ProjectWriteC.add(item)
  }*/

  /**
   * on submit add project 
   * @param {*} event 
   */
  /*static postAdd(item){
    let form = $(item.form)[0]
    if(! Model.validateForm(form)){
      return 
    }

    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.cPost(url, form_data, ProjectC.onAdded)
  }

  static onAdded(data){
    $H.resetCreateBlocks()
    ProjectC.reload()
  }*/

  /*static edit(event){
    let item = targetFromEvent(event,true,true)
    // create update template 
    ProjectWriteC.edit(item)
  }

  static cancelUpdate(event){
    let item = targetFromEvent(event)

    let block = $(item).parent()
    ProjectC.showList()

    block.remove()
    $H.resetCreateBlocks()
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
  /*static onUpdated(data){
    $H.removeForms()
    $H.resetCreateBlocks()
    ProjectC.showList()
    ProjectC.reload()
  }

  /*static delete(event){
    let item = targetFromEvent(event)
    if(! confirm('Really want to delete this item?')){
      return 
    }

    //let url = item.href
    let url = $(item).data('url_delete')
    
    $WB.callBw(url,{},ProjectC.onDeleted,'delete')
  }

  static onDeleted(data){
    ProjectC.reload()
  }

  static search(){}
}

/*let ProjectWriteC = class{
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
  /*static edit(item){
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
} */

