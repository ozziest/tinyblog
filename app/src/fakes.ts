import { IFeed } from "./interfaces";

const source: IFeed[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/200",
    content: "This is my first microblog post!",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/300",
    content: "Hello world! Another day, another post.",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/400",
    content: "Keeping things super simple and minimalistic here.",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/500",
    content: "Do you remember the early days of the internet? Pure nostalgia.",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/600",
    content:
      "Ad deserunt aliquip sit magna minim incididunt aliquip magna elit veniam voluptate reprehenderit ullamco. Sit anim deserunt ipsum proident in irure laboris dolore. Duis ad aliquip consequat ex eiusmod incididunt dolore proident veniam veniam enim dolor. Ipsum est in anim laborum dolor dolore et magna anim deserunt consectetur mollit sit do. Esse veniam aute enim ullamco. Sint adipisicing excepteur duis aliqua eu aute minim.",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 7,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 8,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 9,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 10,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 11,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 12,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 13,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
  {
    id: 14,
    avatar: "https://i.pravatar.cc/900",
    content:
      "Eu est qui excepteur ex duis. Ullamco veniam elit duis id. Laboris elit aute sit amet minim proident. Aute anim irure voluptate eiusmod incididunt non culpa minim.",
  },
];

export const getFeeds = () => {
  return [...source];
};

export const getFeed = (feedId: number): IFeed => {
  return source.find((itme) => itme.id === feedId) || source[0];
};
