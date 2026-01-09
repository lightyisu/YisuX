//only回删需要的部分

const typingSpeed = 100; // 打字速度
const deletingSpeed = 60; // 回删速度
const pauseAfterType = 1200;
const pauseAfterDelete = 1000;

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let replaceTextIndex = 0;
const text2replace: string[] = [
  "Blog!",
  "Web?",
  "Race?(F1 car?",
  "kpop music!",
  "spaghetti?(album",
];
let baseText = "Every Story Needs a ";

function typeLoop(el: HTMLElement) {
  const currentReplace = text2replace[textIndex % text2replace.length];
  const fullText = baseText + currentReplace;

  if (!isDeleting) {
    // 打字
    el.textContent = fullText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === fullText.length) {
      // 打完停顿
      setTimeout(() => {
        isDeleting = true;
        typeLoop(el);
      }, pauseAfterType);
      return;
    }
  } else {
    // 回删（只删替换部分）
    const deleteStart = baseText.length; // 保留 baseText
    el.textContent = fullText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === deleteStart) {
      isDeleting = false;
      textIndex++; // 下一句
      setTimeout(() => {
        typeLoop(el);
      }, pauseAfterDelete);
      return;
    }
  }

  const delay = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(() => typeLoop(el), delay);
}

// 使用 requestAnimationFrame 优化版
let lastTimestamp = 0;
let pauseUntil = 0;
function typeLoopRAF(el: HTMLElement, timestamp?: number) {
  if (timestamp === undefined) timestamp = performance.now(); // 或者 0
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = timestamp - lastTimestamp;

  // 暂停阶段
  if (timestamp < pauseUntil) {
    requestAnimationFrame((t) => typeLoopRAF(el, t));
    return;
  }

  const currentReplace = text2replace[textIndex % text2replace.length];
  const fullText = baseText + currentReplace;

  const speed = isDeleting ? deletingSpeed : typingSpeed;

  if (delta >= speed) {
    lastTimestamp = timestamp;

    if (!isDeleting) {
      charIndex++;
      el.textContent = fullText.slice(0, charIndex);

      if (charIndex === fullText.length) {
        isDeleting = true;
        pauseUntil = timestamp + pauseAfterType;
      }
    } else {
      charIndex--;
      el.textContent = fullText.slice(0, charIndex);

      if (charIndex === baseText.length) {
        isDeleting = false;
        textIndex++;
        pauseUntil = timestamp + pauseAfterDelete;
      }
    }
  }

  requestAnimationFrame((t) => typeLoopRAF(el, t));
}
export { typeLoopRAF as typeLoop };
