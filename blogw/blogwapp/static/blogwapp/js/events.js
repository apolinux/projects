// add event listeners

//main
window.onload = Page.reload 

// reloadMain
document.getElementById('reload_page').addEventListener('click',Page.reload,false)

// on click Proyect
$('#project_list_parent').on('click','.project_detail',ProjectC.detailStatic)

// createProyect
document.getElementById('add_project').addEventListener('click',Project.add,false)

//updateProyect, pending
// updateProject.addEventListener(click,'onUpdateProject',false)

//deleteProyect
$('#delete_project').bind('click',Project.delete)

// CreateBlog 
$('#create_blog').bind('click',Blog.add)

// updateBlog
$('.update_blog').bind('click',Blog.update)

// deleteBlog
$('.delete_blog').bind('click',Blog.delete);