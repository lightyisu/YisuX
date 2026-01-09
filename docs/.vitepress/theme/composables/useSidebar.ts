import { h, Ref } from "vue";
import type { DefaultTheme } from "vitepress";
import type { MenuOption } from "naive-ui";
const setMenuOptions = (
  sidebarItems: Ref<DefaultTheme.SidebarItem[]>,
  menuOptions: Ref<MenuOption[]>
) => {
  if (!sidebarItems.value.length) return;
  console.log("set");
  if (!sidebarItems.value[0].link) {
    console.log("setx");

    menuOptions.value = sidebarItems.value.map((item) => {
      return {
        label: item.text + "年",
        key: item.text,
        type: "group",
        children: [
          ...(item.items || []).map((item) => ({
            label: () =>
              h(
                "a",
                {
                  href: item.link,
                },
                {
                  default: () => item.text,
                }
              ),
            key: item.text,
          })),
        ],
      };
    });
  } else {
    menuOptions.value = sidebarItems.value.map((item) => ({
      label: () =>
        h(
          "a",
          {
            href: item.link,
          },
          {
            default: () => item.text,
          }
        ),
      key: item.text,
    }));
  }
};

export { setMenuOptions };
