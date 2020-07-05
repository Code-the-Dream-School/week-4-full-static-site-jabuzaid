(function($){
	$.fn.baambooResponsiveNav = function(options) {
		var opts = jQuery.extend({
			target: this,
		}, options || {});
		var pathname	= window.location.pathname;
		var current_path= "www.baamboostudio.com";
		if(pathname.indexOf("/")>=0){
			current_path = pathname.substring(pathname.lastIndexOf("/")+1);
		}else{
			current_path = pathname;
		}
		if(current_path=="")
			current_path= "www.baamboostudio.com";
		var $selector	= $(this);
		var $menu		= $('.wsite-menu-default');
		$txt			= $menu.clone().removeClass('wsite-menu-default').addClass('baamboo-responsive-nav');
		$txt.find('ul, li, div').removeAttr("id").removeAttr("class").removeAttr("style");
		if(current_path=="www.baamboostudio.com"){
			if($txt.find('a').first().attr("href")=="/")
				$txt.find('li').first().attr("id", "active");
		}else{
			$txt.find('li > a').each(function(){
				if($(this).attr("href").indexOf(current_path)>=0){
					$(this).parent().attr("id", "active");
				}
			});
		}
		$txt.find('div').each(function(){
			$(this).prepend("<span class=\"more_menu_btn\"></span>").addClass('closed_menu more_menu');
		});
		$selector.append($txt);
		$('.mobile_nav_btn, .more_menu_btn').click(function(){
			$(this).parent().toggleClass('closed_menu');
		});
		//Login
		function showLoginLink(){
			if($('#member-login').length>0){
				var $login_txt	=	"<li><a data-membership-required href='#login'>Login</a></li>";
				$('.baamboo-responsive-nav').append($login_txt);
				return true;
			}else{
				return false;
			}
		}
		var cnt				= 0;
		var checkLoginLink	= setInterval(function(){
			var check = showLoginLink();
			if(check || cnt > 10){
				clearInterval(checkLoginLink);
			}else{
				cnt++;
			}
		}, 1000);
		//Cart Function
		function cartdisplay() {
			if (Number($('#wsite-mini-cart .wsite-subtotal-wrapper .wsite-price').text()) > 0 ) {
				$('#wsite-mini-cart').addClass('full');
			}else {
				$('#wsite-mini-cart').removeClass('full');
			}
		}
		
		setInterval(function() { cartdisplay(); }, 800);
		
		$('.wsite-product-button, #wsite-com-product-buy, .wsite-product-item .wsite-remove-button').on('click', function(){
			setTimeout(function() { cartdisplay(); }, 800);
		});
	}
})(jQuery);

jQuery = jQuery.noConflict();
jQuery(document).ready(function($){
	if($('#mobile_menu').length>0){
		$('#mobile_menu').baambooResponsiveNav();
	}
	
	//Please comment or un-comment these code below to enable fixing double click issue for whole site or just header
	
	//Fix double click issue on iOS for header link (included logo and navigator link)
	$('#header_wrapper a').on('click touchend', function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
	});
	
	//Fix double click issue on iOS for whole site
	/*$('#header_wrapper a, .paragraph a').on('click touchend', function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
	});*/
});