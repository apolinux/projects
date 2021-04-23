// event listeners

eventManagerCallback = function(event,callback,context){
  event.preventDefault()
  let target=event.currentTarget
  let callbackb = callback.bind(context)
  return callbackb(target,event)
}

/**
 * this handler allows to call any method from an object using Proxy class 
 */
handlerEvent ={
  get: function get(target, name) {
    return function wrapper() {
      // target : target object, myobj?
      // name : method name called 
      var args = Array.prototype.slice.call(arguments);
      let event = args[0]
      
      if (!( name in target) ){
        event.preventDefault()
        throw new Error(`No such method "${name}"`)
      }

      return eventManagerCallback(event,target[name],target) 
    }
  }
}

// define objects related to main classes that can call methods with reassigned parameters
// instead event parameter, is passed currentTarget and event itself
peProjectList = new Proxy(new ProjectList, handlerEvent)
peProjectDetail = new Proxy(new ProjectDetail, handlerEvent)
peProjectAdd = new Proxy(new ProjectAdd, handlerEvent)
peProjectDelete = new Proxy(new ProjectDelete, handlerEvent)
peProjectUpdate = new Proxy(new ProjectUpdate, handlerEvent)
peProjectSearch = new Proxy(new ProjectSearch,handlerEvent)

peBlogList = new Proxy(new BlogList, handlerEvent)
peBlogDetail = new Proxy(new BlogDetail, handlerEvent)
peBlogAdd = new Proxy(new BlogAdd, handlerEvent)
peBlogDelete = new Proxy(new BlogDelete, handlerEvent)
peBlogUpdate = new Proxy(new BlogUpdate, handlerEvent)
peBlogSearch = new Proxy(new BlogSearch,handlerEvent)

// event listeners list  
//window.onload = peProjectList.request
window.onload = onLoadPage

// reloadMain
//document.getElementById('reload_page').addEventListener('click',peProjectList.request,false)

// on click Proyect
$('#tgt_project_list').on('click','.project_detail',peProjectDetail.requestFromClick)

// createProyect
document.getElementById('project_add').addEventListener('click',peProjectAdd.request,false)

$('#tgt_block_project_create').on('click','#link_submit_project_create',peProjectAdd.submit)

$('#tgt_project_list').on('click','.link_project_edit',peProjectUpdate.requestPage)
$('#tgt_project_list').on('click','.link_submit_project_update',peProjectUpdate.submitPage)
$('#tgt_project_list').on('click','.link_cancel_project_update',peProjectUpdate.cancel)

//deleteProyect
$('#tgt_project_list').on('click','.link_project_delete',peProjectDelete.request)

// search input 
$('#search_project').on('submit',peProjectSearch.request)
$('#link_clear_search_project').click(peProjectSearch.clear)

// CreateBlog : link for show new blog form
$('#tgt_link_blog_create').on('click','#link_block_blog_create', peBlogAdd.request)

// link for submit blog
$('#tgt_block_blog_create').on('click','#link_submit_blog_create',peBlogAdd.submit)

// updateBlog
$('#tgt_blog_list').on('click','.link_blog_edit',peBlogUpdate.requestPage)
$('#tgt_blog_list').on('click','.link_submit_blog_update', peBlogUpdate.submitPage )
$('#tgt_blog_list').on('click','.link_cancel_blog_update',peBlogUpdate.cancel)

//avoid click on blog
$('#tgt_blog_list').on('click','.block_blog_detail', function(event){event.preventDefault()})

// deleteBlog
$('#tgt_blog_list').on('click','.link_delete_blog',peBlogDelete.request);

$('#search_blog').on('submit', peBlogSearch.request)
$('#link_search_blog').click(  peBlogSearch.request)
$('#link_clear_search_blog').click( peBlogSearch.clear)
