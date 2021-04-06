"use strict"


function getUrl(selector){
  var url = $(selector).data('url')
  if(url == '' || url == undefined){
    throw new Error("The url for selector:'" + selector + "' is empty")
  }
  return url
}

// instance objects
const Page = new PageC()
const Project = new ProjectC('project_list_parent','project_detail')
const Blog = new BlogC


var url_blog_list = ''

function show_alert(msg){
  alert('Error:' + msg)
}

/*$(document).ready(function(){
  // reload page 
  Page.reload()

  // disable link and load project detail
  $('a.project_detail').click(function(e){
    e.preventDefault()
    var link=this
    
    // load project detail
    load_proj_detail(this)
  })
})

// load project detail
function load_proj_detail(obj){
  var url = obj.href
  url_blog_list = $(obj).data('url-detail')
  //console.log('load url',url)
  $.ajax({ 
    url: url ,
    method: 'get',
    dataType:'json'
  }).done(function(data){
    var data1 = JSON.parse(data)
    write_proj_detail(data1)
  })
  .fail(function(a,b,c){
    console.log('fail',a.responseText,a.status,b,c)
    // @todo: show alert msg
    show_alert('Error getting project detail')
  })
}

// list all blogs from project id
function fill_blog_list(project_id){
  $.ajax({ 
    url: url_blog_list ,
    method: 'get',
    dataType:'json'
  }).done(function(data){
    var data1 = JSON.parse(data)
    write_proj_detail(data1)
  })
  .fail(function(a,b,c){
    console.log('fail',a.responseText,a.status,b,c)
    // @todo: show alert msg
    show_alert('Error getting project detail')
  })
}
*/