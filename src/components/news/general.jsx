import { newsGeneralPropType } from "../../utils/propTypes";

export const NewsGeneral = ({ newsInfo }) => {
  return (
    <div className="space-y-4">
      <img src={newsInfo.image} className="h-60" />
      <div className="text-xl font-bold uppercase">{newsInfo.title}</div>
    </div>
  );
};

NewsGeneral.propTypes = newsGeneralPropType;
