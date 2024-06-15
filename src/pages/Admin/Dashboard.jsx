import React from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Clients"}
              icon={"bi-person"}
              value={20000}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Freelencera"}
              icon={"bi-person"}
              value={20000}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard label={"Jobs"} icon={"bi-person"} value={20000} />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatisticsCard
              label={"Contracts"}
              icon={"bi-person"}
              value={20000}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatisticsCard
              label={"Applications"}
              icon={"bi-person"}
              value={20000}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatisticsCard
              label={"Transactions"}
              icon={"bi-person"}
              value={20000}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatisticsCard
              label={"Transactions"}
              icon={"bi-person"}
              value={20000}
            />
          </div>

          <DataTable />
        </div>
      </div>
    </div>
  );
}

function DataTable() {
  const { t } = useTranslation();

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            {t("Recent Transactions")}
            <span>| 23, 789, 123 ETB</span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">{t("Transaction #")}</th>
                <th scope="col">{t("From")}</th>
                <th scope="col">{t("To")}</th>
                <th scope="col">{t("Amount")}</th>
                <th scope="col">{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <a href="#">#2457</a>
                </th>
                <td>Brandon Jacob</td>
                <td>
                  <a href="#" className="text-primary">
                    At praesentium minu
                  </a>
                </td>
                <td>$64</td>
                <td>
                  <span className="badge bg-success">Approved</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">#2147</a>
                </th>
                <td>Bridie Kessler</td>
                <td>
                  <a href="#" className="text-primary">
                    Blanditiis dolor omnis similique
                  </a>
                </td>
                <td>$47</td>
                <td>
                  <span className="badge bg-warning">Pending</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">#2049</a>
                </th>
                <td>Ashleigh Langosh</td>
                <td>
                  <a href="#" className="text-primary">
                    At recusandae consectetur
                  </a>
                </td>
                <td>$147</td>
                <td>
                  <span className="badge bg-success">Approved</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">#2644</a>
                </th>
                <td>Angus Grady</td>
                <td>
                  <a href="#" className="text-primar">
                    Ut voluptatem id earum et
                  </a>
                </td>
                <td>$67</td>
                <td>
                  <span className="badge bg-danger">Rejected</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <a href="#">#2644</a>
                </th>
                <td>Raheem Lehner</td>
                <td>
                  <a href="#" className="text-primary">
                    Sunt similique distinctio
                  </a>
                </td>
                <td>$165</td>
                <td>
                  <span className="badge bg-success">Approved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatisticsCard({ label, icon, value }) {
  return (
    <div className="card info-card sales-card">
      {/* <div className="filter">
        <a className="icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-three-dots"></i>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>

          <li>
            <a className="dropdown-item" href="#">
              Today
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Month
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              This Year
            </a>
          </li>
        </ul>
      </div> */}

      <div className="card-body">
        <h5 className="card-title">
          {label}
          {/* <span>| Today</span> */}
        </h5>

        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={"bi " + icon}></i>
          </div>
          <div className="ps-3">
            <h6>{value}</h6>
            {/* <span className="text-success small pt-1 fw-bold">12%</span>
            <span className="text-muted small pt-2 ps-1">increase</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
