export function isCloseToRight({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: {
  layoutMeasurement: any;
  contentOffset: any;
  contentSize: any;
}) {
  const paddingToRight = 50;
  return (
    layoutMeasurement.width + contentOffset.x >=
    contentSize.width - paddingToRight
  );
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
