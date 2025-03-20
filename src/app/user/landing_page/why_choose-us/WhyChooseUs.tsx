"use client";
import { Container } from "@mui/material";
import React from "react";
import "../why_choose-us/WhyChooseUs.css";
import { boxData, sectionData } from "./data";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <section className="whyChooseUs">
      <Container maxWidth="xl">
        <div className="whyHeading">
          <h3>{sectionData[0]}</h3>
        </div>
        <div className="whySubHeading">
          <h4>{sectionData[1]}</h4>
        </div>
        <div className="whyPara">
          <p>{sectionData[2]}</p>
        </div>
        {boxData.map((item, index) => (
          <div key={index} className="whyChooseBox">
            <div className="whyBoxHead">
              <h5>{item.heading}</h5>
            </div>
            <div className="whyBoxImg">
              <Image
                src={item.src}
                alt={item.heading}
                width={200}
                height={175}
                loading="lazy"
              />
            </div>
            <div className="whyBoxPara">
              <p>{item.para}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default WhyChooseUs;
