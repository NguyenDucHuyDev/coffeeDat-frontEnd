import { Card } from 'antd';

export const VerticalProduct = (img,title,price,sold) => {
  return(
    <div className="VerticalProduct h-full">
      <div className="VerticalProduct__main h-full">
        <Card
          hoverable
          className="h-full"
          cover={
            <div className="bg-[#FCFBF7] py-5 h-full rounded-t-lg">
              <img alt="example" src={img} className="max-h-36 mx-auto" />
            </div>
          }
        >
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-center">
              <span className="font-semibold text-base">Product:</span>
              <span>{title}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-semibold text-base">Price:</span>
              <span>{price}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-semibold text-base">Product sold:</span>
              <span>{sold}</span>
            </p>

          </div>
        </Card>
      </div>
    </div>
  )
}