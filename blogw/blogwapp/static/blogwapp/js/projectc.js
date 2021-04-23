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
    //$H.clear(this.block_create_name)
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
    Project.setActive(project)
    
    //let projd = new ProjectDetail
    //projd.requestDb(project)
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
    console.log('on detail, item,url',item,url)
    /*current_prj_id = $(item).data('id')
    let method = this.show.bind(this)
    $WB.cGet(url,method)*/
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
    let link = $(project).data('url_edit')
    location.href = link
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

const peProjectList = new Proxy(new ProjectList, handlerEvent)
const peProjectDetail = new Proxy(new ProjectDetail, handlerEvent)
//const peProjectAdd = new Proxy(new ProjectAdd, handlerEvent)
const peProjectDelete = new Proxy(new ProjectDelete, handlerEvent)
const peProjectUpdate = new Proxy(new ProjectUpdate, handlerEvent)
const peProjectSearch = new Proxy(new ProjectSearch,handlerEvent)

// on click Proyect
//$('#tgt_project_list').on('click','.project_detail',peProjectDetail.requestFromClick)

// createProyect
//document.getElementById('project_add').addEventListener('click',peProjectAdd.request,false)

//$('#tgt_block_project_create').on('click','#link_submit_project_create',peProjectAdd.submit)

$('#tgt_project_list').on('click','.link_project_edit',peProjectUpdate.requestPage)
//$('#tgt_project_list').on('click','.link_submit_project_update',peProjectUpdate.submitPage)
//$('#tgt_project_list').on('click','.link_cancel_project_update',peProjectUpdate.cancel)

//deleteProyect
$('#tgt_project_list').on('click','.link_project_delete',peProjectDelete.request)

// search input 
$('#search_project').on('submit',peProjectSearch.request)
$('#link_clear_search_project').click(peProjectSearch.clear)
