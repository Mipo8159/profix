import React from 'react';

interface SalesCardProps {
  flag: string;
}

const SalesCard: React.FC<SalesCardProps> = ({ flag }) => {
  return (
    <tr>
      <td className='w-30'>
        <div className='d-flex px-2 py-1 align-items-center'>
          <div>
            <img src={flag} alt='Country flag' />
          </div>
          <div className='ms-4'>
            <p className='text-xs font-weight-bold mb-0'>Country:</p>
            <h6 className='text-sm mb-0'>United States</h6>
          </div>
        </div>
      </td>
      <td>
        <div className='text-center'>
          <p className='text-xs font-weight-bold mb-0'>Sales:</p>
          <h6 className='text-sm mb-0'>2500</h6>
        </div>
      </td>
      <td>
        <div className='text-center'>
          <p className='text-xs font-weight-bold mb-0'>Value:</p>
          <h6 className='text-sm mb-0'>$230,900</h6>
        </div>
      </td>
      <td className='align-middle text-sm'>
        <div className='col text-center'>
          <p className='text-xs font-weight-bold mb-0'>Bounce:</p>
          <h6 className='text-sm mb-0'>29.9%</h6>
        </div>
      </td>
    </tr>
  );
};

export default SalesCard;
