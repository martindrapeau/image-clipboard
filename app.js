$(document).ready(function() {


	var $message = $('p.message');
	var timeoutId;
	function showMessage(message, reset) {
		if (timeoutId) clearTimeout(timeoutId);
		$message.html(message);
		if (reset) {
			timeoutId = setTimeout(function() {
				$message.html('Paste (Ctrl+v) your image');
				timeoutId = undefined;
			}, 2000);
		}
	}

	var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
	var $img = $('img.image');
	function loadImage(file) {
		showMessage('Please wait...');
		var reader = new FileReader();
		reader.onload = function(e) {
			$img.attr('src', e.target.result);
			showMessage('Image pasted. You can paste again to replace.');
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
			showMessage('No image found on your Clipboard!', true);
		}
	});

});