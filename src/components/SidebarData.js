import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import VillaIcon from "@mui/icons-material/Villa";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import BedIcon from "@mui/icons-material/Bed";

export const SidebarData = [
  {
    tittle: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    tittle: "Warga",
    icon: <PeopleIcon />,
    link: "/warga",
  },
  {
    tittle: "Rumah",
    icon: <VillaIcon />,
    link: "/rumah",
  },
  {
    tittle: "Pengeluaran",
    icon: <BusinessCenterIcon />,
    link: "/pengeluaran",
  },
];
