import unResizedShirt from "../assets/men_shirt1.jpg";
// import bigResizedShirt from "../assets/men_shirt.jpg";
import smallResizedShirt from "../assets/men_shirt1 (1).jpg";
import smallResizedShirt2 from "../assets/men_shirt2.jpg";
import smallResizedShirt3 from "../assets/men_shirt3.jpg";
import smallResizedShirt4 from "../assets/men_shirt4.jpg";
import smallResizedShirt5 from "../assets/men_shirt5.jpg";

const images = [
  smallResizedShirt,
  smallResizedShirt2,
  smallResizedShirt3,
  smallResizedShirt4,
  smallResizedShirt5,
];

function FirstProductDetail() {
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse gap-2">
        <div className="">
          <img
            src={unResizedShirt}
            alt=""
            className="h-full max-h-[460px] md:max-h-[572.67px] w-full max-w-[393px] md:max-w-[541.85px] object-cover"
          />
        </div>
        <div className="flex flex-row md:flex-col gap-2 max-w-[393px] md:max-w-[126.39px] md:max-h-[572.67px] overflow-hidden">
          {images.map((image, index) => (
            <div key={index} className="">
              <img
                src={image}
                alt=""
                className="max-w-[82.43px] max-h-[82.43px] md:max-w-[126.39px] md:max-h-[126.39px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FirstProductDetail;
