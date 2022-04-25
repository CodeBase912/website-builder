/**
 * @fileoverview This file contains the Profile component's pages
 */

// import { Icons } from "../../components/common/icons";

export const profilePageLinks = [
  {
    title: "Basic Info",
    pageTitle: "User Account",
    link: "/profile",
    // icon: Icons.addressBook,
    properties: [
      "id",
      "first_name",
      "last_name",
      "username",
      "addresses { id, street_1, street_2, city, province, country }",
      "phone_number",
      "email",
    ],
  },
  {
    title: "My Little One",
    pageTitle: "My Little One",
    link: "/profile/little_one",
    // icon: Icons.baby,
    properties: [
      "id",
      `addresses {
        id
        street_1
        street_2
        city
        province
        country
      }`,
    ],
  },
  {
    title: "My Payments",
    pageTitle: "My Payments",
    link: "/profile/payments",
    // icon: Icons.moneyBill,
    properties: [
      `id
    		created_at
        unique
        status
        items
        total_items
        total_delivery
        payment
        fulfilled
      `,
    ],
  },
  {
    title: "Messages",
    pageTitle: "Messages",
    link: "/profile/messages",
    // icon: Icons.envelopeSolid,
    properties: [
      "id",
      "first_name",
      "last_name",
      "username",
      "email",
      "role { name }",
    ],
  },
  {
    title: "Favourites",
    pageTitle: "Favourites",
    link: "/profile/Favourites",
    // icon: Icons.heartSolid,
    properties: [],
  },
  {
    title: "Settings",
    pageTitle: "Settings",
    link: "/profile/settings",
    // icon: Icons.cog,
    properties: [],
  },
];
