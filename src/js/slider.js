export const initSlider = () => {
	const sliderPrevBtn = document.querySelector('.slider__btn--prev');
	const sliderNextBtn = document.querySelector('.slider__btn--next');
	const sliderBox = document.querySelector('.slider-box');
	const slides = document.querySelectorAll('.slide');
	const sliderSpeed = 3000;

	let currentSlideIndex = 0;
	let isTransitioning = false;

	const handleSlider = () => {
		if (!isTransitioning) {
			currentSlideIndex++;
			changeSliderImg();
		}
	};

	let startSlider = setInterval(handleSlider, sliderSpeed);

	const changeSliderImg = () => {
		isTransitioning = true;
		sliderBox.style.transition = 'transform 0.5s ease';
		sliderBox.style.transform = `translateX(${-currentSlideIndex * 100}%)`;

		sliderBox.addEventListener(
			'transitionend',
			() => {
				if (currentSlideIndex >= slides.length - 1) {
					currentSlideIndex = 0;
					sliderBox.style.transition = 'none';
					sliderBox.style.transform = `translateX(${
						-currentSlideIndex * 100
					}%)`;
				} else if (currentSlideIndex <= 0) {
					currentSlideIndex = slides.length - 2;
					sliderBox.style.transition = 'none';
					sliderBox.style.transform = `translateX(${
						-currentSlideIndex * 100
					}%)`;
				}
				isTransitioning = false;
			},
			{ once: true }
		);
	};
	const sliderNextImg = () => {
		if (!isTransitioning) {
			currentSlideIndex++;
			resetSliderInterval();
		}
	};
	const sliderPrevImg = () => {
		if (!isTransitioning) {
			currentSlideIndex--;
			resetSliderInterval();
		}
	};

	const resetSliderInterval = () => {
		changeSliderImg();
		clearInterval(startSlider);
		startSlider = setInterval(handleSlider, sliderSpeed);
	};

	sliderNextBtn.addEventListener('click', sliderNextImg);
	sliderPrevBtn.addEventListener('click', sliderPrevImg);
};
