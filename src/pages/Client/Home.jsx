import React from "react";

export default function Home() {
  return (
    <section id="hero" class="d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>Elegant and creative solutions</h1>
            <h2>
              We are team of talented designers making websites with Bootstrap
            </h2>
            <div class="d-flex">
              <a href="#about" class="btn-get-started scrollto">
                Get Started
              </a>
              <a
                href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
                class="glightbox btn-watch-video"
              >
                <i class="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img">
            <img
              src="assets/img/hero-img.png"
              class="img-fluid animated"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
