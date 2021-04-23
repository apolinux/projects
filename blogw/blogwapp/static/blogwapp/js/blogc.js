"use strict"

class Blog extends Model{
  static block_create_name = 'block_blog_create'

  static showList(){
    showChildren('#' +   PREFIX_TARGET + 'blog_list')
  }

  static reload(){
    let bl = new BlogList
    bl.request({
      url_blogs : document.getElementById('url_blogs').href
    })
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
    //Project.reload()
    Blog.reload()
  }
}

class BlogUpdate{
  requestSubmit(){}

  cancel(){}

  requestPage(blog,event){
    //let item = targetFromEvent(event,true,true)
    event.stopPropagation()
    // create update template 
    //this.edit(blog)
    let link = $(blog).data('url_edit')
    location.href = link
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

let peBlogList = new Proxy(new BlogList, handlerEvent)
let peBlogDetail = new Proxy(new BlogDetail, handlerEvent)
let peBlogAdd = new Proxy(new BlogAdd, handlerEvent)
let peBlogDelete = new Proxy(new BlogDelete, handlerEvent)
let peBlogUpdate = new Proxy(new BlogUpdate, handlerEvent)
let peBlogSearch = new Proxy(new BlogSearch,handlerEvent)

// CreateBlog : link for show new blog form
//$('#tgt_link_blog_create').on('click','#link_block_blog_create', peBlogAdd.request)

// link for submit blog
//$('#tgt_block_blog_create').on('click','#link_submit_blog_create',peBlogAdd.submit)

// updateBlog
$('#tgt_blog_list').on('click','.link_blog_edit',peBlogUpdate.requestPage)
//$('#tgt_blog_list').on('click','.link_submit_blog_update', peBlogUpdate.submitPage )
//$('#tgt_blog_list').on('click','.link_cancel_blog_update',peBlogUpdate.cancel)

//avoid click on blog
//$('#tgt_blog_list').on('click','.block_blog_detail', function(event){event.preventDefault()})

// deleteBlog
$('#tgt_blog_list').on('click','.link_delete_blog',peBlogDelete.request);

$('#search_blog').on('submit', peBlogSearch.request)
$('#link_search_blog').click(  peBlogSearch.request)
$('#link_clear_search_blog').click( peBlogSearch.clear)

