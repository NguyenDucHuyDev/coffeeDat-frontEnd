//Import library
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//Import api
import apiAxiosAuth from '@/utils/api/auth'

//Handle and export
export const ProductMenu = () => {
  const [menuItems, setMenuItems] = useState(null);
  console.log(menuItems)
  useEffect(() => {
    const categoryUrl = "product/get-all-category";
    const urls = [categoryUrl];
    const promises = urls.map((url) =>
      apiAxiosAuth.get(url).then((res) => res)
    );
    Promise.all(promises).then(([category]) => {
      setMenuItems({
        ...category,
      }).catch(()=>{
        setMenuItems(null)
      })
    });
  }, []);

  console.log(menuItems)
  return (
    <div className="bg-[#f6f6f6] flex-1">
      {!menuItems ? (
        <Spin tip="Loading" size="large">
          <div className="content py-5 my-5" />
        </Spin>
      ) : (
        <div className="py-5">
          <div className="text-xl font-bold uppercase px-5 mb-2">
            {menuItems.category.title}
          </div>
          {menuItems.category.items.map((item) => {
            return (
              <NavLink
                key={item._id}
                to={`/product/type/${item._id}/page/1`}
                className={({isActive}) => 
                  isActive 
                    ? "hover:bg-[#F9C06A] cursor-pointer bg-[#F9C06A] block mb-2"
                    : "hover:bg-[#F9C06A] cursor-pointer block mb-2"
                }
              >
                <div className="px-10 py-3 text-base">{item.name}</div>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};
