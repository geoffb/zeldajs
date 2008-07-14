YAHOO.namespace('Ganon');

// rect
(function() {
	var g = YAHOO.Ganon;
	g.rect = function(left, top, right, bottom) {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
	};
	var p = g.rect.prototype;
	p.getWidth = function() {
		return this.right - this.left;
	};
	p.getHeight = function() {
		return this.bottom - this.top;
	};
	p.contains = function(r) {
		return (r.left >= this.left && r.right <= this.right && r.top >= this.top && r.bottom <= this.bottom);
	};
	p.intersects = function(r) {
		// TODO: Return the intersecting rect?
		return !(this.left > r.right || this.right < r.left || this.top > r.bottom || this.bottom < r.top);
	};
})();

// vector
(function() {
	var g = YAHOO.Ganon;
	g.vector = function(x, y) {
		this.x = x;
		this.y = y;
	};
})();