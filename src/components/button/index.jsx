export const BtnYellow = (text) => {
  return (
    <div className="BtnYellow cursor-pointer w-max">
      <div className="btnYellow__main">
        <div className="bg-[#F9C06A] font-semibold text-base px-5 py-2 rounded">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
