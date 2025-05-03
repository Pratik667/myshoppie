import React, { useEffect, useState } from "react";
import "../style.css";
import oneplusImage from "../../assets/Jackson-Wang-removebg-preview.png";
import axios from "axios";
import { Link } from "react-router-dom";
import useIsMobile from "../useIsMobile";

const OnePlusHero = () => {
  const [productData, setProductData] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/680a6ec2a4ac4b8a9de862b7`,
    );
    setProductData(response.data);
  };
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchData();
  }, []);

  const formattedDescription = productData.description
    ? productData.description
        .split("\\n")
        .slice(0, 8)
        .map((line) => line.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"))
        .join("<br>")
    : "";

  return (
    <section className="oneplus-brand">
      <div className="description-hero">
        <div className="brand-description">
          <div className="brand-name">
            <h2>{productData.brand}</h2>
            <h3 className="tagline">Simply Clever</h3>
          </div>
          <div
            className="brand-hero"
            style={{ display: isMobile ? "block" : "none" }}
          >
            <img src={oneplusImage} alt="OnePlus 13" />
          </div>
          <h3>{productData.name}</h3>
          {/* <img src={productData.image} alt="" /> */}
          <p dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
          <Link to={`/pdp`} state={{ productdata: productData }}>
            Know more{" "}
          </Link>
        </div>
        <div
          className="brand-hero"
          style={{ display: isMobile ? "none" : "block" }}
        >
          <img src={oneplusImage} alt="OnePlus 13" />
        </div>
      </div>
    </section>
  );
};

export default OnePlusHero;
