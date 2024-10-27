import React from "react";

const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  onSelect,
  isSummary = false,
}) => (
  <div className="flex items-center justify-between p-4 border-b bg-white">
    <div className="flex items-center space-x-4">
      {!isSummary && (
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => onSelect(item.id)}
          className="form-checkbox h-5 w-5 text-gray-600"
        />
      )}
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover"
      />
      <div className="flex flex-col">
        <p className="text-md font-bold text-blue-700">{item.name}</p>
        <p className="text-gray-500 text-sm">Mã: {item.code}</p>
      </div>
    </div>

    {!isSummary && (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="px-2 py-1 border-r hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="px-2 py-1 border-l hover:bg-gray-100"
        >
          +
        </button>
      </div>
    )}

    <div className="text-right">
      <p className="text-lg font-semibold text-yellow-600">
        {(item.price * item.quantity).toLocaleString()}{" "}
        <span className="text-base">₫</span>
      </p>
      {!isSummary && (
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 text-xl"
        >
          🗑️
        </button>
      )}
    </div>
  </div>
);

export default CartItem;
