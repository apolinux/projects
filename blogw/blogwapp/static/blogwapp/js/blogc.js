"use strict"

class BlogC{

  static list(object){
    $WB.cGet(object.url_blogs, BlogCWrite.list)
  }

  /*static create(event ){
    event.preventDefault()
    console.log('event',event)
  }*/

  /**
   * add a new blog 
   * - copy tpl new 
   * - add to db 
   * - refresh blog list and project list 
   * 
   * @param {Event} event 
   */
  static blockAddStatic(event){
    event.preventDefault()
    let itemclicked = getTargetEvent(event)

    BlogCWrite.templateNew(itemclicked)
  }

  static postAddStatic(item){
    item.preventDefault()
    let itemclicked = getTargetEvent(item)

    let form_data = $(itemclicked.form).serialize()
    let url = itemclicked.form.action
    
    $WB.cPost(url, form_data, BlogC.onAdded)
  }

  static onAdded(data){
    // update project list and so on
    ProjectC.loadList()
  }

  static update(){}

  static delete(event){
    // warn user
    if(! confirm('Really want to delete this item?')){
      return 
    }
    let item = getTargetEvent(event)
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
    //console.log('write template new',$('#csrf_token').html())
    let project_id = $(item).data('project-id')

    $H.write('block_blog_create',{
      url        : item.href,
      //csrf       : $('#csrf_token').html(),
      csrf : getCsrfHtml(),
      project_id : project_id
    })
  }
}