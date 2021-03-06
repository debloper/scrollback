var log = require("../../lib/logger.js");

module.exports = function(core) {
	var pluginContent = "";
	core.on('room', function(r, callback) {
		var err;
		if(r && r.old && r.old.owner && r.owner !== r.old.owner) {
			return callback(new Error("ROOM_AUTH_FAIL"));
		}
		callback();
	}, "authentication");
};

