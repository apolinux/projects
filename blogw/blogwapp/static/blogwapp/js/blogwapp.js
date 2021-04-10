"use strict"

// util functions 
function getUrl(selector){
  var url = $(selector).data('url')
  if(url == '' || url == undefined){
    throw new Error("The url for selector:'" + selector + "' is empty")
  }
  return url
}

function show_alert(msg){
  alert(msg)
}

// get target of event 
function getTargetEvent(event){
  //return $(event.currentTarget)[0]
  let curr = $(event.currentTarget)
  return curr[0]
}

function getCsrfHtml(){
  return $('#csrf_token').html()
}

/*function getCsrf(){
  return $('#csrf_token input').val()
}*/

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const CSRFTOKEN = getCookie('csrftoken');

class HTML{
  /**
   * copy HTML from block_origin to target_css adding information from data parameter
   * 
   * @param {string} block_origin 
   * @param {string} target_css 
   * @param {object} data 
   * @returns 
   */
  static writeExt(block_origin, target_css, data){
    let template_part = HTML.getTemplate(block_origin)
    let rendered = Mustache.render(template_part, data);
    
    let target = HTML.getTarget(target_css)

    target.innerHTML = rendered;    
  }

  static write(block_origin, data){
    let target_css = block_origin
    let template_part = HTML.getTemplate(block_origin)
    let rendered = Mustache.render(template_part, data);
    
    let target = HTML.getTarget(target_css)

    target.innerHTML = rendered;    
  }

  static getTemplate(block_origin){
    let filter1 ="#template-mst #tpl_"+ block_origin
    let template_part = $(filter1).html()
    
    if( template_part == undefined){
      //show_alert('Error template for filter "'+ filter1 + '" is empty')  
      console.log('the CSS filter for template is empty',filter1)
      throw new Error('The CSS filter for template "' + filter1 + '" is empty')
    }

    return template_part
  }

  static getTarget(css){
    let targetstr = "tgt_" + css
    let target = document.getElementById(targetstr)
    if(target == undefined){
      //show_alert('error, target:' + targetstr + ' does not exists')
      console.log('target not exists',targetstr)
      throw new Error('The target "' + targetstr + '" does not exists')
    }
    return target 
  }

  static clear(target_css){
    let target = HTML.getTarget(target_css)
    target.innerHTML = '';    
  }
}
class Webservice{
  static call(url,data,callable_ok, callable_fail, method){
    let ajax_data = { 
      url: url ,
      method: method ,
      dataType:'json',
      headers: {'X-CSRFToken': CSRFTOKEN}
    }
    if(data){
      ajax_data.data = data
    }
    return $.ajax(ajax_data).done(function(data){
      callable_ok(data)
    })
    .fail(function(a,b,c){
      callable_fail(a,b,c)
    })
  }

  static cGet(url,callable, callable_fail){
    return this.call(url,null,callable, callable_fail,'get')
  }

  static cPost(url,data, callable, callable_fail){
    return this.call(url,data, callable, callable_fail,'post')
  }
}

class WebserviceBW extends Webservice{
  static fail(a,b,c){
    console.log('fail calling Ws',a,a.responseText,a.status,b,c)
    show_alert('Error getting information:' + a.responseText.substr(0,100))
  }
  static cGet(url,callable){
    super.cGet(url,callable,WebserviceBW.fail)
  }

  static cPost(url,data,callable){
    super.cPost(url,data,callable,WebserviceBW.fail)
  }

  static callBw(url,data,callable,method){
    super.call(url,data,callable,WebserviceBW.fail,method)
  }
}

const $WB = WebserviceBW
const $H = HTML


