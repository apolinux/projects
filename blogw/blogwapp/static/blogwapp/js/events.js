// add event listeners

//main
window.onload = Page.reload 

// reloadMain
document.getElementById('reload_page').addEventListener('click',Page.reload,false)

// project list , called when reload page or update project/blog 
//projectList.addEventListener(load,'onLoadProjectList',false);

// on click Proyect
// not working because getelements must be iterated
//document.getElementsByClassName('detail_project').addEventListener('click',Project.detail,false);
$('.detail_project').bind('click',Project.detail)

//loadProyect
//projectLoad.addEventListener(load,'onLoadProject',false)

// createProyect
document.getElementById('add_project').addEventListener('click',Project.add,false)

//updateProyect, pending
// updateProject.addEventListener(click,'onUpdateProject',false)

//deleteProyect
document.getElementById('delete_project').addEventListener('click',Project.delete,false)

// CreateBlog 
document.getElementById('create_blog').addEventListener('click',Blog.add,false)

// updateBlog
$('.update_blog').bind('click',Blog.update)

// deleteBlog
$('.delete_blog').bind('click',Blog.delete);