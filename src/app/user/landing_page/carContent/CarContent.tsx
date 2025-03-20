"use client";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import "../car-offers/caroffers.css";
import { useRouter } from "next/navigation";
import Loader from "@/app/Loader";
import BookNow from "../car-offers/BookNow";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CustomizedTooltips from "@/utils/reusableTooltip";

interface CarContentType {
  data: any;
  phoneData: any;
}

const CarContent: React.FC<CarContentType> = ({ data = [], phoneData }) => {
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (data && data.length > 0) {
      setLoader(false);
    }
  }, [data]);

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
    <div className="car_offers">
      <Container maxWidth="lg">
        {!loader ? (
          <Grid container spacing={6} sx={{ justifyContent: "center" }}>
            {data.map((car: any) => (
              <Grid
                item
                xs={12}
                md={4}
                sm={4}
                lg={4}
                xl={4}
                key={car._id}
                className="carBoxShadow"
              >
                <Card sx={{ boxShadow: 3 }} className="carBorder">
                  <CardActionArea>
                    <CardContent
                      className="cardContent"
                      onClick={() => {
                        router.push(`/pages/getCarDetails?verify=${car._id}`);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={car.externalImage?.[0] || car.image}
                        alt={car.brand}
                      />
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
                          <h5>{car.category}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/car-seat.png"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />
                          <h5 title="seater">{car.seater.split(" ")[0]}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/car-engine.png"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />
                          <h5>{car.engineCapacity}</h5>
                        </div>
                        <div className="car_subint">
                          <img
                            src="/manual-transmission.png"
                            width={20}
                            height={20}
                            alt="Picture of the author"
                          />
                          <h5>{car.transmission}</h5>
                        </div>
                      </div>
                    </CardContent>

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
                            sx={{
                              color: "green",
                              marginRight: "5px",
                            }}
                          />
                          <p className="carInfoPara">Minimum 2 days rental</p>
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
                              Deposit: AED {car.securityDeposit}
                            </p>
                          </div>
                        </CustomizedTooltips>
                      </div>
                      <div className="book_btn">
                        <Button
                          variant="contained"
                          startIcon={<WhatsAppIcon className="wts-icon" />}
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
                      <div className="int_icon" style={{ padding: "0px 13px" }}>
                        <CheckIcon
                          sx={{
                            color: "green",
                            marginRight: "5px",
                          }}
                        />
                        <p className="carInfoPara">
                          Full Insurrance: AED {car.cdwDaily}
                          /Day, AED {car.cdwWeekly}
                          /Week, AED {car.cdwMonthly}
                          /Month
                        </p>
                      </div>
                    </CustomizedTooltips>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // </Suspense>
          <>
            <br />
            <br />
            <Loader />
            <br />
            <br />
          </>
        )}
      </Container>
    </div>
  );
};

export default CarContent;
