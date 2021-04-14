// event listeners

//main
window.onload = PageC.reload 

// reloadMain
document.getElementById('reload_page').addEventListener('click',PageC.reload,false)

// on click Proyect
$('#tgt_project_list').on('click','.project_detail',ProjectC.onDetail)

// createProyect
document.getElementById('project_add').addEventListener('click',ProjectC.add,false)

$('#tgt_block_project_create').on('click','#link_submit_project_create',ProjectC.postAdd)

//updateProyect, 
$('#tgt_project_list').on('click','.link_project_edit',ProjectC.edit)

$('#tgt_project_list').on('click','.link_submit_project_update',ProjectC.postUpdate)
$('#tgt_project_list').on('click','.link_cancel_project_update',ProjectC.cancelUpdate)

//deleteProyect
//$('#tgt_project_detail').on('click','#link_project_delete',ProjectC.delete)
$('#tgt_project_list').on('click','.link_project_delete',ProjectC.delete)

// CreateBlog : link for show new blog form
$('#tgt_link_blog_create').on('click','#link_block_blog_create', BlogC.blockAdd)

// link for submit blog
$('#tgt_block_blog_create').on('click','#link_submit_blog_create',BlogC.postAddStatic)

// updateBlog
$('#tgt_blog_list').on('click','.link_blog_edit',BlogC.edit)
$('#tgt_blog_list').on('click','.link_submit_blog_update',BlogC.postUpdate)
$('#tgt_blog_list').on('click','.link_cancel_blog_update',BlogC.cancelUpdate)

//avoid click on blog
$('#tgt_blog_list').on('click','.block_blog_detail', function(event){event.preventDefault()})

// deleteBlog
$('#tgt_blog_list').on('click','.link_delete_blog',BlogC.delete);

$('#search_blog').on('submit',BlogSearch.search)