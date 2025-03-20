"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions,
  Select,
  Input,
  MenuItem,
  Box,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MessageIcon from "@mui/icons-material/Message";
import "../enquiry-form/enquiryForm.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { serverUrl } from "@/utils/helper";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface FormData {
  carName: string;
  phoneNumber: string;
  email: string;
  startDate: Date;
  endDate: Date;
  name: string;
  message: string;
  pickUpLoc: string;
  dropLocation: string;
  packages: string;
  deliveryMode: string;
  pickupTime: string;
  dropTime: string;
}

const schema = yup.object().shape({
  carName: yup.string().required("Car Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  email: yup.string().required("email is required"),
  startDate: yup.date().required("startDate is required"),
  endDate: yup
    .date()
    .required("endDate is required")
    .min(yup.ref("startDate"), "end date can't be before start date"),
  packages: yup.string().required("area is required"),
  name: yup.string().required("name is required"),
  message: yup.string().required("message is required"),
  pickUpLoc: yup.string().required("pickUpLoc is required"),
  dropLocation: yup.string().required("dropLocation is required"),
  deliveryMode: yup.string().required("deliveryMode is required"),
  pickupTime: yup.string().required("pickupTime is required"),
  dropTime: yup.string().required("dropTime is required"),
});

const serverAPI = "https://api.injazrent.ae";
const localAPI = "http://localhost:4000";

const BookNow: React.FC<{ details: any }> = (props) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { details } = props;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmiti = async () => {
    const data: any = getValues();
    try {
      const response = await axios.post(serverUrl + "/user/createInquiry", {
        ...data,
      });
      Swal.fire({
        icon: "success",
        title: "!! Success !!",
        text: `Your Booking has been Sent Successfully.Here is your BookingId: ${response?.data?.result?.bookingId} 
        You will get the confirmation on your email: ${response?.data?.result?.email} and your number: ${response?.data?.result?.phoneNumber}.`,
      });
      handleClose();
      reset();
      const carData = { carDetails: details, enquiryData: data };
      localStorage.setItem("bookingData", JSON.stringify(carData));
      router.push(`/pages/bookingScreen`);
    } catch (error) {
      console.error("Error submitting data:", error);
      handleClose();
      reset();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting data. Please try again later.",
      });
    }
  };

  const currentTime = dayjs();

  const deliveryMode = watch("deliveryMode");
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  useEffect(() => {
    if (deliveryMode === "Self Pickup Delivery") {
      setValue("pickUpLoc", "Self Pickup Location");
      setValue("dropLocation", "Self Pickup Location");
    } else {
      setValue("pickUpLoc", "");
      setValue("dropLocation", "");
    }
  }, [deliveryMode, setValue]);

  const handleDeliveryModeChange = (event: any) => {
    const selectedMode = event.target.value;
    setValue("deliveryMode", selectedMode);
    setShowAdditionalCharges(selectedMode === "Door Step Delivery");
  };

  // const [showAdditionalCharges, setShowAdditionalCharges] = React.useState(
  //   false
  // );
  // const [deliveryMode, setDeliveryMode] = React.useState('');
  // const [pickupLocation, setPickupLocation] = React.useState('');
  // const [dropLocation, setDropLocation] = React.useState('');

  // React.useEffect(() => {
  //   setValue('deliveryMode', deliveryMode); // Update form control value
  //   // Set default pickup and drop locations based on delivery mode
  //   if (deliveryMode === 'Self Pickup Delivery') {
  //     setPickupLocation('pickup location ');
  //     setDropLocation('Drop location');
  //   } else {
  //     setPickupLocation('');
  //     setDropLocation('');
  //   }
  // }, [setValue, deliveryMode]);

  // const handleDeliveryModeChange = (event: any) => {
  //   const selectedMode = event.target.value;
  //   setDeliveryMode(selectedMode);
  //   setShowAdditionalCharges(selectedMode === "Door Step Delivery");
  // };

  // React.useEffect(() => {
  //   // Set default values when the component mounts
  //   setValue('pickUpLoc', pickupLocation);
  //   setValue('dropLocation', dropLocation);
  // }, []);

  return (
    <div className="dialog_css">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="booknow_btn"
      >
        book Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmiti)}>
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "700", color: "#0c3b69" }}
          >
            Booking
          </DialogTitle>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      placeholder="Name"
                      id="name"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.name ? true : false}
                      helperText={formState.errors?.name?.message}
                      {...register("name", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="carName"
                  control={control}
                  defaultValue={`${details?.brand} - ${details?.model} - ${details?.year}`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      placeholder="Car Name"
                      id="carName"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimeToLeaveIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.carName ? true : false}
                      helperText={formState.errors?.carName?.message}
                      {...register("carName", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="packages"
                  control={control}
                  defaultValue=""
                  rules={{ required: "packages is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      fullWidth
                      variant="standard"
                      size="small"
                      input={
                        <Input
                          startAdornment={
                            <InputAdornment position="start">
                              <HomeRepairServiceIcon
                                sx={{ color: "#0c3b69" }}
                              />
                            </InputAdornment>
                          }
                        />
                      }
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        <span style={{ color: "#80808096" }}>Package</span>
                      </MenuItem>
                      <MenuItem
                        value={`DAILY AED ${details?.discountedPriceDaily} / DAY`}
                      >
                        DAILY{" "}
                        <span className="package_span">
                          (AED {details?.discountedPriceDaily} / DAY)
                        </span>
                      </MenuItem>
                      <MenuItem
                        value={`WEEKLY AED ${details?.discountedPriceWeekly} / WEEK`}
                      >
                        WEEKLY{" "}
                        <span className="package_span">
                          (AED {details?.discountedPriceWeekly} / WEEK)
                        </span>
                      </MenuItem>
                      <MenuItem
                        value={`MONTHLY AED ${details?.discountedPriceMonthly} / MONTH`}
                      >
                        MONTHLY{" "}
                        <span className="package_span">
                          (AED {details?.discountedPriceMonthly} / MONTH)
                        </span>
                      </MenuItem>
                    </Select>
                  )}
                />
                {formState.errors.packages && (
                  <p style={{ color: "red", margin: "0px", fontSize: "12px" }}>
                    {formState.errors.packages.message}
                  </p>
                )}
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="deliveryMode"
                  control={control}
                  defaultValue=""
                  rules={{ required: "deliveryMode Mode is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      fullWidth
                      label="Delivery Mode"
                      variant="standard"
                      size="small"
                      // value={deliveryMode}
                      onChange={handleDeliveryModeChange}
                      input={
                        <Input
                          startAdornment={
                            <InputAdornment position="start">
                              <HomeRepairServiceIcon
                                sx={{ color: "#0c3b69" }}
                              />
                            </InputAdornment>
                          }
                        />
                      }
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        <span style={{ color: "#80808096" }}>
                          Car Delivery Mode
                        </span>
                      </MenuItem>
                      <MenuItem value="Door Step Delivery">
                        Door Step Delivery
                      </MenuItem>
                      <MenuItem value="Self Pickup Delivery">
                        Self Pickup Delivery
                      </MenuItem>
                    </Select>
                  )}
                />
                {formState.errors.deliveryMode && (
                  <p style={{ color: "red", margin: "0px", fontSize: "12px" }}>
                    {formState.errors?.deliveryMode?.message}
                  </p>
                )}
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ padding: "20px 24px" }} className="phoneNumberField">
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      specialLabel={""}
                      country="ae"
                      preferredCountries={["ae", "ru", "us"]}
                      placeholder="Phone Number"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      placeholder="Email"
                      id="email"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.email ? true : false}
                      helperText={formState.errors?.email?.message}
                      {...register("email", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="pickUpLoc"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      placeholder="Pick up Location"
                      id="pickUpLoc"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      // value={pickupLocation}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.pickUpLoc ? true : false}
                      helperText={formState.errors?.pickUpLoc?.message}
                      {...register("pickUpLoc", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="dropLocation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      placeholder="Drop Location"
                      id="dropLocation"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      // value={dropLocation}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.dropLocation ? true : false}
                      helperText={formState.errors?.dropLocation?.message}
                      {...register("dropLocation", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="startDate"
                  control={control}
                  //   defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      label="Pick Up Date"
                      placeholder="Pick Up"
                      id="pick-up"
                      type="date"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRangeIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.startDate ? true : false}
                      helperText={formState.errors?.startDate?.message}
                      {...register("startDate", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {" "}
              <DialogContent>
                <Controller
                  name="endDate"
                  control={control}
                  //   defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      label="Pick Off Date"
                      placeholder="Pick Off"
                      id="pick-off"
                      type="date"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRangeIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.endDate ? true : false}
                      helperText={formState.errors?.endDate?.message}
                      {...register("endDate", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="pickupTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pickup Time"
                      placeholder="pickupTime"
                      id="pickupTime"
                      type="time"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.pickupTime ? true : false}
                      helperText={formState.errors?.pickupTime?.message}
                      {...register("pickupTime", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DialogContent>
                <Controller
                  name="dropTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Drop Time"
                      placeholder="dropTime"
                      id="dropTime"
                      type="time"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.dropTime ? true : false}
                      helperText={formState.errors?.dropTime?.message}
                      {...register("dropTime", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {" "}
              <DialogContent>
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // autoFocus
                      placeholder="Message"
                      id="message"
                      type="text"
                      fullWidth
                      variant="standard"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MessageIcon sx={{ color: "#0c3b69" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={formState.errors?.message ? true : false}
                      helperText={formState.errors?.message?.message}
                      {...register("message", { required: true })}
                    />
                  )}
                />
              </DialogContent>
            </Grid>
            {showAdditionalCharges && (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <DialogContent>
                  <h5 style={{ color: "red" }}>
                    Note:- Please pay attention here
                  </h5>
                  <h6>
                    Abu Dhabi city delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 52.50</span>
                  </h6>
                  <h6>
                    Abu Dhabi airport delivery additional charges is
                    <span style={{ color: "green" }}> AED 90</span>
                  </h6>
                  <h6>
                    Dubai city delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 52.50</span>
                  </h6>
                  <h6>
                    Dubai airport delivery additional charges is{" "}
                    <span style={{ color: "green" }}>AED 90</span>
                  </h6>
                </DialogContent>
              </Grid>
            )}
          </Grid>

          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BookNow;
