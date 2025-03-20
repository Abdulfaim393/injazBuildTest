"use client";
import React from "react";
import { useState } from "react";
import EnquiryForm from "../enquiry-form/EnquiryForm";
import { useRouter } from "next/navigation";
import Navlinks from "../navlinks/NavLinks";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import drawerLogo from "../../../../../public/injaz white colour logowebp.webp";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

// ** mui Imports **
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import MenuIcon from "@mui/icons-material/Menu";
import CustomCollapsibleListItem from "./CustomCollapsibleListItem";
interface Props {
  data: any;
}

const drawerWidth = 165;

function Navbar(props: Props) {
  const { t } = useTranslation();
  const { data } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eopen, setEopen] = React.useState(false);
  const [brandopen, setbrandopen] = React.useState(false);
  const [catOpen, setCatOpen] = React.useState(false);
  const [subsOpen, setSubsOpen] = React.useState(false);
  const [location, setLocation] = useState([]);
  const [drop, setdrop] = useState([]);
  const [cat, setCat] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWhatsappClick = () => {
    const message = encodeURIComponent(
      "Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent the car on Daily, Weekly and Monthly packages. \nIs it available?"
    );
    window.open(`https://wa.me/${data?.phoneNumber}?text=${message}`, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:${data?.phoneNumber}`, "_blank");
  };
  const handlePhoneClick2 = () => {
    window.open(`tel:+971503755886`, "_blank");
  };

  const handleMailClick = () => {
    (window.location.href = `mailto:${data?.email}`), "_blank";
  };
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get(serverUrl + "/user/getAllcarLoaction")
      .then((res) => {
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllBrands")
      .then((res) => {
        setdrop(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axios
      .get(serverUrl + "/user/getAllCategoryes")
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    setEopen(false);
    setbrandopen(false);
    setCatOpen(false);
    setSubsOpen(false);
  };

  const eopenClick = () => {
    setEopen(!eopen);
  };
  const brandopenClick = () => {
    setbrandopen(!brandopen);
  };
  const catOpenClick = () => {
    setCatOpen(!catOpen);
  };
  const subsOpenClick = () => {
    setSubsOpen(!subsOpen);
  };

  const subscriptionData = [
    {
      name: "daily",
    },
    {
      name: "weekly",
    },
    {
      name: "monthly",
    },
  ];

  const customCollapsibleListItemArray = [
    {
      id: 1,
      toggleClick: eopenClick,
      Icon: LocationOnIcon,
      text: "LOCATION",
      open: eopen,
      data: location,
      drawerToggle: handleDrawerToggle,
      setOpen: setEopen,
      queryParam: "location",
    },
    {
      id: 2,
      toggleClick: brandopenClick,
      Icon: DashboardIcon,
      text: "BRAND",
      open: brandopen,
      data: drop,
      drawerToggle: handleDrawerToggle,
      setOpen: setbrandopen,
      queryParam: "brand",
    },
    {
      id: 3,
      toggleClick: catOpenClick,
      Icon: CategoryIcon,
      text: "CATEGORY",
      open: catOpen,
      data: cat,
      drawerToggle: handleDrawerToggle,
      setOpen: setCatOpen,
      queryParam: "category",
    },
    {
      id: 4,
      toggleClick: subsOpenClick,
      Icon: CategoryIcon,
      text: "SUBSCRIPTION",
      open: subsOpen,
      data: subscriptionData,
      drawerToggle: handleDrawerToggle,
      setOpen: setSubsOpen,
      queryParam: "",
    },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          backgroundColor: "#01437d",
        }}
        onClick={() => router.push("/")}
      >
        <Image
          src={drawerLogo}
          alt="logo"
          className="drawerImg"
          loading="lazy"
        />
      </Box>
      <Divider />
      {customCollapsibleListItemArray.map((item) => (
        <CustomCollapsibleListItem
          key={item.id}
          toggleClick={item.toggleClick}
          Icon={item.Icon}
          text={item.text}
          open={item.open}
          data={item.data}
          drawerToggle={item.drawerToggle}
          setOpen={item.setOpen}
          queryParam={item.queryParam}
        />
      ))}
      <ListItemButton
        onClick={() => {
          handleWhatsappClick();
          handleDrawerToggle();
        }}
        className="list_item_text"
      >
        <ListItemIcon
          sx={{
            minWidth: "25px",
            cursor: "pointer",
          }}
        >
          <WhatsAppIcon
            sx={{
              color: "#00ff00",
              fontSize: "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ color: "black", fontWeight: "600" }}
          primary="WHATSAPP"
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handlePhoneClick();
          handleDrawerToggle();
        }}
        className="list_item_text"
      >
        <ListItemIcon sx={{ minWidth: "25px" }}>
          <CallIcon
            sx={{
              color: "#01437d",
              fontSize: "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ color: "black", fontWeight: "600" }}
          primary={data?.phoneNumber}
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handlePhoneClick2();
          handleDrawerToggle();
        }}
        className="list_item_text"
      >
        <ListItemIcon sx={{ minWidth: "25px" }}>
          <CallIcon
            sx={{
              color: "#01437d",
              fontSize: "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ color: "black", fontWeight: "600" }}
          primary="+971503755886"
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          handleMailClick();
          handleDrawerToggle();
        }}
        className="list_item_text"
      >
        <ListItemIcon sx={{ minWidth: "25px" }}>
          <MailOutlineIcon sx={{ color: "#01437d", fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText
          sx={{ color: "black", fontWeight: "600" }}
          primary={data?.email}
        />
      </ListItemButton>
    </Box>
  );

  return (
    <>
      <Box
        id="mainNavbar"
        sx={{
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "#01437d" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            >
              <Image
                src="/injaz white colour logowebp.webp"
                alt="appbar-logo"
                height={56}
                width={180}
                loading="lazy"
              />
            </Typography>
            <Navlinks data={data} />
            <Box
              sx={{
                padding: { xs: "0px", sm: "16px" },
                width: { xs: "100%", sm: "auto" },
                textAlign: { xs: "right" },
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Call Us">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                      marginRight: "1rem",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "white" },
                    }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <CallIcon sx={{ color: "#01437d" }} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    window.location.href = "tel:+971509961569";
                    handleClose();
                  }}
                >
                  +971509961569
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    window.location.href = "tel:+971503755886";
                    handleClose();
                  }}
                >
                  +971503755886
                </MenuItem>
              </Menu>
              <Button
                onClick={() => router.push("/pages/login")}
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 20px !important",
                  },
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginRight: "10px",
                  fontSize: "1rem",
                  padding: "4px 20px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                }}
                variant="text"
              >
                {t("landingPage:navbar.login")}
              </Button>
              <EnquiryForm />
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main">
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
