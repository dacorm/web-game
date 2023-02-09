export const setAutoscroll = (element:HTMLElement, autoscrollDistance:number) => {
    const currentHeightPositionScroll = element.offsetHeight + element.scrollTop;
    const heightScroll = element.scrollHeight;

    const autoScrollIsNeeded = (currentHeightPositionScroll + autoscrollDistance) > heightScroll;
    // если элемент промотан вверх больше чем autoscrollDistance, то автоскрол чата не нужен
    if (autoScrollIsNeeded) {
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth',
        });
    }
};
