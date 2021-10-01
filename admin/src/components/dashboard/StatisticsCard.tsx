import React from 'react';

interface StatisticsCardProps {
  icon: string;
  styles?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  styles,
}) => {
  return (
    <div className={`card ${styles}`}>
      <div className='card-body p-3'>
        <div className='row'>
          <div className='col-8'>
            <div className='numbers'>
              <p
                className='
                              text-sm
                              mb-0
                              text-capitalize
                              font-weight-bold
                            '
              >
                Today's Money
              </p>
              <h5 className='font-weight-bolder mb-0'>
                $53,000
                <span className='text-success text-sm font-weight-bolder'>
                  +55%
                </span>
              </h5>
            </div>
          </div>
          <div className='col-4 d-flex justify-content-end'>
            <div
              className='
                            icon icon-shape
                            bg-gradient-primary
                            shadow
                            text-center
                            border-radius-md
                          '
            >
              <i className={icon} aria-hidden='true'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
