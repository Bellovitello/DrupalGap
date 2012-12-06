$('#drupalgap_dashboard').live('pagebeforeshow',function(){
	try {
		// Hide both nav bars, then figure out which one to show.
		$('#navbar_anonymous').hide();
    	$('#navbar_authenticated').hide();
		if (drupalgap.user.uid == 0) {
			$('#navbar_anonymous').show();
			$('#user_navbar h2').hide();
        }
        else {
        	$('#navbar_authenticated').show();
        	$('#user_navbar h2').show().html("Hi, " + drupalgap.user.name);
        }
	}
	catch (error) {
		if (drupalgap.settings.debug) {
			console.log("drupalgap_dashboard - " + error);
		}
	}
});

$('#drupalgap_dashboard').live('pageshow', function(){
	drupalgap.views_datasource.call({
		'path':'drupalgap/views_datasource/drupalgap_content',
		'success':function(data) {
			$("#dashboard_content_list").html("");
			$.each(data.nodes, function(index, object){	
				$("#dashboard_content_list").append($("<li></li>",{"html":"<a href='#' id='" + object.node.nid + "'>" + object.node.title + "</a>"}));
			});
			$("#dashboard_content_list").listview("destroy").listview();
		},
	});
});

$('#dashboard_content_list a').live('click',function(){
	drupalgap.node.nid = $(this).attr('id');
	$.mobile.changePage('node.html');
});

$('#logout').live('click', function(){
	drupalgap.services.user.logout.call({
		'success':function(data){
			$.mobile.changePage("user_login.html");
		}
	});
});