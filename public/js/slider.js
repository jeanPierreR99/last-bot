var index = 1;
function plusIndex(n) {
	index = index + n;
	showImmage(index);
}
autoSlide();
function autoSlide() {

	var i;
	var x = document.getElementsByClassName("slides");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";

	}
	if (index > x.length) { index = 1 }
	x[index - 1].style.display = "block";
	index++;
	setTimeout(autoSlide, 2500);
}
