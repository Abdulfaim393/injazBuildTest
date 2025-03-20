"use client";
import {
  Box,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../../adminpage/pages/createdCars/CreatedCars.css";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import NavFooter from "@/utils/Na_Fo";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import {
  AppBarMain,
  AppBarMainBox,
  AppBarTabs,
  BookButtonBox1,
  BookButtonMain,
  BookingTypo,
  BookingTypo1,
  CarChargeBox1,
  CarChargeTypo1,
  CarDetailsBoxCss,
  CarDetailscontentBox,
  DailyWeeklyBox1,
  DailyWeeklyTypo1,
  FieldsBox,
  HighlightBox,
  HightlightTypo,
  InsuranceTypo1,
  MainBoxBooking,
  MonthlyTypo1,
  MonthlyTypo2,
  PriceBrakeBox1,
  PriceBrakeBox2,
  PriceBrakeTypo1,
  PriceBrakeTypo2,
  TabBoxMain,
  TitleTypo,
  TitleTypo2,
} from "./styleData";
import TextFieldComp from "./TextFieldComp";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/Remove";

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
        <TabBoxMain>
          <Box>{children}</Box>
        </TabBoxMain>
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
  discountedPriceMonthly: any;
  transmission: string;
  engineCapacity: string;
  laggageBootCapacity: string;
  securityDeposit: string;
  cashType: string[];
  paiInsuranceDaily: string;
  paiInsuranceWeekly: string;
  paiInsuranceMonthly: any;
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
  keyFeatures: any;
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
  oneMonthPriceOf2500Km: any;
  oneMonthPriceOf5000Km: any;
  threeMonthPriceOf2500Km: any;
  threeMonthPriceOf5000Km: any;
  fuel: string;
  maxPower: string;
  torque: string;
  sixMonthPriceOf2500Km: any;
  sixMonthPriceOf5000Km: any;
  eightMonthPriceOf2500Km: any;
  nineMonthPriceOf2500Km: any;
  nineMonthPriceOf5000Km: any;
}

