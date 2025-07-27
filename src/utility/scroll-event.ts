type ScrollEventProps = {
  side: 'top' | 'left';
  value: number;
  behavior: 'smooth' | 'instant' | 'auto';
};

export function scrollEvent(props: ScrollEventProps): void {
  const { side, value, behavior } = props;

  window.scrollTo({
    [side]: value,
    behavior: behavior,
  });
}
