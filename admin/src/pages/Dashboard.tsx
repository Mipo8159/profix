import React from 'react';
import SalesCard from '../components/dashboard/SalesCard';
import SalesChart from '../components/dashboard/SalesChart';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import StatsChart from '../components/dashboard/StatsChart';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  return (
    <>
      {/* STATISTICS */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-7 position-relative z-index-2">
            <div className="card card-plain mb-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex flex-column h-100">
                      <h2 className="font-weight-bolder mb-0">General Statistics</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* STATISTICS CARDS */}
            <div className="row">
              <div className="col-lg-5 col-sm-5">
                <StatisticsCard icon="ni ni-money-coins text-lg opacity-10" styles="mb-4" />
                <StatisticsCard icon="ni ni-world text-lg opacity-10" />
              </div>
              <div className="col-lg-5 col-sm-5 mt-sm-0 mt-4">
                <StatisticsCard icon="ni ni-paper-diploma text-lg opacity-10" styles="mb-4" />
                <StatisticsCard icon="ni ni-cart text-lg opacity-10" />
              </div>
            </div>

            {/* SALES BY COUNTRY */}
            <div className="row mt-4">
              <div className="col-12 col-md-10">
                <div className="card">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">Sales by Country</h6>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center">
                      <tbody>
                        <SalesCard flag="/img/icons/flags/US.png" />
                        <SalesCard flag="/img/icons/flags/DE.png" />
                        <SalesCard flag="/img/icons/flags/GB.png" />
                        <SalesCard flag="/img/icons/flags/BR.png" />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="row mt-4">
          <StatsChart />
          <SalesChart />
        </div>
        <div className="row">
          <div className="col-12">
            <div id="globe" className="position-absolute end-0 top-10 mt-sm-3 mt-7 me-lg-7">
              <canvas
                width="700"
                height="600"
                className="w-lg-100 h-lg-100 w-75 h-75 me-lg-0 me-n10 mt-lg-5"
              ></canvas>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
