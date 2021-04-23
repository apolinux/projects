window.onload = function(){
  let blog = new BlogList 
  let url = $('#url_blogs').attr('href')
  blog.request({
    url_blogs : url 
  })
}