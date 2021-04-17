"use strict"

class Blog extends Model{
  static block_create_name = 'block_blog_create'

  static showList(){
    showChildren('#' +   PREFIX_TARGET + 'blog_list')
  }
}

class BlogList{
  request(project){
    let method = this.write.bind(this)
    $WB.cGet(project.url_blogs, method)
  }

  write(blog_list){
    $H.write('blog_list',blog_list)
  }
}

class BlogDetail{
  requestDb(project){
    let blist = new BlogList 
    blist.request(project)

    this.addUrl(project)

    // overwrite project id
    $('.tgt_current_project_id').val(project.id)
  }

  addUrl(project){
    $H.write('link_blog_create',{
      url : project.url_new_blog ,
      id : project.id
    })

    // clear any forms on blog side 
    //clear add blog 
    $H.clear('block_blog_create')
  }
}

class BlogAdd{
  request(blog){
    if(! Blog.mustCreateBlock()) { 
      return 
    }
    
    this.write(blog)
  }

  write(blog){
    let project_id = $(blog).data('project-id')

    $H.write('block_blog_create',{
      url        : blog.href,
      csrf       : getCsrfHtml(),
      project_id : project_id
    })
  }
  
  submit(blog){
    let form = $(blog.form)[0]
    if(! Model.validateForm(form)){
      return 
    }

    let form_data = $(blog.form).serialize()
    let url = blog.form.action
    let method =this.onAdded.bind(this)
    $WB.cPost(url, form_data, method)
  }

  onAdded(data){
    $H.resetCreateBlocks()
    Project.reload()
  }
}

class BlogDelete{
  request(blog,event){
    event.stopPropagation()
    // warn user
    if(! confirm('Really want to delete this item?')){
      return 
    }
    let url = $(blog).data('url_delete_blog')
    //ondelete 
    let data = {
      csrfmiddlewaretoken:CSRFTOKEN
    }
    let method = this.onDeleted.bind(this)
    $WB.callBw(url,data,method,'delete')
  }

  onDeleted(data){
    Project.reload()
  }
}

class BlogUpdate{
  requestSubmit(){}

  cancel(){}

  requestPage(blog,event){
    //let item = targetFromEvent(event,true,true)
    event.stopPropagation()
    // create update template 
    this.edit(blog)
  }

  edit(item){
    let block_project = $(item).parent().parent()
    
    $H.removeForms()

    Blog.showList()
    const data ={
      url : block_project.attr('href') ,
      text : $(block_project).find('.blog_detail_text').html().trim() ,
    }

    let html_update = $H.render('block_blog_update',data)
    
    $(block_project).before(html_update)
    
    // hide current detail block 
    block_project.hide()
  }

  cancel(blog){
    let block = $(blog).parent()
    Blog.showList()

    block.remove()
  }

  submitPage(blog){
    let form_data = $(blog.form).serialize()
    let url = blog.form.action
    let method = this.onUpdated.bind(this)
    $WB.callBw(url, form_data, method, 'patch')
  }

  onUpdated(data){
    $H.removeForms()
    $H.resetCreateBlocks()
    Blog.showList()
    Project.reload()
  }
}

class BlogSearch{

  request(){
    let search = $('#search_blog :input[name="text"]').val()
    let id = $('#search_blog :input[name="project_id"]').val()
    let url = $('#search_blog').attr('action')
    let method = this.onSearchReturn.bind(this)
    $WB.cGet(url + '?project_id=' + id + '&text=' + search, method)
  }

  onSearchReturn(blog_list){
    let blist = new BlogList
    blist.write(blog_list)
  }

  clear(){
    $('#search_blog :input[name="text"]').val('')
    this.request()
  }
}

/*class BlogC extends Model{
  static block_create_name = 'block_blog_create'

  /*static detail(project){
    BlogC.list(project)

    BlogCWrite.addUrl(project)

    // overwrite project id
    $('.tgt_current_project_id').val(project.id)
  }

  static list(object){
    $WB.cGet(object.url_blogs, BlogCWrite.list)
  }*/

  /**
   * add a new blog 
   * - copy tpl new 
   * - add to db 
   * - refresh blog list and project list 
   * 
   * @param {Event} event 
   */
  /*static blockAdd(event){
    let itemclicked = targetFromEvent(event)

    if(! BlogC.mustCreateBlock()) { 
      return 
    }
    
    BlogCWrite.templateNew(itemclicked)
  }

  
  static postAdd(event){
    let item = targetFromEvent(event)

    let form = $(item.form)[0]
    if(! Model.validateForm(form)){
      return 
    }

    let form_data = $(item.form).serialize()
    let url = item.form.action
    
    $WB.cPost(url, form_data, BlogC.onAdded)
  }

  static onAdded(data){
    $H.resetCreateBlocks()
    ProjectC.reload()
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
    ProjectC.reload()
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
    ProjectC.reload()
  }

  static search(){}
}
*/

/*class BlogCWrite{

  /**
   * add crate blog url link to blog side
   * @param {object} project 
   */
  /*static addUrl(project){
    $H.write('link_blog_create',{
      url : project.url_new_blog ,
      id : project.id
    })

    // clear any forms on blog side 
    //clear add blog 
    $H.clear('block_blog_create')
  }*/

  /**
   * list blogs 
   * @param {array} list 
   */
  /*static list(list){
    $H.write('blog_list',list)
  }*/

  /**
   * create a new blog form
   * @param {object} item 
   */
  /*static templateNew(item){
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
}*/

