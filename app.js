$(document).ready(function() {

	var $content = $('.content');

	var $message = $('.message');
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

	var $img = $('img.image');
	function loadImage(file) {
		var deferred = new $.Deferred();
		var reader = new FileReader();

		showMessage('Loading image...');
		reader.onload = function(e) {
			$img.attr('src', e.target.result);
			$canvas.hide();
			$content.addClass('has-image');
			showMessage('Image pasted. You can paste again to replace.');
			setTimeout(function() {
				deferred.resolve();
			}, 25);
		};
		reader.readAsDataURL(file);
		return deferred;
	};

	var $canvas = $('canvas');
	function copyImageInCanvas() {
		var canvas = $canvas[0];
		var ctx = canvas.getContext("2d");
		var image = $img[0];

		showMessage('Copying to canvas...');
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
		ctx.drawImage(image, 0, 0);
		$img.hide();
		$canvas.show();
		showMessage('Image pasted. You can paste again to replace.');
	}

	var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
	$(document).on('paste', function(e) {
    if (!e.originalEvent.clipboardData || !e.originalEvent.clipboardData.items) return;

		var items = e.originalEvent.clipboardData.items;
		for (var i = 0; i < items.length; i++) {
			if (IMAGE_MIME_REGEX.test(items[i].type)) {
				loadImage(items[i].getAsFile()).done(copyImageInCanvas);
				return;
			}
			showMessage('No image found on your Clipboard!', true);
		}
	});

	$message.html('Copy your screen by pressing on the Print Screen key. Then paste (Ctrl+v) it here as an image.');

	// Inspired from https://gist.github.com/dusanmarsa/2ca9f1df36e14864328a2bb0b353332e
});