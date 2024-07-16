import styles from "./carousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import Slide from "./Slide";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

const Carousel = ({ videos, backGroundColor }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.emblaContainer}>
        {videos.map((propsVideo, index) => (
          <Slide
            key={index}
            propsVideo={propsVideo}
            backGroundColor={backGroundColor}
          />
        ))}
      </div>
      <div className={styles.emblaButtons}>
        <PrevButton
          className={`${styles.emblaButton} ${styles.emblaButtonLeft}`}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className={`${styles.emblaButton} ${styles.emblaButtonRight}`}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};

export default Carousel;
