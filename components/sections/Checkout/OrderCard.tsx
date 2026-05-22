import Image from "next/image";

type OrderCardProps = {
  item: {
    id: number;
    image: string;
    title: string;
    color: string;
    quantity: number;
    price: number;
    size: string;
  };
};

function OrderCard({ item }: OrderCardProps) {
  return (
    <div className="flex gap-4"> 
      <div className="w-[113px] h-[134px] bg-[#f3f3f3] shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={113}
          height={134}
          className="w-[113px] h-[134px] object-contain"
        />
      </div>
 
      <div className="flex-1 flex justify-between gap-4">
        <div>
          <h3 className="font-beatriceDeckMedium text-[11px] font-medium leading-[18px]">
            {item.title}
          </h3>

          <p className="font-beatriceDeckMedium text-[12px] text-black/50 mt-1">
            {item.color} / {item.size}
          </p>

          <p className="font-beatriceDeckMedium text-[14px] text-[#000E8A] mt-4">
            ({item.quantity}) 
          </p>
        </div>

        <div className="flex flex-col justify-between items-end">
          <button className=" font-beatriceDeckMedium text-[12px] underline">
            Change
          </button>

          <p className="font-beatriceDeckMedium text-[12px] font-medium">
            ${item.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;