"use strict"

class BlogC extends Model{
  static block_create_name = 'block_blog_create'

  static list(object){
    $WB.cGet(object.url_blogs, BlogCWrite.list)
  }

  /**
   * add a new blog 
   * - copy tpl new 
   * - add to db 
   * - refresh blog list and project list 
   * 
   * @param {Event} event 
   */
  static blockAdd(event){
    let itemclicked = targetFromEvent(event)

    if(! BlogC.mustCreateBlock()) { 
      return 
    }
    
    BlogCWrite.templateNew(itemclicked)
  }

  
  static postAddStatic(item){
    let itemclicked = targetFromEvent(item)

    let form_data = $(itemclicked.form).serialize()
    let url = itemclicked.form.action
    
    $WB.cPost(url, form_data, BlogC.onAdded)
  }

  static onAdded(data){
    // update project list and so on
    ProjectC.loadList()
  }

  static delete(event){
    let item = targetFromEvent(event)
    // warn user
    if(! confirm('Really want to delete this item?')){
      return 
    }
    let url = $(item).data('url_delete_blog')
    //ondelete 
    let data = {
      csrfmiddlewaretoken:CSRFTOKEN
    }

    $WB.callBw(url,data,BlogC.onDeleted,'delete')
  }

  static onDeleted(data){
    ProjectC.loadList()
  }

  static edit(event){
    let item = targetFromEvent(event,true,true)
    // create update template 
    BlogCWrite.edit(item)
  }

  static cancelUpdate(event){
    let item = targetFromEvent(event)

    let block = $(item).parent()
    BlogC.showList()

    block.remove()
  }

  static showList(){
    super.showChildren('#' +   PREFIX_TARGET + 'blog_list')
  }

  static postUpdate(event){
    let item = targetFromEvent(event)
    // submit 
    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.callBw(url, form_data, BlogC.onUpdated,'patch')
  }

  static onUpdated(data){
    $H.removeForms()
    $H.resetCreateBlocks()
    BlogC.showList()
    PageC.reload()
  }

  static search(){}
}

class BlogCWrite{

  /**
   * add crate blog url link to blog side
   * @param {object} project 
   */
  static addUrl(project){
    $H.write('link_blog_create',{
      url : project.url_new_blog ,
      id : project.id
    })

    // clear any forms on blog side 
    //clear add blog 
    $H.clear('block_blog_create')
  }

  /**
   * list blogs 
   * @param {array} list 
   */
  static list(list){
    $H.write('blog_list',list)
  }

  /**
   * create a new blog form
   * @param {object} item 
   */
  static templateNew(item){
    let project_id = $(item).data('project-id')

    $H.write('block_blog_create',{
      url        : item.href,
      csrf : getCsrfHtml(),
      project_id : project_id
    })
  }

  static edit(item){
    let block_project = $(item).parent().parent()
    
    $H.removeForms()

    BlogC.showList()
    const data ={
      url : block_project.attr('href') ,
      text : $(block_project).find('.blog_detail_text').html().trim() ,
    }

    let html_update = $H.render('block_blog_update',data)
    
    $(block_project).before(html_update)
    
    // hide current detail block 
    block_project.hide()
  }
}