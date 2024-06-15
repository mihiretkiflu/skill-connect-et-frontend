import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>
              {t("Skill Connect")} <br /> {t("Ethiopia")}
            </h1>
            <h2 className="mt-3">
              {t("Find freelancer based in Ethiopia for your project.")} <br />
              {t("Hire digitally and pay remotely.")}
            </h2>
            <div className="d-flex mt-4">
              <Link to={"/find-freelancer"} className="btn-get-started">
                {t("Hire Freelancer")}
              </Link>
              <a
                href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
                className="glightbox btn-watch-video"
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img
              src="assets/img/hero-img.png"
              className="img-fluid animated"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
