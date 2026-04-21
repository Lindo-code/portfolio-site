import lemonMilk from "/src/assets/fonts/Lemon-Milk-Pro-Regular.otf";

const TitleSansText = ({
  lines = ["Where Bright", "Ideas Come", "to Play."],
  size = 120,
  align = "center",
  color = "white",
  topOffset = 0,
  lineSpacing = 1.1,
  customSpacing = "2px 2px",
}) => {
  return (
    <div
      style={{
        marginTop: topOffset,
        textAlign: align,
        color,
        fontSize: size,
        fontFamily: "'Lemon Milk', sans-serif",
        fontWeight: 500,
        lineHeight: lineSpacing,
      }}
    >
      <style>
        {`
          @font-face {
            font-family: 'Lemon Milk';
            src: url('${lemonMilk}') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}
      </style>

      {lines.map((line, i) => (
        <div key={i} style={{ display: "block", padding: customSpacing }}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default TitleSansText;
