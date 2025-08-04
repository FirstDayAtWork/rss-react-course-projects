function objectToCsv<T>(object: T, regex: RegExp): string {
  let result = '';

  if (object instanceof Object) {
    for (const [key, value] of Object.entries(object)) {
      regex.lastIndex = 0;
      if (regex.test(key)) {
        result += `${value},`;
      }
    }
  }

  return result.replace(/,$/, '\n');
}

export function dataToCsv<T>(data: T, regex: RegExp): string {
  let result = '';

  if (Array.isArray(data) && data[0] instanceof Object) {
    const headers: string[] = Object.keys(data[0]).join(' ').match(regex) || [];
    result += `${headers.join(',')}\n`;

    data.forEach((item: T) => {
      result += objectToCsv(item, regex);
    });
  }

  return result.trim();
}
