"use strict"

class ProjectC {
  // restrict to only one instance
  constructor(parent_proj_list, parent_proj_detail){
    if(ProjectC._instance){
      throw new Error('Only one instance is allowed')
    }
    ProjectC._instance = this
    this.writer = new ProjectWriteC(parent_proj_list, parent_proj_detail)
    this.parent_proj_list = parent_proj_list
    this.parent_proj_detail = parent_proj_detail
  }

  loadList(){
    const url = getUrl('#reload_page')
    //console.log('url',url)
    // get url 
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

    this.detail(data[0])
    
  }

  getBlogList(object,func){
    //const that=this
    $.ajax({ 
      url: object.url_blogs ,
      method: 'get',
      dataType:'json'
    }).done(function(data){
      //that.writeProject(data)
      func(data)
    })
    .fail(function(a,b,c){
      console.log('fail',a.responseText,a.status,b,c)
      // @todo: show alert msg
      show_alert('Error getting blog list')
    })
  }

  static detailFromAjax(url){
    $.ajax({ 
      url: url ,
      method: 'get',
      dataType:'json'
    }).done(function(data){
      Project.detail(data)
    })
    .fail(function(a,b,c){
      console.log('fail',a.responseText,a.status,b,c)
      // @todo: show alert msg
      show_alert('Error getting project detail')
    })
  }

  static detailStatic(event){
    event.preventDefault()
    console.log(event)
    let itemclicked = $(event.currentTarget)[0]
    // get object data 
    //let object_id = itemclicked.data('id')
    let target = itemclicked.href
    //console.log('target',target, 'itemclicked',itemclicked)
    //return 
    // @todo call ajax get blog detail 
    console.log('this',this)
    ProjectC.detailFromAjax(target)
  }

  

  /**
   * display project detail and do blog listing
   * if called from reload, project is defined, is the list of projects
   * if called from clicked project, project is event 
   */
  detail(project){
    // the two links below are called each time project is selected 
    this.writer.detail(project)
    // get blog list 
    // lost this 
    this.getBlogList(project, this.writer.blogList)
  }

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
    //console.log('writing list...')

    this.loadTemplateAndWrite('#projectlist', this.parent_list, data)
    // add data to item
    $(document).find('#projectlist .project_detail').each(function(item){
      $(this).data('object', )
    })
  }

  /*loadTemplateAndWrite(block_origin, target_css, data){
    fetch(url_template + '?' + Date.now(),{cache:'no-store'})
    .then((response) => response.text())
    .then((template) => {
      // get from template only some items 
      const template_part = $(template).filter(block_origin).html()
      //console.log(template_part)
      if( template_part == undefined){
        show_alert('Error template for filter '+ block_origin + ' is empty')  
        return 
      }
      var rendered = Mustache.render(template_part, data);
      document.getElementById(target_css).innerHTML = rendered;    
    });
  } */ 
  loadTemplateAndWrite(block_origin, target_css, data){
    /*// add custom functions like format Date
    let formatDate = function(){
      function appendLeadingZeroes(n){
        if(n <= 9){
          return "0" + n;
        }
        return n
      }

      return function(text, render){
        let date = new Date(text)
        console.log('text',text,'render',render,'date',date)
        let newDate = date.getFullYear() + "-" + appendLeadingZeroes( date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate()) + " " + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + ":" + appendLeadingZeroes(date.getSeconds())
        return render(newDate)
      }
    }
    data.formatDate = formatDate
    */
    const filter1 ="#template-mst "+ block_origin
    const template_part = $(filter1).html()
    //console.log(template_part)
    if( template_part == undefined){
      show_alert('Error template for filter "'+ filter1 + '" is empty')  
      console.log('error filter',filter1)
      return 
    }
    var rendered = Mustache.render(template_part, data);
    const target = document.getElementById(target_css)
    if(target == undefined){
      show_alert('error, target:' + target_css + ' does not exists')
      console.log('target not exists',target_css)
      return 
    }
    target.innerHTML = rendered;    
  }

  detail(info){
    //console.log('writing object detail...')
    //console.log('projectwritec.detail, info',info,'parent detail',this.parent_detail)
    // using template
    
    this.loadTemplateAndWrite('#projectdetail',this.parent_detail,info)
  }

  blogList(list){
    //@todo resolve later
    //this.loadTemplateAndWrite('#bloglist','#blog_list',list)
    let projectw = new ProjectWriteC('a','b')
    projectw.loadTemplateAndWrite('#bloglist','blog_list',list)
  }
}