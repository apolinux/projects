// event listeners

//main
window.onload = PageC.reload 

// reloadMain
document.getElementById('reload_page').addEventListener('click',PageC.reload,false)

// on click Proyect
$('#tgt_project_list').on('click','.project_detail',ProjectC.detailStatic)

// createProyect
document.getElementById('project_add').addEventListener('click',ProjectC.add,false)

$('#tgt_block_project_create').on('click','#link_submit_project_create',ProjectC.postAdd)
//updateProyect, pending
// updateProject.addEventListener(click,'onUpdateProject',false)

//deleteProyect
$('#tgt_project_detail').on('click','#link_project_delete',ProjectC.delete)

// CreateBlog : link for show new blog form
$('#tgt_link_blog_create').on('click','#link_block_blog_create', BlogC.blockAddStatic)

// link for submit blog
$('#tgt_block_blog_create').on('click','#link_submit_blog_create',BlogC.postAddStatic)

// updateBlog
$('.update_blog').bind('click',BlogC.update)

// deleteBlog
$('#tgt_blog_list').on('click','.link_delete_blog',BlogC.delete);

