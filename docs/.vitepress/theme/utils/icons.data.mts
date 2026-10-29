import { readKeywordIcons, type KeywordIcon } from "../../markdown/keyword-icon";

declare const data: KeywordIcon[];
export { data };

export default {
  watch: ["../../../public/icons/*", "../../data/icons.json"],
  load: () => readKeywordIcons(),
};
