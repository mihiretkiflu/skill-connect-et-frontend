import { Translate } from "@mui/icons-material";

export function numberFormat(num) {
  const format = new Intl.NumberFormat({ style: "currency" });
  return format.format(num);
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const seeMore = (str, length = 120) => {

  if (str[length] !== " ") {
    const space = str.indexOf(" ", length);
    length = space;
  }
  const subs = str.substring(0, length);

  return subs + "...";
};

export const languageSubMenus = [
  {
    id: "1",
    title: "አማርኛ",
    icon: <Translate color={"primary"} />,
    lang: "am",
  },
  {
    id: "1",
    title: "ትግርኛ",
    icon: <Translate color={"primary"} />,
    lang: "ti",
  },
  {
    id: "1",
    title: "English",
    icon: <Translate color={"primary"} />,
    lang: "en",
  },
  {
    id: "1",
    title: "Oromiffa",
    icon: <Translate color={"primary"} />,
    lang: "or",
  },
  {
    id: "1",
    title: "Somali",
    icon: <Translate color={"primary"} />,
    lang: "so",
  },
];
