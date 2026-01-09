import { ref, watch } from 'vue';
import lottie from 'lottie-web';

// 定义 Lottie 动画实例类型
interface LottieAnimation {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  goToAndPlay: (value: number, isFrame?: boolean) => void;
  destroy: () => void;
}

export function useLottieAnimation() {
  const lottieEl = ref<HTMLDivElement | null>(null);
  let anim: LottieAnimation | null = null;

  /**
   * 加载 Lottie 动画
   * @param container 动画容器元素
   * @param animationPath 动画 JSON 文件路径
   * @returns 动画实例
   */
  const loadAnimation = (container: HTMLDivElement, animationPath: string) => {
    anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: animationPath,
    });
    return anim;
  };

  /**
   * 控制动画播放状态
   * @param state 播放状态
   */
  const toggleAnimation = (state: boolean) => {
    if (!anim) return;
    if (state) {
      anim.play();
    } else {
      anim.pause();
    }
  };

  /**
   * 销毁动画实例
   */
  const destroyAnimation = () => {
    if (anim) {
      anim.destroy();
      anim = null;
    }
  };

  return {
    lottieEl,
    anim,
    loadAnimation,
    toggleAnimation,
    destroyAnimation,
  };
}