const CreatedCar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("verify");
  const router = useRouter();

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
    discountedPriceMonthly: 0,
    transmission: "",
    engineCapacity: "",
    laggageBootCapacity: "",
    securityDeposit: "",
    cashType: [],
    paiInsuranceDaily: "",
    paiInsuranceWeekly: "",
    paiInsuranceMonthly: 0,
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
    oneMonthPriceOf2500Km: 0,
    oneMonthPriceOf5000Km: 0,
    threeMonthPriceOf2500Km: 0,
    threeMonthPriceOf5000Km: 0,
    sixMonthPriceOf2500Km: 0,
    sixMonthPriceOf5000Km: 0,
    eightMonthPriceOf2500Km: 0,
    fuel: "",
    maxPower: "",
    torque: "",
    nineMonthPriceOf2500Km: 0,
    nineMonthPriceOf5000Km: 0,
  });

  const [selectedPrice, setSelectedPrice] = useState(0); // state for selected price
  const [selectedInsuarance, setSelectedInsuarance] = useState(0); // state for selected insuarance
  const [insuranceBoxColor, setInsuranceBoxColor] = useState(""); // state for insuarance box color
  const [monthlyBoxColor, setMonthlyBoxColor] = useState(""); // state for insuarance box color
  const [mileage, setMileage] = useState(0); // state for selected milage
  const [selectedCount, setSelectedCount] = useState(1); // state for selected count
  const [selectedMileage, setSelectedMileage] = useState(
    sessionStorage.getItem("subscription") ?? ""
  ); // state for selected mileage box color
  const [dailyWeekly, setDailyWeekly] = useState(
    sessionStorage.getItem("subscription") ?? ""
  ); // state for daily weekly box
  const [userfullName, setUserFullName] = useState("");
  const [userphoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userCarDeliveryTime, setUserCarDeliveryTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [daysWeeks, setDaysWeeks] = useState("");
  const [selectedDaysPrice, setSelectedDaysPrice] = useState(0);
  const [bookingDaysWeeks, setBookingDaysWeeks] = useState(
    "Please select above"
  );
  const [insuDailyWeekly, setInsuDailyWeekly] = useState(0);
  const [bookingMonth, setBookingMonth] = useState("Please select above");

  const handleBoxClick = (price: any, count: any, monthText: any) => {
    setSelectedPrice(price); // update selected price
    setSelectedCount(count);
    // setMileage(0);
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor(monthText);
    // setSelectedMileage("");
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("");
    setInsuDailyWeekly(0);
    setBookingMonth(monthText);
  };
  const handleInsauranceBoxClick = (price: any, monthText: any) => {
    // const insurancePrice = price * selectedCount;
    const insurancePrice = price;
    setSelectedInsuarance(insurancePrice); // update selected price
    setInsuranceBoxColor(monthText);
    setInsuDailyWeekly(
      monthText === "Full Cover"
        ? daysWeeks === "days"
          ? parseFloat(data?.cdwDaily ?? 0)
          : daysWeeks === "weeks"
          ? parseFloat(data?.cdwWeekly ?? 0)
          : 0
        : 0
    );
  };
  const handleSelectedDaysBoxClick = (
    price: any,
    itemText: any,
    count: any
  ) => {
    setSelectedDaysPrice(price);
    setBookingDaysWeeks(itemText);
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setSelectedCount(count);
    setInsuDailyWeekly(0);
  };

  const handleMileageBoxClick = (mileage: any) => {
    // const mileageCost = mileage === "5000 KM" ? 300 * selectedCount : 0;
    const mileageCost = mileage === "5000 KM Mileage" ? 300 : 0;
    setMileage(mileageCost); // update additional mileage cost
    setSelectedMileage(mileage);
    setMonthlyBoxColor("");
    setSelectedPrice(0);
    setInsuranceBoxColor("");
    setSelectedInsuarance(0);
    setBookingMonth("Please Select Above");
  };

  const handleDailyWeekly = (text: any) => {
    setDailyWeekly(text);
    setSelectedPrice(0);
    setSelectedCount(1);
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setMileage(0);
    setSelectedMileage("");
    setDaysWeeks("");
    setBookingDaysWeeks("Please select above");
    setBookingMonth("Please select above");
    setInsuDailyWeekly(0);
    setSelectedDaysPrice(0);
  };
  const handleDaysWeeks = (text: any) => {
    setDaysWeeks(text);
    setSelectedDaysPrice(0);
    setBookingDaysWeeks("Please select above");
    setSelectedInsuarance(0);
    setInsuranceBoxColor("");
    setMonthlyBoxColor("");
    setSelectedCount(1);
    setInsuDailyWeekly(0);
  };

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
      monthText: "9 Months",
      savingAmount: "100",
      price:
        mileage === 300
          ? parseFloat(data?.nineMonthPriceOf5000Km)
          : parseFloat(data?.nineMonthPriceOf2500Km),
      count: 9,
    },
    {
      monthText: "6 Months",
      savingAmount: "80",
      price:
        mileage === 300
          ? parseFloat(data?.sixMonthPriceOf5000Km)
          : parseFloat(data?.sixMonthPriceOf2500Km),
      count: 6,
    },
    {
      monthText: "3 Months",
      savingAmount: "60",
      price:
        mileage === 300
          ? parseFloat(data?.threeMonthPriceOf5000Km)
          : parseFloat(data?.threeMonthPriceOf2500Km),
      count: 3,
    },
    {
      monthText: "1 Month",
      savingAmount: "40",
      price:
        mileage === 300
          ? parseFloat(data?.oneMonthPriceOf5000Km)
          : parseFloat(data?.oneMonthPriceOf2500Km),
      count: 1,
    },
  ];
  const insuranceBox = [
    {
      monthText: "Standard Cover",
      savingAmount: "No additional cost",
      price: 0,
    },
    {
      monthText: "Full Cover",
      savingAmount: `+ AED ${
        dailyWeekly === "monthly"
          ? parseFloat(data?.cdwMonthly)
          : dailyWeekly === "dailyAndWeekly"
          ? parseFloat(data?.cdwDaily)
          : ""
      }/Month`,
      price: parseFloat(data?.cdwMonthly),
    },
  ];
  const monthlyMilageBox = [
    { monthText: "2500 KM Mileage", savingAmount: "No additional cost" },
    {
      monthText: "5000 KM Mileage",
      savingAmount: `Additional cost applicable`,
    },
  ];
  const dailyWeeklyAndMonthlyBox = [
    { bookFor: "Daily & Weekly", text: "dailyAndWeekly" },
    { bookFor: "Monthly", text: `monthly` },
  ];

  const daysWeeksBox = [
    { bookFor: "Days", text: "days" },
    { bookFor: "Weeks", text: `weeks` },
  ];

  const daysBooking = [
    {
      dayText: "1 Day",
      price: parseFloat(data?.discountedPriceDaily),
      count: 1,
    },
    {
      dayText: "2 Days",
      price: parseFloat(data?.discountedPriceDaily) * 2,
      count: 2,
    },
    {
      dayText: "3 Days",
      price: parseFloat(data?.discountedPriceDaily) * 3,
      count: 3,
    },
    {
      dayText: "4 Days",
      price: parseFloat(data?.discountedPriceDaily) * 4,
      count: 4,
    },
    {
      dayText: "5 Days",
      price: parseFloat(data?.discountedPriceDaily) * 5,
      count: 5,
    },
    {
      dayText: "6 Days",
      price: parseFloat(data?.discountedPriceDaily) * 6,
      count: 6,
    },
  ];
  const weeksBooking = [
    {
      dayText: "1 Week",
      price: parseFloat(data?.discountedPriceWeekly),
      count: 1,
    },
    {
      dayText: "2 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 2,
      count: 2,
    },
    {
      dayText: "3 Weeks",
      price: parseFloat(data?.discountedPriceWeekly) * 3,
      count: 3,
    },
  ];

  const totalCarInsauAmt = selectedPrice + selectedInsuarance;

  const vatFivePercent = (totalCarInsauAmt * 5) / 100;

  const totalAmountmonthly = totalCarInsauAmt + vatFivePercent;

  const vatFivePercentDailyWeekly = selectedDaysPrice + insuDailyWeekly;

  const vatAmountDailyWeekly = (vatFivePercentDailyWeekly * 5) / 100;

  const totalAmountDailyWeekly =
    vatFivePercentDailyWeekly + vatAmountDailyWeekly;

  const handleMonthlyWhatsappClick = (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingMonth
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingMonth}. \nCar Rental Charges in AED :- ${
    //   selectedPrice > 0 ? selectedPrice : 0
    // }. \nInsuarance Charges in AED :- ${
    //   selectedInsuarance > 0 ? selectedInsuarance : 0
    // }. \nMileage Charges in AED :- ${mileage}. \nVAT Charges (5%) in AED :- ${vatFivePercent}. \nTotal Amount :- ${totalAmountmonthly}. \n${url}. \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = axios.post(
        "https://api.injazrent.ae/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          phoneNumber: userphoneNumber,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingMonth,
          pickupTime: userCarDeliveryTime,
        }
      );
      setLoading(false); // End loading
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
              You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
    // console.log(whatsappMessage);
    debugger;
  };
  const handleDailyAndWeeklyWhatsappClick = (
    carDetails: any,
    userphoneNumber: any,
    userfullName: any,
    userEmail: any,
    userCity: any,
    userStartDate: any,
    userCarDeliveryTime: any
  ) => {
    if (
      !userfullName ||
      !userphoneNumber ||
      !userEmail ||
      !userCity ||
      !userStartDate ||
      !userCarDeliveryTime
    ) {
      setError("Please enter all fields.");
      return;
    }
    setError("");
    const { brand, model, year, _id } = carDetails;
    // const baseUrl =
    //   "https://injazrent.ae/user/landing_page/get_car_details?verify=";
    // const url = `${baseUrl}${_id}`;
    // const whatsappMessage = `Hi, \nI’m ${userfullName} contacting you through Injazrent.ae. \nI’d like to rent the INJAZ Car. \nFull Name :- ${userfullName}. \nPhone No :- ${userphoneNumber}. \nEmail :-${userEmail}. \nCity :- ${userCity}. \nStart Date :- ${userStartDate}. \nCar Delivery Time :- ${userCarDeliveryTime}. \nCar :- ${brand} ${model} ${year}. \nBooking ${bookingDaysWeeks
    //   .replace(/\d+/, "")
    //   .trim()} :- ${bookingDaysWeeks}. \nCar Free KM :- ${
    //   daysWeeks === "days"
    //     ? parseFloat(data?.freeDailyKM) * selectedCount
    //     : "0" && daysWeeks === "weeks"
    //     ? parseFloat(data?.freeWeeklyKM) * selectedCount
    //     : "0"
    // }. \nCar Rental Charges in AED :- ${selectedDaysPrice}. \nCar Insurance Charges in AED :- ${insuDailyWeekly}. \nVAT Charges (5%) in AED :- ${vatAmountDailyWeekly}. \nTotal Amount :- ${totalAmountDailyWeekly}. \n${url} \nIs it available?`;
    // const whatsappLink = `https://wa.me/${
    //   phoneData?.phoneNumber ? phoneData?.phoneNumber : "+971529487046"
    // }?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      setLoading(true); // Start loading

      const response: any = axios.post(
        "https://api.injazrent.ae/user/createInquiry",
        {
          carName: brand + " " + model + " " + year,
          startDate: userStartDate,
          phoneNumber: userphoneNumber,
          message: userCity,
          name: userfullName,
          email: userEmail,
          packages: bookingDaysWeeks,
          pickupTime: userCarDeliveryTime,
        }
      );
      setLoading(false); // End loading
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
              You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      router.push("/");
    } catch (err) {
      setLoading(false); // End loading
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const textFieldData = [
    {
      value: userfullName,
      onChange: (e: any) => setUserFullName(e.target.value),
      errors: !userfullName && error !== "",
      placeholder: "Full Name",
      type: "text",
      variant: "outlined",
    },
    {
      value: userphoneNumber,
      onChange: (e: any) => setUserPhoneNumber(e.target.value),
      errors: !userphoneNumber && error !== "",
      placeholder: "No +9710000000000",
      type: "text",
      variant: "outlined",
    },
    {
      value: userEmail,
      onChange: (e: any) => setUserEmail(e.target.value),
      errors: !userEmail && error !== "",
      placeholder: "Email",
      type: "text",
      variant: "outlined",
    },
    {
      value: userCity,
      onChange: (e: any) => setUserCity(e.target.value),
      errors: !userCity && error !== "",
      placeholder: "City",
      type: "text",
      variant: "outlined",
    },
    {
      value: userStartDate,
      onChange: (e: any) => setUserStartDate(e.target.value),
      errors: !userStartDate && error !== "",
      placeholder: "Start Date",
      type: "date",
      variant: "outlined",
    },
    {
      value: userCarDeliveryTime,
      onChange: (e: any) => setUserCarDeliveryTime(e.target.value),
      errors: !userCarDeliveryTime && error !== "",
      placeholder: "Car Delivery Time",
      type: "time",
      variant: "outlined",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const fullInsuranceText =
    "What is full insurance? Full Insurance covers everything without an excess charge - even if you are deemed at fault, as long as corresponding police report is submitted.";

  return (
    <>
      <NavFooter />
      <section className="createdCars">
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <div className="createdCarsTop">
                <div className="imageHead">
                  <BookingTypo variant="h6">
                    {data?.brand} {data?.model} {data?.year}
                  </BookingTypo>
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
                <div
                  style={{
                    marginTop: "1rem",
                    // display: "flex",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                  className="imageHead"
                >
                  <BookingTypo variant="h6">
                    Car Details{" "}
                    <IconButton onClick={toggleExpand}>
                      {expanded ? (
                        <ExpandLessIcon sx={{ color: "white" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </BookingTypo>
                </div>
                {/* Collapsible content */}
                <Collapse in={expanded}>
                  <CarDetailsBoxCss>
                    <Grid container spacing={1}>
                      {carDetailsBox.map((item) => (
                        <Grid key={item.title} item xs={6} sm={2}>
                          <CarDetailscontentBox>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={25}
                              height={25}
                            />
                            <TitleTypo variant="subtitle1">
                              {item.title}
                            </TitleTypo>
                            <TitleTypo2 variant="subtitle1">
                              {item.text}
                            </TitleTypo2>
                          </CarDetailscontentBox>
                        </Grid>
                      ))}
                    </Grid>
                  </CarDetailsBoxCss>
                </Collapse>
                <section className="tabSecMem">
                  <AppBarMainBox>
                    <AppBarMain position="static">
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
                        <AppBarTabs label="Highlights" {...a11yProps(0)} />
                        <AppBarTabs label="Features" {...a11yProps(1)} />
                        <AppBarTabs
                          label="Technical Details"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </AppBarMain>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        {highlights.map((item) => (
                          <HighlightBox key={item.text}>
                            <HightlightTypo variant="subtitle1">
                              {item.text}
                            </HightlightTypo>
                            <HightlightTypo variant="subtitle1">
                              {item.value}
                            </HightlightTypo>
                          </HighlightBox>
                        ))}
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        {(Array.isArray(data?.keyFeatures)
                          ? data?.keyFeatures
                          : data?.keyFeatures?.split(",") || []
                        )
                          .slice(1)
                          .filter(Boolean)
                          .map((item: any, index: any) => (
                            <HighlightBox key={index}>
                              <HightlightTypo variant="subtitle1">
                                {item}
                              </HightlightTypo>
                            </HighlightBox>
                          ))}
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        {technicalDetails.map((item) => (
                          <HighlightBox key={item.text}>
                            <HightlightTypo variant="subtitle1">
                              {item.text}
                            </HightlightTypo>
                            <HightlightTypo variant="subtitle1">
                              {item.value}
                            </HightlightTypo>
                          </HighlightBox>
                        ))}
                      </TabPanel>
                    </SwipeableViews>
                  </AppBarMainBox>
                </section>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <MainBoxBooking>
                <BookingTypo1 variant="h6">Booking Length</BookingTypo1>
                <Grid container spacing={1}>
                  {dailyWeeklyAndMonthlyBox.map((item, index) => (
                    <Grid item xs={6} sm={6} key={index}>
                      <DailyWeeklyBox1
                        onClick={() => handleDailyWeekly(item.text)} // update total on box click
                        sx={{
                          backgroundColor:
                            dailyWeekly === item.text ? "orange" : "white",
                        }}
                      >
                        <DailyWeeklyTypo1 variant="subtitle1">
                          {item.bookFor}
                        </DailyWeeklyTypo1>
                      </DailyWeeklyBox1>
                    </Grid>
                  ))}
                  {dailyWeekly === "dailyAndWeekly" && (
                    <>
                      {daysWeeksBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() => handleDaysWeeks(item.text)} // update state of daysWeeks
                            sx={{
                              marginTop: "0.5rem",
                              backgroundColor:
                                daysWeeks === item.text ? "orange" : "white",
                            }}
                          >
                            <DailyWeeklyTypo1 variant="subtitle1">
                              {item.bookFor}
                            </DailyWeeklyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "days" && (
                    <>
                      {daysBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {daysWeeks === "weeks" && (
                    <>
                      {weeksBooking.map((item, index) => (
                        <Grid item xs={4} sm={4} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleSelectedDaysBoxClick(
                                item.price,
                                item.dayText,
                                item.count
                              )
                            }
                            sx={{
                              backgroundColor:
                                selectedDaysPrice === item.price
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.dayText}
                            </MonthlyTypo1>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {/* <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1> */}
                      {/* <Grid container spacing={1}> */}
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                      {/* </Grid> */}
                    </>
                  )}
                  {dailyWeekly === "monthly" && (
                    <>
                      {monthlyBooking.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleBoxClick(
                                // selectedMileage==="5000 KM"?item.price5000: item.price2500,
                                item.price,
                                item.count,
                                item.monthText
                              )
                            }
                            sx={{
                              backgroundColor:
                                monthlyBoxColor === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              Save AED {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                <>
                  <InsuranceTypo1 variant="h6">Insurance</InsuranceTypo1>
                  <Grid container spacing={1}>
                    {insuranceBox.map((item, index) => (
                      <Grid item xs={6} sm={6} key={index}>
                        <DailyWeeklyBox1
                          onClick={() =>
                            handleInsauranceBoxClick(item.price, item.monthText)
                          } // update total on box click
                          sx={{
                            backgroundColor:
                              insuranceBoxColor === item.monthText
                                ? "orange"
                                : "white",
                          }}
                        >
                          <>
                            <Tooltip
                              title={
                                item.monthText === "Full Cover"
                                  ? fullInsuranceText
                                  : ""
                              }
                            >
                              <MonthlyTypo1 variant="subtitle1">
                                {item.monthText}
                              </MonthlyTypo1>
                            </Tooltip>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </>
                        </DailyWeeklyBox1>
                      </Grid>
                    ))}
                  </Grid>
                </>
                {/* {dailyWeekly === "monthly" && (
                  <>
                    <InsuranceTypo1 variant="h6">
                      Monthly mileage allowance
                    </InsuranceTypo1>
                    <Grid container spacing={1}>
                      {monthlyMilageBox.map((item, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <DailyWeeklyBox1
                            onClick={() =>
                              handleMileageBoxClick(item.monthText)
                            }
                            sx={{
                              backgroundColor:
                                selectedMileage === item.monthText
                                  ? "orange"
                                  : "white",
                            }}
                          >
                            <MonthlyTypo1 variant="subtitle1">
                              {item.monthText}
                            </MonthlyTypo1>
                            <MonthlyTypo2 variant="subtitle2">
                              {item.savingAmount}
                            </MonthlyTypo2>
                          </DailyWeeklyBox1>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )} */}
                {dailyWeekly === "monthly" && (
                  <>
                    <PriceBrakeTypo1 variant="h6">
                      Price Break Down
                    </PriceBrakeTypo1>
                    <PriceBrakeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingMonth.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingMonth}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Monthly Fee in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedPrice > 0 ? selectedPrice : 0}{" "}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Insuarance Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedInsuarance > 0 ? selectedInsuarance : 0}{" "}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Mileage Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {mileage}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      {/* <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Discount in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          -60
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2> */}
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {vatFivePercent}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </PriceBrakeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <>
                    <CarChargeTypo1 variant="h6">
                      Car Charges & Other Details
                    </CarChargeTypo1>
                    <CarChargeBox1>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Booking {bookingDaysWeeks.replace(/\d+/, "").trim()}
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {bookingDaysWeeks}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Free KM
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {daysWeeks === "days"
                            ? parseFloat(data?.freeDailyKM) * selectedCount
                            : daysWeeks === "weeks"
                            ? parseFloat(data?.freeWeeklyKM) * selectedCount
                            : 0}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Rental Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {selectedDaysPrice}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          Car Insurance Charges in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {insuDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                      <PriceBrakeBox2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          VAT Charges (5%) in AED
                        </PriceBrakeTypo2>
                        <PriceBrakeTypo2 variant="subtitle2">
                          {vatAmountDailyWeekly}
                        </PriceBrakeTypo2>
                      </PriceBrakeBox2>
                    </CarChargeBox1>
                  </>
                )}
                {dailyWeekly === "dailyAndWeekly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      {totalAmountDailyWeekly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                {dailyWeekly === "monthly" && (
                  <PriceBrakeBox2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      Total Amount
                    </PriceBrakeTypo2>
                    <PriceBrakeTypo2 variant="subtitle2">
                      {totalAmountmonthly}
                    </PriceBrakeTypo2>
                  </PriceBrakeBox2>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <Grid container spacing={1}>
                    {textFieldData.map((item, index) => (
                      <Grid item xs={6} sm={6} key={index}>
                        <TextFieldComp
                          placeholder={item.placeholder}
                          value={item.value}
                          onChange={item.onChange}
                          errors={item.errors}
                          type={item.type}
                          variant={item.variant}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginTop: "0.5rem", textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
                <BookButtonBox1>
                  {dailyWeekly === "dailyAndWeekly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      onClick={() =>
                        handleDailyAndWeeklyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                  {dailyWeekly === "monthly" && (
                    <BookButtonMain
                      size="large"
                      variant="contained"
                      onClick={() =>
                        handleMonthlyWhatsappClick(
                          data,
                          userphoneNumber,
                          userfullName,
                          userEmail,
                          userCity,
                          userStartDate,
                          userCarDeliveryTime
                        )
                      }
                    >
                      Book Now
                    </BookButtonMain>
                  )}
                </BookButtonBox1>
              </MainBoxBooking>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default CreatedCar;
