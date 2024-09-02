import { useEffect, useState, useCallback, useRef } from "react";
import CartItem from "../atoms/CartItem";
import { comma } from "../../utils/convert";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Box from "../atoms/Box";
import Container from "../atoms/Container";
import { updateCart } from "../../services/api/cart";
import { BsCart } from "react-icons/bs";

const staticServerUri = process.env.REACT_APP_PATH || "";

const CartList = ({ data, isLoading }) => {
  const route = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const updatePayload = useRef([]);

  const { mutate } = useMutation({
    mutationFn: updateCart,
  });

  const getTotalCartCountIncludeOptions = useCallback(() => {
    let count = 0;
    cartItems.forEach((item) => {
      item.carts.forEach((cart) => {
        count += cart.quantity; // 개별 옵션에 해당
      });
    });
    return comma(count);
  }, [cartItems]);

  const getIsCartEmpty = useCallback(() => {
    return cartItems.every((product) => {
      return product.carts.every((option) => option.quantity === 0);
    });
  }, [cartItems]);

  useEffect(() => {
    if (data?.data?.response?.products !== undefined) {
      setCartItems(data.data.response.products);
    }
    if (data?.data?.response?.totalPrice !== undefined) {
      setTotalPrice(data.data.response.totalPrice);
    }
    setIsCartEmpty(getIsCartEmpty());
  }, [data, getIsCartEmpty]);

  useEffect(() => {
    setIsCartEmpty(getIsCartEmpty());
  }, [cartItems, getIsCartEmpty]);

  /**
   * 옵션의 수량 변경과 가격 변경을 관리
   * @param {number} optionId : 옵션의 아이디
   * @param {number} quantity : 옵션 수량
   * @param {number} price : 옵션 가격
   */
  const handleOnChangeCount = (optionId, quantity, price) => {
    const prev = updatePayload.current;
    const isExist = prev.find((item) => item.cartId === optionId);
    if (isExist) {
      updatePayload.current = [
        ...prev.filter((item) => item.cartId !== optionId),
        { cartId: optionId, quantity },
      ];
    } else {
      updatePayload.current = [...prev, { cartId: optionId, quantity }];
    }

    mutate(updatePayload.current, {
      onSuccess: (data) => {
        setTotalPrice((prev) => prev + price);

        setCartItems((prev) =>
          prev.map((item) => ({
            ...item,
            carts: item.carts.map((cart) => {
              if (cart.id === optionId) {
                return { ...cart, quantity };
              }
              return cart;
            }),
          }))
        );
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <main className="pt-2 pb-10 bg-[#F4F4F4] bg-opacity-70">
      <Container className="w-[870px] mx-auto">
        <Box className="h-12 border rounded bg-white text-center">
          <h1 className="font-semibold text-[15px] mt-3">장바구니</h1>
        </Box>
        {isCartEmpty ? (
          <div className="text-center pt-52 pb-80 mt-2 border rounded bg-white ">
            <BsCart className="mx-auto my-4 text-5xl text-neutral-300" />
            <span className="text-xl">장바구니에 담긴 상품이 없습니다.</span>
            <div className="flex w-fit mx-auto my-4">
              <button
                className="w-[100px] mx-1 px-3 py-2 rounded border border-neutral-300 bg-white"
                onClick={() => route(-1)}>
                <span className="text-sm text-black">이전화면</span>
              </button>
              <button
                className="w-[100px] mx-1 px-3 py-2 rounded bg-black"
                onClick={() => route(staticServerUri + "/")}>
                <span className="text-sm text-white">쇼핑하기 홈</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {Array.isArray(cartItems) &&
              cartItems.map((item) => {
                return (
                  item.carts.every((option) => option.quantity === 0) !==
                    true && (
                    <CartItem
                      key={item.id}
                      item={item}
                      onChange={handleOnChangeCount} // 개수 변경
                    />
                  )
                );
              })}
            <div className="h-fit border rounded bg-white mt-8 px-8 py-6">
              <span className="font-bold text-lg">주문 예상금액</span>
              <div className="float-right text-lg font-semibold text-blue-500 pr-4">
                {comma(totalPrice)}원
              </div>
            </div>
            <Button
              className="h-fit w-full border rounded bg-[#feeb00] mt-4 p-4 hover:bg-yellow-300"
              onClick={() => route(staticServerUri + "/order")}>
              <span className="font-semibold text-lg">
                {getTotalCartCountIncludeOptions()}건 주문하기
              </span>
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
};

export default CartList;
