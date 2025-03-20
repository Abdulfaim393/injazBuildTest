"use client";
import React from "react";
import "../compoverview/compoverview.css";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import mainImage from "../../../../../public/car rental 1@2xwebp.webp";
import Link from "next/link";
const CompanyOverview = () => {
  return (
    <section id="company_overview" className="company_overview">
      <Container maxWidth="xl">
        <div className="faq_head">
          <h3>
            Find the best car rental{" "}
            <Link
              href="https://logicrent.ae/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#01437d", textDecoration: "none" }}
            >
              company
            </Link>{" "}
            for you
          </h3>
        </div>
        <Grid container sx={{ alignItems: "center" }} spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className="overview_text">
              <p style={{ marginBottom: "0.5rem" }}>
                <strong className="overview_strong">INJAZ</strong> stands as the
                pioneering global platform for car rental and leasing{" "}
                <Link
                  href="/pages/carWithLocation/?monthly=monthly"
                  style={{ color: "#01437d", textDecoration: "none" }}
                >
                  Long-Term
                </Link>{" "}
                and{" "}
                <Link
                  href="/pages/carWithLocation/?daily=daily"
                  style={{ color: "#01437d", textDecoration: "none" }}
                >
                  Short-Term
                </Link>{" "}
                services. Collaborating with over 200 local car rental companies
                in <b className="overview_strong">Dubai & Abu Dhabi</b>, we
                offer access to a diverse inventory of 2000+ verified vehicles,
                ensuring you find the perfect rental car for your needs.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Discover unbeatable deals and discounts on all types of
                vehicles, tailored for both personal and business use. Benefit
                from our competitive, commission-free car rental services across{" "}
                <b className="overview_strong">Dubai & Abu Dhabi</b>.
              </p>
              <p>
                Explore our partners extensive fleet, encompassing every car
                enthusiasts dream. From luxurious cars like Mercedes to above
                economy options like Kia Picanto, Nissan Sunny, and Renault
                Tucson, we cater to all preferences and budgets.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Image
              src={mainImage}
              alt="company image"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default CompanyOverview;
