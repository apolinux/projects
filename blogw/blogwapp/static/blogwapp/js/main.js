"use strict"

// util functions 
function getUrl(selector){
  var url = $(selector).data('url')
  if(url == '' || url == undefined){
    throw new Error("The url for selector:'" + selector + "' is empty")
  }
  return url
}

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

class HTML{

  /**
   * @todo reengineering later in other methods
   * @param {*} origin 
   * @param {*} data 
   * @returns 
   */
  static render(origin,data){
    let template_part = HTML.getTemplate(origin)
    return Mustache.render(template_part, data);
  }
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
    return this.writeExt(block_origin, block_origin, data)
  }

  static getTemplate(block_origin){
    //let filter1 ="#template-mst #tpl_"+ block_origin
    let filter1 ="#" + TEMPLATE_BLOCK_ID +" #" + PREFIX_ORIGIN + block_origin
    let template_part = $(filter1).html()
    
    if( template_part == undefined){
      //show_alert('Error template for filter "'+ filter1 + '" is empty')  
      console.log('the CSS filter for template is empty',filter1)
      throw new Error('The CSS filter for template "' + filter1 + '" is empty')
    }

    return template_part
  }

  static getTarget(css){
    //let targetstr = "tgt_" + css
    let targetstr = PREFIX_TARGET + css
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

  static removeForms(){
    $('.container .form_modify').remove()
  }

  /**
   * set the create block status to false for project and blog 
   */
  static resetCreateBlocks(){
    Project.resetCreateBlk()
    Blog.resetCreateBlk()
  }
}

class Webservice{
  static call(url,data,callable_ok, callable_fail, method){
    // spinner 
    this.spinner(true)

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
      Webservice.spinner(false)
      callable_ok(data)
    })
    .fail(function(a,b,c){
      Webservice.spinner(false)
      callable_fail(a,b,c)
    })
  }

  static spinner(show){
    if(show){
      $('.spinner').show()
    }else{
      $('.spinner').hide()
    }
  }

  static cGet(url,callable, callable_fail){
    if(url === undefined){
      throw new Error('url is undefined')
    }
    return this.call(url,null,callable, callable_fail,'get')
  }

  static cPost(url,data, callable, callable_fail){
    return this.call(url,data, callable, callable_fail,'post')
  }
}

class WebserviceBW extends Webservice{
  static callback_onfail

  static registerOnFail(callback){
    this.callback_onfail = callback
  }

  static fail(a,b,c){
    console.log('fail calling Ws',a,a.responseText,a.status,b,c)
    show_alert('Error getting information:' + a.responseText.substr(0,100))
    if(detect_loop++ == 2){
      return 
    }
    WebserviceBW.callback_onfail()
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

function showChildren(selector){
  $(selector).children().show()
}

const $WB = WebserviceBW
const $H = HTML
const PREFIX_TARGET = 'tgt_'
const PREFIX_ORIGIN = 'tpl_'
const TEMPLATE_BLOCK_ID = 'template-mst'
const CSRFTOKEN = getCookie('csrftoken');
let current_prj_id 



