$(document).ready(function() {

	var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
	var $img = $('img.image');
	var $message = $('p.message');

	function loadImage(file) {
		$message.html('Please wait...');
		var reader = new FileReader();
		reader.onload = function(e) {
			$img.attr('src', e.target.result);
			$message.html('Image pasted. Paste (Ctrl+v) another to replace.');
		};
		reader.readAsDataURL(file);
	};

	$(document).on('paste', function(e) {
    if (!e.originalEvent.clipboardData || !e.originalEvent.clipboardData.items) return;

		var items = e.originalEvent.clipboardData.items;
		for (var i = 0; i < items.length; i++) {
			if (IMAGE_MIME_REGEX.test(items[i].type)) {
				loadImage(items[i].getAsFile());
				return;
			}
		}
	});

});