import { useCallback, useEffect, useMemo, useState } from "react";
import ProductPoster from "../../assets/images/product_poster.png";
import Logo from "../../assets/images/logo.png";
import { Image, Table, Checkbox, Row, Col, Button } from "antd";
import { formatCurrency } from "../../config/common.currency";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? carts.map(({ id }) => id) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onChange = (e) => {
    let list = [...checkedList];
    if (e.target.checked) list.push(e.target.value);
    else {
      list = list.filter((_id) => _id !== e.target.value);
    }
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < carts.length);
    setCheckAll(list.length === carts.length);
  };

  const handleSetQuanlity = (quanlity, item) => {
    if (quanlity <= 0) return;
    const _index = carts.findIndex(({ id }) => id === item.id);
    if (_index === -1) return;
    carts[_index].quanlity = quanlity;
    setCarts(structuredClone(carts));
  };

  const deleteCart = (id) => {
    const _index = carts.findIndex(({ id: _id }) => _id === id);
    if (_index === -1) return;
    carts.splice(_index, 1);
    setCarts(structuredClone(carts));
  };

  const calcPrice = (item) => {
    let price = item.totalPrice ?? item.product.price;
    price *= item.quanlity;
    return price;
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Product
        </Checkbox>
      ),
      dataIndex: "id",
      key: "id",
      render(id, item) {
        return (
          <div className="flex items-center gap-x-4">
            <Checkbox
              value={id}
              onChange={onChange}
              checked={checkedList.find((_id) => _id === id)}
            />
            <Image className="!h-16 bg-cover" src={item.product.image} />
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "id",
      key: "price",
      render(id, item) {
        return <>{formatCurrency(item.product.price)}</>;
      },
    },
    {
      title: "Quanlity",
      dataIndex: "quanlity",
      key: "quanlity",
      render(quanlity, item) {
        return (
          <>
            <div className="flex border p-2 gap-x-4 items-center border-black w-max">
              <MinusOutlined
                onClick={() => handleSetQuanlity(quanlity - 1, item)}
              />
              <span>{quanlity}</span>
              <PlusOutlined
                onClick={() => handleSetQuanlity(quanlity + 1, item)}
              />
            </div>
          </>
        );
      },
    },
    {
      title: "Total Money",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render(totalPrice, item) {
        return formatCurrency(calcPrice(item));
      },
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render(id) {
        return (
          <div className="cursor-pointer" onClick={() => deleteCart(id)}>
            Cancel
          </div>
        );
      },
    },
  ];

  const getCart = useCallback(() => {
    // Logic hanlde fetch data here
    // Below is random data
    const data = Array(20)
      .fill(null)
      .map(() => {
        return {
          id: crypto.randomUUID(), // Random id
          product: {
            name: "Good product",
            image: ProductPoster,
            price: 10_000,
          },
          quanlity: 1,
          totalPrice: null,
        };
      });
    setCarts(data);
  }, []);

  const finalPrice = useMemo(() => {
    return carts
      .filter(({ id }) => checkedList.includes(id))
      .reduce((total, item) => {
        total += calcPrice(item);
        return total;
      }, 0);
  }, [carts, checkedList]);

  useEffect(() => {
    getCart();
  }, [getCart]);
  return (
    <div className="productPage flex-1">
      <div className="productPage__main py-5">
        <div className="pageWrapper">
          <div className="mt-4 md:mt-8">
            <div className="my-4 flex items-center gap-x-4">
              <img src={Logo} className="w-52"/>
              <div className="text-lg md:text-4xl font-bold">Cart</div>
            </div>
            <Table columns={columns} dataSource={carts} />
            <Row gutter={[12, 12]} className="my-4">
              <Col xs={12} md={5}>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  Select all
                </Checkbox>
              </Col>
              <Col xs={12} md={5}>
                <span>Total product: {carts.length}</span>
              </Col>
              <Col xs={12} md={5}>
                <span>Total payment: {formatCurrency(finalPrice)}</span>
              </Col>
              <Col xs={12} md={9}>
                <div className="flex justify-end">
                  <Button type="primary" className="bg-blue-500">
                    Pay now
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage