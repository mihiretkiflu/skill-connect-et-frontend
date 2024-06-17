import React from "react";

export default function PaymentSuccess() {
  return (
    <div style={{ height: "100%" }}>
      {" "}
      <section id="featured-services" className="featured-services">
        <div className="container">
          <div className="section-title">
            <span>Payment Successfull</span>
            <h2>Payment Successfull</h2>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="icon-box align-items-center justify-content-center">
                <div className="icon">
                  <i className="bi bi-check"></i>
                </div>
                <h4 className="title">
                  <a href="">Successfully Paid !</a>
                </h4>
                <p className="description">
                  {/* Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi sint occaecati cupiditate non provident */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
