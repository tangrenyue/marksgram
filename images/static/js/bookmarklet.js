(function () {
    let jquery_version = '3.3.1';
    let site_url='http://127.0.0.1:8000/';
    let static_url = site_url + 'static/';
    let min_width = 100;
    let min_height = 100;
     //这里是分享图片的代码
    function bookmarklet(msg){
    // 加载CSS文件
        let css = jQuery('<link>');
        css.attr({
            rel:'stylesheet',
            type:'text/css',
            href:static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999999999)
        });
        jQuery('head').append(css);

        // 加载HTML结构
        box_html = '<div id="bookmarklet"><a href="#" id="close">×</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html);

        // 关闭事件
        jQuery('#boorkmarklet #close').click(function () {
            jQuery("#bookmarklet").remove();
        });

        // 寻找页面内所有图片然后显示在新增的HTML结构中
        jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
        if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height)
        {
            image_url = jQuery(image).attr('src');
            jQuery('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
        }
    });

          // 点击图片时按照指定URL访问我们的网站
    jQuery('#bookmarklet .images a').click(function(e){
      let selected_image = jQuery(this).children('img').attr('src');
      // hide bookmarklet
      jQuery('#bookmarklet').hide();
      // open new window to submit the image
      window.open(site_url +'images/create/?url='
                  + encodeURIComponent(selected_image)
                  + '&title='
                  + encodeURIComponent(jQuery('title').text()),
                  '_blank');
    });

    }




    // 检查页面是否加载了jQuery，如果没有就进行加载，尝试15次
    if(typeof window.jQuery !== 'undefined'){
        bookmarklet();
    }
    else {
        let conflict = typeof window.$ !== 'undefined';
        let script = document.createElement('script');
        script.src =  'https://cdn.staticfile.org/jquery/' + jquery_version + '/jquery.min.js';
        document.head.appendChild(script);
        let attempts = 15;
        (function(){
            if(typeof window.jQuery === 'undefined'){
                if(--attempts>0){
                    window.setTimeout(arguments.callee, 250)
                }else {
                    alert("An error ocurred while loading jQuery")
                }
            }else {
                bookmarklet()
            }
        })();
    }
})();


