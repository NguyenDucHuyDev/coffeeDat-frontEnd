//import library
import React from 'react';
import { Link } from 'react-router-dom';

//import Library
import {userLibraryFooter} from '../../../library/footers/userLib'

//import image
import img_visa from '../../../assets/images/visa.png';
import img_masterCard from '../../../assets/images/mastercard.png';

const UserFooter = () => {
  return (
    <div className="userFooter bg-[#222222] text-white md:text-base text-xs">
      <div className="userFooter__main">
        <div className="pageWrapper">
          <div className="flex flex-col gap-5 items-center py-5">
            <div className="footer_card flex gap-5 items-center">
              <div className="bg-[#ddd] rounded px-2 py-1 cursor-pointer w-20 h-12">
                <img src={img_visa} className="w-full h-full" />
              </div>
              <div className="bg-[#ddd] rounded px-2 py-1 cursor-pointer w-20 h-12">
                <img src={img_masterCard} className="w-full h-full" />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-5">
              {(userLibraryFooter.nav).map((item) => {
                return(
                  <React.Fragment key={item.li}>
                    <Link to={item.url} className="text-center">
                      <span className="cursor-pointer hover:text-[#F9C06A]">{item.li}</span>
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="font-thin">{userLibraryFooter.copyright}</p>
              <p className="text-xl text-[#F9C06A]">{userLibraryFooter.city}</p>
              <p>{userLibraryFooter.address}</p>
              <p>{userLibraryFooter.email}</p>
              <p>{userLibraryFooter.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserFooter;
