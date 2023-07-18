//Import library
import { Link } from 'react-router-dom'

//Import name routes
import { ROUTES } from '@/config'

//Import function
import { BtnYellow } from '@/components/button'

//Import word
import { successContactLib } from '@/library/contactUsPage/successContactLib';

//Handle and export
const SuccessfulContact = () => {
  return (
    <div className="successfulContact flex-1 bg-[#FFFEFC]">
      <div className="successfulContact__main">
        <div className="pageWrapper p-5 flex flex-col items-center min-h-[20rem] gap-10">
          <div className="mt-5">
            <span className="text-2xl text-[#603809] font-bold">{successContactLib.word_successfulContact}</span>
          </div>
          <div className="bg-[#f6f6f6] shadow-lg py-5 px-10 w-96">
            <p className="text-center">{successContactLib.notification}</p>
          </div>

          <Link className="shadow-lg" to={ROUTES.HOME}>
            {BtnYellow(successContactLib.btn_backHome)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulContact;
