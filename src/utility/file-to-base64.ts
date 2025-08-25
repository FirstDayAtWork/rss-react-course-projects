import type { Item } from '../stores/store';
import type { FormInputs } from '../zod/schema';

type FileToBaseProps = {
  data: FormInputs;
  setData: (item: Item) => void;
};

export default function fileToBase64(props: FileToBaseProps): void {
  const { data, setData } = props;

  const reader = new FileReader();
  if (data.image instanceof File) {
    reader.readAsDataURL(data.image);
  }

  function readData(): void {
    if (typeof reader.result === 'string') {
      const image = reader.result;

      const object: Item = {
        base64Img: image,
        ...data,
      };

      setData(object);
    }

    reader.removeEventListener('load', readData);
  }

  reader.addEventListener('load', readData);
}
