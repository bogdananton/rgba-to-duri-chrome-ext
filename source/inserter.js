function displayInsertColorPicker(){
	// clear
	if(null !== document.querySelector('#bant_overlay')){
		document.querySelector('#bant_overlay').remove();
		return false;
	}
	
	// init
	var overlayHtml = document.createElement('div');
	overlayHtml.setAttribute('id', 'bant_overlay');
	overlayHtml.innerHTML = 
		'<div id="bant_overlay_wrapper">'+
			'<div id="bant_overlay_wrapper_inner">'+
				'<div id="bant_overlay_controls">'+
					'<input id="bant_colorpicker" value="#000000" />'+
					'<input id="bant_alpha" title="Set opacity (0 = transparent)" type="range" maximum="100" minimum="0" value="50" />'+
					'<input id="bant_preview" value="Preview" type="button" />'+
					'<div style="clear:both"></div>'+
					'<textarea id="bant_datauri"></textarea>'+
					'<div style="clear:both"></div>'+
					'<div id="bant_image"></div>'+
				'</div>'+
			'</div>'+
		'</div>';

	document.body.appendChild(overlayHtml);
	overlayHtml.style.backgroundColor = 'rgba(0,0,0,0.5)';

	Bant.colorpicker('#bant_colorpicker');

	overlayHtml.querySelector('#bant_datauri').addEventListener('click', function(ev){
		ev.target.select();
	});

	overlayHtml.querySelector('#bant_preview').addEventListener('click', function(){
		var color = overlayHtml.querySelector('#bant_colorpicker').value;
		var alpha = overlayHtml.querySelector('#bant_alpha').value / 100;

		var r = parseInt(color.substr(1,2), 16);
		var g = parseInt(color.substr(3,2), 16);
		var b = parseInt(color.substr(5,2), 16);

		overlayHtml.style.backgroundColor = 'rgba('+r+','+g+','+b+','+alpha+')';

		// create canvas element
		var canvas = document.createElement('canvas');
		canvas.width  = 1;
		canvas.height = 1;
		
		// draw
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,1,1);
		ctx.fillStyle="rgba("+r+", "+g+", "+b+", "+alpha+")";
		ctx.fillRect(0,0,1,1);

		// fill textarea
		var uri = canvas.toDataURL();
		overlayHtml.querySelector('#bant_datauri').value = uri;
		overlayHtml.querySelector('#bant_image').innerHTML = '<img src="'+uri+'" />';
	});
}
