/* jshint jquery: true */
/* global libsb, threadEl */
/* exported chatArea */

var threadArea = {};

$(function() {
	var $threads = $(".pane-threads"),
		room = 'testroom', /* replace with room from URL */
		time = null; /* replace this with the time from the URL, if available. */
	
	// Set up infinite scroll here.
	
	$threads.infinite({
		scrollSpace: 2000,
		fillSpace: 500,
		itemHeight: 100,
		startIndex: time,
		getItems: function (index, before, after, recycle, callback) {
			libsb.getThreads({
				to: room, time: index, before: before, after: after
			}, function(err, threads) {
				if(err) throw err; // TODO: handle the error properly.
				
				if(after === 0 && threads.length < before) threads.unshift(false);
				else if(before === 0 && threads.length < after) threads.push(false);
				
				callback(threads.map(function(thread) {
					return thread && threadEl.render(null, thread);
				}));
			});
		}
	});
	
//	
//	libsb.on('text-dn', function(text, next) {
//		if($threads.data("lower-limit"))
//			$threads.addBelow(renderChat(null, text));
//		next();
//	});
	
	// The threadArea API.
	
	threadArea.setBottom = function(bottom) {
		var atBottom = ($threads.scrollTop() + $threads.height() == $threads[0].scrollHeight);
		
		$threads.css({ bottom: bottom });
		if(atBottom) $threads.scrollTop($threads[0].scrollHeight);
	};
	
	threadArea.setRoom = function(r) {
		room = r;
		$threads.find(".chat").remove();
		$threads.scroll();
	};

});


