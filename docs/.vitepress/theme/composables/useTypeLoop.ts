import { typeLoop } from '../utils/type';

export function useTypeLoop() {
  /**
   * 初始化打字效果动画
   * @param selector 要应用打字效果的元素选择器
   */
  const initTypeLoop = (selector: string = '.loop-text') => {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) {
      typeLoop(el);
    } else {
      console.warn(`Element with selector "${selector}" not found`);
    }
  };

  return {
    initTypeLoop
  };
}
