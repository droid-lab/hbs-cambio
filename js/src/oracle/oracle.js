(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

Mobile = {
	isMobile   : null,
	mobileType : null,
	configure: function(){
		Mobile.init();
	},
	init: function(){
		if(jQuery.browser.mobile || $(document).width() < 991){
			Mobile.isMobile   = true;
			Mobile.mobileType = Mobile.getType();
		}
		else{
			Mobile.isMobile = false;
		}
	},
	getType: function(){
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ))
            return 'iOS';
        else if( userAgent.match(/Android/i ))
            return 'Android';
	}
}

Shared = {
	Debug: {
		debugMode : false,
		constant  : '[DCFRONT] ',
		log: function(msg){
			if(Shared.Debug.debugMode)
				console.log(Shared.Debug.constant + msg);
		},
		error: function(msg){
			if(Shared.Debug.debugMode)
				console.error(Shared.Debug.constant + msg);
		},
		info: function(msg){
			if(Shared.Debug.debugMode)
				console.info(Shared.Debug.constant + msg);
		}
	},
	__is_empty: function(val){
		return (val == "" || val == null || val == undefined);
	},
	__set_button: function(objId, callBack, params){
		if(Shared.__is_empty(objId))
			return;
		var objId = "#" + objId;
		if(!$(objId).length){
			var objId = objId.replace("#", ".");
		}
        if($(objId).length){
        	if(!Shared.__is_empty(params)){
	            $(objId).on('click', params, function(params){
	                callBack(params);
	            });
        	}
        	else{
	            $(objId).on('click', function(event){
	                callBack(event);
	            });
        	}
        }
	},
	__ajax: function(config, callBack, beforeSend, callBackError, callBackComplete){
		if(Shared.__is_empty(config.action))
			return;
		var action     = config.action;
		var data       = config.data || null;
		$.ajax({
		    type  : "POST",
		    url   : action,
		    data  : data,
		    beforeSend: function(){
		    	if(!Shared.__is_empty(beforeSend))
		    		beforeSend();
		    },
		    success: function (result){
		    	if(!Shared.__is_empty(callBack))
		    		callBack(result);
		    },
		    error: function(xhr, ajaxOptions, thrownError){
		    	if(!Shared.__is_empty(callBackError))
		    		callBackError(xhr, ajaxOptions, thrownError);
		    },
		    complete: function(){
		    	if(!Shared.__is_empty(callBackComplete))
		    		callBackComplete();
		    }
		});
	}
}

Validation = {
    error   : null,
    focusEl : null,
    radios  : [],
    config  : {
        errorClass : "error-esss"
    },
    check: function(formId, callBack){
        Shared.Debug.log("Validation Checked");
        Validation.error = false;
        var str_find = null;
        if(!Shared.__is_empty(formId))
            str_find = "form[id='" + formId + "']";
        else
            str_find = "form";
        $(document).find(str_find).each(function(){
            var obj  = $(this);
            if(obj.data('validate') == true){
                Validation.focusEl = null;
                obj.find("input, textarea, select").each(function(){
                    var el = $(this);
                    Validation.reset(el);
                    if(el.data('required') == true)
                        Validation.validate('required', el);
                    if(el.data('email') == true)
                        Validation.validate('email', el);
                    if(el.data('select') == true)
                        Validation.validate('select', el);
                });
                if(Validation.error == false){
                    if(!Shared.__is_empty(callBack)){
                        callBack();
                    }
                }
                else{
                    Validation.focusEl.focus();
                }
            }
        });
    },
    validate: function(type, field){
        switch(type){
            case "required" :
                if(Shared.__is_empty(field.val()))
                    Validation.setError(field);
            break;
            case "email" :
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                if(!re.test(field.val()) || Shared.__is_empty(field.val()))
                    Validation.setError(field);
            break;
            case "select" :
                var name = field.attr("id");
                if($("#" + name + " option:selected").val() == "0")
                    Validation.setErrorSelect2(field);
            break;
        }
    },
    reset: function(field){
        field.removeClass(Validation.config.errorClass);
        if(field.next().length && field.next().hasClass('select2'))
        	field.next().removeClass(Validation.config.errorClass);
    },
    setErrorSelect2: function(field){
        if(Validation.focusEl == null) Validation.focusEl = field;
        var f = field.next();
        Validation.error = true;
        f.addClass(Validation.config.errorClass);
    },
    setError: function(field){
        if(Validation.focusEl == null) Validation.focusEl = field;
        Validation.error = true;
        field.addClass(Validation.config.errorClass);
    }
}

Oracle = {
	NiceScroll: {
		config : {
			cursorwidth        : "8px",
			zindex             : 99999999,
			scrollspeed        : 100,
			mousescrollstep    : 60,
			cursoropacitymax   : 0.8,
			cursorcolor        : "#fff",
			horizrailenabled   : false,
			cursorborder       : "none",
			cursorborderradius : "0px"
		},
		init: function(){
			if(!Mobile.isMobile)
				$("html").niceScroll(Oracle.NiceScroll.config);
		}
	},
	Preloader: {
		loaded : true,
		config : {
			delay    : 500,
			recheck  : 1500,
			velocity : "slow"
		},
		init: function(){
			if(Oracle.Preloader.loaded){
				Oracle.Preloader.pageLoaded();
			}
			else{
				setTimeout(function(){
					Shared.Debug.log('Still Loading');
					Oracle.Preloader.init();
				}, Oracle.Preloader.recheck);
			}
		},
		pageLoaded: function(){
			Oracle.Preloader.hide();
		},
		show: function(){
			$("#status").fadeIn();
			$("#preloader").delay(Oracle.Preloader.delay).fadeIn(Oracle.Preloader.velocity);
		},
		hide: function(){
			$("#status").fadeOut();
			$("#preloader").delay(Oracle.Preloader.delay).fadeOut(Oracle.Preloader.velocity);
		}
	},
	init: function () {
		Mobile.init();
		var exec = [
			Oracle.NiceScroll,
			Oracle.Preloader
		];
		for(var i=0; i<exec.length; i++){
			exec[i].init();
		}
	}
}

$(document).ready(function() {
	Oracle.init();
});

$(window).on('load', function(){
	Oracle.Preloader.loaded = true;
});