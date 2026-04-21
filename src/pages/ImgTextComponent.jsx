const ImgTextComponent = ({ imgText, width = "300px", height = "250px" }) => {
  return (
    <>
      <img
        src={imgText}
        alt=""
        style={{ width: `${width}`, height: `${height}`, objectFit: "contain" }}
      />
    </>
  );
};

export default ImgTextComponent;
