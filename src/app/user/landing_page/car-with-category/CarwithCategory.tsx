"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import BookNow from "../car-offers/BookNow";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../car-offers/caroffers.css";
import Loader from "@/app/Loader";
import "../../../[locale]/globals.css";
import { serverUrl } from "@/utils/helper";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NavFooter from "@/utils/Na_Fo";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";
const CarwithCategory = (props: any) => {
  const [cars, setcars] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(true);
  const [phoneemail, setPhoneEmail] = useState({});
  const [sortByPriceAscending, setSortByPriceAscending] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    axios
      .get(serverUrl + `/user/getAllCars?category=${category}`)
      .then((res) => {
        const newData = res.data.data?.filter(
          (item: any) => item.status === "Active"
        );
        if (sortByPriceAscending) {
          newData.sort(
            (a: any, b: any) => a.discountedPriceDaily - b.discountedPriceDaily
          );
        } else {
          newData.sort(
            (a: any, b: any) => b.discountedPriceDaily - a.discountedPriceDaily
          );
        }
        setcars(newData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "errorrrrr");
      });
  }, [category, sortByPriceAscending]);

  const toggleSortOrder = () => {
    setSortByPriceAscending((prevSortOrder) => !prevSortOrder);
  };

  const handleWhatsappClick = (carDetails: any) => {
    const {
      brand,
      model,
      year,
      package: packageDetails,
      discountedPriceDaily,
      _id,
    } = carDetails;
    const baseUrl = "https://injazrent.ae/pages/getCarDetails?verify=";
    const url = `${baseUrl}${_id}`;
    const whatsappMessage = `Hi, \nI’m contacting you through Injazrent.ae. \nI’d like to rent the discounted ${brand} ${model} ${year} \n${url} \nfor ${discountedPriceDaily} AED ${packageDetails}. \nIs it available?`;
    const whatsappLink = `https://wa.me/${
      phoneData?.phoneNumber
    }?text=${encodeURIComponent(whatsappMessage)}`;
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "User Interaction",
        event_label: "WhatsApp Contact",
        value: phoneData?._id,
      });
    }
    window.open(whatsappLink);
  };

  return (
    <>
      <NavFooter footer={true}>
        <Box sx={{ textAlign: "center", margin: "1rem 1rem" }}>
          <Button
            variant="contained"
            size="small"
            onClick={toggleSortOrder}
            sx={{
              backgroundImage:
                "linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {sortByPriceAscending
              ? "Sort by Price (Descending)"
              : "Sort by Price (Ascending)"}
          </Button>
        </Box>
        {!loading ? (
          <div
            className="car_with_brand"
            style={{ marginTop: "25px", marginBottom: "20px" }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={6}>
                {cars.map((car: any) => (
                  <Grid item xs={12} md={4} sm={4} lg={4} key={car._id}>
                    <Card className="carBorder" sx={{ boxShadow: 3 }}>
                      <CardActionArea>
                        {car.cheapestCar === "Yes" && (
                          <Typography
                            className="cheapestBatch"
                            maxWidth="110px"
                            variant="h6"
                            color="initial"
                            sx={{
                              animation: "blink 0.5s infinite alternate",
                              "@keyframes blink": {
                                "0%": { opacity: 1 },
                                "100%": { opacity: 0 },
                              },
                            }}
                          >
                            Cheapest
                          </Typography>
                        )}
                        <CardMedia
                          component="img"
                          height="200"
                          image={car.externalImage?.[0] || car.image}
                          alt={car.brand}
                          onClick={() => {
                            router.push(
                              `/pages/getCarDetails?verify=${car._id}`
                            );
                          }}
                        />
                        <CardContent className="cardContent">
                          <Typography
                            className="cardNameYear"
                            gutterBottom
                            variant="h6"
                            component="div"
                          >
                            {car.brand} {car.model} ({car.year})
                          </Typography>
                          <div className="actualPrice">
                            <div className="actualPriceChild">
                              AED {car.actualPriceDaily} / Day
                            </div>
                            <div className="actualPriceChild">
                              AED {car.actualPriceWeekly} / Week
                            </div>
                            <div className="actualPriceChild">
                              AED {car.actualPriceMonthly} / Month
                            </div>
                          </div>
                          <div className="car_prices">
                            <div className="car_prices_child">
                              AED {car.discountedPriceDaily} / Day
                            </div>
                            <div className="car_prices_child">
                              AED {car.discountedPriceWeekly} / Week
                            </div>
                            <div className="car_prices_child">
                              AED {car.discountedPriceMonthly} / Month
                            </div>
                          </div>
                          <div className="car_KM">
                            <div className="car_KM_child">
                              {car.freeDailyKM} KM / Day
                            </div>
                            <div className="car_KM_child">
                              {car.freeWeeklyKM} KM / Week
                            </div>
                            <div className="car_KM_child">
                              {car.freeMonthlyKM} KM / Month
                            </div>
                          </div>
                          <div className="car_interior">
                            <div className="car_subint">
                              <img
                                src="/vehicles.png"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              {""}
                              <h5>{car.category}</h5>
                            </div>
                            <div className="car_subint">
                              <img
                                src="/car-seat.png"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              {""}
                              <h5>{car.seater.split(" ")[0]}</h5>
                            </div>
                            <div className="car_subint">
                              <img
                                src="/car-engine.png"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              {""}
                              <h5>{car.engineCapacity}</h5>
                            </div>
                            <div className="car_subint">
                              <img
                                src="/manual-transmission.png"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              {""}
                              <h5>{car.transmission}</h5>
                            </div>
                          </div>
                          <div className="car_info_sec6">
                            <div className="carDDI">
                              <div className="int_icon">
                                {car.cheapestCar === "Yes" ? (
                                  <CheckIcon
                                    sx={{
                                      color: "green",
                                      marginRight: "5px",
                                    }}
                                  />
                                ) : (
                                  <CloseIcon
                                    sx={{ color: "red", marginRight: "5px" }}
                                  />
                                )}
                                <p className="carInfoPara">
                                  Cheapest Car: {car.cheapestCar}
                                </p>
                              </div>
                              <div className="int_icon">
                                <CheckIcon
                                  sx={{ color: "green", marginRight: "5px" }}
                                />
                                <p className="carInfoPara">
                                  {" "}
                                  Minimum 2 days rental
                                </p>
                              </div>
                              <CustomizedTooltips title="A security deposit is required exclusively via credit card. The deposit will be refunded within 21 days following your return date.">
                                <div className="int_icon">
                                  <InfoIcon
                                    sx={{
                                      color: "orange",
                                      marginRight: "5px",
                                    }}
                                  />
                                  <p className="carInfoPara">
                                    {" "}
                                    Deposit: AED {car.securityDeposit}
                                  </p>
                                </div>
                              </CustomizedTooltips>
                            </div>
                            <div
                              className="book_btn"
                              style={{ textAlign: "center" }}
                            >
                              <Button
                                variant="contained"
                                startIcon={
                                  <WhatsAppIcon className="wts-icon" />
                                }
                                size="small"
                                className="whts-btn"
                                onClick={() => handleWhatsappClick(car)}
                              >
                                Whatsapp
                              </Button>
                              <Button>
                                <BookNow details={car} />
                              </Button>
                            </div>
                          </div>
                          <CustomizedTooltips
                            title={`Basic insurance is comprehensive and will cover non-fault accidents only. There are excess charges for fault accidents of AED ${car.securityDeposit}. We recommend you buy full insurance (CDW) to avoid these charges.`}
                          >
                            <div className="int_icon">
                              <CheckIcon
                                sx={{
                                  color: "green",
                                  marginRight: "5px",
                                }}
                              />
                              <p
                                style={{
                                  color: "green",
                                  marginRight: "5px",
                                  display: "inline",
                                }}
                              >
                                {" "}
                                Full Insurrance: {car.cdwDaily}
                                AED/Daily, {car.cdwWeekly}
                                AED/Weekly, {car.cdwMonthly}
                                {""}
                                AED/Monthly
                              </p>
                            </div>
                          </CustomizedTooltips>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        ) : (
          <>
            <br />
            <br />
            <div>
              <Loader />
            </div>
            <br />
            <br />
          </>
        )}
      </NavFooter>
    </>
  );
};

export default CarwithCategory;
