import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {" "}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>
                {t("Skill Connect")} <br /> {t("Ethiopia")}
              </h1>
              <h2 className="mt-3">
                {t("Find freelancer based in Ethiopia for your project.")}{" "}
                <br />
                {t("Hire digitally and pay remotely.")}
              </h2>
              <div className="d-flex mt-4">
                <Link to={"/find-freelancer"} className="btn-get-started">
                  {t("Hire Freelancer")}
                </Link>
                {/* <a
                  href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
                  className="glightbox btn-watch-video"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a> */}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img">
              <img
                src="assets/img/homepage.jpg"
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>{" "}
      <main id="home-main" style={{ paddingTop: "5rem" }}>
        {/* <!-- ======= Featured Services Section ======= --> */}
        <section id="featured-services" className="featured-services">
          <div className="container">
            <div className="section-title">
              <span>Browse Talent By Category</span>
              <h2>Browse Talent By Category</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-laptop"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Development and IT</a>
                  </h4>
                  <p className="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi sint occaecati cupiditate non provident
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Design and Creative</a>
                  </h4>
                  <p className="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Writing and Translation</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Writing and Translation</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Design and Creative</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Financing and Accounting</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Featured Services Section --> */}

        {/* <!-- ======= About Section ======= --> */}
        <section id="about" className="about" style={{ paddingTop: "5rem" }}>
          <div className="container">
            <div className="section-title">
              <span>About</span>
              <h2>About</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <img src="assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>Why Skill Connect Ethiopia ?</h3>
                <p className="fst-italic">
                  Our platform links you with skilled freelancers capable of
                  delivering outstanding outcomes. Whether you require a web
                  developer, graphic designer, or content writer, we can meet
                  your needs.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Duis aute irure dolor
                    in reprehenderit in voluptate velit
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End About Section --> */}

        {/* <!-- ======= Services Section ======= --> */}
        <section id="services" className="services section-bg">
          <div className="container">
            <div className="section-title">
              <span>Services</span>
              <h2>Services</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bxl-dribbble"></i>
                  </div>
                  <h4>
                    <a href="">Lorem Ipsum</a>
                  </h4>
                  <p>
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-file"></i>
                  </div>
                  <h4>
                    <a href="">Sed ut perspiciatis</a>
                  </h4>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-tachometer"></i>
                  </div>
                  <h4>
                    <a href="">Magni Dolores</a>
                  </h4>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-world"></i>
                  </div>
                  <h4>
                    <a href="">Nemo Enim</a>
                  </h4>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-slideshow"></i>
                  </div>
                  <h4>
                    <a href="">Dele cardo</a>
                  </h4>
                  <p>
                    Quis consequatur saepe eligendi voluptatem consequatur dolor
                    consequuntur
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                  <div className="icon">
                    <i className="bx bx-arch"></i>
                  </div>
                  <h4>
                    <a href="">Divera don</a>
                  </h4>
                  <p>
                    Modi nostrum vel laborum. Porro fugit error sit minus
                    sapiente sit aspernatur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Services Section --> */}

        {/* <!-- ======= Team Section ======= --> */}
        <section id="team" className="team section-bg">
          <div className="container">
            <div className="section-title">
              <span>Team</span>
              <h2>Team</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/team/team-1.jpg" alt="" />
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <p>
                    Magni qui quod omnis unde et eos fuga et exercitationem.
                    Odio veritatis perspiciatis quaerat qui aut aut aut
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/team/team-2.jpg" alt="" />
                  <h4>Sarah Jhinson</h4>
                  <span>Product Manager</span>
                  <p>
                    Repellat fugiat adipisci nemo illum nesciunt voluptas
                    repellendus. In architecto rerum rerum temporibus
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/team/team-3.jpg" alt="" />
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <p>
                    Voluptas necessitatibus occaecati quia. Earum totam
                    consequuntur qui porro et laborum toro des clara
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Team Section --> */}

        {/* <!-- ======= Contact Section ======= --> */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="section-title">
              <span>Contact</span>
              <h2>Contact</h2>
              <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p>
            </div>

            <div className="row">
              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>

                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                    frameborder="0"
                    // style="border: 0; width: 100%; height: 290px"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label for="name">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mt-3 mt-md-0">
                      <label for="name">Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label for="name">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label for="name">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="10"
                      required
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Contact Section --> */}
      </main>
      <footer id="home-footer">
        <div class="footer-top">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <h3>Skill Connect Ethiopia</h3>
                <p>
                  Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis
                  magni eligendi fuga maxime saepe commodi placeat.
                </p>
              </div>
            </div>

            <div class="row footer-newsletter justify-content-center">
              <div class="col-lg-6">
                <form action="" method="post">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                  />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="twitter">
                <i class="bx bxl-twitter"></i>
              </a>
              <a href="#" class="facebook">
                <i class="bx bxl-facebook"></i>
              </a>
              <a href="#" class="instagram">
                <i class="bx bxl-instagram"></i>
              </a>
              <a href="#" class="google-plus">
                <i class="bx bxl-skype"></i>
              </a>
              <a href="#" class="linkedin">
                <i class="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="container footer-bottom clearfix">
          <div class="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Skill Connect Ethiopia</span>
            </strong>
            . All Rights Reserved
          </div>
          <div class="credits"></div>
        </div>
      </footer>
    </div>
  );
}
