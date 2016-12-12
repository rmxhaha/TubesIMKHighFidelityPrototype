(function(global){
    function submit_upload(e){
        var target = $(this).attr("target");
        var uid = $(this).attr("uid");

        $(".form-upload-file[uid="+uid+"]").hide();
        $(".form-open-file[uid="+uid+"]").hide();

        $(".loading[uid="+uid+"]").show();

        $(".loading[uid="+uid+"]").show();
        $("[target="+target+"]").ready(function(){
        });
        $(".success-report[uid="+uid+"]").hide();
        $(".error-report[uid="+uid+"]").hide();
    }


    $(document).ready(function(){
        $(".form-upload-file").submit( submit_upload );
        $("a.fancybox").each(function(){
            if( $(this).attr("href").endsWith('pdf') ){
              $(this).addClass("fancybox-with-iframe");
            }
            else {
              $(this).addClass("fancybox-with-image");
            }
            $(this).removeClass("fancybox");
        })
        $("a.fancybox-with-image").fancybox({type:'image'});
        $("a.fancybox-with-iframe").fancybox({type:'iframe'});
    });

    global.report_upload = function(uid, errors){
        $(".loading[uid="+uid+"]").hide();
        $(".form-upload-file[uid="+uid+"]").show();

        if( errors.length == 0 ){
            var last = $(".upload-button-text[uid="+uid+"]").html();
            if( last != "Change" ){
                $(".upload-button-text[uid="+uid+"]").html("Change");
            }
            $(".form-open-file[uid="+uid+"]").show();
            $(".success-report[uid="+uid+"]").show();
        }
        else {
            var last = $(".upload-button-text[uid="+uid+"]").html();
            if( last.trim() == "Change" ){
                $(".form-open-file[uid="+uid+"]").show();
            }
        }

        $(".error-report[uid="+uid+"]").html(errors);
    }


})(window);
