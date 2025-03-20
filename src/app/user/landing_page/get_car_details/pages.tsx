"use client";
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../adminpage/pages/createdCars/CreatedCars.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";
import BookNow from "../car-offers/BookNow";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface getCarData {
  _id: string;
  brand: string;
  model: string;
  category: string;
  year: string;
  image: string;
  location: string[];
  vehicleType: string;
  cheapestCar: string;
  status: string;
  services: string[];
  description: string;
  actualPriceDaily: string;
  discountedPriceDaily: string;
  actualPriceWeekly: string;
  discountedPriceWeekly: string;
  actualPriceMonthly: string;
  discountedPriceMonthly: string;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceDaily: string;
  paiInsuranceWeekly: string;
  paiInsuranceMonthly: string;
  paymentType: string[];
  seater: string;
  requirementsForUAEResidents: string[];
  requirementsForTourists: string[];
  externalImage: string[];
  babySeatChargeDaily: string;
  babySeatChargeWeekly: string;
  babySeatChargeMonthly: string;
  freeDailyKM: string;
  freeWeeklyKM: string;
  freeMonthlyKM: string;
  cdwDaily: string;
  cdwWeekly: string;
  cdwMonthly: string;
  keyFeatures: string[];
  deliveryChargeDaily: string;
  deliveryChargeWeekly: string;
  deliveryChargeMonthly: string;
  additionalMileageCharge: string;
  excessClaimCharge: string;
  salikTollCharge: string;
  airportPickupCharge: string;
  airportDeliveryCharge: string;
  carProvider: string;
  branchLocation: string;
  isOfferApplied: string;
  offerType: string;
  fourMonthPriceOf2500Km: string;
  fourMonthPriceOf5000Km: string;
  fuel: string;
  maxPower: string;
  torque: string;
  sixMonthPriceOf2500Km: String;
  eightMonthPriceOf2500Km: String;
}

const serverAPI = "https://api.injazrent.ae";
const localAPI = "http://localhost:4000";

const CreatedCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");

  const [selectedPrice, setSelectedPrice] = useState(""); // state for selected price
  const [selectedInsuarance, setSelectedInsuarance] = useState(""); // state for selected insuarance

  const handleBoxClick = (price:any) => {
    setSelectedPrice(price); // update selected price
  };
  const handleInsauranceBoxClick = (price:any) => {
    setSelectedInsuarance(price); // update selected price
  };

  const [data, setData] = useState<getCarData>({
    _id: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    image: "",
    location: [],
    vehicleType: "",
    cheapestCar: "",
    status: "",
    services: [],
    description: "",
    actualPriceDaily: "",
    discountedPriceDaily: "",
    actualPriceWeekly: "",
    discountedPriceWeekly: "",
    actualPriceMonthly: "",
    discountedPriceMonthly: "",
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    cashType: [],
    paiInsuranceDaily: "",
    paiInsuranceWeekly: "",
    paiInsuranceMonthly: "",
    paymentType: [],
    seater: "",
    requirementsForUAEResidents: [],
    requirementsForTourists: [],
    externalImage: [],
    babySeatChargeDaily: "",
    babySeatChargeWeekly: "",
    babySeatChargeMonthly: "",
    freeDailyKM: "",
    freeWeeklyKM: "",
    freeMonthlyKM: "",
    cdwDaily: "",
    cdwWeekly: "",
    cdwMonthly: "",
    keyFeatures: [],
    deliveryChargeDaily: "",
    deliveryChargeWeekly: "",
    deliveryChargeMonthly: "",
    additionalMileageCharge: "",
    excessClaimCharge: "",
    salikTollCharge: "",
    airportPickupCharge: "",
    airportDeliveryCharge: "",
    carProvider: "",
    branchLocation: "",
    isOfferApplied: "",
    offerType: "",
    fourMonthPriceOf2500Km: "",
    fourMonthPriceOf5000Km: "",
    sixMonthPriceOf2500Km: "",
    eightMonthPriceOf2500Km: "",
    fuel: "",
    maxPower: "",
    torque: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(serverUrl + `/user/getCar/${id}`)
        .then((res) => {
          //  ;
          setData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [phoneemail, setPhoneEmail] = useState({});
  useEffect(() => {
    axios
      .get(serverUrl + "/admin/getAllsettings")
      .then((res) => {
        setPhoneEmail(res.data.data[0]);
        console.log(res.data.data[0], "phoneEmail");
      })
      .catch((err) => {
        console.log(err, "...error");
      });
  }, []);

  const phoneData: any = phoneemail;

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      package: packageDetails,
      discountedPriceDaily,
      _id,
    } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent the discounted ${brand} ${model} ${year} \n${url} \nfor ${discountedPriceDaily} AED ${packageDetails}. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };
  const bookForFourMonths = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      offerType,
      fourMonthPriceOf5000Km,
      fourMonthPriceOf2500Km,
      _id,
    } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent ${brand} ${model} ${year} In ${offerType} \n${url}  \nfor ${fourMonthPriceOf2500Km} AED of 2500 KM and ${fourMonthPriceOf5000Km} AED of 5000KM Per 4 Month. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };
  const bookForEightMonths = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      offerType,
      eightMonthPriceOf5000Km,
      eightMonthPriceOf2500Km,
      _id,
    } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent ${brand} ${model} ${year} In ${offerType} \n${url}  \nfor ${eightMonthPriceOf2500Km} AED of 2500 KM and ${eightMonthPriceOf5000Km} AED of 5000KM Per 8 Month. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };
  const bookForTwelveMonths = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      offerType,
      twelveMonthPriceOf5000Km,
      twelveMonthPriceOf2500Km,
      _id,
    } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent ${brand} ${model} ${year} In ${offerType} \n${url}  \nfor ${twelveMonthPriceOf2500Km} AED of 2500 KM and ${twelveMonthPriceOf5000Km} AED of 5000KM Per 12 Month. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink);
  };

  const bookCarForTeachers = (
    carDetails: any,
    duration: number,
    priceOf2500Km: string,
    priceOf5000Km: string
  ) => {
    const { brand, model, year, offerType, _id } = carDetails;
    const baseUrl =
      "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    const url = `${baseUrl}${_id}`;

    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent ${brand} ${model} ${year} In ${offerType} \n${url} \nfor ${priceOf2500Km} AED of 2500 KM and ${priceOf5000Km} AED of 5000KM Per ${duration} Month${
      duration > 1 ? "s" : ""
    }. \nIs it available?`;

    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappLink);
  };

  const carDetailsBox = [
    { image: "/Seat.png", title: "Capacity", text: data?.seater },
    {
      image: "/Cruise control.png",
      title: "Transmission",
      text: "Cruise control",
    },
    { image: "/Abs.png", title: "Braking System", text: "ABS Brakes" },
    { image: "/Airbag.png", title: "Safety", text: "Dual Front Airbags" },
  ];

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const highlights = [
    { text: "Engine", value: `${data?.engineCapacity}L Engine` },
    { text: "Transmission", value: data?.transmission },
    { text: "Fuel", value: data?.fuel ? data?.fuel : "Petrol" },
    { text: "Seats", value: data?.seater },
  ];
  const technicalDetails = [
    { text: "Max Power", value: data?.maxPower ? data?.maxPower : "100 HP" },
    { text: "Torque", value: data?.torque ? data?.torque : "14 NM" },
    { text: "Laggage Boot Capacity", value: data.laggageBootCapacity },
    { text: "Category", value: data?.category },
  ];

  const monthlyBooking = [
    {
      monthText: "8 Months",
      savingAmount: "100",
      price: data?.eightMonthPriceOf2500Km ? data?.eightMonthPriceOf2500Km: "0",
      count: 8
    },
    {
      monthText: "6 Months",
      savingAmount: "80",
      price: data?.sixMonthPriceOf2500Km ? data?.sixMonthPriceOf2500Km: "0",
      count: 6
    },
    {
      monthText: "4 Months",
      savingAmount: "60",
      price: data?.fourMonthPriceOf2500Km ? data?.fourMonthPriceOf2500Km: "0",
      count: 8
    },
    {
      monthText: "1 Months",
      savingAmount: "40",
      price: data?.discountedPriceMonthly,
      count: 1
    },
  ];
  const insuranceBox = [
    { monthText: "Standard Cover", savingAmount: "No additional cost", price:"0" },
    {
      monthText: "Full Cover",
      savingAmount: `+ AED ${data?.paiInsuranceMonthly}/Month`,
      price:data?.paiInsuranceMonthly
    },
  ];
  const monthlyMilageBox = [
    { monthText: "2500 KM", savingAmount: "No additional cost" },
    { monthText: "5000 KM", savingAmount: `+ AED 300/Month` },
  ];

  const selectedMonthPrice = selectedPrice > "" ? selectedPrice : "0";
  const numericSelectedMonthPrice =  parseFloat(selectedMonthPrice)

  const selectedInsuPrice = selectedInsuarance > "" ? selectedInsuarance : "0";
  const numericSeleInsuPrice= parseFloat(selectedInsuPrice)

  const totalCarInsauAmt = numericSelectedMonthPrice + numericSeleInsuPrice;

  return (
    <>
      <NavFooter />
      <section className="createdCars">
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <div className="createdCarsTop">
                <div className="imageHead">
                  <h3
                    style={{
                      textTransform: "capitalize",
                      borderRadius: "10px 10px 0px 0px",
                      textAlign: "left",
                      paddingLeft: "1rem",
                    }}
                  >
                    {data?.brand.toLowerCase() +
                      " " +
                      data?.model.toLowerCase() +
                      " " +
                      data?.year.toLowerCase()}
                  </h3>
                </div>
                <div className="createdImg">
                  <CardMedia
                    component="img"
                    height={350}
                    sx={{ objectFit: "contain" }}
                    image={data?.externalImage[0]}
                    alt="carImage"
                  />
                </div>
              </div>
              <div className="createdCarsTop" style={{ borderRadius: "10px" }}>
                <div style={{ marginTop: "1rem" }} className="imageHead">
                  <h3
                    style={{
                      textTransform: "capitalize",
                      borderRadius: "10px 10px 0px 0px",
                      textAlign: "left",
                      paddingLeft: "1rem",
                    }}
                  >
                    Car Details
                  </h3>
                </div>
                <Box sx={{ padding: "1rem" }}>
                  <Grid container spacing={1}>
                    {carDetailsBox.map((item) => (
                      <Grid key={item.title} item xs={2} sm={2}>
                        <Box
                          sx={{
                            border: "1px solid #01437D",
                            borderRadius: "5px",
                            padding: "5px 10px",
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={25}
                            height={25}
                          />
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              margin: "0px",
                            }}
                            variant="subtitle1"
                            color="initial"
                            gutterBottom
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.6rem",
                              margin: "0px",
                            }}
                            variant="subtitle1"
                            color="initial"
                            gutterBottom
                          >
                            {item.text}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <section className="tabSecMem">
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <AppBar
                      position="static"
                      sx={{
                        backgroundColor: "#01437D",
                        borderRadius: "10px 10px 0px 0px",
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "white", // Custom color
                          },
                        }}
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab
                          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
                          label="Highlights"
                          {...a11yProps(0)}
                        />
                        <Tab
                          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
                          label="Features"
                          {...a11yProps(1)}
                        />
                        <Tab
                          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
                          label="Technical Details"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        {highlights.map((item) => (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "2px solid #8080803b",
                              marginBottom: "1rem",
                            }}
                            key={item.text}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                margin: "0px",
                              }}
                              variant="subtitle1"
                              color="initial"
                              gutterBottom
                            >
                              {item.text}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                margin: "0px",
                              }}
                              variant="subtitle1"
                              color="initial"
                              gutterBottom
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        ))}
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        {data?.keyFeatures.slice(1).map((item, index) => (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "2px solid #8080803b",
                              marginBottom: "1rem",
                            }}
                            key={index}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                margin: "0px",
                              }}
                              variant="subtitle1"
                              color="initial"
                              gutterBottom
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        {technicalDetails.map((item) => (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "2px solid #8080803b",
                              marginBottom: "1rem",
                            }}
                            key={item.text}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                margin: "0px",
                              }}
                              variant="subtitle1"
                              color="initial"
                              gutterBottom
                            >
                              {item.text}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                margin: "0px",
                              }}
                              variant="subtitle1"
                              color="initial"
                              gutterBottom
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        ))}
                      </TabPanel>
                    </SwipeableViews>
                  </Box>
                </section>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <Box
                sx={{
                  backgroundColor: "#01437D",
                  height: "100%",
                  borderRadius: "10px",
                  padding: "0.4rem 0.8rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white" }}
                  color="initial"
                  gutterBottom
                >
                  Booking Length
                </Typography>
                <Grid container spacing={3}>
                  {monthlyBooking.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <Box
                      onClick={() => handleBoxClick(item.price)} // update total on box click
                        sx={{
                          backgroundColor: selectedPrice === item.price ? "orange" : "white",
                          borderRadius: "5px",
                          textAlign: "center",
                          padding: "5px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle1"
                          color="initial"
                        >
                          {item.monthText}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle2"
                          color="initial"
                        >
                          Save AED {item.savingAmount}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography
                  variant="h6"
                  sx={{ color: "white", marginTop: "1.5rem" }}
                  color="initial"
                  gutterBottom
                >
                  Insurance
                </Typography>
                <Grid container spacing={3}>
                  {insuranceBox.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <Box
                      onClick={() => handleInsauranceBoxClick(item.price)} // update total on box click
                        sx={{
                          backgroundColor: selectedInsuarance === item.price ? "orange" : "white",
                          borderRadius: "5px",
                          textAlign: "center",
                          padding: "5px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle1"
                          color="initial"
                        >
                          {item.monthText}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle2"
                          color="initial"
                        >
                          {item.savingAmount}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography
                  variant="h6"
                  sx={{ color: "white", marginTop: "1.5rem" }}
                  color="initial"
                  gutterBottom
                >
                  Monthly mileage allowance
                </Typography>
                <Grid container spacing={3}>
                  {monthlyMilageBox.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                          textAlign: "center",
                          padding: "5px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle1"
                          color="initial"
                        >
                          {item.monthText}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            margin: "0px",
                            color: "#01437D",
                          }}
                          variant="subtitle2"
                          color="initial"
                        >
                          {item.savingAmount}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    marginTop: "1.5rem",
                    borderBottom: "2px solid white",
                  }}
                  color="initial"
                  gutterBottom
                >
                  Price BreakDown
                </Typography>
                <Box
                  sx={{ borderBottom: "2px solid white", margin: "1rem 0rem" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      Car Rental Charges
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      {selectedPrice > "" ? selectedPrice : "0"} {/* Show default or selected price */}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      Insuarance Charges
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      {selectedInsuarance > "" ? selectedInsuarance : "0"} {/* Show default or selected price */}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      VAT Charges
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white" }}
                      color="initial"
                      gutterBottom
                    >
                      5%
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white" }}
                    color="initial"
                    gutterBottom
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white" }}
                    color="initial"
                    gutterBottom
                  >
                    {totalCarInsauAmt}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="createdCarsTop">
                <div className="imageHead">
                  <h3>Car Image</h3>
                </div>
                <div className="createdImg">
                  <CardMedia
                    component="img"
                    height={350}
                    sx={{ objectFit: "contain" }}
                    image={data?.externalImage[0]}
                    alt="carImage"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      padding: "1rem 0rem",
                    }}
                  >
                    <BookNow details={data} />
                    {data.isOfferApplied !== "Yes" && (
                      <Button
                        variant="contained"
                        startIcon={<WhatsAppIcon className="wts-icon" />}
                        size="small"
                        className="whts-btn"
                        sx={{ marginLeft: "1rem" }}
                        onClick={() => handleWhatsappClick(data)}
                      >
                        Whatsapp
                      </Button>
                    )}
                  </Box>
                </div>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="createdCarSpec">
                <div className="carSpecHead">
                  <h3>Car</h3>
                </div>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <p>
                      NAME:{" "}
                      <span className="dynamicData">
                        {data?.brand} {data?.model}
                      </span>
                    </p>
                    <p>
                      MODEL :{" "}
                      <span className="dynamicData">
                        {data?.brand} {data?.model} {data?.year}
                      </span>
                    </p>
                    <p>
                      YEAR : <span className="dynamicData">{data?.year}</span>
                    </p>
                    <p>
                      BRAND : <span className="dynamicData">{data?.brand}</span>
                    </p>
                    <p>
                      CATEGORY :{" "}
                      <span className="dynamicData">{data?.category}</span>
                    </p>
                    <p>
                      STATUS :{" "}
                      <span className="dynamicData">{data?.status}</span>
                    </p>
                    <p>
                      VEHICLE TYPE :{" "}
                      <span className="dynamicData">{data?.vehicleType}</span>
                    </p>
                    {data?.isOfferApplied && (
                      <>
                        <p>
                          Car Offer :{" "}
                          <span className="dynamicData">
                            {data?.isOfferApplied}
                          </span>
                        </p>
                        <p>
                          Type of Offer :{" "}
                          <span className="dynamicData">{data?.offerType}</span>
                        </p>
                        <p>
                          Book For 4 Months :{" "}
                          <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon className="wts-icon" />}
                            size="small"
                            className="whts-btn"
                            sx={{ marginLeft: "1rem" }}
                            onClick={() =>
                              bookCarForTeachers(
                                data,
                                4,
                                data.fourMonthPriceOf2500Km,
                                data.fourMonthPriceOf5000Km
                              )
                            }
                          >
                            Whatsapp
                          </Button>
                        </p>
                        <p>
                          Book For 8 Months :{" "}
                          <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon className="wts-icon" />}
                            size="small"
                            className="whts-btn"
                            sx={{ marginLeft: "1rem" }}
                            onClick={() => bookForEightMonths(data)}
                          >
                            Whatsapp
                          </Button>
                        </p>
                        <p>
                          Book For 12 Months :{" "}
                          <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon className="wts-icon" />}
                            size="small"
                            className="whts-btn"
                            sx={{ marginLeft: "1rem" }}
                            onClick={() => bookForTwelveMonths(data)}
                          >
                            Whatsapp
                          </Button>
                        </p>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div className="carSpecMain">
                      <p>
                        Actual Price (Daily) :{" "}
                        <span className="dynamicData">
                          {data?.actualPriceDaily}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Discounted Price (Daily) :{" "}
                        <span className="dynamicData">
                          {data?.discountedPriceDaily}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Actual Price (Weekly) :{" "}
                        <span className="dynamicData">
                          {data?.actualPriceWeekly}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Discounted Price (Weekly) :{" "}
                        <span className="dynamicData">
                          {data?.discountedPriceWeekly}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Actual Price (Monthly) :{" "}
                        <span className="dynamicData">
                          {data?.actualPriceMonthly}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Discounted Price (Monthly) :{" "}
                        <span className="dynamicData">
                          {data?.discountedPriceMonthly}
                        </span>{" "}
                        AED
                      </p>

                      <p>
                        Additional Mileage Charge :{" "}
                        <span className="dynamicData">
                          {data?.additionalMileageCharge}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Excess Claim Charge :{" "}
                        <span className="dynamicData">
                          {data?.excessClaimCharge}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Salik/Toll Charge :{" "}
                        <span className="dynamicData">
                          {data?.salikTollCharge}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Airport Pickup Charge :{" "}
                        <span className="dynamicData">
                          {data?.airportPickupCharge
                            ? data?.airportPickupCharge
                            : 0o0}
                        </span>{" "}
                        AED
                      </p>
                      <p>
                        Airport Delivery Charge :{" "}
                        <span className="dynamicData">
                          {data?.airportDeliveryCharge
                            ? data?.airportDeliveryCharge
                            : 0o0}
                        </span>{" "}
                        AED
                      </p>

                      <p>
                        Cheapest Car? :{" "}
                        <span className="dynamicData">{data?.cheapestCar}</span>
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <div className="carSpecMain">
                      <p>Included :</p>
                      <span className="dynamicData"></span>
                      {data?.services.slice(1).map((req, index) => (
                        <p key={index}>
                          - <span className="dynamicData">{req}</span>
                        </p>
                      ))}

                      <p>
                        Locations :{" "}
                        <span className="dynamicData">
                          {data?.location?.join(", ")}
                        </span>
                      </p>

                      <p>
                        Car Provider :{" "}
                        <span className="dynamicData">
                          {data?.carProvider ? data?.carProvider : "Injaz"}
                        </span>{" "}
                      </p>
                      <p>
                        Branch Location :{" "}
                        <span className="dynamicData">
                          {data?.branchLocation
                            ? data?.branchLocation
                            : "Abu Dhabi & Dubai"}
                        </span>{" "}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="createdCarDesc">
                <div className="carDescHead">
                  <h3>Description</h3>
                </div>
                <div className="carDescContent">
                  <p>{data?.description}</p>
                </div>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="createdCarDetails">
                <div className="CarDetHead">
                  <h3>Contract Package</h3>
                </div>
                <div className="carDetMain">
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Free KMs Daily</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.freeDailyKM}
                        </span>{" "}
                        KM
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Free KMs Weekly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.freeWeeklyKM}
                        </span>{" "}
                        KM
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Free KMs Monthly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.freeMonthlyKM}
                        </span>{" "}
                        KM
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>CDW Daily</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">{data?.cdwDaily}</span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>CDW Weekly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.cdwWeekly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>CDW Monthly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.cdwMonthly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>PAI Insaurance Daily</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.paiInsuranceDaily}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>PAI Insaurance Weekly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.paiInsuranceWeekly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>PAI Insaurance Monthly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.paiInsuranceMonthly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Baby Seat charge Daily</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.babySeatChargeDaily}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Baby Seat charge Weekly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.babySeatChargeWeekly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Baby Seat charge Monthly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.babySeatChargeMonthly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Delivery Charge Daily</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.deliveryChargeDaily}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Delivery Charge Weekly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.deliveryChargeWeekly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Delivery Charge Monthly</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.deliveryChargeMonthly}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Security Deposit</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.securityDeposit}
                        </span>{" "}
                        AED
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Security Deposit Payment</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          Credit Card Lock
                          {/* {data?.cashType.join(", ").slice(2)} */}
            {/* </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Security Deposit Refunded In</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          21 Days
                          {/* {data?.cashType.join(", ").slice(2)} */}
            {/* </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Payment Type</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.paymentType.join(", ").slice(2)}
                        </span>
                      </p>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="createdCarFeatuers">
                <div className="carFeatHead">
                  <h3>Car Features</h3>
                </div>
                <div className="carFeatMain">
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Engine Capacity</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.engineCapacity} Litre
                        </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Seater</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        : <span className="dynamicDataTwo">{data?.seater}</span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Transmission</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.transmission}
                        </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>Luggage</p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        :{" "}
                        <span className="dynamicDataTwo">
                          {data?.laggageBootCapacity}
                        </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <p>
                        <b>Key Features</b>
                      </p>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      {data?.keyFeatures
                        .slice(1)
                        .map((kyefeat: any, index: any) => (
                          <p key={index}>
                            - <span className="dynamicDataTwo">{kyefeat}</span>
                          </p>
                        ))}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <div className="createdCarRequirements">
                <div className="CarReqHead">
                  <h3>Requirements</h3>
                </div>
                <div className="carReqMain">
                  <div className="uaeResReq">
                    <h5>Requirements (for UAE Residents) :</h5>
                    {data?.requirementsForUAEResidents
                      .slice(1)
                      .map((docuae: any, index: any) => (
                        <p key={index}>
                          - <span className="dynamicDataTwo">{docuae}</span>
                        </p>
                      ))}
                  </div>
                  <div className="tourResReq">
                    <h5>Requirements (for Tourists):</h5>
                    {data?.requirementsForTourists
                      .slice(1)
                      .map((doctour: any, index: any) => (
                        <p key={index}>
                          - <span className="dynamicDataTwo">{doctour}</span>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <Paper sx={{ marginTop: "1.3rem" }} elevation={4}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6113.930645090803!2d54.52542178395218!3d24.333778154208204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e38b07e85e8bd%3A0x209405b2a9ed26d2!2sAl%20Mihad%20St%20-%20Mohamed%20Bin%20Zayed%20City%20-%20ME-10%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1710322800420!5m2!1sen!2sin"
                  width="420"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default CreatedCar;
