"use strict"

let  ProjectC = class {
  // restrict to only one instance
  constructor(parent_proj_list){
    if(ProjectC._instance){
      throw new Error('Only one instance is allowed')
    }
    ProjectC._instance = this
    this.writer = new ProjectWriteC(parent_proj_list)
    this.parent_proj_list = parent_proj_list
  }

  loadList(){
    console.log('loading project list')
    const url = getUrl('#reload_page')
    console.log('url',url)
    // get url 
    //url_blog_list = $(obj).data('url-detail')
    //console.log('load url',url)
    const that=this
    $.ajax({ 
      url: url ,
      method: 'get',
      dataType:'json'
    }).done(function(data){
      //var data1 = JSON.parse(data)
      //write_proj_detail(data1)
      that.writeProject(data)
    })
    .fail(function(a,b,c){
      console.log('fail',a.responseText,a.status,b,c)
      // @todo: show alert msg
      show_alert('Error getting project detail')
    })
  }

  // write to html
  writeProject(data){
    this.writer.list(data)
    this.writer.detail(data[0])
    this.writer.blogList(data[0])
    // fill blog list @todo
    
    //fill_blog_list(info.id)
  }

  detail(id){}

  create(){}

  update(){}

  delete(){}

  search(){}
}

let ProjectWriteC = class{
  constructor(parent_list, parent_detail){
    this.parent_list = parent_list
    this.parent_detail = parent_detail
  }

  list(data){
    console.log('writing list...')
    // first clean list 
    //const parent='#project_list_parent'
    // test mustache 
    
    const target = this.parent_list

    fetch(url_template + '?' + Date.now(),{cache:'no-store'})
    .then((response) => response.text())
    .then((template) => {
      // get from template only some items 
      const template_part = $(template).filter('.projectlist').html()
      console.log(template_part)
      const first = data[0]
      const data_mod = {
        projects: data ,
        url_project_detail : url_project_detail + '/' + first.id  ,

      }

      var rendered = Mustache.render(template_part, data_mod);
      document.getElementById(target).innerHTML = rendered;    
    });


    return 
    // @todo clean
    this.cleanHtml(parent)
    // second write to list
    for(let i=0 ; i< data.length; i++){
      this.oneFromList(data[i])
    }
  }

  cleanHtml(selector){
    $(parent).html('')
  }

  // generate and write HTML code
  oneFromList(object,parent){
    console.log('write object:',object)
    // template = html_code
    // $(parent).addCode(template,object)
  }

  detail(object){
    console.log('writing object detail...')
    const info = object.fields
    console.log('projectwritec.detail, info',info)
    $('#detail_title').html(info.name)
    $('#detail_desc').html(info.description)
    // @todo: pending...
    $('#detail_date').html(info.creat_date)
  }

  blogList(object){
    console.log('writing blog list')
  }
}